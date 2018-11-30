CREATE TABLE carpoolers (
  user_id int(11) NOT NULL,
  carpool_id int(11) NOT NULL,
  pending tinyint(4) NOT NULL,
  user_lat decimal(25,15) NOT NULL,
  user_lng decimal(25,15) NOT NULL,
  user_address varchar(100) NOT NULL,
  PRIMARY KEY (user_id, carpool_id)
)