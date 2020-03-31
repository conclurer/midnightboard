CREATE TABLE public.survey (
    id serial NOT NULL PRIMARY KEY,
    post_id integer REFERENCES post (id) ON DELETE CASCADE,
    question_id integer NOT NULL,
    question text,
    answer text,
    vote integer
);