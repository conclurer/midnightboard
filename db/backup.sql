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
    board_name character varying(50) NOT NULL
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
    hide_last_name boolean DEFAULT true NOT NULL
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
-- Name: member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.member_id_seq OWNED BY public.member.id;


--
-- Name: poll; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.poll (
    id integer NOT NULL,
    post_id integer,
    answer_id integer NOT NULL,
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
-- Name: survey; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.survey (
    id integer NOT NULL,
    post_id integer,
    question_id integer NOT NULL,
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

ALTER TABLE ONLY public.member ALTER COLUMN id SET DEFAULT nextval('public.member_id_seq'::regclass);


--
-- Name: poll id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.poll ALTER COLUMN id SET DEFAULT nextval('public.poll_id_seq'::regclass);


--
-- Name: post post_id; Type: DEFAULT; Schema: public; Owner: dev
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
-- Name: team team_id; Type: DEFAULT; Schema: public; Owner: dev
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

COPY public.board (id, created_at, updated_at, creator_id, board_name) FROM stdin;
1	1577833200000	1577833200000	1	Board1
2	1577833200000	1577833200000	2	Board2
3	1577833200000	1577833200000	3	Board3
\.


--
-- Data for Name: board_subscription; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.board_subscription (id, board_id, member_id) FROM stdin;
1	1	1
2	1	2
3	1	3
4	1	4
5	1	5
6	2	2
7	3	3
8	2	5
9	3	5
\.


--
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.member (id, created_at, updated_at, last_seen, user_name, first_name, last_name, email, password, avatar, language_preference, hide_last_name) FROM stdin;
1	1577833200000	1577833200000	\N	user1	Max	Mustermann	Max.Mustermann@ma.il	$2b$10$B2gmqgKGsSbm8G2VIjulKOadTUMctZ7LC3ETxyOn49XnkVrgS.Ghy	\N	en	t
2	1577833200000	1577833200000	\N	user2	Peter	Mustermann	Peter.Mustermann@ma.il	$2b$10$oPMKDfrsHctVQwU2KPoOfOdeef0ZD0WAKCvSKFgS5Ayv6HS1umEwG	\N	en	t
3	1577833200000	1577833200000	\N	user3	Hans	Mustermann	Hans.Mustermann@ma.il	$2b$10$byrA4n1xu4uOzJm4W71bneIyjh0EChk6wAPN4n2r0.jWaopLLVIFO	\N	en	t
4	1577833200000	1577833200000	\N	user4	Bibi	Mustermann	Bibi.Mustermann@ma.il	$2b$10$k9yjuXtnda9eqmYoLGGlTumNsqR8WyaEMMtSj.qrtKpE1mRhTvQzq	\N	en	t
5	1577833200000	1577833200000	\N	user5	Heidi	Mustermann	Heidi.Mustermann@ma.il	$2b$10$f5E5wmCfNVE2blW0L1ucNOu5.7F3FbdR.n6p30m.07TzwY/u2kTce	\N	en	t
6	1577833200000	1583758471087	1583758471086	admin	Max	Admin	Admin@ma.il	$2b$10$0mjxHpG1qnZzU5PBCW9PSe2BZ19299625/x53nkV510Ljcj3ph3Ia	\N	en	t
\.


--
-- Data for Name: poll; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.poll (id, post_id, answer_id, vote) FROM stdin;
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.post (id, created_at, updated_at, creator_id, type_of_post, title, content, due_date, interactive_due_date) FROM stdin;
1	1577833200000	1577833200000	1	application/note	Note 1	<h1>Content</h1>	1587333600000	0
2	1577833200000	1577833200000	2	application/note	Note 2	<h1>Content</h1>	1587333600000	0
3	1577833200000	1577833200000	3	application/note	Note 3	<h1>Content</h1>	1587333600000	0
4	1577833200000	1577833200000	4	application/note	Note 4	<h1>Content</h1>	1587333600000	0
5	1577833200000	1577833200000	5	application/note	Note 5	<h1>Content</h1>	1587333600000	0
6	1577833200000	1577833200000	1	application/note	Note 6	<h1>Content</h1>	1587333600000	0
7	1577833200000	1577833200000	2	application/note	Note 7	<h1>Content</h1>	1587333600000	0
8	1577833200000	1577833200000	3	application/note	Note 8	<h1>Content</h1>	1587333600000	0
9	1577833200000	1577833200000	1	application/note	Old Note 1	<h1>Content</h1>	1577833200000	0
10	1577833200000	1577833200000	2	application/note	Old Note 2	<h1>Content</h1>	1577833200000	0
11	1577833200000	1577833200000	3	application/note	Old Note 3	<h1>Content</h1>	1577833200000	0
\.


--
-- Data for Name: post_location; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.post_location (id, board_id, post_id) FROM stdin;
1	1	1
2	2	1
3	3	1
4	1	2
5	2	2
6	1	3
7	3	3
8	2	4
9	3	4
10	3	5
11	2	6
12	1	7
13	1	8
14	1	9
15	1	10
16	1	11
\.


--
-- Data for Name: survey; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.survey (id, post_id, question_id, answer, vote) FROM stdin;
\.


--
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.team (id, created_at, updated_at, team_leader_id, team_name) FROM stdin;
1	1577833200000	1577833200000	1	Team1
2	1577833200000	1577833200000	2	Team2
\.


--
-- Data for Name: team_membership; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.team_membership (id, team_id, member_id) FROM stdin;
1	1	1
2	2	2
3	1	3
4	2	3
\.


--
-- Data for Name: token; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.token (id, created_at, uid, refresh_token) FROM stdin;
\.


--
-- Name: board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.board_id_seq', 4, true);


--
-- Name: board_subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.board_subscription_id_seq', 9, true);


--
-- Name: member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.member_id_seq', 8, true);


--
-- Name: poll_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.poll_id_seq', 1, false);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.post_id_seq', 14, true);


--
-- Name: post_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.post_location_id_seq', 19, true);


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

SELECT pg_catalog.setval('public.team_membership_id_seq', 4, true);


--
-- Name: token_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.token_id_seq', 1, true);


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

