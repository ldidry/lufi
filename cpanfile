requires 'inc::Module::Install';
requires 'Mojolicious', '>= 7.31';
requires 'Mojolicious::Plugin::DebugDumperHelper';
requires 'Mojolicious::Plugin::I18N';
requires 'Mojolicious::Plugin::Mail';
requires 'Mojolicious::Plugin::GzipStatic';
requires 'Mojolicious::Plugin::StaticCache';
requires 'Mojolicious::Plugin::CSPHeader';
requires 'Mojolicious::Plugin::FiatTux::Helpers', '== 0.06', url => 'https://framagit.org/luc/mojolicious-plugin-fiattux-helpers/-/archive/0.06/mojolicious-plugin-fiattux-helpers-0.06.tar.gz';
requires 'Mojolicious::Plugin::FiatTux::GrantAccess', '== 0.05', url => 'https://framagit.org/luc/mojolicious-plugin-fiattux-grantaccess/-/archive/0.05/mojolicious-plugin-fiattux-grantaccess-0.05.tar.gz';
requires 'EV';
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
}
