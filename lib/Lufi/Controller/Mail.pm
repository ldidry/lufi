# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Controller::Mail;
use Mojo::Base 'Mojolicious::Controller';
use Email::Valid;
use Mojo::JSON qw(decode_json);

sub render_mail {
    my $c = shift;

    $c->render(
        template => 'mail',
        links    => decode_json($c->param('links'))
    );
}

sub send_mail {
    my $c = shift;

    my $validation = $c->validation;
    return $c->render(text => $c->l('Bad CSRF token!'), status => 403) if $validation->csrf_protect->has_error('csrf_token');

    my $emails = $c->param('emails');

    $emails =~ s/ //g;
    my @a   = split(',', $emails);

    my @bad;
    my @good;
    for my $email (@a) {
        if (!Email::Valid->address($email)) {
            push @bad, $email;
        }
    }

    my $msg = '';
    if (scalar(@bad)) {
        $msg .= $c->l('The following email addresses are not valid: %1', join(', ', @bad))."\n";
    }

    $msg .= $c->l('You must give email addresses.')."\n"     unless (scalar(@a));
    $msg .= $c->l('The email subject can\'t be empty.')."\n" unless ($c->param('subject'));
    $msg .= $c->l('The email body can\'t be empty.')."\n"    unless ($c->param('body'));

    if ($msg) {
        return $c->render(
            template => 'mail',
            msg      => $msg,
            values   => {
                emails  => $emails,
                subject => $c->param('subject'),
                body    => $c->param('body')
            }
        )
    }

    $c->mail(
        from    => $c->config('mail_sender'),
        bcc     => $emails,
        subject => $c->param('subject'),
        data    => $c->param('body')
    );

    return $c->render(
        template    => 'msg',
        msg_success => $c->l('The mail has been sent.')
    );
}

1;
