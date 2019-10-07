# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Auth;
use Mojo::Base 'Mojolicious::Controller';

sub login_page {
    my $c = shift;
    my $redirect = $c->param('redirect') // '/';

    if ($c->is_user_authenticated) {
        $c->redirect_to('/');
    } else {
        $c->render(
            template => 'login',
            redirect => $redirect
        );
    }
}

sub login {
    my $c = shift;

    my $login    = $c->param('login');
    my $pwd      = $c->param('password');
    my $redirect = $c->param('redirect') // '/';

    if ($c->validation->csrf_protect->has_error('csrf_token')) {
        $c->stash(msg => $c->l('Bad CSRF token.'));
        $c->render(template => 'login');
    } else {
        if($c->authenticate($login, $pwd)) {
            if ($redirect eq 'invite') {
                return $c->redirect_to('invite');
            } elsif ($redirect eq 'my_invitations') {
                return $c->redirect_to('invite_list');
            }
            return $c->redirect_to('/');
        } else {
            $c->stash(msg => $c->l('Please, check your credentials or your right to access this service: unable to authenticate.'));
            $c->render(template => 'login');
        }
    }
}

sub log_out {
    my $c = shift;

    if ($c->is_user_authenticated) {
        if ($c->validation->csrf_protect->has_error('csrf_token')) {
            $c->stash(msg => $c->l('Bad CSRF token.'));
        } else {
            $c->logout;
        }
    }
    $c->render(template => 'logout');
}

1;
