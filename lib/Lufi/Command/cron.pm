# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::cron;
use Mojo::Base 'Mojolicious::Commands';

has description => 'Execute tasks.';
has hint        => <<EOF;

See 'script/lufi cron help TASK' for more information on a specific task.
EOF
has message    => sub { shift->extract_usage . "\nCron tasks:\n" };
has namespaces => sub { ['Lufi::Command::cron'] };

sub help { shift->run(@_) }

1;

=encoding utf8

=head1 NAME

Lufi::Command::cron - Cron commands

=head1 SYNOPSIS

  Usage: script/lufi cron TASK [OPTIONS]

=cut
