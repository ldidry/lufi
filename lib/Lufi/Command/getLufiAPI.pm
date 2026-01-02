# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package Lufi::Command::getLufiAPI;
use Mojo::Base 'Mojolicious::Commands';
use Mojo::File qw(tempdir tempfile);
use Mojo::UserAgent;
use FindBin qw($Bin);
use IO::Uncompress::Unzip qw(unzip $UnzipError);
use Lufi::DefaultConfig qw(LUFI_API_VERSION);

has description => 'Download and extract Lufi-API js library.';
has usage => sub { shift->extract_usage };

sub run {
    my $c = shift;

    my $home = Mojo::File->new($Bin, '..', 'themes', 'default', 'public', 'js');
    my $worker_dir = Mojo::File->new($home, 'minified', 'worker');

    my $version_file = Mojo::File->new($worker_dir, 'VERSION');
    if (-e $version_file && $version_file->slurp() eq LUFI_API_VERSION) {
        say sprintf('Lufi-API js library is already at version %s', LUFI_API_VERSION);
        say sprintf('To force a re-download, remove the file %s', $version_file);
        exit;
    }

    my $url = sprintf('https://framagit.org/Booteille/lufi-api/-/releases/%s/downloads/lufi-api.zip', LUFI_API_VERSION);

    my $ua  = Mojo::UserAgent->new->max_redirects(5);
    my $res = $ua->get($url)->result;
    if ($res->is_success) {
        my $zipfile = tempfile('lufi-api.zip-XXXXXXX', DIR=> '/tmp')->spew($res->body);

        my $dest = tempdir('lufi-api-XXXXXXX', DIR=> '/tmp');

        # Unzip file with IO::Uncompress::Unzip
        # https://gist.github.com/eqhmcow/5389877
        # Adapted for Mojolicious
        my $u = IO::Uncompress::Unzip->new("$zipfile")
            or die "Cannot open downloaded content: $UnzipError";

        my $status;
        my %dirs;
        for ($status = 1; $status > 0; $status = $u->nextStream()) {
            # bail on error
            last if $status < 0;

            my $header = $u->getHeaderInfo();
            my $stored_time = $header->{'Time'};
            my $tmpfile = Mojo::File->new($header->{Name});

            # If it’s a directory, skip it
            next if ($tmpfile =~ m@/$@);

            my $path = $tmpfile->dirname;
            my $name = $tmpfile->basename;

            my $destdir = "$dest/$path";
            my $destfile = "$destdir/$name";
            # https://cwe.mitre.org/data/definitions/37.html
            # CWE-37: Path Traversal
            die "unsafe $destfile" if $destfile =~ m@\Q..\E(/|\\)@;

            # don't try to overwrite an existant file by creating a directory
            if (-e $destdir and not -d $destdir) {
                die "Cannot create directory $destdir: File or path already exists.\nTry extracting " .
                    "to a different directory.";
            }

            # skip if the entire path is just an existant directory
            next if (-d $destfile);

            # ok let's make a directory for this zip archive entry
            unless (-d $destdir) {
                Mojo::File->new($destdir)->make_path or die "Couldn't mkdir $destdir: $!";

                # we're done if the entire path is simply the directory we
                # just created
                if (-d $destfile) {
                    # this entry is probably for the directory itself, so store
                    # its mtime, because we have to touch all the dirs after
                    # creating all the files; otherwise as we process the archive,
                    # file creation will just reset each directory's mtime
                    $dirs{$destdir} = $stored_time;

                    next;
                }
            }

            # ok we should have a valid file here we can extract
            my $buff;
            my $fh = IO::File->new($destfile, "w")
                or die "Couldn't write to $destfile: $!";

            $fh->binmode();

            while (($status = $u->read($buff)) > 0) {
                $fh->write($buff);
            }
            $fh->close();
            utime ($stored_time, $stored_time, $destfile)
                or die "Couldn't touch $destfile: $!";
        }

        die "Error processing downloaded content: $UnzipError $!\n"
            if $status < 0 ;

        # touch all the dirs that we created and that also had explicit directory
        # entries in the archive
        foreach my $dirpath (keys %dirs) {
            my $stored_time = $dirs{$dirpath};
            utime($stored_time, $stored_time, $dirpath)
                or die "Couldn't touch directory $dirpath: $!";
        }

        # The archive has been unzipped, now let’s move the files
        my $lufi_js = Mojo::File->new($home, 'lib', 'lufi.js');
        Mojo::File->new($home, 'lib')->make_path();
        Mojo::File->new($dest, 'dist', 'index.js')->move_to($lufi_js);

        Mojo::File->new($worker_dir)->remove_tree();
        Mojo::File->new($worker_dir)->make_path();

        Mojo::File->new($dest, 'dist', 'worker')->list->each(sub {
            shift->move_to($worker_dir);
        });

        # If the release does not contain a VERSION file
        $version_file->spew(LUFI_API_VERSION) if (! -e $version_file);
        say sprintf('Lufi-API js library version %s has been successfully downloaded', LUFI_API_VERSION);
    } elsif ($res->is_error) {
        say $res->message;
    } else {
        say sprintf('Unable to download Lufi-API js library version %s', LUFI_API_VERSION);
    }
}

=encoding utf8

=head1 NAME

Lufi::Command::getLufiAPI - Download and extract Lufi-API js library

=head1 SYNOPSIS

  Usage: script/lufi getLufiAPI

  Lufi-API files will be placed in themes/default/public/js/minified/worker/
  except for themes/default/public/js/lib/lufi.js.
=cut

1;
