--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1 (Debian 12.1-1.pgdg100+1)
-- Dumped by pg_dump version 12.1 (Debian 12.1-1.pgdg100+1)

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
    board_id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    creator_id integer,
    board_name character varying(50) NOT NULL
);


ALTER TABLE public.board OWNER TO dev;

--
-- Name: board_board_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.board_board_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.board_board_id_seq OWNER TO dev;

--
-- Name: board_board_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.board_board_id_seq OWNED BY public.board.board_id;


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
    member_id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
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
-- Name: member_member_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.member_member_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_member_id_seq OWNER TO dev;

--
-- Name: member_member_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.member_member_id_seq OWNED BY public.member.member_id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.post (
    post_id integer NOT NULL,
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
-- Name: post_post_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.post_post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_post_id_seq OWNER TO dev;

--
-- Name: post_post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.post_post_id_seq OWNED BY public.post.post_id;


--
-- Name: team; Type: TABLE; Schema: public; Owner: dev
--

CREATE TABLE public.team (
    team_id integer NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    team_leader_id integer,
    team_name character varying(50) NOT NULL
);


ALTER TABLE public.team OWNER TO dev;

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
-- Name: team_team_id_seq; Type: SEQUENCE; Schema: public; Owner: dev
--

CREATE SEQUENCE public.team_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.team_team_id_seq OWNER TO dev;

--
-- Name: team_team_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: dev
--

ALTER SEQUENCE public.team_team_id_seq OWNED BY public.team.team_id;


--
-- Name: board board_id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board ALTER COLUMN board_id SET DEFAULT nextval('public.board_board_id_seq'::regclass);


--
-- Name: board_subscription id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board_subscription ALTER COLUMN id SET DEFAULT nextval('public.board_subscription_id_seq'::regclass);


--
-- Name: member member_id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.member ALTER COLUMN member_id SET DEFAULT nextval('public.member_member_id_seq'::regclass);


--
-- Name: post post_id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post ALTER COLUMN post_id SET DEFAULT nextval('public.post_post_id_seq'::regclass);


--
-- Name: post_location id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location ALTER COLUMN id SET DEFAULT nextval('public.post_location_id_seq'::regclass);


--
-- Name: team team_id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team ALTER COLUMN team_id SET DEFAULT nextval('public.team_team_id_seq'::regclass);


--
-- Name: team_membership id; Type: DEFAULT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership ALTER COLUMN id SET DEFAULT nextval('public.team_membership_id_seq'::regclass);


--
-- Data for Name: board; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.board (board_id, created_at, updated_at, creator_id, board_name) FROM stdin;
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

COPY public.member (member_id, created_at, updated_at, user_name, first_name, last_name, email, password, avatar, language_preference, hide_last_name) FROM stdin;
1	1577833200000	1577833200000	user1	Max	Mustermann	Max.Mustermann@ma.il	passwordA	\N	en	t
2	1577833200000	1577833200000	user2	Peter	Mustermann	Peter.Mustermann@ma.il	passwordB	\N	en	t
3	1577833200000	1577833200000	user3	Hans	Mustermann	Hans.Mustermann@ma.il	passwordC	\N	en	t
4	1577833200000	1577833200000	user4	Bibi	Mustermann	Bibi.Mustermann@ma.il	passwordD	\N	en	t
5	1577833200000	1577833200000	user5	Heidi	Mustermann	Heidi.Mustermann@ma.il	passwordE	\N	en	t
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.post (post_id, created_at, updated_at, creator_id, type_of_post, title, content, due_date, interactive_due_date) FROM stdin;
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
-- Data for Name: team; Type: TABLE DATA; Schema: public; Owner: dev
--

COPY public.team (team_id, created_at, updated_at, team_leader_id, team_name) FROM stdin;
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
-- Name: board_board_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.board_board_id_seq', 3, true);


--
-- Name: board_subscription_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.board_subscription_id_seq', 9, true);


--
-- Name: member_member_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.member_member_id_seq', 5, true);


--
-- Name: post_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.post_location_id_seq', 16, true);


--
-- Name: post_post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.post_post_id_seq', 11, true);


--
-- Name: team_membership_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.team_membership_id_seq', 4, true);


--
-- Name: team_team_id_seq; Type: SEQUENCE SET; Schema: public; Owner: dev
--

SELECT pg_catalog.setval('public.team_team_id_seq', 2, true);


--
-- Name: board board_board_name_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_board_name_key UNIQUE (board_name);


--
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (board_id);


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
    ADD CONSTRAINT member_pkey PRIMARY KEY (member_id);


--
-- Name: member member_user_name_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT member_user_name_key UNIQUE (user_name);


--
-- Name: post_location post_location_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location
    ADD CONSTRAINT post_location_pkey PRIMARY KEY (id);


--
-- Name: post post_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_pkey PRIMARY KEY (post_id);


--
-- Name: team_membership team_membership_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership
    ADD CONSTRAINT team_membership_pkey PRIMARY KEY (id);


--
-- Name: team team_pkey; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_pkey PRIMARY KEY (team_id);


--
-- Name: team team_team_name_key; Type: CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_team_name_key UNIQUE (team_name);


--
-- Name: board board_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.member(member_id) ON DELETE SET NULL;


--
-- Name: board_subscription board_subscription_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board_subscription
    ADD CONSTRAINT board_subscription_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(board_id) ON DELETE CASCADE;


--
-- Name: board_subscription board_subscription_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.board_subscription
    ADD CONSTRAINT board_subscription_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.member(member_id) ON DELETE CASCADE;


--
-- Name: post post_creator_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT post_creator_id_fkey FOREIGN KEY (creator_id) REFERENCES public.member(member_id) ON DELETE SET NULL;


--
-- Name: post_location post_location_board_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location
    ADD CONSTRAINT post_location_board_id_fkey FOREIGN KEY (board_id) REFERENCES public.board(board_id) ON DELETE CASCADE;


--
-- Name: post_location post_location_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.post_location
    ADD CONSTRAINT post_location_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.post(post_id) ON DELETE CASCADE;


--
-- Name: team_membership team_membership_member_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership
    ADD CONSTRAINT team_membership_member_id_fkey FOREIGN KEY (member_id) REFERENCES public.member(member_id) ON DELETE CASCADE;


--
-- Name: team_membership team_membership_team_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team_membership
    ADD CONSTRAINT team_membership_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.team(team_id) ON DELETE CASCADE;


--
-- Name: team team_team_leader_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: dev
--

ALTER TABLE ONLY public.team
    ADD CONSTRAINT team_team_leader_id_fkey FOREIGN KEY (team_leader_id) REFERENCES public.member(member_id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

