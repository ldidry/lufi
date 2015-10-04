# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::cron::cleanfiles;
use Mojo::Base 'Mojolicious::Command';
use LufiDB;
use Lufi::File;
use FindBin qw($Bin);
use File::Spec qw(catfile);

has description => 'Delete expired files.';
has usage => sub { shift->extract_usage };

sub run {
    my $c = shift;

    my $time = time();

    ## Select only files expired since two days, to be sure that nobody is still downloading it
    my @files = LufiDB::Files->select('WHERE deleted = 0 AND ((delete_at_day + 2) * 86400) < (? - created_at) AND delete_at_day != 0', $time);

    for my $file (@files) {
        my $f = Lufi::File->new(record => $file);
        $file->delete;
    }

    my $config = $c->app->plugin('Config', {
        file => File::Spec->catfile($Bin, '..' ,'lufi.conf'),
    });

    if (defined($config->{delete_no_longer_viewed_files}) && $config->{delete_no_longer_viewed_files} > 0) {
        $time = time() - $config->{delete_no_longer_viewed_files} * 86400;
        @files = LufiDB::Files->select('WHERE deleted = 0 AND last_access_at < ?', $time);

        for my $file (@files) {
            my $f = Lufi::File->new(record => $file);
            $file->delete;
        }
    }
}

=encoding utf8

=head1 NAME

Lufi::Command::cron::cleanfiles - Delete expired files

=head1 SYNOPSIS

  Usage: script/lufi cron cleanfiles

=cut

1;
