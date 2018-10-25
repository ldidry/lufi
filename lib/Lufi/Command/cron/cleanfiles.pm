# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::cron::cleanfiles;
use Mojo::Base 'Mojolicious::Command';
use Lufi::DB::File;
use FindBin qw($Bin);
use Lufi::DefaultConfig qw($default_config);

has description => 'Delete expired files.';
has usage => sub { shift->extract_usage };

sub run {
    my $c = shift;

    my $cfile = Mojo::File->new($Bin, '..' , 'lufi.conf');
    if (defined $ENV{MOJO_CONFIG}) {
        $cfile = Mojo::File->new($ENV{MOJO_CONFIG});
        unless (-e $cfile->to_abs) {
            $cfile = Mojo::File->new($Bin, '..', $ENV{MOJO_CONFIG});
        }
    }
    my $config = $c->app->plugin('Config', {
        file    => $cfile,
        default => $default_config
    });

    my $time = time();

    my $ldfile = Lufi::DB::File->new(app => $c->app);
    $ldfile->get_expired($time)->each(
        sub {
            my ($f, $num) = @_;
            $f->delete;
        }
    );

    if (defined($config->{delete_no_longer_viewed_files}) && $config->{delete_no_longer_viewed_files} > 0) {
        $time = time() - $config->{delete_no_longer_viewed_files} * 86400;
        my $ldfile = Lufi::DB::File->new(app => $c->app);
        $ldfile->get_no_longer_viewed($time)->each(
            sub {
                my ($f, $num) = @_;
                $f->delete;
            }
        );
    }
}

=encoding utf8

=head1 NAME

Lufi::Command::cron::cleanfiles - Delete expired files

=head1 SYNOPSIS

  Usage: script/lufi cron cleanfiles

=cut

1;
