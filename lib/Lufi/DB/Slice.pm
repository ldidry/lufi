# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::Slice;
use Mojo::Base -base;
use Encode 'encode';
use File::Spec::Functions;
use Mojo::Collection 'c';

has 'short';
has 'j';
has 'record' => 0;
has 'app';

=encoding utf8

=head1 NAME

Lufi::DB::Slice - DB abstraction layer for Lufi file

=head1 Contributing

When creating a new database accessor, make sure that it provides the following subroutines.
After that, modify this file and modify the C<new> subroutine to allow to use your accessor.

Have a look at Lufi::DB::Slice::SQLite's code: it's simple and may be more understandable that this doc.

=head1 Attributes

=over 1

=item B<short> : string

=item B<j>     : integer

=item B<app>   : A mojolicious object

=back

=head1 Sub routines

=head2 new

=over 1

=item B<Usage>     : C<$c = Lufi::DB::Slice-E<gt>new(app =E<gt> $self);>

=item B<Arguments> : any of the attribute above

=item B<Purpose>   : construct a new db accessor object. If the C<short> attribute is provided, it have to load the informations from the database.

=item B<Returns>   : the db accessor object

=item B<Info>      : the app argument is used by Lufi::DB::Slice to choose which db accessor will be used, you don't need to use it in new(), but you can use it to access helpers or configuration settings in the other subroutines

=back

=cut

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    if (ref($c) eq 'Lufi::DB::Slice') {
        my $dbtype = $c->app->config('dbtype');
        if ($dbtype eq 'sqlite') {
            use Lufi::DB::Slice::SQLite;
            $c = Lufi::DB::Slice::SQLite->new(@_);
        } elsif ($dbtype eq 'postgresql') {
            use Lufi::DB::Slice::Pg;
            $c = Lufi::DB::Slice::Pg->new(@_);
        } elsif ($dbtype eq 'mysql') {
            use Lufi::DB::Slice::Mysql;
            $c = Lufi::DB::Slice::Mysql->new(@_);
        }
    }

    return $c;
}

=head2 write

=over 1

=item B<Usage>     : C<$c-E<gt>write>

=item B<Arguments> : none

=item B<Purpose>   : create or update a record in the database, with the values of the object's attributes

=item B<Returns>   : the db accessor object

=back

=cut

sub write {
    my $c = shift;

    if ($c->record) {
        $c->app->dbi->db->query('UPDATE slices SET short = ?, j = ? WHERE short = ? AND j = ?', $c->short, $c->j, $c->short, $c->j);
    } else {
        $c->app->dbi->db->query('INSERT INTO slices (short, j) VALUES (?, ?)', $c->short, $c->j);
        $c->record(1);
    }

    return $c;
}

=head2 store

=over 1

=item B<Usage>     : C<$c-E<gt>store($text)>

=item B<Arguments> : a scalar value

=item B<Purpose>   : will store the content to the object's path, either on filesystem or on Swift object storage

=item B<Returns>   : the db accessor object

=back

=cut

sub store {
    my $c    = shift;
    my $text = shift;

    if ($c->app->config('swift')) {
        $c->app->swift->put_object(
            container_name => $c->app->config('swift')->{container},
            object_name    => $c->get_path(),
            content_length => length(Encode::encode_utf8($text)),
            content        => Encode::encode_utf8($text)
        );
    } else {
        # Create directory
        my $dir = catfile($c->app->config('upload_dir'), $c->short);
        mkdir($dir, 0700) unless (-d $dir);

        # Write file
        my $file = catfile($c->app->config('upload_dir'), $c->get_path());
        Mojo::File->new($file)->spew($text);
    }

    return $c;
}

=head2 retrieve

=over 1

=item B<Usage>     : C<$c-E<gt>retrieve>

=item B<Arguments> : none

=item B<Purpose>   : get file from storage, either filesystem or Swift object storage

=item B<Returns>   : the data from the file

=back

=cut

sub retrieve {
    my $c      = shift;
    my $upload = shift;

    if ($c->app->config('swift')) {
        my $file;
        $c->app->swift->get_object(
            container_name => $c->app->config('swift')->{container},
            object_name    => $c->get_path(),
            write_code => sub {
                my ($status, $message, $headers, $chunk) = @_;
                $file .= $chunk;
            }
        );
        return Encode::decode_utf8($file);
    } else {
        my $file = catfile($c->app->config('upload_dir'), $c->get_path());
        return Mojo::File->new($file)->slurp;
    }
}
=head2 delete_file

=over 1

=item B<Usage>     : C<$c-E<gt>delete_file()>

=item B<Arguments> : none

=item B<Purpose>   : delete the file on filesystem or Swift object storage

=item B<Returns>   : the db accessor object

=back

=cut

sub delete_file {
    my $c   = shift;

    if ($c->app->config('swift')) {
        $c->app->swift->delete_object({
            container_name => $c->app->config('swift')->{container},
            object_name    => $c->get_path()
        });
    } else {
        my $file = catfile($c->app->config('upload_dir'), $c->get_path());
        unlink $file or warn sprintf('Could not unlink %s: %s', $file, $!);
    }
    return $c;
}
=head2 get_slices_of_file

=over 1

=item B<Usage>     : C<$c-E<gt>get_slices_of_file($short)>

=item B<Arguments> : string

=item B<Purpose>   : get all Lufi::DB::Slice objects related to a file

=item B<Returns>   : a Mojo::Collection of Lufi::DB::Slice objects

=back

=cut

sub get_slices_of_file {
    my $c     = shift;
    my $short = shift;

    my @slices;
    my $records = $c->app->dbi->db->query('SELECT * FROM slices WHERE short = ? ORDER BY j ASC', $short)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::Slice->new(app => $c->app);

            push @slices, $i->_slurp($e);
        }
    );

    return c(@slices);
}

=head2 delete_all

=over 1

=item B<Usage>     : C<$c-E<gt>delete_all()>

=item B<Arguments> : none

=item B<Purpose>   : delete all slices records from database unconditionnally

=item B<Returns>   : nothing

=back

=cut

sub delete_all {
    my $c = shift;

    $c->app->dbi->db->delete('slices');
}

=head2 path

=over 1

=item B<Usage>     : C<$c-E<gt>path()>

=item B<Arguments> : non

=item B<Purpose>   : format the path of the file, relative to the directory of the Swift object storage

=item B<Returns>   : the path of the file

=back

=cut

sub get_path {
    my $c        = shift;

    return catfile($c->short, sprintf('%d.part', $c->j));
}

=head2 count

=over 1

=item B<Usage>     : C<$c-E<gt>count()>

=item B<Arguments> : none

=item B<Purpose>   : get count of slices records from database

=item B<Returns>   : integer

=back

=cut

sub count {
    my $c = shift;

    return $c->app->dbi->db->query('SELECT count(*) AS count FROM slices')->hashes->first->{count};
}

=head2 _slurp

=over 1

=item B<Usage>     : C<$c-E<gt>_slurp>

=item B<Arguments> : none

=item B<Purpose>   : put a database record's columns into the Lufi::DB::Slice object's attributes

=item B<Returns>   : the Lufi::DB::Slice object

=back

=cut

sub _slurp {
    my $c = shift;
    my $r = shift;

    my $slice;
    if (defined $r) {
        $slice = $r;
    } else {
        my $slices = $c->app->dbi->db->query('SELECT * FROM slices WHERE short = ? AND j = ?', $c->short, $c->j)->hashes;

        if ($slices->size) {
            $slice = $slices->first;
        }
    }

    if ($slice) {
        $c->short($slice->{short});
        $c->j($slice->{j});

        $c->record(1);
    }

    return $c;
}

1;
