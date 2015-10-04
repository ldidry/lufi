package Lufi::Command::cron::watch;
use Mojo::Base 'Mojolicious::Command';
use Filesys::DiskUsage qw/du/;
use LufiDB;
use Lufi::File;
use Switch;
use FindBin qw($Bin);
use File::Spec qw(catfile);

has description => 'Watch the files directory and take action when over quota';
has usage => sub { shift->extract_usage };

sub run {
    my $c = shift;

    my $config = $c->app->plugin('Config', {
        file    => File::Spec->catfile($Bin, '..' ,'lufi.conf'),
        default => {
            policy_when_full => 'warn'
        }
    });

    if (defined($config->{max_total_size})) {
        my $total = du(qw/files/);

        if ($total > $config->{max_total_size}) {
            say "[Lufi cron job watch] Files directory is over quota ($total > ".$config->{max_total_size}.")";
            switch ($config->{policy_when_full}) {
                case 'warn' {
                    say "[Lufi cron job watch] Please, delete some files or increase quota (".$config->{max_total_size}.")";
                }
                case 'stop-upload' {
                    open (my $fh, '>', 'stop-upload') or die ("Couldn't open stop-upload: $!");
                    close($fh);
                    say '[Lufi cron job watch] Uploads are stopped. Delete some images and the stop-upload file to reallow uploads.';
                }
                case 'delete' {
                    say '[Lufi cron job watch] Older files are being deleted';
                    do {
                        for my $file (LufiDB::Files->select('WHERE deleted = 0 ORDER BY created_at ASC LIMIT 50')) {
                            my $f = Lufi::File->new(record => $file);
                            $file->delete;
                        }
                    } while (du(qw/files/) > $config->{max_total_size});
                }
                else {
                    say '[Lufi cron job watch] Unrecognized policy_when_full option: '.$config->{policy_when_full}.'. Aborting.';
                }
            }
        } else {
            unlink 'stop-upload' if (-f 'stop-upload');
        }
    } else {
        say "[Lufi cron job watch] No max_total_size found in the configuration file. Aborting.";
    }
}

=encoding utf8

=head1 NAME

Lufi::Command::cron::watch - Watch the files directory and take action when over quota

=head1 SYNOPSIS

  Usage: script/lufi cron watch

=cut

1;
