# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Plugin::Helpers;
use Mojo::Base 'Mojolicious::Plugin';
use Lufi::DB::File;
use Lufi::DB::Invitation;
use Date::Language;

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
            $migrations->from_file('utilities/migrations/pg.sql')->migrate(0)->migrate($migrations->latest);
        } else {
            $migrations->from_file('utilities/migrations/pg.sql')->migrate($migrations->latest);
        }
    } elsif ($app->config('dbtype') eq 'mysql') {
        require Mojo::mysql;
        $app->helper(dbi => \&_mysql);

        # Database migration
        my $migrations = Mojo::mysql::Migrations->new(mysql => $app->dbi);
        if ($app->mode eq 'development' && $ENV{LUFI_DEV}) {
            $migrations->from_file('utilities/migrations/mysql.sql')->migrate(0)->migrate($migrations->latest);
        } else {
            $migrations->from_file('utilities/migrations/mysql.sql')->migrate($migrations->latest);
        }
    } elsif ($app->config('dbtype') eq 'sqlite') {
        require Mojo::SQLite;
        $app->helper(dbi => \&_sqlite);

        # Database migration
        # Have to create $sql before using its migrations attribute, otherwise, it won't work
        my $sql        = $app->dbi;
        my $migrations = $sql->migrations;
        if ($app->mode eq 'development' && $ENV{LUFI_DEV}) {
            $migrations->from_file('utilities/migrations/sqlite.sql')->migrate(0)->migrate($migrations->latest);
        } else {
            $migrations->from_file('utilities/migrations/sqlite.sql')->migrate($migrations->latest);
        }

        # Check if passwd column is missing
        my $columns = $app->dbi->db->query('PRAGMA table_info(files)')->hashes;
        my $pwd_col = 0;
        $columns->each(sub {
            my ($e, $num) = @_;
            $pwd_col = 1 if $e->{name} eq 'passwd';
        });
        $app->dbi->db->query('ALTER TABLE files ADD COLUMN passwd TEXT') unless $pwd_col;
    }

    $app->helper(provisioning            => \&_provisioning);
    $app->helper(get_empty               => \&_get_empty);
    $app->helper(ip                      => \&_ip);
    $app->helper(default_delay           => \&_default_delay);
    $app->helper(max_delay               => \&_max_delay);
    $app->helper(is_selected             => \&_is_selected);
    $app->helper(stop_upload             => \&_stop_upload);
    $app->helper(create_invitation_token => \&_create_invitation_token);
    $app->helper(is_guest                => \&_is_guest);
    $app->helper(get_date_lang           => \&_get_date_lang);
}

sub _pg {
    my $c = shift;

    my $pgdb  = $c->config('pgdb');
    my $port  = (defined $pgdb->{port}) ? $pgdb->{port}: 5432;
    my $addr  = $c->pg_url({
        host => $pgdb->{host}, port => $port, database => $pgdb->{database}, user => $pgdb->{user}, pwd => $pgdb->{pwd}
    });
    state $pg = Mojo::Pg->new($addr);
    $pg->max_connections($pgdb->{max_connections}) if defined $pgdb->{max_connections};
    return $pg;
}

sub _mysql {
    my $c     = shift;

    my $mysqldb  = $c->config('mysqldb');
    my $port  = (defined $mysqldb->{port}) ? $mysqldb->{port}: 3306;
    my $addr  = $c->pg_url({
        host => $mysqldb->{host}, port => $port, database => $mysqldb->{database}, user => $mysqldb->{user}, pwd => $mysqldb->{pwd}
    });
    $addr =~ s/postgresql/mysql/;
    state $mysql = Mojo::mysql->new($addr);
    $mysql->max_connections($mysqldb->{max_connections}) if defined $mysqldb->{max_connections};
    return $mysql;
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

sub _create_invitation_token {
    my $c = shift;

    return $c->shortener(32);
}

sub _is_guest {
    my $c     = shift;
    my $token = shift;

    my $invitation = Lufi::DB::Invitation->new(app => $c->app)->from_token($token);
    return $invitation if ($invitation && $invitation->is_valid);
    return 0;
}

my %date_langs = (
    aa => 'Afar',
    am => 'Amharic',
    pt => 'Brazilian',
    bg => 'Bulgarian',
    zh => 'Chinese',
    cs => 'Czech',
    da => 'Danish',
    nl => 'Dutch',
    fi => 'Finnish',
    en => 'English',
    fr => 'French',
    de => 'German',
    el => 'Greek',
    hu => 'Hungarian',
    is => 'Icelandic',
    it => 'Italian',
    nn => 'Norwegian',
    om => 'Oromo',
    oc => 'Occitan',
    ro => 'Romanian',
    ru => 'Russian',
    so => 'Somali',
    es => 'Spanish',
    sv => 'Swedish',
    ti => 'Tigrinya',
    tk => 'Turkish',
);

sub _get_date_lang {
    my $c     = shift;

    my $l = $c->languages();

    return Date::Language->new($date_langs{$l}) if $date_langs{$l};

    $l =~ s/^(..).*/$1/;
    return Date::Language->new($date_langs{$l}) if $date_langs{$l};

    return Date::Language->new('English');
}

1;
