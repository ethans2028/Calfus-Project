CREATE TABLE current (
  id INT, 
  county varChar(50), 
  st varChar(50), 
  dao_member varChar(50),
  impact_severity varChar(50) CHECK (impact_severity in ('Short-term', 'Medium-term', 'Long-term', 'New normal')),
  reason varChar(1000),
  mitigation_plan varChar(1000),
  clears varChar(50),
  possible_hits varChar(50),
  research_method varChar(50),
  dob_redaction BOOLEAN,
  situation_status BOOLEAN,
  last_reviewed_date DATE,
  issue_start_date DATE,
  est_resolution_date DATE
);

INSERT INTO current (id, county, st, dao_member, impact_severity, reason, mitigation_plan, clears, possible_hits, research_method, dob_redaction, situation_status, last_reviewed_date, issue_start_date, est_resolution_date)
values (0, 'MARICOPA', 'AZ',	'Samuel Adams', 'Long-term', 	
'The Justice Court was temporarily offline due to updates being made on their website. This created an issue with automation causing delays in turnaround time as research had to be conducted manually. The Justice Court is back online, but still expect delays on searches with possible records. Update 9/29: The court clerk that was responsible for records research has retired and a new clerk is being trained in fulfilling requests. As a result, the current ETA for this court is 6 weeks for searches with possible records.',	
'We are working to shift volume to our highest performing researchers to improve TAT.', 
'Not Impacted',	'Delayed',	'Fully Automated',	FALSE, TRUE, to_date('2022-10-10', 'YYYY-MM-DD'), to_date('2022-09-06', 'YYYY-MM-DD'), to_date('2022-10-14', 'YYYY-MM-DD'));