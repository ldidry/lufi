# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Files;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::JSON qw(encode_json decode_json true false);
use Mojo::Util qw(slurp spurt encode);
use LufiDB;
use Lufi::File;
use Lufi::Slice;
use File::Spec::Functions;
use Number::Bytes::Human qw(format_bytes);
use Filesys::DfPortable;

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

            my $stop = 0;

            # Check if stop_upload file is present
            if ($c->stop_upload) {
                $stop = 1;
                $c->send(sprintf('{"success": false, "msg":"'.$c->l('Sorry, uploading is disabled.').'", "sent_delay": %d, "i": %d}', $json->{delay}, $json->{i}));
            }
            # Check against max_size
            elsif (defined $c->config('max_file_size')) {
                if ($json->{size} > $c->config('max_file_size')) {
                    $stop = 1;
                    $c->send(sprintf('{"success": false, "msg":"'.$c->l('Your file is too big: %1 (maximum size allowed: %2)', format_bytes($json->{size}), format_bytes($c->config('max_file_size'))).'", "sent_delay": %d, "i": %d}', $json->{delay}, $json->{i}));
                }
            }
            # Check that we have enough space (multiplying by 2 since it's encrypted, it takes more place that the original file)
            elsif (($json->{size} * 2) >= dfportable('files')->{bavail}) {
                $stop = 1;
                $c->send(sprintf('{"success": false, "msg":"'.$c->l('No enough space available on the server for this file (size: %1).', format_bytes($json->{size})).'", "sent_delay": %d, "i": %d}', $json->{delay}, $json->{i}));
            }

            unless ($stop) {
                my $f;
                if (defined($json->{id})) {
                    my @records = LufiDB::Files->select('WHERE short = ?', $json->{id});
                    $f          = Lufi::File->new(record => $records[0]);
                } else {
                    my $delay;

                    if (defined $c->config('delay_for_size')) {
                        # Choose delay according to config
                        my $delays   = $c->config('delay_for_size');
                        my @keys     = sort {$b <=> $a} keys %{$delays};
                        for my $key (@keys) {
                            if ($json->{size} >= $key) {
                                $delay = ($json->{delay} < $delays->{$key}) ? $json->{delay} : $delays->{$key};
                                last;
                            }
                        }
                    }
                    # If the file size is lower than the lowest configured size or if there is no delay_for_size setting, we choose the configured max delay
                    unless (defined $delay) {
                        $delay = ($json->{delay} <= $c->max_delay || $c->max_delay == 0) ? $json->{delay} : $c->max_delay;
                    }

                    $f = Lufi::File->new(
                        record               => $c->get_empty,
                        created_by           => $c->ip,
                        delete_at_first_view => ($json->{del_at_first_view}) ? 1 : 0,
                        delete_at_day        => $delay,
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
                    $f->created_at(time);
                    $c->provisioning;
                }

                $f->write;

                $ws->send(sprintf('{"success": true, "i": %d, "j": %d, "parts": %d, "short": "%s", "name": "%s", "size": %d, "del_at_first_view": %s, "created_at": %d, "delay": %d, "token": "%s", "sent_delay": %d}', $json->{i}, $json->{part}, $json->{total}, $f->short, $f->filename, $f->filesize, (($f->delete_at_first_view) ? 'true' : 'false'), $f->created_at, $f->delete_at_day, $f->mod_token, $json->{delay}));
            }
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

    # Do we have a file?
    if (scalar @records) {
        my $record = $records[0];
        # Is the file fully uploaded?
        if ($record->deleted
            || (
                $record->delete_at_day != 0
                && (
                    ($record->created_at + $record->delete_at_day * 86400) < time()
                )
            )
        ) {
            unless ($record->deleted) {
                my $f = Lufi::File->new(record => $record);
                $f->delete;
            }
            $c->on(
                message => sub {
                    my ($ws, $json) = @_;
                    $c->send('{"success": false, "msg": "'.$c->l('Error: the file existed but has been deleted.').'"}');
                }
            );
        } elsif ($record->complete) {
            my $f = Lufi::File->new(record => $record);

            $c->on(
                message => sub {
                    my ($ws, $json) = @_;
                    $json = decode_json $json;
                    if (defined($json->{part})) {
                        # Make $num an integer instead of a string
                        my $num = $json->{part} + 0;

                        # Get the slice
                        my $e    = $f->slices->[$num];
                        my $text = slurp $e->path;

                        # Send the slice
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
        } else {
            $c->on(
                message => sub {
                    my ($ws, $json) = @_;
                    $c->send('{"success": false, "msg": "'.$c->l('Error: the file has not been send entirely.').'"}');
                }
            );
        }
    } else {
        $c->send('{"success": false, "msg": "'.$c->l('Error: unable to find the file. Are you sure of your URL?').'"}');
    }
}

sub r {
    my $c     = shift;
    my $short = $c->param('short');

    my @records = LufiDB::Files->select('WHERE short = ?', $short);
    if (scalar @records) {
        my $f   = Lufi::File->new(record => $records[0]);
        return $c->render(
            template => 'render',
            f        => $f
        );
    } else {
        return $c->render(
            template => 'render',
            msg      => $c->l('Could not find the file. Are you sure of the URL?')
        );
    }
}

sub get_counter {
    my $c     = shift;
    my $short = $c->param('short');
    my $token = $c->param('token');

    my @records = LufiDB::Files->select('WHERE short = ?', $short);
    if (scalar(@records)) {
        if ($records[0]->mod_token eq $token) {
            return $c->render(
                json => {
                    success => true,
                    short   => $short,
                    counter => $records[0]->counter,
                    deleted => ($records[0]->deleted) ? true : false
                }
            );
        } else {
            return $c->render(
                json => {
                    success => false,
                    missing => false,
                    short   => $short,
                    msg     => $c->l('Unable to get counter for %1. The token is unvalid.', $short)
                }
            );
        }
    } else {
        return $c->render(
            json => {
                success => false,
                missing => true,
                short   => $short,
                msg     => $c->l('Unable to get counter for %1. The file does not exists. It will be removed from your localStorage.', $short)
            }
        );
    }
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
