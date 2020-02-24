CREATE TABLE public.member (
    member_id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    user_name VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    avatar jsonb,
    language_preference  CHAR(2) DEFAULT 'en' NOT NULL,
    hide_last_name boolean DEFAULT TRUE NOT NULL 
);

CREATE TABLE public.team (
    team_id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    team_leader_id integer REFERENCES member (member_id) ON DELETE SET NULL,
    team_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE public.post (
    post_id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer REFERENCES member (member_id) ON DELETE SET NULL,
    type_of_post VARCHAR(27) NOT NULL,
    title VARCHAR(50),
    content text,
    due_date bigint NOT NULL,
    interactive_due_date bigint
);

CREATE TABLE public.board (
    board_id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer REFERENCES member (member_id) ON DELETE SET NULL,
    board_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE public.board_subscription (
    id serial NOT NULL PRIMARY KEY,
    board_id integer NOT NULL REFERENCES board (board_id) ON DELETE CASCADE,
    member_id integer NOT NULL REFERENCES member (member_id) ON DELETE CASCADE
);

CREATE TABLE public.post_location (
    id serial NOT NULL PRIMARY KEY,
    board_id integer NOT NULL REFERENCES board (board_id) ON DELETE CASCADE,
    post_id integer NOT NULL REFERENCES post (post_id) ON DELETE CASCADE
);

CREATE TABLE public.team_membership (
    id serial NOT NULL PRIMARY KEY,
    team_id integer NOT NULL REFERENCES team (team_id) ON DELETE CASCADE,
    member_id integer NOT NULL REFERENCES member (member_id) ON DELETE CASCADE
);

CREATE TABLE public.token (
    id serial NOT NULL PRIMARY KEY,
    created_at bigint NOT NULL,
    uid int NOT NULL,
    refresh_token text
);