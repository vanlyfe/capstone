\echo "Delete and recreate vanlyfe db?"
\prompt "Return for yes or control-C to cancel >" answer

DROP DATABASE vanlyfe;
CREATE DATABASE vanlyfe;
\connect vanlyfe;

\i vanlyfe-schema.sql

\echo "Delete and recreate vanlyfe_test db?"
\prompt "Return for yes or control-C to cancel >" answer

DROP DATABASE vanlyfe_test;
CREATE DATABASE vanlyfe_test;
\connect vanlyfe_test

\i vanlyfe-schema.sql