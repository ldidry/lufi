# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DB::File::SQLite;
use Mojo::Base 'Lufi::DB::File';
use Mojo::File;
use Mojo::Collection 'c';
use Lufi::DB::SQLite;
use Lufi::DB::Slice;

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
            short                => $c->short,
            deleted              => $c->deleted,
            mediatype            => $c->mediatype,
            filename             => $c->filename,
            filesize             => $c->filesize,
            counter              => $c->counter,
            delete_at_first_view => $c->delete_at_first_view,
            delete_at_day        => $c->delete_at_day,
            created_at           => $c->created_at,
            created_by           => $c->created_by,
            last_access_at       => $c->last_access_at,
            mod_token            => $c->mod_token,
            nbslices             => $c->nbslices,
            complete             => $c->complete,
            passwd               => $c->passwd,
        );
    } else {
        my $record = Lufi::DB::SQLite::Files->create(
            short                => $c->short,
            deleted              => $c->deleted,
            mediatype            => $c->mediatype,
            filename             => $c->filename,
            filesize             => $c->filesize,
            counter              => $c->counter,
            delete_at_first_view => $c->delete_at_first_view,
            delete_at_day        => $c->delete_at_day,
            created_at           => $c->created_at,
            created_by           => $c->created_by,
            last_access_at       => $c->last_access_at,
            mod_token            => $c->mod_token,
            nbslices             => $c->nbslices,
            complete             => $c->complete,
            passwd               => $c->passwd,
        );
        $c->record($record);
    }

    return $c;
}

sub count_empty {
    my $c = shift;

    return Lufi::DB::SQLite::Files->count('WHERE created_at IS NULL');
}

sub already_exists {
    my $c     = shift;
    my $short = shift;

    return Lufi::DB::SQLite::Files->count('WHERE short = ?', $short);
}

sub get_empty {
    my $c     = shift;

    my @records = Lufi::DB::SQLite::Files->select('WHERE created_at IS NULL LIMIT 1');
    $c->record($records[0]);
    $c->record->update(created_at => time);
    $c->write;
    $c->_slurp;

    return $c;
}

sub get_stats {
    my $c = shift;

    my $files   = Lufi::DB::SQLite::Files->count('WHERE created_at IS NOT null AND deleted = 0');
    my $deleted = Lufi::DB::SQLite::Files->count('WHERE created_at IS NOT null AND deleted = 1');
    my $empty   = Lufi::DB::SQLite::Files->count('WHERE created_at IS null');

    return {files => $files, deleted => $deleted, empty => $empty};
}

sub from_short {
    my $c     = shift;
    my $short = shift;

    my @records = Lufi::DB::SQLite::Files->select('WHERE short = ?', $short);

    if (scalar @records) {
        $c->record($records[0]);
        $c->_slurp;

        return $c;
    } else {
        return undef;
    }
}

sub get_oldest_undeleted_files {
    my $c   = shift;
    my $num = shift;

    my @files = Lufi::DB::SQLite::Files->select('WHERE deleted = 0 ORDER BY created_at ASC LIMIT ?', $num);

    return c(map { Lufi::DB::File->new(app => $c->app, record => $_) } @files);
}

sub get_expired {
    my $c    = shift;
    my $time = shift;

    ## Select only files expired since two days, to be sure that nobody is still downloading it
    my @files = LufiDB::Files->select('WHERE deleted = 0 AND ((delete_at_day + 2) * 86400) < (? - created_at) AND delete_at_day != 0', $time);

    return c(map { Lufi::DB::File->new(app => $c->app, record => $_) } @files);
}

sub get_no_longer_viewed {
    my $c    = shift;
    my $time = shift;

    my @files = LufiDB::Files->select('WHERE deleted = 0 AND last_access_at < ?', $time);

    return c(map { Lufi::DB::File->new(app => $c->app, record => $_) } @files);
}

sub delete_creator_before {
    my $c          = shift;
    my $separation = shift;

    Lufi::DB::SQLite->do(
        'UPDATE files SET created_by = NULL WHERE created_by IS NOT NULL AND created_at < ?',
        {},
        $separation
    );
}

sub _slurp {
    my $c = shift;

    my @files;
    if ($c->record) {
        @files = ($c->record);
    } elsif ($c->short) {
        @files = Lufi::DB::SQLite::Files->select('WHERE short = ?', $c->short);
    }

    if (scalar @files) {
        my $file = $files[0];

        $c->short($file->short);
        $c->deleted($file->deleted)                           if defined $file->deleted;
        $c->mediatype($file->mediatype)                       if defined $file->mediatype;
        $c->filename($file->filename)                         if defined $file->filename;
        $c->filesize($file->filesize)                         if defined $file->filesize;
        $c->counter($file->counter)                           if defined $file->counter;
        $c->delete_at_first_view($file->delete_at_first_view) if defined $file->delete_at_first_view;
        $c->delete_at_day($file->delete_at_day)               if defined $file->delete_at_day;
        $c->created_at($file->created_at)                     if defined $file->created_at;
        $c->created_by($file->created_by)                     if defined $file->created_by;
        $c->last_access_at($file->last_access_at)             if defined $file->last_access_at;
        $c->mod_token($file->mod_token)                       if defined $file->mod_token;
        $c->nbslices($file->nbslices)                         if defined $file->nbslices;
        $c->complete($file->complete)                         if defined $file->complete;
        $c->passwd($file->passwd)                             if defined $file->passwd;

        $c->record($file) unless $c->record;
    }

    $c->slices(Lufi::DB::Slice->new(app => $c->app)->get_slices_of_file($c->short));

    return $c;
}

1;
