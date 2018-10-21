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
       complete              INTEGER
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
