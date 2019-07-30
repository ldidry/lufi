# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Mail;
use Mojo::Base 'Mojolicious::Controller';
use Mojo::JSON qw(decode_json);
use Mojo::URL;
use Email::Valid;
use URI::Find;

sub render_mail {
    my $c = shift;
    my $links = (defined($c->param('links'))) ? decode_json($c->param('links')) : [];

    $c->redirect_to('/') unless (scalar(@{$links}));

    $c->render(
        template => 'mail',
        links    => $links
    );
}

sub send_mail {
    my $c = shift;

    my $validation = $c->validation;
    return $c->render(text => $c->l('Bad CSRF token!'), status => 403) if $validation->csrf_protect->has_error('csrf_token');

    my $emails  = $c->param('emails');
    my $body    = $c->param('body');
    my $subject = $c->param('subject');
    my $msg     = '';

    my $base_url  = $c->req->url->to_abs->path($c->config('prefix').'r/');
    my $fixed_url = $base_url;
    if ($c->config('fixed_domain')) {
        $fixed_url->host($c->config('fixed_domain'));
    }
    my $at_least_one_instance_url = 0;
    my $finder = URI::Find->new(sub {
        my ($uri, $orig_uri) = @_;
        $uri = Mojo::URL->new($uri);
        if ($uri->host ne $base_url->to_abs->host && $uri->host ne $fixed_url->to_abs->host) {
            $msg .= $c->l('You can\'t add URLs that are not related to this instance.').'<br>';
        } elsif (index($orig_uri, $fixed_url->to_abs->to_string) > -1) {
            $at_least_one_instance_url = 1;
        }
        return $orig_uri;
    });
    $finder->find(\$body);
    $finder->find(\$subject);

    $c->debug($at_least_one_instance_url);
    unless ($at_least_one_instance_url) {
        $msg .= $c->l('The body of the mail must contain at least one URL pointing to a file hosted on this instance.').'<br>';
    }

    $emails =~ s/ //g;
    my @a   = split(',', $emails);

    my @bad;
    my @good;
    for my $email (@a) {
        if (!Email::Valid->address($email)) {
            push @bad, $email;
        }
    }

    if (scalar(@bad)) {
        $msg .= $c->l('The following email addresses are not valid: %1', join(', ', @bad)).'<br>';
    }

    $msg .= $c->l('You must give email addresses.').'<br>'     unless (scalar(@a));
    $msg .= $c->l('The email subject can\'t be empty.').'<br>' unless ($subject);
    $msg .= $c->l('The email body can\'t be empty.').'<br>'    unless ($body);

    if ($msg) {
        return $c->render(
            template => 'mail',
            msg      => $msg,
            links    => [],
            values   => {
                emails  => $emails,
                subject => $subject,
                body    => $body
            }
        )
    }

    $c->mail(
        from    => $c->config('mail_sender'),
        bcc     => $emails,
        subject => $subject,
        data    => $body
    );

    return $c->render(
        template    => 'msg',
        msg_success => $c->l('The mail has been sent.')
    );
}

1;
