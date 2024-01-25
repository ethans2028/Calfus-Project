CREATE TABLE change_log (
  id INT,
  change_date DATE,
  dao_member varChar(50),
  county varChar(50),
  st varChar(50),
  changes_made varChar(250),
);

INSERT INTO change_log (id, change_date, dao_member, county, st, changes_made) 
VALUES (0, to_date('2022-07-26', 'YYYY-MM-DD'), 'Cindy Hewson', 'Santa Clara', 'CA0', 'Updated  Mitigation Plan and updated Status to Resolved');

SELECT * FROM change_log;

DROP TABLE IF EXISTS change_log;