# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::cron::cleanbdd;
use Mojo::Base 'Mojolicious::Command';
use Lufi::DB::File;
use FindBin qw($Bin);

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
