CREATE TABLE public.token (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    uid int NOT NULL,
    refresh_token text
);