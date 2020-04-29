CREATE TABLE public.survey (
    id serial NOT NULL PRIMARY KEY,
    post_id integer REFERENCES post (post_id) ON DELETE CASCADE,
    question_id integer NOT NULL,
    answer text,
    vote integer
);