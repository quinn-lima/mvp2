CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA messenger_schema
AUTHORIZATION quinnlima
SET search_path TO messenger_schema;

    CREATE TABLE users (
        reviews_key UUID DEFAULT uuid_generate_v4 (),
        id serial NOT NULL UNIQUE,
        username VARCHAR(100),
        password VARCHAR(50),
        Primary Key (id)
    );
    CREATE INDEX ON users(id);

    CREATE TABLE messages (
        characteristics_key UUID DEFAULT uuid_generate_v4 (),
        id serial NOT NULL UNIQUE,
        fromuser INT REFERENCES users (id),
        touser INT REFERENCES users (id),
        message VARCHAR (1000),
        Primary Key (id)
    );
    CREATE INDEX ON messages(id);