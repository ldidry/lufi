# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Misc;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::File;
use LufiDB;
use Lufi::File;
use Lufi::Slice;

sub fullstats {
    my $c = shift;

    my $files   = LufiDB::Files->count('WHERE created_at IS NOT null AND deleted = 0');
    my $deleted = LufiDB::Files->count('WHERE created_at IS NOT null AND deleted = 1');
    my $empty   = LufiDB::Files->count('WHERE created_at IS null');

    return $c->render(
        json => {
            files     => $files,
            deleted   => $deleted,
            empty     => $empty,
            timestamp => time,
        }
    );
}

1;
