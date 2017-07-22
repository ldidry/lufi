# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::Slice::Pg;
use Mojo::Base 'Lufi::DB::Slice';
use Mojo::Collection 'c';

has 'record' => 0;

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    return $c;
}

sub write {
    my $c = shift;

    if ($c->record) {
        $c->app->pg->db->query('UPDATE slices SET short = ?, j = ?, path = ? WHERE short = ? AND j = ?', $c->short, $c->j, $c->path, $c->short, $c->j);
    } else {
        $c->app->pg->db->query('INSERT INTO slices (short, j, path) VALUES (?, ?, ?)', $c->short, $c->j, $c->path);
        $c->record(1);
    }

    return $c;
}

sub get_slices_of_file {
    my $c     = shift;
    my $short = shift;

    my @slices;
    my $records = $c->app->pg->db->query('SELECT * FROM slices WHERE short = ? ORDER BY j ASC', $short)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::Slice->new(app => $c->app);

            push @slices, $i->_slurp($e);
        }
    );

    return c(@slices);
}

sub _slurp {
    my $c = shift;
    my $r = shift;

    my $slice;
    if (defined $r) {
        $slice = $r;
    } else {
        my $slices = $c->app->pg->db->query('SELECT * FROM slices WHERE short = ? AND j = ?', $c->short, $c->j)->hashes;

        if ($slices->size) {
            $slice = $slices->first;
        }
    }

    if ($slice) {
        $c->short($slice->{short});
        $c->j($slice->{j});
        $c->path($slice->{path});

        $c->record(1);
    }

    return $c;
}

1;
