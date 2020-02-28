CREATE TABLE public.member (
    member_id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    last_seen bigint,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar jsonb,
    language_preference  CHAR(2) DEFAULT 'en' NOT NULL,
    hide_last_name boolean DEFAULT TRUE NOT NULL 
);