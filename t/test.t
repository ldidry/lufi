# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
use Mojo::Base -strict;
use Mojo::File;
use Mojo::JSON qw(to_json from_json true);
use Mojolicious;

use Test::More;
use Test::Mojo;

use Lufi::DB::File;
use Lufi::DB::Slice;
use FindBin qw($Bin);

my ($m, $cfile, $config_orig, $config_file, $config_content);

my $msg = to_json {
    "total"             => 1,
    "part"              => 0,
    "size"              => 7,
    "name"              => "foobar.txt",
    "type"              => "text/plain",
    "delay"             => "0",
    "del_at_first_view" => 1,
    "id"                => undef,
    "zipped"            => 0,
    "i"                 => 0
};
my $encrypted     = '"{\\"iv\\":\\"2RGAviAeYybBqcLCmnqlgA==\\",\\"v\\":1,\\"iter\\":10000,\\"ks\\":128,\\"ts\\":64,\\"mode\\":\\"ccm\\",\\"adata\\":\\"\\",\\"cipher\\":\\"aes\\",\\"salt\\":\\"1dvKtbZ8hxA=\\",\\"ct\\":\\"w9wDZCwNSyH/yL7q1GW5fPSdi+w=\\"}"';
my $encrypted_rgx = $encrypted;
$encrypted_rgx    =~ s@\\@\\\\@g;
$encrypted_rgx    =~ s@\+@\\+@g;
$encrypted_rgx    =~ s@(\{|\})@\\$1@g;

BEGIN {
    use lib 'lib';
    $m = Mojolicious->new;
    $cfile = Mojo::File->new($Bin, '..', 'lufi.conf');
    if (defined $ENV{MOJO_CONFIG}) {
        $cfile = Mojo::File->new($ENV{MOJO_CONFIG});
        unless (-e $cfile->to_abs) {
            $cfile = Mojo::File->new($Bin, '..', $ENV{MOJO_CONFIG});
        }
    }
    my $config = $m->plugin(
        'Config' => {
            file    => $cfile->to_abs->to_string,
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
        }
    );
    $m->plugin('Lufi::Plugin::Helpers');
    $m->plugin('DebugDumperHelper');
} ## end BEGIN

Lufi::DB::Slice->new(app => $m)->delete_all;
Lufi::DB::File->new(app => $m)->delete_all;

my $t = Test::Mojo->new('Lufi');

## Wait for short generation
sleep 5;

## Let's go
$t->get_ok('/')
  ->status_is(200)
  ->content_like(qr@Lufi@i);

test_upload_file();
test_download_file();

## Test htpasswd
switch_to_htpasswd();
auth_test_suite('luc', 'toto');
restore_config();

## Test LDAP
switch_to_ldap();
auth_test_suite('zoidberg', 'zoidberg');
restore_config();

done_testing();

######
### Functions
##
sub test_upload_file {
    $t->websocket_ok('/upload/')
      ->send_ok($msg.'XXMOJOXX'.$encrypted)
      ->message_ok
      ->message_like(qr@"created_at":\d+@)
      ->message_like(qr@"del_at_first_view":true@)
      ->message_like(qr@"delay":0@)
      ->message_like(qr@"duration":\d+@)
      ->message_like(qr@"i":0@)
      ->message_like(qr@"j":0@)
      ->message_like(qr@"name":"foobar\.txt"@)
      ->message_like(qr@"parts":1@)
      ->message_like(qr@"sent_delay":0@)
      ->message_like(qr@"short":"[^"]+"@)
      ->message_like(qr@"size":7@)
      ->message_like(qr@"success":true@)
      ->message_like(qr@"token":"[^"]+"}@)
      ->finish_ok;
}

sub test_download_file {
    my $ws_msg;
    $t->ua->websocket_p('/upload/')->then(sub {
        my $tx = shift;
        my $promise = Mojo::Promise->new;
        $tx->on(finish => sub { $promise->resolve });
        $tx->on(message => sub {
            my $tx = shift;
            $ws_msg = shift;
            $tx->finish;
        });
        $tx->send($msg.'XXMOJOXX'.$encrypted);
        return $promise;
    })->catch(sub {
        my $err = shift;
        is($err, undef);
    })->wait;

    $ws_msg = from_json($ws_msg);
    $t->websocket_ok('/download/'.$ws_msg->{short})
      ->send_ok(to_json({part => 0}))
      ->message_ok
      ->message_like(qr@"total":1@)
      ->message_like(qr@"part":0@)
      ->message_like(qr@"i":0@)
      ->message_like(qr@"id":null@)
      ->message_like(qr@"del_at_first_view":1@)
      ->message_like(qr@"delay":"0"@)
      ->message_like(qr@"name":"foobar\.txt"@)
      ->message_like(qr@"size":7@)
      ->message_like(qr@"type":"text\\/plain"@)
      ->message_like(qr@XXMOJOXX@)
      ->message_like(qr@$encrypted_rgx@)
      ->send_ok(to_json({ended => true}))
      ->finish_ok;

    # The file is not supposed to be available anymore
    $t->websocket_ok('/download/'.$ws_msg->{short})
      ->send_ok(to_json({part => 0}))
      ->message_ok
      ->message_like(qr@"msg":"Error: the file existed but was deleted\."@)
      ->message_like(qr@"success":false@)
      ->send_ok(to_json({ended => true}))
      ->finish_ok;
}

sub auth_test_suite {
    my ($login, $pass) = @_;

    $t->get_ok('/')
      ->status_is(302)
      ->header_is(Location => '/login');

    test_fail_upload();
    test_login($login, $pass);
    test_upload_file();
    test_download_file();

    my $token = '';

    $t->post_ok('/logout' => form => { csrf_token => $token })
      ->status_is(200)
      ->content_like(qr@Bad CSRF token\.@);

    $token = $t->ua->get('/')->res->dom->find('input[name="csrf_token"]')->first->attr('value');

    $t->post_ok('/logout' => form => { csrf_token => $token })
      ->status_is(200)
      ->content_like(qr@You have been successfully logged out\.@);

    test_fail_upload();
}

sub test_fail_upload {
    # An empty message would make it fail if we were allowed to go in the authenticated part
    $t->websocket_ok('/upload/')
      ->send_ok('')
      ->finish_ok;
}

sub test_login {
    my ($login, $pass) = @_;
    $t->get_ok('/login')
      ->status_is(200)
      ->content_like(qr@Signin@);

    my $token = '';

    $t->post_ok('/login' => form => { login => $login, password => $pass, csrf_token => $token })
      ->status_is(200)
      ->content_like(qr@Bad CSRF token\.@);

    $token = $t->ua->get('/login')->res->dom->find('input[name="csrf_token"]')->first->attr('value');

    $t->post_ok('/login' => form => { login => $login, password => $pass, csrf_token => $token })
      ->status_is(302)
      ->header_is(Location => '/');

    $t->get_ok('/login')
      ->status_is(302)
      ->header_is(Location => '/');
}

sub restore_config {
    $config_file->spurt($config_orig);
}

sub switch_to_htpasswd {
    $config_file    = Mojo::File->new($cfile->to_abs->to_string);
    $config_content = $config_file->slurp;
    $config_orig    = $config_content;
    $config_content =~ s/#?htpasswd.*/htpasswd => 't\/lufi.passwd',/gm;
    $config_file->spurt($config_content);

    Lufi::DB::Slice->new(app => $m)->delete_all;
    Lufi::DB::File->new(app => $m)->delete_all;

    $t = Test::Mojo->new('Lufi');

    ## Wait for short generation
    sleep 5;
}

sub switch_to_ldap {
    $config_content = $config_orig;
    $config_content =~ s/^( +)#?ldap => \{ uri/$1ldap => { uri/gm;
    $config_file->spurt($config_content);

    Lufi::DB::Slice->new(app => $m)->delete_all;
    Lufi::DB::File->new(app => $m)->delete_all;

    $t = Test::Mojo->new('Lufi');

    ## Wait for short generation
    sleep 5;
}
