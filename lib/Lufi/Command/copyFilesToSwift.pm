package Lufi::Command::copyFilesToSwift;
use Mojo::Base 'Mojolicious::Command';
use File::Spec;
use Term::ProgressBar;

has description => 'Copy files from filesystem to Swift object storage';
has usage       => sub { shift->extract_usage };

sub run {
    my $c = shift;

    if ($c->app->config('swift')) {
        $c->app->check_swift_container();
        my @dirs = glob(File::Spec->catdir($c->app->config('upload_dir'), '*'));

        unless (scalar(@dirs)) {
            say sprintf('The configured upload_dir (%s) seems to be empty. Is `upload_dir` configured in lufi.conf?', $c->app->config('upload_dir'));
            exit 1;
        }
        say sprintf('%d folders to upload to Swift (can\'t say how many files, or the total size, sorry). This can take some time.', scalar(@dirs));
        print 'Do you want to continue? [Y/n] ';
        my $confirm = <STDIN>;

        if ($confirm =~ m/yes|y/i) {
            my $progress = Term::ProgressBar->new({ count => scalar(@dirs), ETA => 'linear', name => 'Copying to Swift'});
            for my $dir (@dirs) {
                my @files = glob(File::Spec->catfile($dir, '*'));
                for my $file (@files) {
                    my ($volume, $directories, $filename) = File::Spec->splitpath($file);
                    my @file_dirs = File::Spec->splitdir($directories);
                    my $short     = ($file_dirs[-1] ne '') ? $file_dirs[-1] : $file_dirs[-2];
                    my $path      = File::Spec->catfile($short, $filename);

                    open my $fh, '<', $file or die sprintf('Unable to open file %s: %s', $file, $!);

                    $c->app->swift->put_object(
                        container_name => $c->app->config('swift')->{container},
                        object_name    => $path,
                        content_length => -s $file,
                        content        => $fh
                    );
                    close $fh;
                }
                $progress->update();
            }
            say sprintf('The copy to Swift object storage has ended. You can test Lufi, then delete `%s` directory', $c->app->config('upload_dir'));
        } else {
            say 'You want to stop. No problem.';
        }
    } else {
        say 'You didn\'t configure `swift` in your config file. Exiting.';
        exit 1;
    }
}

=encoding utf8

=head1 NAME

Lufi::Command::copyFilesToSwift Copy files from filesystem to Swift object storage

=head1 SYNOPSIS

  Usage: script/lufi copyFilesToSwift

  This command needs you to:
    - set `upload_dir` in your config file (otherwise, it will use the default path, `files` to copy files from)
    - configure `swift` with correct informations in your config file

=cut

1;
