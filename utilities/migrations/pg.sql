-- 1 up
CREATE TABLE IF NOT EXISTS files (
    short                text PRIMARY KEY,
    deleted              boolean default false,
    mediatype            text,
    filename             text,
    filesize             integer,
    counter              integer default 0,
    delete_at_first_view boolean,
    delete_at_day        integer,
    created_at           integer,
    created_by           text,
    last_access_at       integer,
    mod_token            text,
    nbslices             integer,
    complete             boolean default false,
    passwd               text
);

CREATE TABLE IF NOT EXISTS slices (
    short text        NOT NULL REFERENCES files(short) ON DELETE CASCADE,
    j     integer     NOT NULL,
    path  text unique NOT NULL,
    constraint slice_short_j UNIQUE (short, j)
);
-- 1 down
DROP TABLE slices;
DROP TABLE files;
-- 2 up
ALTER TABLE files ADD COLUMN abuse integer;
-- 2 down
ALTER TABLE files DROP COLUMN abuse;
-- 3 up
ALTER TABLE files ADD COLUMN zipped boolean default false;
-- 3 down
ALTER TABLE files DROP COLUMN zipped;
-- 4 up
CREATE TABLE IF NOT EXISTS invitations (
       token                 text PRIMARY KEY,
       ldap_user             text,
       ldap_user_mail        text,
       guest_mail            text,
       created_at            integer,
       expire_at             integer,
       files_sent_at         integer,
       expend_expire_at      integer,
       files                 text,
       show_in_list          boolean,
       deleted               boolean
);
-- 4 down
DROP TABLE invitations;
-- 5 up
ALTER TABLE files ALTER COLUMN filesize TYPE bigint;
-- 5 down
ALTER TABLE files ALTER COLUMN filesize TYPE integer;
