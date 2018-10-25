package Mounter;
use Mojo::Base 'Mojolicious';
use FindBin qw($Bin);
use File::Spec qw(catfile);
use Lufi::DefaultConfig qw($default_config);

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
            default => $default_config
        }
    );

    # Compress static assets
    $self->plugin('GzipStatic');

    # Headers
    $self->plugin('Lufi::Plugin::Headers');

    # Helpers
    $self->plugin('Lufi::Plugin::Helpers');

    # Themes handling
    $self->plugin('FiatTux::Themes');

    $self->plugin('Mount' => {$config->{prefix} => File::Spec->catfile($Bin, '..', 'script', 'application')});
}

1;
