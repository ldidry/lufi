# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi;
use Mojo::Base 'Mojolicious';
use LufiDB;
use Data::Entropy qw(entropy_source);
use Net::LDAP;

$ENV{MOJO_MAX_WEBSOCKET_SIZE} = 100485760; # 10 * 1024 * 1024 = 10MiB

# This method will run once at server start
sub startup {
    my $self = shift;

    my $config = $self->plugin('Config' => {
        default =>  {
            provisioning       => 100,
            provis_step        => 5,
            length             => 10,
            token_length       => 32,
            secrets            => ['hfudsifdsih'],
            default_delay      => 0,
            max_delay          => 0,
            mail               => {
                how => 'sendmail'
            },
            mail_sender        => 'no-reply@lufi.io',
            theme              => 'default',
            upload_dir         => 'files',
            session_duration   => 3600,
            allow_pwd_on_files => 0,
        }
    });

    die "You need to provide a contact information in lufi.conf!" unless (defined($self->config('contact')));

    # Themes handling
    shift @{$self->renderer->paths};
    shift @{$self->static->paths};
    if ($config->{theme} ne 'default') {
        my $theme = $self->home->rel_dir('themes/'.$config->{theme});
        push @{$self->renderer->paths}, $theme.'/templates' if -d $theme.'/templates';
        push @{$self->static->paths}, $theme.'/public' if -d $theme.'/public';
    }
    push @{$self->renderer->paths}, $self->home->rel_dir('themes/default/templates');
    push @{$self->static->paths}, $self->home->rel_dir('themes/default/public');

    # Mail config
    my $mail_config = {
        type     => 'text/plain',
        encoding => 'quoted-printable',
        how      => $self->config('mail')->{'how'}
    };
    $mail_config->{howargs} = $self->config('mail')->{'howargs'} if (defined $self->config('mail')->{'howargs'});

    $self->plugin('Mail' => $mail_config);

    # Internationalization
    my $lib = $self->home->rel_dir('themes/'.$config->{theme}.'/lib');
    eval qq(use lib "$lib");
    $self->plugin('I18N');

    # Debug
    $self->plugin('DebugDumperHelper');

    # Authentication (if configured)
    $self->plugin('authentication' =>
        {
            autoload_user => 1,
            session_key   => 'Dolomon',
            load_user     => sub {
                my ($c, $username) = @_;

                return $username;
            },
            validate_user => sub {
                my ($c, $username, $password, $extradata) = @_;

                my $ldap = Net::LDAP->new($c->config->{ldap}->{uri});
                my $mesg = $ldap->bind($c->config->{ldap}->{bind_user}.$c->config->{ldap}->{bind_dn},
                    password => $c->config->{ldap}->{bind_pwd}
                );

                $mesg->code && die $mesg->error;

                $mesg = $ldap->search(
                    base   => $c->config->{ldap}->{user_tree},
                    filter => "(&(uid=$username)".$c->config->{ldap}->{user_filter}.")"
                );

                if ($mesg->code) {
                    $c->app->log->error($mesg->error);
                    return undef;
                }

                # Now we know that the user exists
                $mesg = $ldap->bind('uid='.$username.$c->config->{ldap}->{bind_dn},
                    password => $password
                );

                if ($mesg->code) {
                    $c->app->log->info("[LDAP authentication failed] login: $username, IP: ".$c->ip);
                    $c->app->log->error("[LDAP authentication failed] ".$mesg->error);
                    return undef;
                }

                $c->app->log->info("[LDAP authentication successful] login: $username, IP: ".$c->ip);

                return $username;
            }
        }
    );
    if (defined($self->config('ldap'))) {
        $self->app->sessions->default_expiration($self->config('session_duration'));
    }

    # Secrets
    $self->secrets($self->config('secrets'));

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
                $result .= $chars[entropy_source->get_int(scalar(@chars))];
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
    mkdir($self->config('upload_dir'), 0700) unless (-d $self->config('upload_dir'));
    die ('The upload directory ('.$self->config('upload_dir').') is not writable') unless (-w $self->config('upload_dir'));

    # SQLite database migration if needed
    my $columns = LufiDB::Files->table_info;
    my $pwd_col = 0;
    foreach my $col (@{$columns}) {
        $pwd_col = 1 if $col->{name} eq 'passwd';
    }
    unless ($pwd_col) {
        LufiDB->do('ALTER TABLE files ADD COLUMN passwd TEXT;');
    }

    # Default layout
    $self->defaults(layout => 'default');

    # Router
    my $r = $self->routes;

    # Page for files uploading
    $r->get('/' => sub {
        my $c = shift;
        if (!defined($c->config('ldap')) || $c->is_user_authenticated) {
            $c->render(template => 'index');
        } else {
            $c->redirect_to('login');
        }
    })->name('index');

    if (defined $self->config('ldap')) {
        # Login page
        $r->get('/login' => sub {
            my $c = shift;
            if ($c->is_user_authenticated) {
                $c->redirect_to('index');
            } else {
                $c->render(template => 'login');
            }
        });
        # Authentication
        $r->post('/login' => sub {
            my $c = shift;
            my $login = $c->param('login');
            my $pwd   = $c->param('password');

            if($c->authenticate($login, $pwd)) {
                $c->redirect_to('index');
            } else {
                $c->stash(msg => $c->l('Please, check your credentials: unable to authenticate.'));
                $c->render(template => 'login');
            }
        });
        # Logout page
        $r->get('/logout' => sub {
            my $c = shift;
            if ($c->is_user_authenticated) {
                $c->logout;
            }
            $c->render(template => 'logout');
        })->name('logout');
    }

    # About page
    $r->get('/about' => sub {
        shift->render(template => 'about');
    })->name('about');

    # Get a file
    $r->get('/r/:short')->
        to('Files#r')->
        name('render');

    # List of files (use localstorage, so the server know nothing about files)
    $r->get('/files' => sub {
        my $c = shift;
        if (!defined($c->config('ldap')) || $c->is_user_authenticated) {
            $c->render(template => 'files');
        } else {
            $c->redirect_to('login');
        }
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
    $r->get('/m')->
        to('Mail#render_mail')->
        name('mail');

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
