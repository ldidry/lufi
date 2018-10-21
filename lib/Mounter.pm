package Mounter;
use Mojo::Base 'Mojolicious';
use FindBin qw($Bin);
use File::Spec qw(catfile);

# This method will run once at server start
sub startup {
    my $self = shift;

    push @{$self->commands->namespaces}, 'Lufi::Command';

    my $cfile = Mojo::File->new($Bin, '..' , 'lufi.conf');
    if (defined $ENV{MOJO_CONFIG}) {
        $cfile = Mojo::File->new($ENV{MOJO_CONFIG});
        unless (-e $cfile->to_abs) {
            $cfile = Mojo::File->new($Bin, '..', $ENV{MOJO_CONFIG});
        }
    }
    my $config = $self->plugin('Config' =>
        {
            file    => $cfile,
            default => {
                prefix        => '/',
                theme         => 'default',
                dbtype        => 'sqlite',
                prefix        => '/',
                provisioning  => 100,
                provis_step   => 5,
                length        => 10,
                token_length  => 32,
                secrets       => ['hfudsifdsih'],
                default_delay => 0,
                max_delay     => 0,
                mail          => {
                    how => 'sendmail'
                },
                mail_sender              => 'no-reply@lufi.io',
                theme                    => 'default',
                upload_dir               => 'files',
                session_duration         => 3600,
                allow_pwd_on_files       => 0,
                dbtype                   => 'sqlite',
                db_path                  => 'lufi.db',
                force_burn_after_reading => 0,
                x_frame_options          => 'DENY',
                x_content_type_options   => 'nosniff',
                x_xss_protection         => '1; mode=block',
            }
        }
    );

    # Compress static assets
    $self->plugin('GzipStatic');

    # Headers
    $self->plugin('Lufi::Plugin::Headers');

    # Helpers
    $self->plugin('Lufi::Plugin::Helpers');

    # Themes handling
    shift @{$self->static->paths};
    if ($config->{theme} ne 'default') {
        my $theme = $self->home->rel_file('themes/'.$config->{theme});
        push @{$self->static->paths}, $theme.'/public' if -d $theme.'/public';
    }
    push @{$self->static->paths}, $self->home->rel_file('themes/default/public');

    $self->plugin('Mount' => {$config->{prefix} => File::Spec->catfile($Bin, '..', 'script', 'application')});
}

1;
