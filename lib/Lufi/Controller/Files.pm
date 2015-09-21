package Lufi::Controller::Files;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::JSON qw(encode_json decode_json true false);
use Mojo::Util qw(slurp spurt encode);
use LufiDB;
use Lufi::File;
use Lufi::Slice;
use File::Spec::Functions;

sub upload {
    my $c = shift;

    $c->inactivity_timeout(300000);
    $c->debug('Client connected');
    $c->on(
        message => sub {
            my ($ws, $text) = @_;

            my ($json) = split('XXMOJOXX', $text, 2);
            $json = encode 'UTF-8', $json;
            $json = decode_json $json;

            $c->debug('Got message');

            my $f;
            if (defined($json->{id})) {
                my @records = LufiDB::Files->select('WHERE short = ?', $json->{id});
                $f          = Lufi::File->new(record => $records[0]);
            } else {
                $f = Lufi::File->new(
                    record               => $c->get_empty,
                    created_by           => $c->ip,
                    delete_at_first_view => ($json->{del_at_first_view}) ? 1 : 0,
                    delete_at_day        => $json->{delay},
                    mediatype            => $json->{type},
                    filename             => $json->{name},
                    filesize             => $json->{size},
                    nbslices             => $json->{total},
                    mod_token            => $c->shortener($c->config('token_length'))
                );
                $f->write;
            }
            # Create directory
            my $dir = catdir('files', $f->short);
            mkdir($dir, 0700) unless (-d $dir);

            # Create slice file
            my $file = catfile($dir, $json->{part}.'.part');
            my $s    = Lufi::Slice->new(
                short => $f->short,
                j     => $json->{part},
                path  => $file
            );
            spurt $text, $file;
            push @{$f->slices}, $s;

            if (($json->{part} + 1) == $json->{total}) {
                $f->complete(1);
                $c->provisioning;
            }

            $f->write;

            $ws->send(sprintf('{"success": true, "i": %d, "j": %d, "parts": %d, "short": "%s", "name": "%s", "size": %d, "del_at_first_view": %s, "created_at": %d, "delay": %d, "token": "%s"}', $json->{i}, $json->{part}, $json->{total}, $f->short, $f->filename, $f->filesize, (($f->delete_at_first_view) ? 'true' : 'false'), $f->created_at, $f->delete_at_day, $f->mod_token));
        }
    );
    $c->on(
        finish => sub {
            $c->debug('Client disconnected');
        }
    );
}

sub download {
    my $c     = shift;
    my $short = $c->param('short');

    $c->inactivity_timeout(300000);
    $c->debug('Client connected');

    my @records = LufiDB::Files->select('WHERE short = ?', $short);
    my $f       = Lufi::File->new(record => $records[0]);

    $c->on(
        message => sub {
            my ($ws, $json) = @_;
            $json = decode_json $json;
            if (defined($json->{part})) {
                # Make $num an integer instead of a string
                my $num = $json->{part} + 0;

                my $e    = $f->slices->[$num];
                my $text = slurp $e->path;
                $c->send($text);
            } elsif (defined($json->{ended}) && $json->{ended}) {
                $f->counter($f->counter + 1);
                $f->last_access_at(time);

                if ($f->delete_at_first_view) {
                    $f->delete;
                } else {
                    $f->write;
                }
            }
        }
    );
    $c->on(
        finish => sub {
            $c->debug('Client disconnected');
        }
    );
}

sub r {
    my $c     = shift;
    my $short = $c->param('short');

    my @records = LufiDB::Files->select('WHERE short = ?', $short);
    if (scalar @records) {
        my $f   = Lufi::File->new(record => $records[0]);
        my $msg = $c->l('The file has been deleted and is no more available.') if $f->deleted;
        return $c->render(
            template => 'render',
            f        => $f,
            msg      => $msg
        );
    } else {
        return $c->render(
            template => 'render',
            f        => undef,
            msg      => $c->l('Could not find the file. Are you sure of the URL?')
        );
    }
}

sub get_counter {
    my $c     = shift;
    my $short = $c->param('short');
    my $token = $c->param('token');

    my @records = LufiDB::Files->select('WHERE short = ? AND mod_token = ?', ($short, $token));
    if (scalar(@records)) {
        return $c->render(
            json => {
                success => true,
                counter => $records[0]->counter
            }
        );
    }
    return $c->render(
        json => {
            success => false,
            msg     => $c->l('Unable to get counter')
        }
    );
}

sub delete {
    my $c     = shift;
    my $short = $c->param('short');
    my $token = $c->param('token');

    my @records = LufiDB::Files->select('WHERE short = ? AND mod_token = ?', ($short, $token));
    if (scalar(@records)) {
        my $f   = Lufi::File->new(record => $records[0]);
        my $msg;
        if ($f->deleted) {
            $msg = $c->l('The file has already been deleted');
        } else {
            $f->delete;
            $msg = $c->l('File deleted');
        }
        return $c->respond_to(
            json => {
                success => true,
                msg     => $msg
            },
            any => sub {
                $c->render(
                    template => 'msg',
                    f        => $f,
                    msg      => $msg
                );
            }
        );
    } else {
        my $msg = $c->l('Could not find the file. Are you sure of the URL and the token?');
        return $c->respond_to(
            json => {
                success => false,
                msg     => $msg
            },
            any => sub {
                $c->render(
                    template => 'msg',
                    f        => undef,
                    msg      => $msg
                );
            }
        );
    }
}

1;
