CREATE TABLE public.board_subscription (
    id serial NOT NULL PRIMARY KEY,
    board_id integer NOT NULL REFERENCES board (id) ON DELETE CASCADE,
    member_id integer NOT NULL REFERENCES member (id) ON DELETE CASCADE
);