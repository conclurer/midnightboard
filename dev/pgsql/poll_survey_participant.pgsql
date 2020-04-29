CREATE TABLE public.poll_survey_participant (
    id serial NOT NULL PRIMARY KEY,
    post_id integer NOT NULL REFERENCES post (id) ON DELETE CASCADE,
    member_id integer NOT NULL REFERENCES member (id) ON DELETE CASCADE
);