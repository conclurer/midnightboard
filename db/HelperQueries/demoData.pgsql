/* Create demo members */
INSERT INTO member (created_at,updated_at,user_name,first_name,last_name,email,password)
    VALUES (1577833200000, 1577833200000, 'user1', 'Max', 'Mustermann', 'Max.Mustermann@ma.il','passwordA'),
    (1577833200000, 1577833200000, 'user2', 'Peter', 'Mustermann', 'Peter.Mustermann@ma.il','passwordB'),
    (1577833200000, 1577833200000, 'user3', 'Hans', 'Mustermann', 'Hans.Mustermann@ma.il','passwordC'),
    (1577833200000, 1577833200000, 'user4', 'Bibi', 'Mustermann', 'Bibi.Mustermann@ma.il','passwordD'),
    (1577833200000, 1577833200000, 'user5', 'Heidi', 'Mustermann', 'Heidi.Mustermann@ma.il','passwordE');

/* Create demo boards */
INSERT INTO board (created_at,updated_at,creator_id,board_name)
    VALUES (1577833200000,1577833200000,1,'Board1'),
    (1577833200000,1577833200000,2,'Board2'),
    (1577833200000,1577833200000,3,'Board3');

/* Create demo teams */
INSERT INTO team (created_at,updated_at,team_leader_id,team_name)
    VALUES (1577833200000,1577833200000,1,'Team1'),
    (1577833200000,1577833200000,2,'Team2');
    
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

/* Link members to teams */
INSERT INTO team_membership (member_id, team_id)
    VALUES (1,1),(2,2),(3,1),(3,2);

/* Link members to boards */
INSERT INTO board_subscription (member_id, board_id)
    VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(2,2),(3,3),(5,2),(5,3);