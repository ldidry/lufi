# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Misc;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::File;
use Mojo::JSON qw(true false);
use Mojo::URL;
use Lufi::DB::File;

sub index {
    my $c = shift;
    if ((!defined($c->config('ldap')) && !defined($c->config('htpasswd')) && !defined($c->config('auth_headers'))) || $c->is_user_authenticated) {
        $c->render(template => 'index');
    } else {
        $c->redirect_to('login');
    }
}

sub change_lang {
    my $c = shift;
    my $l = $c->param('l');

    if ($c->iso639_native_name($l)) {
        $c->cookie($c->app->moniker.'_lang' => $l, { path => $c->config('prefix') });
    }

    if ($c->req->headers->referrer
        && Mojo::URL->new($c->req->headers->referrer)->host eq $c->req->url->to_abs->host) {
        return $c->redirect_to($c->req->headers->referrer);
    } else {
        return $c->redirect_to('/');
    }
}

sub about {
    my $c = shift;

    $c->render(
        template => 'about',
        version  => $c->git_version
    );
}

sub config_infos {
    my $c = shift;

    $c->render(
        json => {
            report                   => $c->config('report'),
            instance_name            => $c->config('instance_name'),
            max_file_size            => $c->config('max_file_size'),
            broadcast_message        => $c->config('broadcast_message'),
            default_delay            => $c->config('default_delay'),
            max_delay                => $c->config('max_delay'),
            delay_for_size           => $c->config('delay_for_size'),
            allow_pwd_on_files       => $c->config('allow_pwd_on_files'),
            force_burn_after_reading => $c->config('force_burn_after_reading'),
            keep_ip_during           => $c->config('keep_ip_during'),
            stop_upload              => (-f 'stop-upload' || -f 'stop-upload.manual') ? true : false,
            need_authentication      => (defined($c->config('ldap')) || defined($c->config('htpasswd')) || defined($c->config('auth_headers'))) ? true : false,
            version                  => $c->git_version
        }
    );
}

sub js_files {
    my $c = shift;

    $c->stash($c->req->params->to_hash);
    $c->render(
        template => 'partial/'.$c->param('file'),
        format   => 'js',
        layout   => undef,
    );
}

sub fullstats {
    my $c = shift;

    my $stats = Lufi::DB::File->new(app => $c->app)->get_stats;
    $stats->{timestamp} = time;

    return $c->render(
        json => $stats
    );
}

sub delays {
    shift->render(template => 'delays');
}

1;
