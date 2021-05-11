const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sql = require('../models/db');

exports.signup = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
          message: "Content can not be empty!"
        });
    }
    const { firstname, lastname, email, password, birthdate, gender } = req.body;
    try {
        let hash = await bcrypt.hash(password, 10);
        try {
            const query = `INSERT INTO users (firstname, lastname, email, password, birthdate, gender, imageUrl, publicationsCreated, publicationsLiked, publicationsMasked, commentsCreated) VALUES (?, ?, ?, ?, ?, ?, "http://localhost:5000/images/PP_default.png", "", "", "", "");`
            sql.query(query, [firstname, lastname, email, hash, birthdate, gender], function(err, result) {
                if (err) throw (err);
                return res.status(201).json({ message: "user added", result });
            });
        } catch(error) {
            console.log(error);
            return res.status(400).json({ error });
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hash failed' });
    };
};

/*exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        console.log({ user });
        let upassword = user.password;
        console.log({ upassword })
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userUuid: user.uuid,
                    token: jwt.sign(
                        { userUuid: user.uuid },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
            
    } catch(error) {
        return res.status(500).json({ error });
    };
};*/

exports.getUserInfo = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
          message: "Demand can not be empty!"
        });
    }
    const id = req.body.userId;
    try {
        const query = `SELECT firstname, lastname, birthdate, gender FROM users WHERE id = ? ;`
        sql.query(query, id, function(err, result, fields) {
            if (err) throw (err);
            if (result.length === 0) {
                return res.status(500).json("user not found");
            };
            return res.status(201).json({ message: "user found", result });
        });
    } catch(err) {
        return res.status(500).json({ err }, "user not found")
    };
};

exports.modifyUser = async (req, res) => {
    const { userId, firstname, lastname, email, password, birthdate, gender, imageUrl } = req.body;
    try {
        let hash = null;
        if (password) {
            hash = await bcrypt.hash(password, 10);
        }
        const query = "UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, birthdate = ?, gender = ?, imageUrl = ? WHERE id = ?;"
        sql.query(query, [firstname, lastname, email, hash, birthdate, gender, imageUrl, userId], (err, result) => {
                if (err) throw (err);
                if (result.affectedRows == 0) {
                    console.log(result);
                    return res.status(500).json("user not found");
                }
                return res.status(200).json({ message: "user updated", result })
            }
        );
    } catch(err) {
        console.log(err);
        return res.status(500).json({ err });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        const query = "DELETE FROM users WHERE id = ? ;"
        sql.query(query, userId, (err, result) => {
            if (err) throw (err);
            if (result.affectedRows == 0) {
                console.log(result);
                return res.status(500).json("user not found");
            }
            return res.status(200).json({ message: "user deleted" })
        });
    } catch(err) {
        return res.status(500).json({ err })
    };
};





