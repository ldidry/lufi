# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::Invitation;
use Mojo::Base -base;
use Mojo::File;
use Mojo::Collection 'c';

has 'token';
has 'ldap_user';
has 'ldap_user_mail';
has 'guest_mail';
has 'created_at';
has 'expire_at';
has 'files_sent_at';
has 'expend_expire_at';
has 'files';
has 'show_in_list' => 1;
has 'deleted' => 0;
has 'record' => 0;
has 'app';

=head1 NAME

Lufi::DB::Invitation - DB abstraction layer for Lufi invitations

=head1 Contributing

When creating a new database accessor, make sure that it provides the following subroutines.
After that, modify this file and modify the C<new> subroutine to allow to use your accessor.

Have a look at Lufi::DB::Invitation::SQLite's code: it's simple and may be more understandable that this doc.

=head1 Attributes

=over 1

=item B<token>            : string, invitation token

=item B<ldap_user>        : string, the user who created the invitation

=item B<ldap_user_mail>   : string, the email of the user who created the invitation

=item B<guest_mail>       : string, the email of the guest

=item B<created_at>       : unix timestamp

=item B<expire_at>        : unix timestamp

=item B<files_sent_at>    : unix timestamp

=item B<expend_expire_at> : integer, "error" delay, in minutes

=item B<files>            : string, optional, list of files sent by the guest

=item B<show_in_list>     : boolean, if the ldap user want to see the invitation in his/her invitations list

=item B<deleted>          : boolean

=item B<app>              : a Mojolicious object

=back

=head1 Sub routines

=head2 new

=over 1

=item B<Usage>     : C<$c = Lufi::DB::Invitation-E<gt>new(app =E<gt> $self);>

=item B<Arguments> : any of the attribute above

=item B<Purpose>   : construct a new db accessor object. If the C<short> attribute is provided, it have to load the informations from the database.

=item B<Returns>   : the db accessor object

=item B<Info>      : the app argument is used by Lufi::DB::Invitation to choose which db accessor will be used, you don't need to use it in new(), but you can use it to access helpers or configuration settings in the other subroutines

=back

=cut

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    if (ref($c) eq 'Lufi::DB::Invitation') {
        my $dbtype = $c->app->config('dbtype');
        if ($dbtype eq 'sqlite') {
            use Lufi::DB::Invitation::SQLite;
            $c = Lufi::DB::Invitation::SQLite->new(@_);
        } elsif ($dbtype eq 'postgresql') {
            use Lufi::DB::Invitation::Pg;
            $c = Lufi::DB::Invitation::Pg->new(@_);
        } elsif ($dbtype eq 'mysql') {
            use Lufi::DB::Invitation::Mysql;
            $c = Lufi::DB::Invitation::Mysql->new(@_);
        }
    }

    return $c;
}

sub to_hash {
    my $c = shift;

    return {
        token            => $c->token,
        ldap_user        => $c->ldap_user,
        ldap_user_mail   => $c->ldap_user_mail,
        guest_mail       => $c->guest_mail,
        created_at       => $c->created_at,
        expire_at        => $c->expire_at,
        files_sent_at    => $c->files_sent_at,
        expend_expire_at => $c->expend_expire_at,
        files            => $c->files,
        show_in_list     => $c->show_in_list,
        deleted          => $c->deleted
    };
}

=head2 delete

=over 1

=item B<Usage>     : C<$c-E<gt>delete>

=item B<Arguments> : none

=item B<Purpose>   : set the C<deleted> flag to true

=item B<Returns>   : the db accessor object

=back

=cut

sub delete {
    my $c = shift;

    $c->deleted(1);

    $c->write;

    return $c;
}

=head2 hide

=over 1

=item B<Usage>     : C<$c-E<gt>hide>

=item B<Arguments> : none

=item B<Purpose>   : set the C<show_in_list> flag to false

=item B<Returns>   : the db accessor object

=back

=cut

sub hide {
    my $c = shift;

    $c->show_in_list(0);

    $c->write;

    return $c;
}

=head2 show

=over 1

=item B<Usage>     : C<$c-E<gt>show>

=item B<Arguments> : none

=item B<Purpose>   : set the C<show_in_list> flag to true

=item B<Returns>   : the db accessor object

=back

=cut

sub show {
    my $c = shift;

    $c->show_in_list(1);

    $c->write;

    return $c;
}

=head2 toggle_visibility

=over 1

=item B<Usage>     : C<$c-E<gt>toggle_visibility>

=item B<Arguments> : none

=item B<Purpose>   : toggle the C<show_in_list> flag

=item B<Returns>   : the db accessor object

=back

=cut

sub toggle_visibility {
    my $c = shift;

    if ($c->show_in_list) {
        return $c->hide;
    } else {
        return $c->show;
    }
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
        $c->app->dbi->db->update('invitations', $c->to_hash, { token => $c->token });
    } else {
        $c->app->dbi->db->insert('invitations', $c->to_hash);
        $c->record(1);
    }

    return $c;
}

=head2 from_token

=over 1

=item B<Usage>     : C<$c-E<gt>from_token($token)>

=item B<Arguments> : string

=item B<Purpose>   : find an invitation in the database from its C<token> attribute

=item B<Returns>   : a db accessor object

=back

=cut

sub from_token {
    my $c     = shift;
    my $token = shift;

    my $r = $c->app->dbi->db->select('invitations', undef, { token => $token })->hashes;

    if ($r->size) {
        return $c->_slurp($r->first)->record(1);
    } else {
        return undef;
    }
}

=head2 from_user

=over 1

=item B<Usage>     : C<$c-E<gt>from_user($mail)>

=item B<Arguments> : string

=item B<Purpose>   : find invitations in the database from their C<ldap_user_mail> attribute

=item B<Returns>   : a Mojo::Collection of Lufi::DB::Invitation objects, sorted by creation date

=back

=cut

sub from_user {
    my $c    = shift;
    my $user = shift;

    my $r = $c->app->dbi->db
              ->select('invitations', undef, { ldap_user => $user }, { -desc => 'created_at' })
              ->hashes;

    if ($r->size) {
        my @invitations;
        $r->each(sub {
            my ($e, $num) = @_;
            $e->{app}    = $c->app;
            $e->{record} = 1;
            push @invitations, Lufi::DB::Invitation->new($e);
        });
        return c(@invitations);
    } else {
        return undef;
    }
}

=head2 is_token_used

=over 1

=item B<Usage>     : C<$c-E<gt>is_token_used($token)>

=item B<Arguments> : string

=item B<Purpose>   : tells if a token is already used. If not, insert it in database to reserve it

=item B<Returns>   : a boolean

=back

=cut

sub is_token_used {
    my $c     = shift;
    my $token = shift;

    my $r = $c->app->dbi->db->select('invitations', ['token'], { token => $token })->hashes;

    if ($r->size) {
        return 1;
    } else {
        $c->app->dbi->db->insert('invitations', { token => $token });
        return 0;
    }
}

=head2 is_valid

=over 1

=item B<Usage>     : C<$c-E<gt>is_valid()>

=item B<Arguments> : none

=item B<Purpose>   : tells if an invitation is still valid

=item B<Returns>   : a boolean

=back

=cut

sub is_valid {
    my $c = shift;

    my $time = time;
    #       Active          After creation date        Before expiration date   Before files send date plus extension delay
    return (!$c->deleted && $time >= $c->created_at && $time < $c->expire_at && (!defined($c->files_sent_at) || $time < ($c->files_sent_at + $c->expend_expire_at * 60)));
}

=head2 _slurp

=over 1

=item B<Usage>     : C<$c-E<gt>_slurp>

=item B<Arguments> : none

=item B<Purpose>   : put a database record's columns into the Lufi::DB::Invitation object's attributes

=item B<Returns>   : the Lufi::DB::Invitation object

=back

=cut

sub _slurp {
    my $c = shift;
    my $r = shift;

    my $invitation;
    if (defined $r) {
        $invitation = $r;
    } else {
        my $invitations = $c->app->dbi->db->select('invitations', undef, { token => $c->token })->hashes;

        if ($invitations->size) {
            $invitation = $invitations->first;
        }
    }

    if ($invitation) {
        $c->token(           $invitation->{token}           );
        $c->ldap_user(       $invitation->{ldap_user}       );
        $c->ldap_user_mail(  $invitation->{ldap_user_mail}  );
        $c->guest_mail(      $invitation->{guest_mail}      );
        $c->created_at(      $invitation->{created_at}      );
        $c->expire_at(       $invitation->{expire_at}       );
        $c->files_sent_at(   $invitation->{files_sent_at}   );
        $c->expend_expire_at($invitation->{expend_expire_at});
        $c->files(           $invitation->{files}           );
        $c->show_in_list(    $invitation->{show_in_list}    );
        $c->deleted(         $invitation->{deleted}         );

        $c->record(1) unless $c->record;
    }

    return $c;
}

1;
