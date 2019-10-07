# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi;
use Mojo::Base 'Mojolicious';
use Mojolicious::Sessions;
use Email::Valid;
use Data::Validate::URI qw(is_web_uri);
use Lufi::DefaultConfig qw($default_config);

$ENV{MOJO_MAX_WEBSOCKET_SIZE} = 100485760; # 10 * 1024 * 1024 = 10MiB

# This method will run once at server start
sub startup {
    my $self = shift;

    my $config = $self->plugin('Config' => {
        default => $default_config
    });

    die 'You need to provide a contact information in lufi.conf!' unless (defined($self->config('contact')));
    die 'You need to provide a **report** information in lufi.conf!' unless (defined($self->config('report')));

    if (Email::Valid->address($self->config('report'))) {
        $self->config('report' => 'mailto:'.$self->config('report'));
    } elsif (!is_web_uri($self->config('report'))) {
        die 'You need to provide an email address or an URL as report information in lufi.conf!';
    }

    $self->config('prefix', $self->config('prefix').'/') unless substr($self->config('prefix'), -1) eq '/';

    # Themes handling
    $self->plugin('FiatTux::Themes');

    # Mail config
    my $mail_config = {
        type     => 'text/plain',
        encoding => 'quoted-printable',
        how      => $self->config('mail')->{'how'}
    };
    $mail_config->{howargs} = $self->config('mail')->{'howargs'} if (defined $self->config('mail')->{'howargs'});

    $self->plugin('Mail' => $mail_config);

    # Internationalization
    my $lib = $self->home->rel_file('themes/'.$config->{theme}.'/lib');
    eval qq(use lib "$lib");
    $self->plugin('I18N');

    # Debug
    $self->plugin('DebugDumperHelper');

    # Compress static assets
    $self->plugin('GzipStatic');

    # Headers
    $self->plugin('Lufi::Plugin::Headers');

    # Fiat Tux helpers
    $self->plugin('FiatTux::Helpers');

    # Authentication
    $self->plugin('FiatTux::GrantAccess');

    # Secrets
    $self->secrets($self->config('secrets'));

    # Helpers
    $self->plugin('Lufi::Plugin::Helpers');

    # Recurrent task
    Mojo::IOLoop->recurring(2 => sub {
        my $loop = shift;

        $self->provisioning();
    });

    # Create directory if needed
    mkdir($self->config('upload_dir'), 0700) unless (-d $self->config('upload_dir'));
    die ('The upload directory ('.$self->config('upload_dir').') is not writable') unless (-w $self->config('upload_dir'));

    # Configure sessions
    my $sessions = Mojolicious::Sessions->new;
    $sessions->cookie_name('lufi');
    $sessions->cookie_path($self->config('prefix'));
    $self->sessions($sessions);

    # Default layout
    $self->defaults(layout => 'default');

    # Router
    my $r = $self->routes;

    # Page for files uploading
    $r->get('/')
      ->to('Misc#index')
      ->name('index');

    $r->get('/lang/:l')
      ->to('Misc#change_lang')
      ->name('lang');

    if (defined $self->config('ldap') || defined $self->config('htpasswd')) {
        # Login page
        $r->get('/login')
          ->to('Auth#login_page');

        # Authentication
        $r->post('/login')
          ->to('Auth#login');

        # Logout page
        $r->post('/logout')
          ->to('Auth#log_out')
          ->name('logout');

        if (defined $self->config('ldap') && defined $self->config('invitations')) {
            # Invitation creation page
            $r->get('/invite')
              ->name('invite')
              ->to('Invitation#new_invite');

            # Send invitation
            $r->post('/invite')
              ->to('Invitation#send_invite');

            # Get my invitations
            $r->get('/invite/list')
              ->name('invite_list')
              ->to('Invitation#my_invitations');

            # Delete invitations
            $r->post('/invite/list/delete')
              ->name('invite_list_delete')
              ->to('Invitation#delete_invitations');

            # Resend invitation mail
            $r->post('/invite/list/resend')
              ->name('invite_list_resend')
              ->to('Invitation#resend_invitations');

            # Toggle invitations visibility
            $r->post('/invite/list/visibility')
              ->name('invite_list_visibility')
              ->to('Invitation#toggle_invitations_visibility');

            # I’m a guest
            $r->get('/guest/:token')
              ->name('guest')
              ->to('Invitation#guest');

            # I’m a guest and I sent all my files
            $r->post('/guest/:token/send_mail')
              ->name('guest_send_mail')
              ->to('Invitation#send_mail_to_ldap_user');
        }
    }

    # About page
    $r->get('/about')
      ->to('Misc#about')
      ->name('about');

    # Generated js files
    $r->get('/partial/:file')
      ->to('Misc#js_files')
      ->name('partial');

    # Get instance stats
    $r->get('/fullstats')
        ->to('Misc#fullstats')
        ->name('fullstats');

    # Get a file
    $r->get('/r/:short')
      ->to('Files#r')
      ->name('render');

    # List of files (use localstorage, so the server know nothing about files)
    $r->get('/files')
      ->to('Files#files')
      ->name('files');

    # Get counter informations about a file
    $r->post('/c')
      ->to('Files#get_counter')
      ->name('counter');

    # Get counter informations about a file
    $r->get('/d/:short/:token')
      ->to('Files#delete')
      ->name('delete');

    # Get some informations about delays
    $r->get('/delays')
      ->to('Misc#delays')
      ->name('delays');

    # Get mail page
    $r->get('/m')
      ->to('Mail#render_mail')
      ->name('mail');

    # Submit mail
    $r->post('/m')
      ->to('Mail#send_mail');

    # Upload files websocket
    $r->websocket('/upload')
      ->to('Files#upload')
      ->name('upload');

    # Get files websocket
    $r->websocket('/download/:short')
      ->to('Files#download')
      ->name('download');
}

1;
