# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::Slice::Pg;
use Mojo::Base 'Lufi::DB::Slice';

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    return $c;
}

1;
