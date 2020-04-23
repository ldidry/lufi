# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::BreakingChange;
use Mojo::Base -base;
use Mojo::File;
use Mojo::Collection 'c';

has 'change';
has 'ack' => 0;
has 'record' => 0;
has 'app';

=head1 NAME

Lufi::DB::BreakingChange - DB abstraction layer for Lufi breaking changes

=head1 Contributing

When creating a new database accessor, make sure that it provides the following subroutines.
After that, modify this file and modify the C<new> subroutine to allow to use your accessor.

Have a look at Lufi::DB::BreakingChange::SQLite's code: it's simple and may be more understandable that this doc.

=head1 Attributes

=over 1

=item B<change> : string, name of the change

=item B<ack>    : boolean, if the admin has acknowledged the change

=item B<app>    : a Mojolicious object

=back

=head1 Sub routines

=head2 new

=over 1

=item B<Usage>     : C<$c = Lufi::DB::BreakingChange-E<gt>new(app =E<gt> $self);>

=item B<Arguments> : any of the attribute above

=item B<Purpose>   : construct a new db accessor object. If the C<change> attribute is provided, it have to load the informations from the database.

=item B<Returns>   : the db accessor object

=item B<Info>      : the app argument is used by Lufi::DB::BreakingChange to choose which db accessor will be used, you don't need to use it in new(), but you can use it to access helpers or configuration settings in the other subroutines

=back

=cut

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    if (ref($c) eq 'Lufi::DB::BreakingChange') {
        my $dbtype = $c->app->config('dbtype');
        if ($dbtype eq 'sqlite') {
            use Lufi::DB::BreakingChange::SQLite;
            $c = Lufi::DB::BreakingChange::SQLite->new(@_);
        } elsif ($dbtype eq 'postgresql') {
            use Lufi::DB::BreakingChange::Pg;
            $c = Lufi::DB::BreakingChange::Pg->new(@_);
        } elsif ($dbtype eq 'mysql') {
            use Lufi::DB::BreakingChange::Mysql;
            $c = Lufi::DB::BreakingChange::Mysql->new(@_);
        }
    }

    return $c;
}

sub to_hash {
    my $c = shift;

    return {
        change => $c->change,
        ack    => $c->ack,
    };
}

=head2 ack

=over 1

=item B<Usage>     : C<$c-E<gt>acknowledge>

=item B<Arguments> : none

=item B<Purpose>   : set the C<ack> flag to true

=item B<Returns>   : the db accessor object

=back

=cut

sub acknowledge {
    my $c = shift;

    $c->ack(1);

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
        $c->app->dbi->db->update('breakingchanges', $c->to_hash, { change => $c->change });
    } else {
        $c->app->dbi->db->insert('breakingchanges', $c->to_hash);
        $c->record(1);
    }

    return $c;
}

=head2 from_change

=over 1

=item B<Usage>     : C<$c-E<gt>from_change($change)>

=item B<Arguments> : string

=item B<Purpose>   : find an invitation in the database from its C<change> attribute

=item B<Returns>   : a db accessor object

=back

=cut

sub from_change {
    my $c     = shift;
    my $change = shift;

    my $r = $c->app->dbi->db->select('breakingchanges', undef, { change => $change })->hashes;

    if ($r->size) {
        return $c->_slurp($r->first);
    } else {
        return undef;
    }
}

=head2 _slurp

=over 1

=item B<Usage>     : C<$c-E<gt>_slurp>

=item B<Arguments> : none

=item B<Purpose>   : put a database record's columns into the Lufi::DB::BreakingChange object's attributes

=item B<Returns>   : the Lufi::DB::BreakingChange object

=back

=cut

sub _slurp {
    my $c = shift;
    my $r = shift;

    my $change;
    if (defined $r) {
        $change = $r;
    } else {
        my $changes = $c->app->dbi->db->select('breakingchanges', undef, { change => $c->change })->hashes;

        if ($changes->size) {
            $change = $changes->first;
        }
    }

    if ($change) {
        $c->change($change->{change});
        $c->ack(   $change->{ack}   );

        $c->record(1) unless $c->record;
    }

    return $c;
}

1;
