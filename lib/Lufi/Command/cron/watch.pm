package Lufi::Command::cron::watch;
use Mojo::Base 'Mojolicious::Command';
use Filesys::DiskUsage qw/du/;
use Lufi::DB::File;
use Switch;
use FindBin qw($Bin);
use Lufi::DefaultConfig qw($default_config);

has description => 'Watch the files directory and take action when over quota';
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

    if (defined($config->{max_total_size})) {
        my $total = du(($c->app->config('upload_dir')));

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
                    my $ldfile = Lufi::DB::File->new(app => $c->app);
                    do {
                        $ldfile->get_oldest_undeleted_files(50)->each(
                            sub {
                                my ($f, $num) = @_;
                                $f->delete;
                            }
                        );
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
