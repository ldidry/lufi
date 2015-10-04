package Mounter;
use Mojo::Base 'Mojolicious';
use FindBin qw($Bin);
use File::Spec qw(catfile);

# This method will run once at server start
sub startup {
    my $self = shift;

    push @{$self->commands->namespaces}, 'Lufi::Command';

    my $config = $self->plugin('Config' =>
        {
            file    => File::Spec->catfile($Bin, '..' ,'lufi.conf'),
            default => {
                prefix => '/'
            }
        }
    );

    $self->plugin('Mount' => {$config->{prefix} => File::Spec->catfile($Bin, '..', 'script', 'application')});
}

1;
