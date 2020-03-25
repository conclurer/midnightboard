CREATE TABLE public.member (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    last_seen bigint,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar jsonb,
    language_preference  CHAR(2) DEFAULT 'en' NOT NULL,
    hide_last_name boolean DEFAULT TRUE NOT NULL,
    user_role integer DEFAULT 1 NOT NULL
);

CREATE TABLE public.team (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    team_leader_id integer REFERENCES member (id) ON DELETE SET NULL,
    team_name VARCHAR(50) NOT NULL UNIQUE
);

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

CREATE TABLE public.poll (
    id serial NOT NULL PRIMARY KEY,
    post_id integer REFERENCES post (id) ON DELETE CASCADE,
    answer_id integer NOT NULL,
    vote integer NOT NULL
);

CREATE TABLE public.survey (
    id serial NOT NULL PRIMARY KEY,
    post_id integer REFERENCES post (id) ON DELETE CASCADE,
    question_id integer NOT NULL,
    answer text,
    vote integer
);

CREATE TABLE public.board (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer REFERENCES member (id) ON DELETE SET NULL,
    board_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE public.post_location (
    id serial NOT NULL PRIMARY KEY,
    board_id integer NOT NULL REFERENCES board (id) ON DELETE CASCADE,
    post_id integer NOT NULL REFERENCES post (id) ON DELETE CASCADE
);

CREATE TABLE public.team_membership (
    id serial NOT NULL PRIMARY KEY,
    team_id integer NOT NULL REFERENCES team (id) ON DELETE CASCADE,
    member_id integer NOT NULL REFERENCES member (id) ON DELETE CASCADE
);

CREATE TABLE public.token (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    uid int NOT NULL,
    refresh_token text
);