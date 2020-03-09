CREATE TABLE public.board (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer REFERENCES member (id) ON DELETE SET NULL,
    board_name VARCHAR(50) NOT NULL UNIQUE
);