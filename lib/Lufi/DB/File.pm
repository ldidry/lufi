# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::File;
use Mojo::Base -base;
use Mojo::Collection;

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
        }
    }

    return $c;
}

=head2 delete

=over 1

=item B<Usage>     : C<$c-E<gt>delet>

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

=head2 count_empty

=over 1

=item B<Usage>     : C<$c-E<gt>count_empty>

=item B<Arguments> : none

=item B<Purpose>   : count how many records have a null created_at column

=item B<Returns>   : integer

=back

=head2 already_exists

=over 1

=item B<Usage>     : C<$c-E<gt>already_exists($short)>

=item B<Arguments> : a string

=item B<Purpose>   : check if the given string is already used as short attribute for a file

=item B<Returns>   : 1 or 0

=back

=head2 get_empty

=over 1

=item B<Usage>     : C<$c-E<gt>get_empty>

=item B<Arguments> : none

=item B<Purpose>   : select an empty ready-to-use record from the database

=item B<Returns>   : a db accessor object

=back

=head2 get_stats

=over 1

=item B<Usage>     : C<$c-E<gt>get_stats>

=item B<Arguments> : none

=item B<Purpose>   : get stats about how many empty files, deleted files and non-deleted files there is in the database

=item B<Returns>   : a hash table reference containing three keys: files, deleted and empty

=back

=head2 from_short

=over 1

=item B<Usage>     : C<$c-E<gt>from_short($short)>

=item B<Arguments> : string

=item B<Purpose>   : find a file in the database from its short attribute

=item B<Returns>   : a db accessor object

=back

=head2 get_oldest_undeleted_files

=over 1

=item B<Usage>     : C<$c-E<gt>get_oldest_undeleted_files($num)>

=item B<Arguments> : integer

=item B<Purpose>   : get the X oldest non-deleted files

=item B<Returns>   : a Mojo::Collection of Lufi::DB::File objects

=back

=head2 get_expired

=over 1

=item B<Usage>     : C<$c-E<gt>get_expired($time)>

=item B<Arguments> : unix timestamp

=item B<Purpose>   : get the non-deleted files that are expired at the given timestamp minus 2 days

=item B<Returns>   : a Mojo::Collection of Lufi::DB::File objects

=back

=head2 get_no_longer_viewed

=over 1

=item B<Usage>     : C<$c-E<gt>get_no_longer_viewed($time)>

=item B<Arguments> : unix timestamp

=item B<Purpose>   : get the files that have not been viewed after the given timestamp

=item B<Returns>   : a Mojo::Collection of Lufi::DB::File objects

=back

=head2 delete_creator_before

=over 1

=item B<Usage>     : C<$c-E<gt>delete_creator_before($time)>

=item B<Arguments> : unix timestamp

=item B<Purpose>   : empty the created_by column for files created before the given timestamp

=item B<Returns>   : nothing

=back

=cut

1;
