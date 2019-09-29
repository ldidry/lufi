# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Invitation;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::Collection 'c';
use Mojo::File;
use Mojo::JSON qw(true false decode_json encode_json);
use Mojo::URL;
use Email::Valid;
use Lufi::DB::File;
use Lufi::DB::Invitation;
use Date::Format;

sub new_invite {
    my $c = shift;

    # The `if (defined($c->config('ldap')))` is at the router level in lib/Lufi.pm
    if ($c->is_user_authenticated) {
        my $mail_attr            = $c->config('invitations')->{'mail_attr'} // 'mail';
        my $max_expire_at        = $c->config('invitations')->{'max_invitation_expiration_delay'} // 30;
        my $send_with_user_email = defined $c->config('invitations')->{'send_invitation_with_ldap_user_mail'};
        $c->render(
            template             => 'invitations/invite',
            max_expire_at        => $max_expire_at,
            send_with_user_email => $send_with_user_email,
            user_mail            => ($send_with_user_email) ? $c->current_user->{$mail_attr} : '',
            fails                => [],
            success              => []
        );
    } else {
        $c->redirect_to($c->url_for('login')->query(redirect => 'invite'));
    }
}

sub send_invite {
    my $c          = shift;
    my $guest_mail = $c->param('guest_mail');
    my $expire_at  = $c->param('expire_at');

    my $mail_attr            = $c->config('invitations')->{'mail_attr'} // 'mail';
    my $max_expire_at        = $c->config('invitations')->{'max_invitation_expiration_delay'} // 30;
    my $send_with_user_email = defined $c->config('invitations')->{'send_invitation_with_ldap_user_mail'};

    # The `if (defined($c->config('ldap')))` is at the router level in lib/Lufi.pm
    if ($c->is_user_authenticated) {
        my @fails   = ();
        my @success = ();
        unless (Email::Valid->address($guest_mail)) {
            push @fails, $c->l('The guest email address (%1) is unvalid.', $guest_mail);
        }
        unless ($expire_at >= 1 && $expire_at <= $max_expire_at) {
            push @fails, $c->l('The expiration delay (%1) is not between 1 and %2 days.', $expire_at, $max_expire_at);
        }

        unless (scalar(@fails)) {
            my $invitation       = Lufi::DB::Invitation->new(app => $c->app);
            my $mail_attr        = $c->config('invitations')->{'mail_attr'} // 'mail';
            my $expend_expire_at = $c->config('invitations')->{'max_additional_period'} // 10;

            my $token;
            do {
                $token = $c->create_invitation_token;
            } while ($invitation->is_token_used($token));

            $invitation = $invitation->from_token($token);
            $invitation->ldap_user($c->current_user->{username});
            $invitation->ldap_user_mail($c->current_user->{$mail_attr});
            $invitation->created_at(time);
            $invitation->guest_mail($guest_mail);
            $invitation->expire_at($invitation->created_at + 86400 * $expire_at);
            $invitation->expend_expire_at($expend_expire_at);
            $invitation->show_in_list(1);
            $invitation = $invitation->write;

            my $from = ($c->config('invitations')->{'send_invitation_with_ldap_user_mail'}) ? $invitation->ldap_user_mail : $c->config('mail_sender');
            my $url  = $c->url_for('guest', token => $invitation->token)->to_abs;
            $c->mail(
                from       => $from,
                to         => $invitation->guest_mail,
                template   => 'invitations/invite',
                format     => 'mail',
                ldap_user  => ucfirst($invitation->ldap_user),
                url        => $url,
                invitation => $invitation,
                expires    => $c->get_date_lang()->time2str($c->l('%A %d %B %Y at %T'), $invitation->expire_at)
            );

            push @success, $c->l('Invitation sent to %1.<br> URL: %2', $invitation->guest_mail, $url);
        }

        $c->render(
            template             => 'invitations/invite',
            max_expire_at        => $max_expire_at,
            send_with_user_email => $send_with_user_email,
            user_mail            => ($send_with_user_email) ? $c->current_user->{$mail_attr} : '',
            fails                => \@fails,
            success              => \@success
        );
    } else {
        $c->redirect_to('login');
    }
}

sub my_invitations {
    my $c = shift;

    # The `if (defined($c->config('ldap')))` is at the router level in lib/Lufi.pm
    if ($c->is_user_authenticated) {
        my $invitations = Lufi::DB::Invitation->new(app => $c->app)
                                              ->from_user($c->current_user->{username});
        $invitations = c() unless $invitations;
        $c->render(
            template    => 'invitations/my_invitations',
            invitations => $invitations
        );
    } else {
        $c->redirect_to($c->url_for('login')->query(redirect => 'my_invitations'));
    }
}

sub delete_invitations {
    my $c = shift;
    my @tokens = @{$c->every_param('tokens[]')};

    my @result = ();
    for my $token (@tokens) {
        my $i = Lufi::DB::Invitation->new(app => $c->app)
                                    ->from_token($token)
                                    ->deleted(1)
                                    ->write;
        push @result, { msg => $c->l('The invitation %1 has been deleted.', $i->token), token => $i->token, deleted => $i->deleted };
    }

    $c->render(json => {
        success => true,
        tokens  => \@result
    });
}

sub resend_invitations {
    my $c = shift;
    my @tokens = @{$c->every_param('tokens[]')};

    my @success;
    my @failures;
    for my $token (@tokens) {
        my $i = Lufi::DB::Invitation->new(app => $c->app)
                                    ->from_token($token);

        if ($i->files_sent_at) {
            push @failures, $c->l('The invitation %1 can’t be resent: %2 has already sent files.<br>Please create a new invitation.', $i->token, $i->guest_mail);
        } else {
            if ($c->config('invitations')->{'extend_invitation_expiration_on_resend'}) {
                $i->expire_at(time + $i->expire_at - $i->created_at)
                  ->write;
            }

            my $from   = ($c->config('invitations')->{'send_invitation_with_ldap_user_mail'}) ? $i->ldap_user_mail : $c->config('mail_sender');
            my $url    = $c->url_for('guest', token => $i->token)->to_abs;
            my $expire = $c->get_date_lang()->time2str($c->l('%A %d %B %Y at %T'), $i->expire_at);
            $c->mail(
                from       => $from,
                to         => $i->guest_mail,
                template   => 'invitations/invite',
                format     => 'mail',
                ldap_user  => ucfirst($i->ldap_user),
                url        => $url,
                invitation => $i,
                expires    => $expire
            );

            push @success, { msg => $c->l('Invitation resent to %1.<br> URL: %2', $i->guest_mail, $url), expires => $expire, token => $i->token };
        }
    }

    $c->render(json => {
        success  => \@success,
        failures => \@failures
    });
}

sub toggle_invitations_visibility {
    my $c = shift;
    my @tokens = @{$c->every_param('tokens[]')};

    my @result = ();
    for my $token (@tokens) {
        my $i = Lufi::DB::Invitation->new(app => $c->app)
                                    ->from_token($token)
                                    ->toggle_visibility;
        push @result, { token => $i->token, show => ($i->show_in_list) ? true : false }
    }

    $c->render(json => {
        success => true,
        tokens  => \@result
    });
}

sub guest {
    my $c = shift;
    my $token = $c->param('token');

    my $invitation = Lufi::DB::Invitation->new(app => $c->app)->from_token($token);
    if ($invitation) {
        if ($invitation->is_valid) {
            $c->session->{guest_token} = $token;
            $c->session(expires => $invitation->expire_at);
            return $c->render(
                template   => 'index',
                invitation => $invitation
            );
        } else {
            $c->stash('expired_or_deleted_invitation' => 1);
        }
    } else {
        $c->stash('invitation_not_found' => 1);
    }
    return $c->render(template => 'invitations/exception');
}

sub send_mail_to_ldap_user {
    my $c = shift;
    my $token = $c->param('token');
    my $urls  = c(@{$c->every_param('urls[]')});

    my $invitation = Lufi::DB::Invitation->new(app => $c->app)->from_token($token);
    if ($invitation) {
        my @files = ();
        if ($c->config('invitations')->{'save_files_url_in_db'} && $urls->size) {
            my $guest_files = $invitation->files;
            my %list_token;
            if ($guest_files) {
                $guest_files = decode_json($guest_files);
                for my $file (@{$guest_files}) {
                    $list_token{$file->{token}} = 1;
                }
            } else {
                $guest_files = [];
            }
            push @files, @{$guest_files};
            $urls->each(sub {
                my ($e, $num) = @_;
                $e = decode_json($e);
                if (!defined($list_token{$e->{token}})) {
                    push @{$guest_files}, $e;
                    push @files, $e;
                }
            });
            $invitation->files(encode_json($guest_files));
            $invitation->write;
        } else {
            $urls->each(sub {
                push @files, decode_json(shift);
            });
        }
        my $already_notified = 1;
        unless ($invitation->files_sent_at) {
            $invitation->files_sent_at(time);
            $invitation->write;
            $already_notified = 0;
        }
        $c->session(expires => $invitation->files_sent_at + 60 * $invitation->expend_expire_at);
        $c->mail(
            from             => $c->config('mail_sender'),
            to               => $invitation->ldap_user_mail,
            template         => 'invitations/notification_files_sent',
            format           => 'mail',
            files            => c(@files),
            invitation       => $invitation,
            already_notified => $already_notified
        );

        return $c->render(
            json => {
                success => true,
                msg     => $c->l('The URLs of your files have been sent by email to %1.', $invitation->ldap_user_mail)
            }
        );
    } else {
        return $c->render(
            json => {
                success => false,
                msg     => $c->l('Sorry, the invitation doesn’t exist. Are you sure you are on the right URL?')
            }
        );
    }
}

1;
