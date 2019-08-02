-- 1 up
CREATE TABLE IF NOT EXISTS files (
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
       complete              INTEGER,
       passwd                TEXT
);
CREATE TABLE IF NOT EXISTS slices (
    short                 TEXT,
    j                     INTEGER,
    path                  TEXT,
    FOREIGN KEY (short) REFERENCES files(short)
);
CREATE INDEX IF NOT EXISTS slices_idx ON slices(short);
-- 1 down
DROP INDEX slices_idx ON slices(short);
DROP TABLE slices;
DROP TABLE files;
-- 2 up
ALTER TABLE files ADD COLUMN abuse INTEGER;
-- 2 down
BEGIN TRANSACTION;
    CREATE TABLE files_backup (
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
       complete              INTEGER,
       passwd                TEXT
    );
    INSERT INTO files_backup SELECT short, deleted, mediatype, filename, filesize, counter, delete_at_first_view, delete_at_day, created_at, created_by, last_access_at, mod_token, nbslices, complete, passwd FROM files;
    DROP TABLE files;
    ALTER TABLE files_backup RENAME TO files;
COMMIT;
-- 3 up
ALTER TABLE files ADD COLUMN zipped INTEGER;
-- 3 down
BEGIN TRANSACTION;
    CREATE TABLE files_backup (
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
       complete              INTEGER,
       passwd                TEXT,
       abuse                 INTEGER
    );
    INSERT INTO files_backup SELECT short, deleted, mediatype, filename, filesize, counter, delete_at_first_view, delete_at_day, created_at, created_by, last_access_at, mod_token, nbslices, complete, passwd, abuse FROM files;
    DROP TABLE files;
    ALTER TABLE files_backup RENAME TO files;
COMMIT;
-- 4 up
CREATE TABLE IF NOT EXISTS invitations (
       token                 TEXT PRIMARY KEY,
       ldap_user             TEXT,
       ldap_user_mail        TEXT,
       guest_mail            TEXT,
       created_at            INTEGER,
       expire_at             INTEGER,
       files_sent_at         INTEGER,
       expend_expire_at      INTEGER,
       files                 TEXT,
       show_in_list          INTEGER,
       deleted               INTEGER
);
-- 4 down
DROP TABLE invitations;
