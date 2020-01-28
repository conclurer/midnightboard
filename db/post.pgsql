CREATE TABLE public.post (
    post_id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer REFERENCES member (member_id) ON DELETE SET NULL,
    type_of_post VARCHAR(10) NOT NULL,
    title VARCHAR(50),
    content jsonb,
    due_date bigint NOT NULL,
    interactive_due_date bigint
);