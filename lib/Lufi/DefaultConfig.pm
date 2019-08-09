# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::DefaultConfig;
require Exporter;
@ISA = qw(Exporter);
@EXPORT_OK = qw($default_config);
our $default_config = {
    instance_name => 'Lufi',
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
    keep_ip_during           => 365,
    policy_when_full         => 'warn',
};

1;
