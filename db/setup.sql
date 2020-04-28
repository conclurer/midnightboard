--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2 (Debian 12.2-2.pgdg100+1)
-- Dumped by pg_dump version 12.2 (Debian 12.2-2.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: board; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.board (
    id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer,
    board_name character varying(50) NOT NULL,
    board_type integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.board OWNER TO dev;

--
-- Name: board_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_id_seq OWNER TO dev;

--
-- Name: board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.board_id_seq OWNED BY public.board.id;


--
-- Name: board_subscription; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.board_subscription (
    id integer NOT NULL,
    board_id integer NOT NULL,
    member_id integer NOT NULL
);


ALTER TABLE public.board_subscription OWNER TO dev;

--
-- Name: board_subscription_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.board_subscription_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_subscription_id_seq OWNER TO dev;

--
-- Name: board_subscription_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.board_subscription_id_seq OWNED BY public.board_subscription.id;


--
-- Name: member; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.member (
    id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    last_seen bigint,
    user_name character varying(30) NOT NULL,
    first_name character varying(20),
    last_name character varying(20),
    email text NOT NULL,
    password text NOT NULL,
    avatar jsonb,
    language_preference character(2) DEFAULT 'en'::bpchar NOT NULL,
    hide_last_name boolean DEFAULT true NOT NULL,
    user_role integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.member OWNER TO dev;

--
-- Name: member_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.member_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_id_seq OWNER TO dev;

--
-- Name: member_id_seq1; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.member_id_seq1
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_id_seq1 OWNER TO dev;

--
-- Name: member_id_seq1; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.member_id_seq1 OWNED BY public.member.id;


--
-- Name: poll; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.poll (
    id integer NOT NULL,
    post_id integer,
    answer_id integer NOT NULL,
    answer text NOT NULL,
    vote integer NOT NULL
);


ALTER TABLE public.poll OWNER TO dev;

--
-- Name: poll_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.poll_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poll_id_seq OWNER TO dev;

--
-- Name: poll_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.poll_id_seq OWNED BY public.poll.id;


--
-- Name: poll_survey_participant; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.poll_survey_participant (
    id integer NOT NULL,
    post_id integer NOT NULL,
    member_id integer NOT NULL
);


ALTER TABLE public.poll_survey_participant OWNER TO dev;

--
-- Name: poll_survey_participant_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.poll_survey_participant_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.poll_survey_participant_id_seq OWNER TO dev;

--
-- Name: poll_survey_participant_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.poll_survey_participant_id_seq OWNED BY public.poll_survey_participant.id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.post (
    id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer,
    type_of_post character varying(127) NOT NULL,
    title character varying(50),
    content text,
    due_date bigint NOT NULL,
    interactive_due_date bigint
);


ALTER TABLE public.post OWNER TO dev;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO dev;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: post_location; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.post_location (
    id integer NOT NULL,
    board_id integer NOT NULL,
    post_id integer NOT NULL
);


ALTER TABLE public.post_location OWNER TO dev;

--
-- Name: post_location_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.post_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_location_id_seq OWNER TO dev;

--
-- Name: post_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.post_location_id_seq OWNED BY public.post_location.id;


--
-- Name: survey; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.survey (
    id integer NOT NULL,
    post_id integer,
    question_id integer NOT NULL,
    question text,
    answer text,
    vote integer
);


ALTER TABLE public.survey OWNER TO dev;

--
-- Name: survey_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.survey_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.survey_id_seq OWNER TO dev;

--
-- Name: survey_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.survey_id_seq OWNED BY public.survey.id;


--
-- Name: team; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.team (
    id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    team_leader_id integer,
    team_name character varying(50) NOT NULL
);


ALTER TABLE public.team OWNER TO dev;

--
-- Name: team_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_id_seq OWNER TO dev;

--
-- Name: team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.team_id_seq OWNED BY public.team.id;


--
-- Name: team_membership; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.team_membership (
    id integer NOT NULL,
    team_id integer NOT NULL,
    member_id integer NOT NULL
);


ALTER TABLE public.team_membership OWNER TO dev;

--
-- Name: team_membership_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.team_membership_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_membership_id_seq OWNER TO dev;

--
-- Name: team_membership_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.team_membership_id_seq OWNED BY public.team_membership.id;


--
-- Name: token; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.token (
    id integer NOT NULL,
    created_at bigint NOT NULL,
    uid integer NOT NULL,
    refresh_token text
);


ALTER TABLE public.token OWNER TO dev;

--
-- Name: token_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.token_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.token_id_seq OWNER TO dev;

--
-- Name: token_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.token_id_seq OWNED BY public.token.id;


--
-- Name: board id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board ALTER COLUMN id SET DEFAULT nextval('public.board_id_seq'::regclass);


--
-- Name: board_subscription id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board_subscription ALTER COLUMN id SET DEFAULT nextval('public.board_subscription_id_seq'::regclass);


--
-- Name: member id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.member ALTER COLUMN id SET DEFAULT nextval('public.member_id_seq1'::regclass);


--
-- Name: poll id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll ALTER COLUMN id SET DEFAULT nextval('public.poll_id_seq'::regclass);


--
-- Name: poll_survey_participant id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll_survey_participant ALTER COLUMN id SET DEFAULT nextval('public.poll_survey_participant_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Name: post_location id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location ALTER COLUMN id SET DEFAULT nextval('public.post_location_id_seq'::regclass);


--
-- Name: survey id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.survey ALTER COLUMN id SET DEFAULT nextval('public.survey_id_seq'::regclass);


--
-- Name: team id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team ALTER COLUMN id SET DEFAULT nextval('public.team_id_seq'::regclass);


--
-- Name: team_membership id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership ALTER COLUMN id SET DEFAULT nextval('public.team_membership_id_seq'::regclass);


--
-- Name: token id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.token ALTER COLUMN id SET DEFAULT nextval('public.token_id_seq'::regclass);


--
-- Data for Name: board; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.board (id, created_at, updated_at, creator_id, board_name, board_type) FROM stdin;
\.


--
-- Data for Name: board_subscription; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.board_subscription (id, board_id, member_id) FROM stdin;
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.member (id, created_at, updated_at, last_seen, user_name, first_name, last_name, email, password, avatar, language_preference, hide_last_name, user_role) FROM stdin;
\.


--
-- Data for Name: poll; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.poll (id, post_id, answer_id, answer, vote) FROM stdin;
\.


--
-- Data for Name: poll_survey_participant; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.poll_survey_participant (id, post_id, member_id) FROM stdin;
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.post (id, created_at, updated_at, creator_id, type_of_post, title, content, due_date, interactive_due_date) FROM stdin;
\.


--
-- Data for Name: post_location; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.post_location (id, board_id, post_id) FROM stdin;
\.


--
-- Data for Name: survey; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.survey (id, post_id, question_id, question, answer, vote) FROM stdin;
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.team (id, created_at, updated_at, team_leader_id, team_name) FROM stdin;
\.


--
-- Data for Name: team_membership; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.team_membership (id, team_id, member_id) FROM stdin;
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.token (id, created_at, uid, refresh_token) FROM stdin;
\.


--
-- Name: board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.board_id_seq', 3, true);


--
-- Name: board_subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.board_subscription_id_seq', 1, false);


--
-- Name: member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.member_id_seq', 1, false);


--
-- Name: member_id_seq1; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.member_id_seq1', 6, true);


--
-- Name: poll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.poll_id_seq', 1, false);


--
-- Name: poll_survey_participant_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.poll_survey_participant_id_seq', 1, false);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.post_id_seq', 11, true);


--
-- Name: post_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.post_location_id_seq', 16, true);


--
-- Name: survey_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.survey_id_seq', 1, false);


--
-- Name: team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.team_id_seq', 2, true);


--
-- Name: team_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.team_membership_id_seq', 1, false);


--
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.token_id_seq', 1, false);


--
-- Name: board board_board_name_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_board_name_key UNIQUE (board_name);


--
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);


--
-- Name: board_subscription board_subscription_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board_subscription
    ADD CONSTRAINT board_subscription_pkey PRIMARY KEY (id);


--
-- Name: member member_email_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_email_key UNIQUE (email);


--
-- Name: member member_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_pkey PRIMARY KEY (id);


--
-- Name: member member_user_name_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_user_name_key UNIQUE (user_name);


--
-- Name: poll poll_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_pkey PRIMARY KEY (id);


--
-- Name: poll_survey_participant poll_survey_participant_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll_survey_participant
    ADD CONSTRAINT poll_survey_participant_pkey PRIMARY KEY (id);


--
-- Name: post_location post_location_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location
    ADD CONSTRAINT post_location_pkey PRIMARY KEY (id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (id);


--
-- Name: survey survey_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.survey
    ADD CONSTRAINT survey_pkey PRIMARY KEY (id);


--
-- Name: team_membership team_membership_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership
    ADD CONSTRAINT team_membership_pkey PRIMARY KEY (id);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (id);


--
-- Name: team team_team_name_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_team_name_key UNIQUE (team_name);


--
-- Name: token token_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.token
    ADD CONSTRAINT token_pkey PRIMARY KEY (id);


--
-- Name: board board_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.member(id) ON DELETE SET NULL;


--
-- Name: board_subscription board_subscription_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board_subscription
    ADD CONSTRAINT board_subscription_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(id) ON DELETE CASCADE;


--
-- Name: board_subscription board_subscription_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board_subscription
    ADD CONSTRAINT board_subscription_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.member(id) ON DELETE CASCADE;


--
-- Name: poll poll_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll
    ADD CONSTRAINT poll_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id) ON DELETE CASCADE;


--
-- Name: poll_survey_participant poll_survey_participant_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll_survey_participant
    ADD CONSTRAINT poll_survey_participant_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.member(id) ON DELETE CASCADE;


--
-- Name: poll_survey_participant poll_survey_participant_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll_survey_participant
    ADD CONSTRAINT poll_survey_participant_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id) ON DELETE CASCADE;


--
-- Name: post post_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.member(id) ON DELETE SET NULL;


--
-- Name: post_location post_location_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location
    ADD CONSTRAINT post_location_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(id) ON DELETE CASCADE;


--
-- Name: post_location post_location_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location
    ADD CONSTRAINT post_location_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id) ON DELETE CASCADE;


--
-- Name: survey survey_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.survey
    ADD CONSTRAINT survey_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(id) ON DELETE CASCADE;


--
-- Name: team_membership team_membership_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership
    ADD CONSTRAINT team_membership_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.member(id) ON DELETE CASCADE;


--
-- Name: team_membership team_membership_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership
    ADD CONSTRAINT team_membership_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(id) ON DELETE CASCADE;


--
-- Name: team team_team_leader_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_team_leader_id_fkey FOREIGN KEY (team_leader_id) REFERENCES public.member(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

