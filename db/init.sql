CREATE DATABASE todo_db;

\c todo_db;

CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL
);
