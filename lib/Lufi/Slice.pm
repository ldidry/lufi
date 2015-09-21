# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Slice;
use Mojo::Base -base;
use LufiDB;

has 'record';
has 'short';
has 'j';
has 'path';

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    $c = $c->_slurp if defined $c->record;

    return $c;
}

sub write {
    my $c = shift;

    if (defined $c->record) {
        $c->record->update(
            short => $c->short,
            j     => $c->j,
            path  => $c->path
        );
    } else {
        my $record = LufiDB::Slices->create(
            short => $c->short,
            j     => $c->j,
            path  => $c->path
        );
        $c->record($record);
    }

    return $c;
}

sub _slurp {
    my $c = shift;

    $c->short($c->record->short) if defined $c->record->short;
    $c->j($c->record->j)         if defined $c->record->j;
    $c->path($c->record->path)   if defined $c->record->path;

    return $c;
}

1;
