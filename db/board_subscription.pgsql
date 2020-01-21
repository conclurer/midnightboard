CREATE TABLE public.board_subscription (
    id serial NOT NULL PRIMARY KEY,
    board_id integer NOT NULL REFERENCES board (board_id) ON DELETE CASCADE,
    member_id integer NOT NULL REFERENCES member (member_id) ON DELETE CASCADE
);