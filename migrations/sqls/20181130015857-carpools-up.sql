CREATE TABLE carpools (
  idx int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  lat decimal(25,15) NOT NULL,
  lng decimal(25,15) NOT NULL,
  carpool_arrival time NOT NULL,
  carpool_departure time NOT NULL,
  carpool_days varchar(10) NOT NULL,
  start varchar(10) NOT NULL,
  end varchar(10) NOT NULL,
  seats int(2) NOT NULL,
  PRIMARY KEY (idx)
)