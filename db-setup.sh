#!/bin/bash
# first paramter $1 = user role ,second paramter is password $2 and third parameter name of database $3
clear 
if [ "$#" -eq  "3" ]
   then
   psql -h localhost -U postgres -tc "SELECT 1 FROM pg_user WHERE usename = '$1'" | grep -q 1 || psql -h localhost -U postgres -c "CREATE ROLE $1 WITH LOGIN SUPERUSER INHERIT CREATEDB CREATEROLE REPLICATION ENCRYPTED PASSWORD '$2';"
   psql -h localhost -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = '$3'" | grep -q 1 || psql -h localhost -U postgres -c "CREATE DATABASE $3 WITH OWNER = $1 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' TABLESPACE = pg_default CONNECTION LIMIT = -1;" 
   echo "Done with database set up"
 else
   echo "make sure you specify all parameter : username password_for_user database"
fi;