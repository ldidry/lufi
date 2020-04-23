# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::BreakingChange::Mysql;
use Mojo::Base 'Lufi::DB::BreakingChange';

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    $c = $c->_slurp if defined $c->change;

    return $c;
}

1;
