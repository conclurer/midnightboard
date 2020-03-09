CREATE TABLE public.post (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer REFERENCES member (id) ON DELETE SET NULL,
    type_of_post VARCHAR(127) NOT NULL,
    title VARCHAR(50),
    content text,
    due_date bigint NOT NULL,
    interactive_due_date bigint
);