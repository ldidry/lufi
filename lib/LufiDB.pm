# vim:set sw=4 ts=4 sts=4 ft=perl expandtab:
package LufiDB;
use Mojolicious;
use FindBin qw($Bin);
use File::Spec::Functions;

BEGIN {
    my $m = Mojolicious->new;
    our $config = $m->plugin('Config' =>
        {
            file    => catfile($Bin, '..' ,'lufi.conf'),
            default => {
                db_path => 'lufi.db'
            }
        }
    );
}

# Create database
use ORLite {
      file    => $config->{db_path},
      unicode => 1,
      create  => sub {
          my $dbh = shift;
          $dbh->do(
              'CREATE TABLE files (
               short                 TEXT PRIMARY KEY,
               deleted               INTEGER,
               mediatype             TEXT,
               filename              TEXT,
               filesize              INTEGER,
               counter               INTEGER,
               delete_at_first_view  INTEGER,
               delete_at_day         INTEGER,
               created_at            INTEGER,
               created_by            TEXT,
               last_access_at        INTEGER,
               mod_token             TEXT,
               nbslices              INTEGER,
               complete              INTEGER)'
          );
          $dbh->do(
              'CREATE TABLE slices (
               short                 TEXT,
               j                     INTEGER,
               path                  TEXT,
               FOREIGN KEY (short) REFERENCES files(short))'
          );
          $dbh->do(
              'CREATE INDEX slices_idx ON slices(short)'
          );
          return 1;
     }
};

1;
