# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::File;
use Mojo::Base -base;
use Mojo::Collection;
use LufiDB;
use Lufi::Slice;

has 'record';
has 'short';
has 'deleted' => 0;
has 'mediatype';
has 'filename';
has 'filesize';
has 'counter' => 0;
has 'delete_at_first_view' => 0;
has 'delete_at_day';
has 'created_at' => sub {
    return time;
};
has 'created_by';
has 'last_access_at';
has 'mod_token';
has 'nbslices';
has 'complete' => 0;
has 'slices' => sub {
    return Mojo::Collection->new();
};

sub new {
    my $c = shift;

    $c = $c->SUPER::new(@_);

    $c = $c->_slurp if defined $c->record;

    return $c;
}

sub write {
    my $c = shift;

    $c->record->update(
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
    );

    return $c;
}

sub delete {
    my $c = shift;

    $c->slices->each(sub {
        my ($e, $num) = @_;
        unlink $e->path;
    });
    $c->deleted(1);

    $c->write;

    return $c;
}

sub _slurp {
    my $c = shift;

    $c->short($c->record->short);
    $c->deleted($c->record->deleted)                           if defined $c->record->deleted;
    $c->mediatype($c->record->mediatype)                       if defined $c->record->mediatype;
    $c->filename($c->record->filename)                         if defined $c->record->filename;
    $c->filesize($c->record->filesize)                         if defined $c->record->filesize;
    $c->counter($c->record->counter)                           if defined $c->record->counter;
    $c->delete_at_first_view($c->record->delete_at_first_view) if defined $c->record->delete_at_first_view;
    $c->delete_at_day($c->record->delete_at_day)               if defined $c->record->delete_at_day;
    $c->created_at($c->record->created_at)                     if defined $c->record->created_at;
    $c->created_by($c->record->created_by)                     if defined $c->record->created_by;
    $c->last_access_at($c->record->last_access_at)             if defined $c->record->last_access_at;
    $c->mod_token($c->record->mod_token)                       if defined $c->record->mod_token;
    $c->nbslices($c->record->nbslices)                         if defined $c->record->nbslices;
    $c->complete($c->record->complete)                         if defined $c->record->complete;

    my @slices = LufiDB::Slices->select('WHERE short = ? ORDER BY j ASC', $c->short);

    $c->slices(Mojo::Collection->new(map { Lufi::Slice->new(record => $_) } @slices));

    return $c;
}

1;
