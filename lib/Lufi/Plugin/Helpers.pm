# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Plugin::Helpers;
use Mojo::Base 'Mojolicious::Plugin';
use Lufi::DB::File;
use Data::Entropy qw(entropy_source);

sub register {
    my ($self, $app) = @_;

    # PgURL helper
    if ($app->config('dbtype') eq 'postgresql' || $app->config('dbtype') eq 'mysql') {
        $app->plugin('PgURLHelper');
    }


    if ($app->config('dbtype') eq 'postgresql') {
        require Mojo::Pg;
        $app->helper(dbi => \&_pg);

        # Database migration
        my $migrations = Mojo::Pg::Migrations->new(pg => $app->dbi);
        if ($app->mode eq 'development' && $ENV{LUFI_DEV}) {
            $migrations->from_file('utilities/migrations/pg.sql')->migrate(0)->migrate(1);
        } else {
            $migrations->from_file('utilities/migrations/pg.sql')->migrate(1);
        }
    } elsif ($app->config('dbtype') eq 'sqlite') {
        require Mojo::SQLite;
        $app->helper(dbi => \&_sqlite);

        # Database migration
        # Have to create $sql before using its migrations attribute, otherwise, it won't work
        my $sql        = $app->dbi;
        my $migrations = $sql->migrations;
        if ($app->mode eq 'development' && $ENV{LUFI_DEV}) {
            $migrations->from_file('utilities/migrations/sqlite.sql')->migrate(0)->migrate(1);
        } else {
            $migrations->from_file('utilities/migrations/sqlite.sql')->migrate(1);
        }
        my $columns = $app->dbi->db->query('PRAGMA table_info(files)')->hashes;
        if ($columns->size == 14) { # Missing passwd column
            $app->dbi->db->query('ALTER TABLE files ADD COLUMN passwd TEXT');
        }
    }

    $app->helper(provisioning  => \&_provisioning);
    $app->helper(get_empty     => \&_get_empty);
    $app->helper(shortener     => \&_shortener);
    $app->helper(ip            => \&_ip);
    $app->helper(default_delay => \&_default_delay);
    $app->helper(max_delay     => \&_max_delay);
    $app->helper(is_selected   => \&_is_selected);
    $app->helper(stop_upload   => \&_stop_upload);
}

sub _pg {
    my $c = shift;

    state $pg = Mojo::Pg->new($c->app->pg_url($c->app->config('pgdb')));
    return $pg;
}

sub _sqlite {
    my $c = shift;

    state $sqlite = Mojo::SQLite->new('sqlite:'.$c->app->config('db_path'));
    return $sqlite;
}

sub _provisioning {
    my $c = shift;

    # Create some short patterns for provisioning
    my $ldfile = Lufi::DB::File->new(app => $c->app);
    if ($ldfile->count_empty < $c->app->config('provisioning')) {
        for (my $i = 0; $i < $c->app->config('provis_step'); $i++) {
            my $short;
            do {
                $short = $c->shortener($c->app->config('length'));
            } while ($ldfile->already_exists($short));

            $ldfile->created_at(undef)->short($short)->write;
        }
    }
}

sub _get_empty {
    my $c =  shift;

    my $ldfile = Lufi::DB::File->new(app => $c->app)->get_empty;

    return $ldfile;
}

sub _shortener {
    my $c      = shift;
    my $length = shift;

    my @chars  = ('a'..'z','A'..'Z','0'..'9', '-', '_');
    my $result = '';
    foreach (1..$length) {
        $result .= $chars[entropy_source->get_int(scalar(@chars))];
    }
    return $result;
}

sub _ip {
    my $c           = shift;
    my $proxy       = $c->req->headers->header('X-Forwarded-For');
    my $ip          = ($proxy) ? $proxy : $c->tx->remote_address;
    my $remote_port = (defined($c->req->headers->header('X-Remote-Port'))) ? $c->req->headers->header('X-Remote-Port') : $c->tx->remote_port;

    return "$ip remote port:$remote_port";
}

sub _default_delay {
    my $c = shift;

    return $c->app->config('default_delay') if ($c->app->config('default_delay') >= 0);

    warn "default_delay set to a negative value. Default to 0.";
    return 0;
}

sub _max_delay {
    my $c = shift;

    return $c->app->config('max_delay') if ($c->app->config('max_delay') >= 0);

    warn "max_delay set to a negative value. Default to 0.";
    return 0;
}

sub _is_selected {
    my $c   = shift;
    my $num = shift;

    return ($num == $c->max_delay)     ? 'selected="selected"' : '' if ($c->max_delay && !$c->default_delay);
    return ($num == $c->default_delay) ? 'selected="selected"' : '';
}

sub _stop_upload {
    my $c = shift;

    if (-f 'stop-upload' || -f 'stop-upload.manual') {
        return 1;
    }
    return 0;
}

1;
