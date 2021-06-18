USE groupomania;

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
DELIMITER ;

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
DELIMITER ;