CREATE TABLE common_users (
  idx int(11) NOT NULL AUTO_INCREMENT,
  email varchar(80) NOT NULL,
  password varchar(45) NOT NULL,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  profile_picture varchar(500) NOT NULL,
  phone_number varchar(13) NOT NULL,
  PRIMARY KEY (idx),
  UNIQUE KEY email_UNIQUE(email)
)