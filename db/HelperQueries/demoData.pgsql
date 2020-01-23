/* Create demo members */
INSERT INTO member (created_at,updated_at,username,first_name,last_name,email,password)
    VALUES (1577833200000, 1577833200000, 'user1', 'Max', 'Mustermann', 'Max.Mustermann@ma.il','password123'),
    (1577833200000, 1577833200000, 'user2', 'Peter', 'Mustermann', 'Peter.Mustermann@ma.il','password123'),
    (1577833200000, 1577833200000, 'user3', 'Hans', 'Mustermann', 'Hans.Mustermann@ma.il','password123'),
    (1577833200000, 1577833200000, 'user4', 'Bibi', 'Mustermann', 'Bibi.Mustermann@ma.il','password123'),
    (1577833200000, 1577833200000, 'user5', 'Heidi', 'Mustermann', 'Heidi.Mustermann@ma.il','password123');

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
    VALUES (1577833200000,1577833200000,1,'note','Note 1','This is the first Note, posted on Board 1, 2 and 3',0,0),
    (1577833200000,1577833200000,2,'note','Note 2','This is the second Note, posted on Board 1 and 2',0,0),
    (1577833200000,1577833200000,3,'note','Note 3','This is the third Note, posted on Board 1 and 3',0,0),
    (1577833200000,1577833200000,4,'note','Note 4','This is the fourth Note, posted on Board 2 and 3',0,0),
    (1577833200000,1577833200000,5,'note','Note 5','This is the fifth Note, posted only on Board 3',0,0),
    (1577833200000,1577833200000,1,'note','Note 6','This is the sixth Note, posted only on Board 2',0,0),
    (1577833200000,1577833200000,2,'note','Note 7','This is the seventh Note, posted only on Board 1',0,0),
    (1577833200000,1577833200000,3,'note','Note 8','This is the eighth Note, posted only on Board 1',0,0);

/* Link posts to board */
INSERT INTO post_location (post_id, board_id)
    VALUES (1,1),(1,2),(1,3),(2,1),(2,2),(3,1),(3,3),(4,2),(4,3),(5,3),(6,2),(7,1),(8,1);

/* Link members to teams */
INSERT INTO team_membership (member_id, team_id)
    VALUES (1,1),(2,2),(3,1),(3,2);

/* Link members to boards */
INSERT INTO board_subscription (member_id, board_id)
    VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(2,2),(3,3),(5,2),(5,3);