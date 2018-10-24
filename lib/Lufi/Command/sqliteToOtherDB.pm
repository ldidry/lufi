package Lufi::Command::sqliteToOtherDB;
use Mojo::Base 'Mojolicious::Command';
use Lufi::DB::File;
use Lufi::DB::Slice;
use Mojo::SQLite;
use FindBin qw($Bin);
use Term::ProgressBar;

has description => 'Migrate the records from a SQLite db to the currently configured database';
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

    if ($config->{dbtype} eq 'sqlite') {
        say 'Please configure `dbtype` to something else than `sqlite` to use this command.';
        print $c->usage;
        exit 1;
    }

    my $sqlite = Mojo::SQLite->new('sqlite:'.$config->{db_path});
    my $files  = $sqlite->db->select('files', undef)->hashes;
    my $slices = $sqlite->db->select('slices', undef)->hashes;

    my $progress = Term::ProgressBar->new({count => $files->size + $slices->size});

    $files->each(sub {
        my ($file, $num) = @_;

        $progress->update();

        Lufi::DB::File->new(app => $c->app)
                      ->short($file->{short})
                      ->deleted($file->{deleted})
                      ->mediatype($file->{mediatype})
                      ->filename($file->{filename})
                      ->filesize($file->{filesize})
                      ->counter($file->{counter})
                      ->delete_at_first_view($file->{delete_at_first_view})
                      ->delete_at_day($file->{delete_at_day})
                      ->created_at($file->{created_at})
                      ->created_by($file->{created_by})
                      ->last_access_at($file->{last_access_at})
                      ->mod_token($file->{mod_token})
                      ->nbslices($file->{nbslices})
                      ->complete($file->{complete})
                      ->passwd($file->{passwd})
                      ->abuse($file->{abuse})
                      ->write();
    });
    $slices->each(sub {
        my ($slice, $num) = @_;

        Lufi::DB::Slice->new(app => $c->app)
                      ->short($slice->{short})
                      ->j($slice->{j})
                      ->path($slice->{path})
                      ->write();

        $progress->update();
    });
}

=encoding utf8

=head1 NAME

Lufi::Command::cron::sqliteToOtherDB Migrate the records from a SQLite db to the currently configured database

=head1 SYNOPSIS

  Usage: script/lufi sqliteToOtherDB

  This command needs you to:
    - set `db_path` in your config file (otherwise, it will use the default path, `lufi.db` to migrate data from)
    - set `dbtype` to an other database type in your config file
    - configure the other database access in your config file

=cut

1;
