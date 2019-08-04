# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::Invitation::Mysql;
use Mojo::Base 'Lufi::DB::Invitation';

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    return $c;
}

1;
