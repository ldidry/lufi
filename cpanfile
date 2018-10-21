requires 'inc::Module::Install';
requires 'Mojolicious', '>= 7.31';
requires 'Mojolicious::Plugin::DebugDumperHelper';
requires 'Mojolicious::Plugin::I18N';
requires 'Mojolicious::Plugin::Mail';
requires 'EV';
requires 'Filesys::DiskUsage';
requires 'Switch';
requires 'Locale::Maketext';
requires 'Locale::Maketext::Extract';
requires 'Email::Valid';
requires 'Number::Bytes::Human';
requires 'Filesys::DfPortable';
requires 'Switch';
requires 'Data::Entropy';
requires 'Crypt::SaltedHash';

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
    requires 'ORLite';
}
