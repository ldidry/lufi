# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::breakingchanges;
use Mojo::Base 'Mojolicious::Commands';

has description => 'Execute tasks.';
has hint        => <<EOF;

See 'script/lufi breakingchanges help TASK' for more information on a specific task.
EOF
has message    => sub { shift->extract_usage . "\nCron tasks:\n" };
has namespaces => sub { ['Lufi::Command::breakingchanges'] };

sub help { shift->run(@_) }

1;

=encoding utf8

=head1 NAME

Lufi::Command::breakingchanges - Cron commands

=head1 SYNOPSIS

  Usage: script/lufi breakingchanges TASK [OPTIONS]

=cut
