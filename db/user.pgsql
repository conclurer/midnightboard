CREATE TABLE public.user (
    user_id serial NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar TEXT,
    department integer,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);