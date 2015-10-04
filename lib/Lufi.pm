# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi;
use Mojo::Base 'Mojolicious';
use LufiDB;

$ENV{MOJO_MAX_WEBSOCKET_SIZE} = 100485760; # 10 * 1024 * 1024 = 10MiB

# This method will run once at server start
sub startup {
    my $self = shift;

    my $config = $self->plugin('Config' => {
        default =>  {
            provisioning => 100,
            provis_step   => 5,
            length        => 10,
            token_length  => 32,
            secret        => ['hfudsifdsih'],
            default_delay => 0,
            max_delay     => 0,
            mail          => {
                how => 'sendmail'
            },
            mail_sender   => 'no-reply@lufi.io'
        }
    });

    die "You need to provide a contact information in lufi.conf!" unless (defined($config->{contact}));

    # Mail config
    my $mail_config = {
        type     => 'text/plain',
        encoding => 'quoted-printable',
        how      => $self->config('mail')->{'how'}
    };
    $mail_config->{howargs} = $self->config('mail')->{'howargs'} if (defined $self->config('mail')->{'howargs'});

    $self->plugin('Mail' => $mail_config);

    # Internationalization
    $self->plugin('I18N');

    # Debug
    $self->plugin('DebugDumperHelper');

    $self->secrets($config->{secrets});

    # Helpers
    $self->helper(
        provisioning => sub {
            my $c = shift;

            # Create some short patterns for provisioning
            if (LufiDB::Files->count('WHERE created_at IS NULL') < $c->config('provisioning')) {
                for (my $i = 0; $i < $c->config('provis_step'); $i++) {
                    if (LufiDB->begin) {
                        my $short;
                        do {
                            $short= $c->shortener($c->config('length'));
                        } while (LufiDB::Files->count('WHERE short = ?', $short));

                        LufiDB::Files->create(
                            short => $short
                        );
                        LufiDB->commit;
                    }
                }
            }
        }
    );

    $self->helper(
        get_empty => sub {
            my $c =  shift;

            my @records = LufiDB::Files->select('WHERE created_at IS NULL LIMIT 1');
            return $records[0];
        }
    );

    $self->helper(
        shortener => sub {
            my $c      = shift;
            my $length = shift;

            my @chars  = ('a'..'z','A'..'Z','0'..'9', '-', '_');
            my $result = '';
            foreach (1..$length) {
                $result .= $chars[rand scalar(@chars)];
            }
            return $result;
        }
    );

    $self->helper(
        ip => sub {
            my $c           = shift;
            my $proxy       = $c->req->headers->header('X-Forwarded-For');
            my $ip          = ($proxy) ? $proxy : $c->tx->remote_address;
            my $remote_port = (defined($c->req->headers->header('X-Remote-Port'))) ? $c->req->headers->header('X-Remote-Port') : $c->tx->remote_port;

            return "$ip remote port:$remote_port";
        }
    );

    $self->helper(
        default_delay => sub {
            my $c = shift;

            return $c->config('default_delay') if ($c->config('default_delay') >= 0);

            warn "default_delay set to a negative value. Default to 0.";
            return 0;
        }
    );

    $self->helper(
        max_delay => sub {
            my $c = shift;

            return $c->config('max_delay') if ($c->config('max_delay') >= 0);

            warn "max_delay set to a negative value. Default to 0.";
            return 0;
        }
    );

    $self->helper(
        is_selected => sub {
            my $c   = shift;
            my $num = shift;

            return ($num == $c->max_delay)     ? 'selected="selected"' : '' if ($c->max_delay && !$c->default_delay);
            return ($num == $c->default_delay) ? 'selected="selected"' : '';
        }
    );

    $self->helper(
        stop_upload => sub {
            my $c = shift;

            if (-f 'stop-upload' || -f 'stop-upload.manual') {
                return 1;
            }
            return 0;
        }
    );
    # Hooks
    $self->hook(
        after_dispatch => sub {
            shift->provisioning();
        }
    );

    # For the first launch (after, this isn't really useful)
    $self->provisioning();

    # Create directory if needed
    mkdir('files', 0700) unless (-d 'files');

    # Default layout
    $self->defaults(layout => 'default');

    # Router
    my $r = $self->routes;

    # Page for files uploading
    $r->get('/' => sub {
        shift->render(template => 'index');
    })->name('index');

    # Get a file
    $r->get('/r/:short')->
        to('Files#r')->
        name('render');

    # List of files (use localstorage, so the server know nothing about files
    $r->get('/files' => sub {
        shift->render(template => 'files');
    })->name('files');

    # Get counter informations about a file
    $r->post('/c')->
        to('Files#get_counter')->
        name('counter');

    # Get counter informations about a file
    $r->get('/d/:short/:token')->
        to('Files#delete')->
        name('delete');

    # Get some informations about delays
    $r->get('/delays' => sub {
        shift->render(template => 'delays');
    })->name('delays');

    # Get mail page
    $r->get('/m' => sub {
        shift->render(template => 'mail');
    })->name('mail');

    # Submit mail
    $r->post('/m')->
        to('Mail#send_mail');

    # About page
    $r->get('/about' => sub {
        shift->render(template => 'about');
    })->name('about');

    # Upload files websocket
    $r->websocket('/upload')->
        to('Files#upload')->
        name('upload');

    # Get files websocket
    $r->websocket('/download/:short')->
        to('Files#download')->
        name('download');
}

1;
