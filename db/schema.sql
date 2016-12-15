BEGIN;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS destinations;
DROP TABLE IF EXISTS itinerary;
DROP TABLE IF EXISTS operators;

CREATE TABLE users (
  user_id SERIAL,
  username VARCHAR NOT NULL PRIMARY KEY UNIQUE,
  password VARCHAR NOT NULL,
  saved_itinerary INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE destinations (
  city VARCHAR NOT NULL,
  country VARCHAR NOT NULL,
  activity VARCHAR NOT NULL,
  operator VARCHAR NOT NULL,
  email VARCHAR NOT NULL
);

CREATE TABLE itinerary (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  itinerary VARCHAR(20000) NOT NULL
);

CREATE TABLE operators (
  operator_id SERIAL,
  username VARCHAR NOT NULL PRIMARY KEY UNIQUE,
  password VARCHAR NOT NULL,
  saved_itinerary INTEGER NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT current_timestamp
);

COMMIT;







