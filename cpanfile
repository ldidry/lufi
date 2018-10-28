requires 'inc::Module::Install';
requires 'Mojolicious', '>= 7.31';
requires 'Mojolicious::Plugin::DebugDumperHelper';
requires 'Mojolicious::Plugin::I18N';
requires 'Mojolicious::Plugin::Mail';
requires 'Mojolicious::Plugin::GzipStatic';
requires 'Mojolicious::Plugin::StaticCache';
requires 'Mojolicious::Plugin::CSPHeader';
requires 'Mojolicious::Plugin::FiatTux::Helpers', '== 0.08', url => 'https://framagit.org/fiat-tux/mojolicious/mojolicious-plugin-fiattux-helpers/-/archive/0.08/mojolicious-plugin-fiattux-helpers-0.08.tar.gz';
requires 'Mojolicious::Plugin::FiatTux::GrantAccess', '== 0.05', url => 'https://framagit.org/fiat-tux/mojolicious/mojolicious-plugin-fiattux-grantaccess/-/archive/0.05/mojolicious-plugin-fiattux-grantaccess-0.05.tar.gz';
requires 'Mojolicious::Plugin::FiatTux::Themes', '== 0.02', url => 'https://framagit.org/fiat-tux/mojolicious/mojolicious-plugin-fiattux-themes/-/archive/0.02/mojolicious-plugin-fiattux-themes-0.02.tar.gz';
requires 'Filesys::DiskUsage';
requires 'Switch';
requires 'Locale::Maketext';
requires 'Locale::Maketext::Extract';
requires 'Email::Valid';
requires 'Number::Bytes::Human';
requires 'Filesys::DfPortable';
requires 'Data::Entropy';
requires 'Crypt::SaltedHash';
requires 'Data::Validate::URI';
requires 'Term::ProgressBar';
requires 'URI::Find';

# Mojolicious optional deps
feature 'optional_deps' => sub {
    requires 'Cpanel::JSON::XS';
    requires 'EV';
    requires 'IO::Socket::Socks';
    requires 'Role::Tiny';
};

feature 'test' => sub {
    requires 'Devel::Cover';
};
feature 'ldap', 'LDAP authentication support' => sub {
    requires 'Net::LDAP';
    requires 'Mojolicious::Plugin::Authentication';
};
feature 'htpasswd', 'Htpasswd authentication support' => sub {
    requires 'Apache::Htpasswd';
    requires 'Mojolicious::Plugin::Authentication';
};
feature 'postgresql', 'PostgreSQL support' => sub {
    requires 'Mojo::Pg';
    requires 'Mojolicious::Plugin::PgURLHelper';
};
feature 'sqlite', 'SQLite support' => sub {
    requires 'Mojo::SQLite', '>= 3.000';
};
feature 'mysql', 'MySQL support' => sub {
    requires 'DBD::mysql', '== 4.046';
    requires 'Mojo::mysql';
    requires 'Mojolicious::Plugin::PgURLHelper';
};
