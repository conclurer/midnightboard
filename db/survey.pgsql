CREATE TABLE public.survey (
    survey_id serial NOT NULL PRIMARY KEY,
    post_id integer REFERENCES post (post_id) ON DELETE CASCADE,
    question_id integer NOT NULL,
    answer text,
    vote integer
);