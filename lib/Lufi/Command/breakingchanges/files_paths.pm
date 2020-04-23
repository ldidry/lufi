# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::breakingchanges::files_paths;
use Mojo::Base 'Mojolicious::Command';
use FindBin qw($Bin);
use Lufi::DB::Slice;
use Lufi::DB::BreakingChange;
use Lufi::DefaultConfig qw($default_config);
use Term::ProgressBar;

has description => 'Update existing files’ paths in DB to change them to paths relative to storage system (filesystem or Swift).';
has usage       => sub { shift->extract_usage };

sub run {
    my $c = shift;

    my $bc = Lufi::DB::BreakingChange->new(app => $c->app, change => 'files_paths');
    if ($bc->ack) {
        say 'Change "files_paths" already applied. Exiting.';
        exit;
    }

    say 'Getting number of database records to update, it can take some time.';
    my $count = Lufi::DB::Slice->new(app => $c->app)->count();
    if ($count) {
        say sprintf('There is %d database records to update, please be patient.', $count);
        print 'Do you want to continue? [Y/n] ';
        my $confirm = <STDIN>;

        if ($confirm =~ m/yes|y/i) {
            my $progress = Term::ProgressBar->new({ count => $count, ETA => 'linear', name => 'Updating paths' });

            Lufi::DB::Slice->new(app => $c->app)->convert_paths($progress);

            $bc->acknowledge;
            say 'Change "files_paths" successfully applied. You can now start Lufi.';
        } else {
            say 'Change "files_paths" not applied. You won’t be able to start Lufi';
        }
    } else {
        say 'No records in database. Setting "files_paths" change as applied.';
        $bc->acknowledge;
        say 'Change "files_paths" successfully applied. You can now start Lufi.';
    }
}

=encoding utf8

=head1 NAME

Lufi::Command::breakingchanges::files_paths - Update existing files’ paths in DB to change them to paths relative to storage system (filesystem or Swift).

=head1 SYNOPSIS

  Usage: script/lufi breakingchanges files_paths

=cut

1;
