const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            const result = await sql.query(query, [firstname, lastname, email, hash, birthdate, gender]);
            /*console.log(result);
            console.log(result[0].affectedRows);*/
            if (result[0].affectedRows === 1) {
                return res.status(201).json({ message: "user added" });
            } else if (result[0].affectedRows === 0) {
                throw(error);
            };
            
        } catch(error) {
            console.log(error);
            return res.status(400).json({ error });
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ msg: 'Hash failed' });
    };
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const query = "SELECT id, password FROM users WHERE email = ? ;"
        const rows = await (sql.query(query, email))
        /*console.log(rows);
        console.log(rows[0]);
        console.log(rows[0][0]);
        console.log(rows[0][0].password);*/
        const hashedPass = rows[0][0].password;
        const userId = rows[0][0].id;
        try {
                let valid = await bcrypt.compare(password, hashedPass);
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            return res.status(200).json({
                userId,
                token: jwt.sign(
                    { userId },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
        } catch(error) {
            console.log(error);
                return res.status(500).json({ error });
        };     
    } catch(err) {
        console.log(err)
        return res.status(500).json({ err });
    };
};

exports.getUserInfo = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
          message: "Demand can not be empty!"
        });
    }
    const userId = req.body.userId;
    try {
        const query = "SELECT firstname, lastname, birthdate, gender FROM users WHERE id = ? ;"
        const result = await sql.query(query, userId)

        /*console.log(result);
        console.log(result[0]);
        console.log(result[0][0]);
        console.log(result[0][0].id);*/

        const response = result[0][0];

        if (result.length === 0) {
            return res.status(500).json({message: "user not found"});
        };
        return res.status(201).json({ response });
    } catch(err) {
        return res.status(500).json({message: "user not found"})
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
        const result = await sql.query(query, [firstname, lastname, email, hash, birthdate, gender, imageUrl, userId]);
        if (result[0].affectedRows == 0) {
            console.log(result);
            return res.status(500).json("user not found");
        }
        return res.status(200).json({ message: "user updated" })
    } catch(err) {
        console.log(err);
        return res.status(500).json({ err });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.body.userId;
    try {
        const query = "DELETE FROM users WHERE id = ? ;"
        const result = await sql.query(query, userId)
        if (result[0].affectedRows == 0) {
            console.log(result[0].affectedRows);
            return res.status(500).json("user not found");
        }
        return res.status(200).json({ message: "user deleted" })
    } catch(err) {
        return res.status(500).json({ err })
    };
};





