CREATE TABLE public.post (
    post_id serial NOT NULL PRIMARY KEY,
    title VARCHAR(50),
    type_of_post VARCHAR(10) NOT NULL,
    content jsonb,
    board_id integer REFERENCES board (board_id),
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);