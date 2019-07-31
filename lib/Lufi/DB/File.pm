# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::File;
use Mojo::Base -base;
use Mojo::File;
use Mojo::Collection 'c';
use Lufi::DB::Slice;

has 'short';
has 'deleted' => 0;
has 'mediatype';
has 'filename';
has 'filesize';
has 'counter' => 0;
has 'delete_at_first_view' => 0;
has 'delete_at_day';
has 'created_at' => sub {
    return time;
};
has 'created_by';
has 'last_access_at';
has 'mod_token';
has 'nbslices';
has 'complete' => 0;
has 'slices' => sub {
    return Mojo::Collection->new();
};
has 'passwd';
has 'abuse';
has 'zipped' => 0;
has 'record' => 0;
has 'app';

=head1 NAME

Lufi::DB::File - DB abstraction layer for Lufi file

=head1 Contributing

When creating a new database accessor, make sure that it provides the following subroutines.
After that, modify this file and modify the C<new> subroutine to allow to use your accessor.

Have a look at Lufi::DB::File::SQLite's code: it's simple and may be more understandable that this doc.

=head1 Attributes

=over 1

=item B<short>                : string

=item B<deleted>              : boolean

=item B<mediatype>            : string

=item B<filename>             : string

=item B<filesize>             : integer

=item B<counter>              : integer

=item B<delete_at_first_view> : boolean

=item B<delete_at_day>        : integer

=item B<created_at>           : unix timestamp

=item B<created_by>           : string

=item B<last_access_at>       : unix timestamp

=item B<mod_token>            : string

=item B<nbslices>             : integer

=item B<complete>             : boolean

=item B<slices>               : Mojo::Collection of Lufi::DB::Slice

=item B<passwd>               : string

=item B<abuse>                : integer

=item B<zipped>               : boolean

=item B<app>                  : a Mojolicious object

=back

=head1 Sub routines

=head2 new

=over 1

=item B<Usage>     : C<$c = Lufi::DB::File-E<gt>new(app =E<gt> $self);>

=item B<Arguments> : any of the attribute above

=item B<Purpose>   : construct a new db accessor object. If the C<short> attribute is provided, it have to load the informations from the database.

=item B<Returns>   : the db accessor object

=item B<Info>      : the app argument is used by Lufi::DB::File to choose which db accessor will be used, you don't need to use it in new(), but you can use it to access helpers or configuration settings in the other subroutines

=back

=cut

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    if (ref($c) eq 'Lufi::DB::File') {
        my $dbtype = $c->app->config('dbtype');
        if ($dbtype eq 'sqlite') {
            use Lufi::DB::File::SQLite;
            $c = Lufi::DB::File::SQLite->new(@_);
        } elsif ($dbtype eq 'postgresql') {
            use Lufi::DB::File::Pg;
            $c = Lufi::DB::File::Pg->new(@_);
        } elsif ($dbtype eq 'mysql') {
            use Lufi::DB::File::Mysql;
            $c = Lufi::DB::File::Mysql->new(@_);
        }
    }

    return $c;
}

=head2 delete

=over 1

=item B<Usage>     : C<$c-E<gt>delete>

=item B<Arguments> : none

=item B<Purpose>   : delete the files of the slices and the directory containing those files, then update the object by setting the deleted attribute to 1 (true)

=item B<Returns>   : the db accessor object

=back

=cut

sub delete {
    my $c = shift;

    $c->slices->each(sub {
        my ($e, $num) = @_;
        unlink $e->path;
    });
    rmdir Mojo::File->new($c->app->config('upload_dir'), $c->short);
    $c->deleted(1);

    $c->write;

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
        $c->app->dbi->db->query('UPDATE files SET short = ?, deleted = ?, mediatype = ?, filename = ?, filesize = ?, counter = ?, delete_at_first_view = ?, delete_at_day = ?, created_at = ?, created_by = ?, last_access_at = ?, mod_token = ?, nbslices = ?, complete = ?, passwd = ?, abuse = ?, zipped = ? WHERE short = ?', $c->short, $c->deleted, $c->mediatype, $c->filename, $c->filesize, $c->counter, $c->delete_at_first_view, $c->delete_at_day, $c->created_at, $c->created_by, $c->last_access_at, $c->mod_token, $c->nbslices, $c->complete, $c->passwd, $c->abuse, $c->zipped, $c->short);
    } else {
        $c->app->dbi->db->query('INSERT INTO files (short, deleted, mediatype, filename, filesize, counter, delete_at_first_view, delete_at_day, created_at, created_by, last_access_at, mod_token, nbslices, complete, passwd, abuse, zipped) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', $c->short, $c->deleted, $c->mediatype, $c->filename, $c->filesize, $c->counter, $c->delete_at_first_view, $c->delete_at_day, $c->created_at, $c->created_by, $c->last_access_at, $c->mod_token, $c->nbslices, $c->complete, $c->passwd, $c->abuse, $c->zipped);
        $c->record(1);
    }

    return $c;
}

=head2 count_empty

=over 1

=item B<Usage>     : C<$c-E<gt>count_empty>

=item B<Arguments> : none

=item B<Purpose>   : count how many records have a null created_at column

=item B<Returns>   : integer

=back

=cut

sub count_empty {
    my $c = shift;

    return $c->app->dbi->db->query('SELECT count(short) AS count FROM files WHERE created_at IS NULL')->hashes->first->{count};
}

=head2 already_exists

=over 1

=item B<Usage>     : C<$c-E<gt>already_exists($short)>

=item B<Arguments> : a string

=item B<Purpose>   : check if the given string is already used as short attribute for a file

=item B<Returns>   : 1 or 0

=back

=cut

sub already_exists {
    my $c     = shift;
    my $short = shift;

    return $c->app->dbi->db->query('SELECT count(short) AS count FROM files WHERE short = ?', $short)->hashes->first->{count};
}

=head2 get_empty

=over 1

=item B<Usage>     : C<$c-E<gt>get_empty>

=item B<Arguments> : none

=item B<Purpose>   : select an empty ready-to-use record from the database

=item B<Returns>   : a db accessor object

=back

=cut

sub get_empty {
    my $c     = shift;

    my $r = $c->app->dbi->db->query('SELECT * FROM files WHERE created_at IS NULL')->hashes->shuffle->first;

    return $c->_slurp($r)->created_at(time)->write;
}

=head2 get_stats

=over 1

=item B<Usage>     : C<$c-E<gt>get_stats>

=item B<Arguments> : none

=item B<Purpose>   : get stats about how many empty files, deleted files and non-deleted files there is in the database

=item B<Returns>   : a hash table reference containing three keys: files, deleted and empty

=back

=cut

sub get_stats {
    my $c = shift;

    my $files     = $c->app->dbi->db->query('SELECT count(short) AS count FROM files WHERE created_at IS NOT null AND deleted = ?', 0)->hashes->first->{count};
    my $deleted   = $c->app->dbi->db->query('SELECT count(short) AS count FROM files WHERE created_at IS NOT null AND deleted = ?', 1)->hashes->first->{count};
    my $empty     = $c->app->dbi->db->query('SELECT count(short) AS count FROM files WHERE created_at IS null')->hashes->first->{count};
    my $downloads = $c->app->dbi->db->query('SELECT SUM(counter) AS sum FROM files')->hashes->first->{sum};

    return { files => $files, deleted => $deleted, empty => $empty, downloads => $downloads };
}

=head2 from_short

=over 1

=item B<Usage>     : C<$c-E<gt>from_short($short)>

=item B<Arguments> : string

=item B<Purpose>   : find a file in the database from its short attribute

=item B<Returns>   : a db accessor object

=back

=cut

sub from_short {
    my $c     = shift;
    my $short = shift;

    my $r = $c->app->dbi->db->query('SELECT * FROM files WHERE short = ?', $short)->hashes;

    if ($r->size) {
        return $c->_slurp($r->first)->record(1);
    } else {
        return undef;
    }
}

=head2 get_oldest_undeleted_files

=over 1

=item B<Usage>     : C<$c-E<gt>get_oldest_undeleted_files($num)>

=item B<Arguments> : integer

=item B<Purpose>   : get the X oldest non-deleted files

=item B<Returns>   : a Mojo::Collection of Lufi::DB::File objects

=back

=cut

sub get_oldest_undeleted_files {
    my $c   = shift;
    my $num = shift;

    my @files;
    my $records = $c->app->dbi->db->query('SELECT * FROM files WHERE deleted = ? ORDER BY created_at ASC LIMIT ?', 0, $num)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::File->new(app => $c->app);

            push @files, $i->_slurp($e);
        }
    );

    return c(@files);
}

=head2 get_expired

=over 1

=item B<Usage>     : C<$c-E<gt>get_expired($time)>

=item B<Arguments> : unix timestamp

=item B<Purpose>   : get the non-deleted files that are expired at the given timestamp minus 2 days

=item B<Returns>   : a Mojo::Collection of Lufi::DB::File objects

=back

=cut

sub get_expired {
    my $c    = shift;
    my $time = shift;

    my @files;
    ## Select only files expired since two days, to be sure that nobody is still downloading it
    my $records = $c->app->dbi->db->query('SELECT * FROM files WHERE deleted = ? AND ((delete_at_day + 2) * 86400) < (? - created_at) AND delete_at_day != 0', 0, $time)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::File->new(app => $c->app);

            push @files, $i->_slurp($e);
        }
    );

    return c(@files);
}

=head2 get_no_longer_viewed

=over 1

=item B<Usage>     : C<$c-E<gt>get_no_longer_viewed($time)>

=item B<Arguments> : unix timestamp

=item B<Purpose>   : get the files that have not been viewed after the given timestamp

=item B<Returns>   : a Mojo::Collection of Lufi::DB::File objects

=back

=cut

sub get_no_longer_viewed {
    my $c    = shift;
    my $time = shift;

    my @files;
    my $records = $c->app->dbi->db->query('SELECT * FROM files WHERE deleted = ? AND last_access_at < ?', 0, $time)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::File->new(app => $c->app);

            push @files, $i->_slurp($e);
        }
    );

    return c(@files);
}

=head2 delete_creator_before

=over 1

=item B<Usage>     : C<$c-E<gt>delete_creator_before($time)>

=item B<Arguments> : unix timestamp

=item B<Purpose>   : empty the created_by column for files created before the given timestamp

=item B<Returns>   : nothing

=back

=cut

sub delete_creator_before {
    my $c          = shift;
    my $separation = shift;

    $c->app->dbi->db->query('UPDATE files SET created_by = NULL WHERE created_by IS NOT NULL AND created_at < ?', $separation);
}

=head2 delete_all

=over 1

=item B<Usage>     : C<$c-E<gt>delete_all()>

=item B<Arguments> : none

=item B<Purpose>   : delete all file records from database unconditionnally

=item B<Returns>   : nothing

=back

=cut

sub delete_all {
    my $c = shift;

    $c->app->dbi->db->delete('files');
}

=head2 _slurp

=over 1

=item B<Usage>     : C<$c-E<gt>_slurp>

=item B<Arguments> : none

=item B<Purpose>   : put a database record's columns into the Lufi::DB::File object's attributes

=item B<Returns>   : the Lufi::DB::File object

=back

=cut

sub _slurp {
    my $c = shift;
    my $r = shift;

    my $file;
    if (defined $r) {
        $file = $r;
    } else {
        my $files = $c->app->dbi->db->query('SELECT * FROM files WHERE short = ?', $c->short)->hashes;

        if ($files->size) {
            $file = $files->first;
        }
    }

    if ($file) {
        $c->short($file->{short});
        $c->deleted($file->{deleted});
        $c->mediatype($file->{mediatype});
        $c->filename($file->{filename});
        $c->filesize($file->{filesize});
        $c->counter($file->{counter});
        $c->delete_at_first_view($file->{delete_at_first_view});
        $c->delete_at_day($file->{delete_at_day});
        $c->created_at($file->{created_at});
        $c->created_by($file->{created_by});
        $c->last_access_at($file->{last_access_at});
        $c->mod_token($file->{mod_token});
        $c->nbslices($file->{nbslices});
        $c->complete($file->{complete});
        $c->passwd($file->{passwd});
        $c->abuse($file->{abuse});
        $c->zipped($file->{zipped});

        $c->record(1) unless $c->record;
    }

    $c->slices(Lufi::DB::Slice->new(app => $c->app)->get_slices_of_file($c->short));

    return $c;
}

1;
