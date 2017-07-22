# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Misc;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::File;
use Lufi::DB::File;

sub fullstats {
    my $c = shift;

    my $stats = Lufi::DB::File->new(app => $c->app)->get_stats;

    return $c->render(
        json => {
            files     => $stats->{files},
            deleted   => $stats->{deleted},
            empty     => $stats->{empty},
            timestamp => time,
        }
    );
}

1;
