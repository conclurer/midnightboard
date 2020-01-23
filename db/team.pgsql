CREATE TABLE public.team (
    team_id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    team_leader_id integer REFERENCES member (member_id) ON DELETE SET NULL,
    team_name VARCHAR(50) NOT NULL UNIQUE
);