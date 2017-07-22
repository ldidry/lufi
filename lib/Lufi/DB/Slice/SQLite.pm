# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::Slice::SQLite;
use Mojo::Base 'Lufi::DB::Slice';
use Lufi::DB::SQLite;
use Mojo::Collection 'c';

has 'record';

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
        my $record = Lufi::DB::SQLite::Slices->create(
            short => $c->short,
            j     => $c->j,
            path  => $c->path
        );
        $c->record($record);
    }

    return $c;
}

sub get_slices_of_file {
    my $c     = shift;
    my $short = shift;

    my @slices = Lufi::DB::SQLite::Slices->select('WHERE short = ? ORDER BY j ASC', $short);

    return c(map { Lufi::DB::Slice->new(app => $c->app, record => $_) } @slices);
}

sub _slurp {
    my $c = shift;

    $c->short($c->record->short) if defined $c->record->short;
    $c->j($c->record->j)         if defined $c->record->j;
    $c->path($c->record->path)   if defined $c->record->path;

    return $c;
}

1;
