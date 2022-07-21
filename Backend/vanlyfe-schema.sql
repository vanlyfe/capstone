CREATE TABLE users(
    id              SERIAL PRIMARY KEY,
    password        TEXT NOT NULL,
    firstName      TEXT NOT NULL,
    lastName       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    username       TEXT NOT NULL UNIQUE,
    image_url      TEXT,
    location       TEXT,
    birthdate      TEXT,
    createdAt      TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt      TIMESTAMP NOT NULL DEFAULT NOW(),
    gender         TEXT,
    bio            TEXT,
    phone          INTEGER

);

CREATE TABLE listings(
    id                  SERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    price               INTEGER NOT NULL,
    location            TEXT NOT NULL,
    max_accomodation    INTEGER NOT NULL,
    model               TEXT,
    description         TEXT,
    image_url           TEXT NOT NULL,
    image_url2          TEXT,
    image_url3          TEXT,
    image_url4          TEXT,
    image_url5          TEXT,
    createdAt           TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt           TIMESTAMP NOT NULL DEFAULT NOW(),
    fees                FLOAT

);

CREATE TABLE  orders(
    id                  SERIAL PRIMARY KEY,
    user_id             INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    createdAt           TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt           TIMESTAMP NOT NULL DEFAULT NOW(),
    fees                FLOAT,
    taxes               FLOAT NOT NULL,
    total               FLOAT NOT NULL,
    guests              INTEGER NOT NULL,
    dates               TEXT NOT NULL,
    listing_id          INTEGER NOT NULL,
    FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
   


);
