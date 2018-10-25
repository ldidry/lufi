# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::cron::cleanbdd;
use Mojo::Base 'Mojolicious::Command';
use Lufi::DB::File;
use FindBin qw($Bin);
use Lufi::DefaultConfig qw($default_config);

has description => 'Delete IP addresses from database after configured delay.';
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

    my $separation = time() - $config->{keep_ip_during} * 86400;

    Lufi::DB::File->new(app => $c->app)->delete_creator_before($separation);
}

=encoding utf8

=head1 NAME

Lufi::Command::cron::cleanbdd - Delete IP addresses from database after configured delay

=head1 SYNOPSIS

  Usage: script/lufi cron cleanbdd

=cut

1;
