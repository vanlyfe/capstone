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


-- Ratings
-- phone number
-- payment method