DROP DATABASE IF EXISTS election;
CREATE DATABASE election;
USE election;

SOURCE db/schema.sql;
SOURCE db/seeds.sql;