# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Misc;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::File;
use Mojo::URL;
use Lufi::DB::File;

sub index {
    my $c = shift;
    if ((!defined($c->config('ldap')) && !defined($c->config('htpasswd'))) || $c->is_user_authenticated) {
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
    shift->render(template => 'about');
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
