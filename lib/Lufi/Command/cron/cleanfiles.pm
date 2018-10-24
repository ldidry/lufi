# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::cron::cleanfiles;
use Mojo::Base 'Mojolicious::Command';
use Lufi::DB::File;
use FindBin qw($Bin);

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
        default => {
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
