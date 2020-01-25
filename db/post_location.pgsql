CREATE TABLE public.post_location (
    id serial NOT NULL PRIMARY KEY,
    board_id integer NOT NULL REFERENCES board (board_id) ON DELETE CASCADE,
    post_id integer NOT NULL REFERENCES post (post_id) ON DELETE CASCADE
);