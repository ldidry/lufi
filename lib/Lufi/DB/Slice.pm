# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::Slice;
use Mojo::Base -base;

has 'short';
has 'j';
has 'path';
has 'app';

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

=item B<path>  : string

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
        #} elsif ($dbtype eq 'postgresql') {
        #    use Lufi::DB::Slice::Pg;
        #    $c = Lufi::DB::Slice::Pg->new(@_);
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

=head2 get_slices_of_file

=over 1

=item B<Usage>     : C<$c-E<gt>get_slices_of_file($short)>

=item B<Arguments> : string

=item B<Purpose>   : get all Lufi::DB::Slice objects related to a file

=item B<Returns>   : a Mojo::Collection of Lufi::DB::Slice objects

=back

=cut

1;
