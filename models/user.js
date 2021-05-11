const sql = require('./db.js');

const User = (firstname, lastname, email, password, birthdate, gender) => {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.birthdate = birthdate;
    this.gender = gender;
    this.imageUrl = "";
    this.publicationsCreated = "";
    this.publicationsLiked = "";
    this.publicationsMasked = "";
    this.commentsCreated = "";
};

User.signup = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.info = (userId, result) => {
    sql.query(`SELECT * FROM customers WHERE id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        //if user not found
        result({ kind: "not found" }, null);
    });
};

User.modify = (id, user, result) => {
    sql.query(
        "UPDATE users SET firsname = ?, lastname = ?, email = ?, password = ?, birthdate = ?, gender = ?, imageUrl = ? WHERE id = ?",
        [user.firstname, user.lastname, user.email, user.password, user.birthdate, user.gender, user.imageUrl, id],
        (err, result) => {
            if (err) {
                console.log("error :", err);
                result(null, err);
                return;
            }

            if (result.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.delete = (id, result) => {
    sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
    console.log("deleted user with id: ", id);
    result(null, res);
    });
};

module.exports = User;