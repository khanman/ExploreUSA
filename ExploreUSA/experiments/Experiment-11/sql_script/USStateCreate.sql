USE [khan25]


CREATE SCHEMA US


CREATE TABLE US.Data
  (Abbr char(2) NOT NULL PRIMARY KEY,
   Name varchar(40) NOT NULL,
   Population int NOT NULL)
