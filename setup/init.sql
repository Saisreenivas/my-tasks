do
$body$
declare
  num_users integer;
begin
  SELECT count(*)
    into num_users
  FROM pg_user
  WHERE usename = 'sai';

  IF num_users = 0 THEN
      CREATE ROLE sai LOGIN PASSWORD 'n4diw5nk';
  END IF;
end
$body$
;
ALTER ROLE sai CREATEDB;
ALTER ROLE sai SUPERUSER;
CREATE DATABASE my_tasks_db WITH OWNER=sai;
GRANT ALL PRIVILEGES ON DATABASE my_tasks_db TO sai;

\c my_tasks_db;

CREATE TABLE IF NOT EXISTS my_tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS my_tasks_status_idx ON my_tasks (status);
CREATE INDEX IF NOT EXISTS my_tasks_month_idx ON my_tasks (date_trunc('month', created_at), status);
CREATE INDEX IF NOT EXISTS my_tasks_month_idx2 ON my_tasks (date(created_at), status);