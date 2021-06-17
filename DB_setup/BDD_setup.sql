DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania SET 'utf8';
USE groupomania;

CREATE TABLE users (
id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
birthdate DATE NOT NULL,
gender VARCHAR(6) NOT NULL,
imageUrl VARCHAR(255) NOT NULL,
deleted BOOLEAN,
moderator BOOLEAN,
PRIMARY KEY (id),
CONSTRAINT UC_User UNIQUE (id, email)
)
ENGINE=INNODB;

DELIMITER |
CREATE TRIGGER before_update_user BEFORE UPDATE
ON users FOR EACH ROW
BEGIN
	IF NEW.firstname IS NULL
		THEN
			SET NEW.firstname = OLD.firstname;
	END IF;
	IF NEW.lastname IS NULL
		THEN
			SET NEW.lastname = OLD.lastname;
	END IF;
	IF NEW.email IS NULL
		THEN
			SET NEW.email = OLD.email;
	END IF;
	IF NEW.password IS NULL
		THEN
			SET NEW.password = OLD.password;
	END IF;
	IF NEW.birthdate IS NULL
		THEN
			SET NEW.birthdate = OLD.birthdate;
	END IF;
	IF NEW.gender IS NULL
		THEN
			SET NEW.gender = OLD.gender;
	END IF;
	IF NEW.imageUrl IS NULL
		THEN
			SET NEW.imageUrl = OLD.imageUrl;
	END IF;
END |
DELIMITER ;

CREATE TABLE publications (
id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
text TEXT NOT NULL,
autorId SMALLINT UNSIGNED NOT NULL,
imageUrl VARCHAR(255) NOT NULL,
usersLiked TEXT,
likes SMALLINT NOT NULL,
comments SMALLINT UNSIGNED,
date_insertion DATETIME,
date_modification DATETIME,
PRIMARY KEY (id),
UNIQUE (id)
)
ENGINE=INNODB;

DELIMITER |
CREATE TRIGGER before_insert_publications BEFORE INSERT
ON publications FOR EACH ROW
BEGIN
SET NEW.date_insertion = NOW();
SET NEW.date_modification = NOW();
END |

CREATE TRIGGER before_update_publications BEFORE UPDATE
ON publications FOR EACH ROW
BEGIN
SET NEW.date_modification = NOW();
IF NEW.imageUrl IS NULL
		THEN
			SET NEW.imageUrl = OLD.imageUrl;
	END IF;
END |
DELIMITER;

CREATE TABLE comments (
id MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT,
text TEXT NOT NULL,
autorId SMALLINT UNSIGNED NOT NULL,
pubOriginId MEDIUMINT UNSIGNED NOT NULL,
date_insertion DATETIME,
date_modification DATETIME,
PRIMARY KEY (id),
UNIQUE (id)
)
ENGINE=INNODB;

DELIMITER |
CREATE TRIGGER before_insert_comments BEFORE INSERT
ON comments FOR EACH ROW
BEGIN
SET NEW.date_insertion = NOW();
SET NEW.date_modification = NOW();
END |

CREATE TRIGGER before_update_comments BEFORE UPDATE
ON comments FOR EACH ROW
BEGIN
SET NEW.date_modification = NOW();
END |
DELIMITER;