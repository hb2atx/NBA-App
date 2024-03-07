-- Prompt function
\set PROMPT1 'Return for yes or control-C to cancel > '

-- Prompt for overpaid database recreation
\echo 'Delete and recreate overpaid db?'
\prompt :PROMPT1 foo

-- Drop and recreate overpaid database
DROP DATABASE IF EXISTS overpaid_hmkk;
CREATE DATABASE overpaid_hmkk;
\c overpaid

-- Prompt for overpaid_test database recreation
\echo 'Delete and recreate overpaid_test db?'
\prompt :PROMPT1 foo

-- Drop and recreate overpaid_test database
DROP DATABASE IF EXISTS overpaid_hmkk_test;
CREATE DATABASE overpaid_hmkk_test;
\c overpaid_hmkk_test


