# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::File::Pg;
use Mojo::Base 'Lufi::DB::File';
use Mojo::File;
use Mojo::Collection 'c';
use Lufi::DB::Slice;

has 'record' => 0;

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    return $c;
}

sub write {
    my $c = shift;

    if ($c->record) {
        $c->app->pg->db->query('UPDATE files SET short = ?, deleted = ?, mediatype = ?, filename = ?, filesize = ?, counter = ?, delete_at_first_view = ?, delete_at_day = ?, created_at = ?, created_by = ?, last_access_at = ?, mod_token = ?, nbslices = ?, complete = ?, passwd = ? WHERE short = ?', $c->short, $c->deleted, $c->mediatype, $c->filename, $c->filesize, $c->counter, $c->delete_at_first_view, $c->delete_at_day, $c->created_at, $c->created_by, $c->last_access_at, $c->mod_token, $c->nbslices, $c->complete, $c->passwd, $c->short);
    } else {
        $c->app->pg->db->query('INSERT INTO files (short, deleted, mediatype, filename, filesize, counter, delete_at_first_view, delete_at_day, created_at, created_by, last_access_at, mod_token, nbslices, complete, passwd) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', $c->short, $c->deleted, $c->mediatype, $c->filename, $c->filesize, $c->counter, $c->delete_at_first_view, $c->delete_at_day, $c->created_at, $c->created_by, $c->last_access_at, $c->mod_token, $c->nbslices, $c->complete, $c->passwd);
        $c->record(1);
    }

    return $c;
}

sub count_empty {
    my $c = shift;

    return $c->app->pg->db->query('SELECT count(short) FROM files WHERE created_at IS NULL')->hashes->first->{count};
}

sub already_exists {
    my $c     = shift;
    my $short = shift;

    return $c->app->pg->db->query('SELECT count(short) FROM files WHERE short = ?', $short)->hashes->first->{count};
}

sub get_empty {
    my $c     = shift;

    my $r = $c->app->pg->db->query('SELECT * FROM files WHERE created_at IS NULL')->hashes->shuffle->first;

    return $c->_slurp($r)->created_at(time)->write;
}

sub get_stats {
    my $c = shift;

    my $files   = $c->app->pg->db->query('SELECT count(short) FROM files WHERE created_at IS NOT null AND deleted = false')->hashes->first->{count};
    my $deleted = $c->app->pg->db->query('SELECT count(short) FROM files WHERE created_at IS NOT null AND deleted = true')->hashes->first->{count};
    my $empty   = $c->app->pg->db->query('SELECT count(short) FROM files WHERE created_at IS null')->hashes->first->{count};

    return { files => $files, deleted => $deleted, empty => $empty };
}

sub from_short {
    my $c     = shift;
    my $short = shift;

    my $r = $c->app->pg->db->query('SELECT * FROM files WHERE short = ?', $short)->hashes;

    if ($r->size) {
        return $c->_slurp($r->first)->record(1);
    } else {
        return undef;
    }
}

sub get_oldest_undeleted_files {
    my $c   = shift;
    my $num = shift;

    my @files;
    my $records = $c->app->pg->db->query('SELECT * FROM files WHERE deleted = false ORDER BY created_at ASC LIMIT ?', $num)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::File->new(app => $c->app);

            push @files, $i->_slurp($e);
        }
    );

    return c(@files);
}

sub get_expired {
    my $c    = shift;
    my $time = shift;

    my @files;
    ## Select only files expired since two days, to be sure that nobody is still downloading it
    my $records = $c->app->pg->db->query('SELECT * FROM files WHERE deleted = false AND ((delete_at_day + 2) * 86400) < (? - created_at) AND delete_at_day != 0', $time)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::File->new(app => $c->app);

            push @files, $i->_slurp($e);
        }
    );

    return c(@files);
}

sub get_no_longer_viewed {
    my $c    = shift;
    my $time = shift;

    my @files;
    my $records = $c->app->pg->db->query('SELECT * FROM files WHERE deleted = false AND last_access_at < ?', $time)->hashes;
    $records->each(
        sub {
            my ($e, $num) = @_;
            my $i = Lufi::DB::File->new(app => $c->app);

            push @files, $i->_slurp($e);
        }
    );

    return c(@files);
}

sub delete_creator_before {
    my $c          = shift;
    my $separation = shift;

    $c->app->pg->db->query('UPDATE files SET created_by = NULL WHERE created_by IS NOT NULL AND created_at < ?', $separation);
}

sub _slurp {
    my $c = shift;
    my $r = shift;

    my $file;
    if (defined $r) {
        $file = $r;
    } else {
        my $files = $c->app->pg->db->query('SELECT * FROM files WHERE short = ?', $c->short)->hashes;

        if ($files->size) {
            $file = $files->first;
        }
    }

    if ($file) {
        $c->short($file->{short});
        $c->deleted($file->{deleted});
        $c->mediatype($file->{mediatype});
        $c->filename($file->{filename});
        $c->filesize($file->{filesize});
        $c->counter($file->{counter});
        $c->delete_at_first_view($file->{delete_at_first_view});
        $c->delete_at_day($file->{delete_at_day});
        $c->created_at($file->{created_at});
        $c->created_by($file->{created_by});
        $c->last_access_at($file->{last_access_at});
        $c->mod_token($file->{mod_token});
        $c->nbslices($file->{nbslices});
        $c->complete($file->{complete});
        $c->passwd($file->{passwd});

        $c->record(1) unless $c->record;
    }

    $c->slices(Lufi::DB::Slice->new(app => $c->app)->get_slices_of_file($c->short));

    return $c;
}

1;
