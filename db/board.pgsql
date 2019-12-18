CREATE TABLE public.board (
    board_id serial NOT NULL PRIMARY KEY,
    board_name VARCHAR(50) NOT NULL UNIQUE,
    department integer,
    created_at integer NOT NULL,
    updated_at integer NOT NULL
);