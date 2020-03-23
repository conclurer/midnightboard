
/* Create demo admin member */
INSERT INTO member (created_at,updated_at,user_name,first_name,last_name,email,password,user_role)
    VALUES (1577833200000, 1577833200000, 'admin', 'Max', 'Admin', 'admin@ma.il','$2b$10$0mjxHpG1qnZzU5PBCW9PSe2BZ19299625/x53nkV510Ljcj3ph3Ia', 'admin');

/* Create demo members */
INSERT INTO member (created_at,updated_at,user_name,first_name,last_name,email,password)
    VALUES (1577833200000, 1577833200000, 'user1', 'Max', 'Mustermann', 'max.mustermann@ma.il','$2b$10$B2gmqgKGsSbm8G2VIjulKOadTUMctZ7LC3ETxyOn49XnkVrgS.Ghy'),
    (1577833200000, 1577833200000, 'user2', 'Peter', 'Mustermann', 'peter.mustermann@ma.il','$2b$10$oPMKDfrsHctVQwU2KPoOfOdeef0ZD0WAKCvSKFgS5Ayv6HS1umEwG'),
    (1577833200000, 1577833200000, 'user3', 'Hans', 'Mustermann', 'hans.mustermann@ma.il','$2b$10$byrA4n1xu4uOzJm4W71bneIyjh0EChk6wAPN4n2r0.jWaopLLVIFO'),
    (1577833200000, 1577833200000, 'user4', 'Bibi', 'Mustermann', 'bibi.mustermann@ma.il','$2b$10$k9yjuXtnda9eqmYoLGGlTumNsqR8WyaEMMtSj.qrtKpE1mRhTvQzq'),
    (1577833200000, 1577833200000, 'user5', 'Heidi', 'Mustermann', 'heidi.mustermann@ma.il','$2b$10$f5E5wmCfNVE2blW0L1ucNOu5.7F3FbdR.n6p30m.07TzwY/u2kTce');

/* Create demo boards */
INSERT INTO board (created_at,updated_at,creator_id,board_name)
    VALUES (1577833200000, 1577833200000, 1, 'Board1'),
    (1577833200000, 1577833200000, 1, 'Board2'),
    (1577833200000, 1577833200000, 1, 'Board3');

/* Create demo teams */
INSERT INTO team (created_at,updated_at,team_leader_id,team_name)
    VALUES (1577833200000,1577833200000,1,'Team1'),
    (1577833200000,1577833200000,1,'Team2');
    
/* Create demo posts */
INSERT INTO post (created_at,updated_at,creator_id,type_of_post,title,content,due_date,interactive_due_date)
    VALUES (1577833200000,1577833200000,1,'application/note','Note 1','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,2,'application/note','Note 2','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,3,'application/note','Note 3','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,4,'application/note','Note 4','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,5,'application/note','Note 5','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,1,'application/note','Note 6','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,2,'application/note','Note 7','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,3,'application/note','Note 8','<h1>Content</h1>',1587333600000,0),
    (1577833200000,1577833200000,1,'application/note','Old Note 1','<h1>Content</h1>',1577833200000,0),
    (1577833200000,1577833200000,2,'application/note','Old Note 2','<h1>Content</h1>',1577833200000,0),
    (1577833200000,1577833200000,3,'application/note','Old Note 3','<h1>Content</h1>',1577833200000,0);

/* Link posts to board */
INSERT INTO post_location (post_id, board_id)
    VALUES (1,1),(1,2),(1,3),(2,1),(2,2),(3,1),(3,3),(4,2),(4,3),(5,3),(6,2),(7,1),(8,1),(9,1),(10,1),(11,1);