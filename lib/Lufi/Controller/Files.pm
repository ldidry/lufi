# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Files;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::JSON qw(encode_json decode_json to_json true false);
use Mojo::Util qw(encode decode);
use Mojo::File;
use Lufi::DB::File;
use Lufi::DB::Slice;
use File::Spec::Functions;
use Number::Bytes::Human qw(format_bytes);
use Filesys::DfPortable;
use Crypt::SaltedHash;

sub files {
    my $c = shift;

    if ((!defined($c->config('ldap')) && !defined($c->config('htpasswd'))) || $c->is_user_authenticated) {
        $c->render(template => 'files');
    } else {
        $c->redirect_to('login');
    }
}

sub upload {
    my $c = shift;

    my $invitation;
    my $token = $c->session->{guest_token};
    $invitation = Lufi::DB::Invitation->new(app => $c->app)->from_token($token) if $token;
    if ((!defined($c->config('ldap')) && !defined($c->config('htpasswd'))) || $c->is_user_authenticated || $invitation) {
        $c->inactivity_timeout(30000000);

        $c->app->log->debug('Client connected');

        $c->on(
            message => sub {
                my ($ws, $text) = @_;

                my $invit = Lufi::DB::Invitation->new(app => $c->app)->from_token($token) if $token;

                my $begin = time;

                my ($json) = split('XXMOJOXX', $text, 2);
                $json = encode 'UTF-8', $json;
                $text =~ s/^.*?XXMOJOXX/${json}XXMOJOXX/;
                $json = decode_json $json;

                $c->app->log->debug('Got message');

                if (defined($json->{cancel}) && $json->{cancel}) {
                    my $f = Lufi::DB::File->new(app => $c->app)->from_short($json->{id});
                    if ($f && $f->mod_token && $f->mod_token eq $json->{mod_token}) {
                        $f = $f->delete();
                        return $ws->send(to_json(
                            {
                                action  => 'cancel',
                                success => $f->deleted ? true : false,
                                msg     => $f->deleted ? 'Lufi::DB::File->delete() was successfull' : 'Lufi::DB::File->delete() failed',
                                i       => $json->{i}
                            }
                        ));
                    } else {
                        return $ws->send(to_json(
                            {
                                action  => 'cancel',
                                success => false,
                                msg     => 'Lufi::DB::File not found or invalid mod_token',
                                i       => $json->{i}
                            }
                        ));
                    }
                }

                my $stop = 0;

                # Check if stop_upload file is present
                if ($c->stop_upload) {
                    $stop = 1;
                    return $ws->send(decode('UTF-8', encode_json(
                        {
                            success    => false,
                            msg        => $c->l('Sorry, uploading is disabled.'),
                            sent_delay => $json->{delay},
                            i          => $json->{i}
                        }
                    )));
                }
                # Check against max_size
                if (defined $c->config('max_file_size')) {
                    if ($json->{size} > $c->config('max_file_size')) {
                        $stop = 1;
                        return $ws->send(decode('UTF-8', encode_json(
                            {
                                success    => false,
                                msg        => $c->l('Your file is too big: %1 (maximum size allowed: %2)', format_bytes($json->{size}), format_bytes($c->config('max_file_size'))),
                                sent_delay => $json->{delay},
                                i          => $json->{i}
                            }
                        )));
                    }
                }
                # Check that we have enough space (multiplying by 2 since it's encrypted, it takes more place that the original file)
                if ($json->{part} == 0 && ($json->{size} * 2) >= dfportable($c->config('upload_dir'))->{bavail}) {
                    $stop = 1;
                    return $ws->send(decode('UTF-8', encode_json(
                        {
                            success    => false,
                            msg        => $c->l('No enough space available on the server for this file (size: %1).', format_bytes($json->{size})),
                            sent_delay => $json->{delay},
                            i          => $json->{i}
                        }
                    )));
                }
                # Check that the invitation is still valid, but only if it's the first chunk
                # (i.e. a new file, we don't want to stop a current uploading)
                if ($json->{part} == 0 && $invit && !$invit->is_valid()) {
                    $stop = 1;
                    $c->app->log->info(sprintf('Someone (%s) tried to use an expired or deleted invitation.', $invit->guest_mail));
                    $ws->send(decode('UTF-8', encode_json(
                        {
                            success    => false,
                            msg        => $c->l('Sorry, your invitation has expired or has been deleted. Please contact %1 to have another invitation.', $invit->ldap_user_mail),
                        }
                    )));
                }

                unless ($stop) {
                    my $f;
                    if (defined($json->{id})) {
                        $f = Lufi::DB::File->new(app => $c->app)->from_short($json->{id});
                    } else {
                        my $delay;
                        unless (defined $json->{delay}) {
                            $json->{delay} = $c->max_delay;
                        }

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
                            $delay = (($json->{delay} > 0 && $json->{delay} <= $c->max_delay) || $c->max_delay == 0) ? $json->{delay} : $c->max_delay;
                        }
                        # If we have a password
                        my $salted_pwd;
                        if ($c->config('allow_pwd_on_files') && defined($json->{file_pwd}) && $json->{file_pwd} ne '') {
                            my $csh = Crypt::SaltedHash->new(algorithm => 'SHA-256', salt_len => 8);
                            $csh->add($json->{file_pwd});

                            $salted_pwd = $csh->generate();
                        }

                        my $creator = $c->ip;
                        # Authenticated user logging
                        if ((defined($c->config('ldap')) || defined($c->config('htpasswd'))) && !$invitation) {
                            $creator = sprintf('User: %s, IP: %s', $c->current_user->{username}, $creator);
                        }
                        # Guest user logging
                        if ($invitation) {
                            $creator = sprintf('User: %s, IP: %s', $invitation->guest_mail, $creator);
                        }

                        my $delete_at_first_view = ($json->{del_at_first_view}) ? 1 : 0;
                        $delete_at_first_view    = 1 if $c->app->config('force_burn_after_reading');
                        $f = Lufi::DB::File->new(app => $c->app)->get_empty()
                                ->created_by($creator)
                                ->delete_at_first_view($delete_at_first_view)
                                ->delete_at_day($delay)
                                ->mediatype($json->{type})
                                ->filename($json->{name})
                                ->filesize($json->{size})
                                ->nbslices($json->{total})
                                ->mod_token($c->shortener($c->config('token_length')))
                                ->passwd($salted_pwd)
                                ->zipped($json->{zipped})
                                ->write;
                    }

                    # This check is just in case we didn't succeed to find a corresponding record
                    # It normally can't happen
                    if (defined $f) {
                        # If we already have a part, it's a resend because the websocket has been broken
                        # In this case, we don't need to rewrite the file
                        unless ($f->slices->grep(sub { $_->j == $json->{part} })->size) {
                            # Create directory
                            my $dir = catdir($c->config('upload_dir'), $f->short);
                            mkdir($dir, 0700) unless (-d $dir);

                            # Create slice file
                            my $file = catfile($dir, $json->{part}.'.part');
                            my $s    = Lufi::DB::Slice->new(
                                app   => $c->app,
                                short => $f->short,
                                j     => $json->{part},
                                path  => $file
                            );
                            Mojo::File->new($file)->spurt($text);
                            push @{$f->slices}, $s;
                            $s->write;

                            if (($json->{part} + 1) == $json->{total}) {
                                $f->complete(1);
                                $f->created_at(time);
                                $f->write;
                            }
                        }

                        my $result = {
                            success           => true,
                            i                 => $json->{i},
                            j                 => $json->{part},
                            parts             => $json->{total},
                            short             => $f->short,
                            name              => $f->filename,
                            size              => $f->filesize,
                            del_at_first_view => (($f->delete_at_first_view) ? true : false),
                            created_at        => $f->created_at,
                            delay             => $f->delete_at_day,
                            token             => $f->mod_token,
                            sent_delay        => $json->{delay},
                            duration          => time - $begin
                        };
                        $ws->send(to_json($result));
                    } else {
                        $ws->send(decode('UTF-8', encode_json(
                            {
                                success    => false,
                                msg        => $c->l('The server was unable to find the file record to add your file part to. Please, contact the administrator.'),
                                sent_delay => $json->{delay},
                                i          => $json->{i}
                            }
                        )));
                    }
                }
            }
        );
        $c->on(
            finish => sub {
                $c->app->log->debug('Client disconnected');
            }
        );
    } else {
        $c->on(
            message => sub {
                $c->app->log->info(sprintf('Someone unauthenticated tried to upload a file. IP: %s', $c->ip));
                $c->finish;
            }
        );
    }
}

sub download {
    my $c     = shift;
    my $short = $c->param('short');

    $c->inactivity_timeout(300000);
    $c->app->log->debug('Client connected');

    my $ldfile = Lufi::DB::File->new(app => $c->app)->from_short($short);

    # Do we have a file?
    if (defined $ldfile) {
        # Is the file fully uploaded?
        if ($ldfile->deleted
            || (
                $ldfile->delete_at_day != 0
                && (
                    ($ldfile->created_at + $ldfile->delete_at_day * 86400) < time()
                )
            )
        ) {
            unless ($ldfile->deleted) {
                $ldfile->delete;
            }
            $c->on(
                message => sub {
                    my ($ws, $json) = @_;
                    $c->send(decode('UTF-8', encode_json(
                        {
                            success => false,
                            msg     => $c->l('Error: the file existed but was deleted.')
                        }
                    )));
                }
            );
        } elsif (defined($ldfile->abuse)) {
            my $abuse_msg = $c->l('This file has been deactivated by the admins. Contact them to know why.');
            $abuse_msg    = $c->app->config('abuse')->{$ldfile->abuse} if ($c->app->config('abuse') && $c->app->config('abuse')->{$ldfile->abuse});
            $c->on(
                message => sub {
                    my ($ws, $json) = @_;
                    $c->send(decode('UTF-8', encode_json(
                        {
                            success => false,
                            msg     => $abuse_msg
                        }
                    )));
                }
            );
        } elsif ($ldfile->complete) {
            my $f = $ldfile;

            $c->on(
                message => sub {
                    my ($ws, $json) = @_;
                    $json = decode_json $json;

                    # Do we need a password?
                    my $valid = 1;
                    if ($c->config('allow_pwd_on_files') && defined($f->{passwd})) {
                        my $pwd = $json->{file_pwd};
                        $valid = Crypt::SaltedHash->validate($f->{passwd}, $json->{file_pwd}, 8);
                    }

                    if ($valid) {
                        if (defined($json->{part})) {
                            # Make $num an integer instead of a string
                            my $num = $json->{part} + 0;

                            # Get the slice
                            my $e    = $f->slices->[$num];
                            my $text = Mojo::File->new($e->path)->slurp;

                            my ($json2) = split('XXMOJOXX', $text, 2);
                            $json2 = decode 'UTF-8', $json2;
                            $text =~ s/^.*?XXMOJOXX/${json2}XXMOJOXX/;

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
                    } else {
                        $c->send(decode('UTF-8', encode_json(
                            {
                                msg => $c->l('Your password is not valid. Please refresh the page to retry.')
                            }
                        )));
                    }
                }
            );
            $c->on(
                finish => sub {
                    $c->app->log->debug('Client disconnected');
                }
            );
        } else {
            $c->on(
                message => sub {
                    my ($ws, $json) = @_;
                    $c->send(decode('UTF-8', encode_json(
                        {
                            success => false,
                            msg     => $c->l('Error: the file has not been sent entirely.')
                        }
                    )));
                }
            );
        }
    } else {
        $c->send(decode('UTF-8', encode_json(
            {
                success => false,
                msg     => $c->l('Error: unable to find the file. Are you sure of your URL?')
            }
        )));
    }
}

sub r {
    my $c     = shift;
    my $short = $c->param('short');

    my $ldfile = Lufi::DB::File->new(app => $c->app)->from_short($short);

    if (defined $ldfile) {
        return $c->render(
            template => 'render',
            f        => $ldfile,
            file_pwd => ($c->config('allow_pwd_on_files') && defined($ldfile->passwd))
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

    if ((!defined($c->config('ldap')) && !defined($c->config('htpasswd'))) || $c->is_user_authenticated) {
        my $ldfile = Lufi::DB::File->new(app => $c->app)->from_short($short);

        if (defined $ldfile) {
            if ($ldfile->mod_token eq $token) {
                return $c->render(
                    json => {
                        success => true,
                        short   => $short,
                        counter => $ldfile->counter,
                        deleted => ($ldfile->deleted) ? true : false
                    }
                );
            } else {
                return $c->render(
                    json => {
                        success => false,
                        missing => false,
                        short   => $short,
                        msg     => $c->l('Unable to get counter for %1. The token is invalid.', $short)
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
    } else {
        return $c->render(
            json => {
                success => false,
                missing => false,
                short   => $short,
                msg     => $c->l('Unable to get counter for %1. You are not authenticated.', $short)
            }
        );
    }
}

sub delete {
    my $c     = shift;
    my $short = $c->param('short');
    my $token = $c->param('token');

    if ((!defined($c->config('ldap')) && !defined($c->config('htpasswd'))) || $c->is_user_authenticated) {
        my $ldfile = Lufi::DB::File->new(app => $c->app)->from_short($short);

        $ldfile = undef unless (defined($ldfile) && $ldfile->mod_token eq $token);

        if (defined $ldfile) {
            my $msg;
            if ($ldfile->deleted) {
                $msg = $c->l('The file has already been deleted');
            } else {
                $ldfile->delete;
                $msg = $c->l('File deleted');
            }
            return $c->respond_to(
                json => {
                    json => {
                        success => true,
                        msg     => $msg
                    }
                },
                any => sub {
                    $c->render(
                        template => 'msg',
                        f        => $ldfile,
                        msg      => $msg
                    );
                }
            );
        } else {
            my $msg = $c->l('Could not find the file. Are you sure of the URL and the token?');
            return $c->respond_to(
                json => {
                    json => {
                        success => false,
                        msg     => $msg
                    }
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
    } else {
        my $msg = $c->l('Could not delete the file. You are not authenticated.');
        return $c->respond_to(
            json => {
                json => {
                    success => false,
                    msg     => $msg
                }
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
