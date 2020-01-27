CREATE TABLE public.team_membership (
    id serial NOT NULL PRIMARY KEY,
    team_id integer NOT NULL REFERENCES team (team_id) ON DELETE CASCADE,
    member_id integer NOT NULL REFERENCES member (member_id) ON DELETE CASCADE
);