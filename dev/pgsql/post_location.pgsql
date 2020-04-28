CREATE TABLE public.post_location (
    id serial NOT NULL PRIMARY KEY,
    board_id integer NOT NULL REFERENCES board (id) ON DELETE CASCADE,
    post_id integer NOT NULL REFERENCES post (id) ON DELETE CASCADE
);