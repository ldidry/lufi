# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::cron::cleanbdd;
use Mojo::Base 'Mojolicious::Command';
use LufiDB;
use FindBin qw($Bin);
use File::Spec qw(catfile);

has description => 'Delete IP addresses from database after configured delay.';
has usage => sub { shift->extract_usage };

sub run {
    my $c = shift;

    my $config = $c->app->plugin('Config', {
        file    => File::Spec->catfile($Bin, '..' ,'lufi.conf'),
        default => {
            keep_ip_during => 365,
        }
    });

    my $separation = time() - $config->{keep_ip_during} * 86400;

    LufiDB->do(
        'UPDATE files SET created_by = NULL WHERE created_by IS NOT NULL AND created_at < ?',
        {},
        $separation
    );
}

=encoding utf8

=head1 NAME

Lufi::Command::cron::cleanbdd - Delete IP addresses from database after configured delay

=head1 SYNOPSIS

  Usage: script/lufi cron cleanbdd

=cut

1;
