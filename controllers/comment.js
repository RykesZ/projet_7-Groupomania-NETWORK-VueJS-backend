const sql = require('../models/db');

exports.createComment = async (req, res) => {
    // Récupère le texte du commentaire, ainsi que l'userId de son auteur, et l'id de la publciation à laquelle il apparatient
    const text = req.body.text;
    const autorId = req.body.userId;
    const pubId = req.body.pubId;
    try {
        const query = `INSERT INTO comments (text, autorId, pubOriginId) VALUES (?, ?, ?);`
        const result = await sql.query(query, [text, autorId, pubId]);
        const response = result[0];
        console.log(response);

        // Fonctionnalité facultative ajoutant l'id du commentaire à commentsCreated de son auteur
        /*const query2 = `SELECT commentsCreated FROM users WHERE id = ?`
        const result2 = await sql.query(query2, autorId);
        if (result2[0].affectedRows === 1) {
            let commentsCreated = [];
            if (response.commentsCreated != null) {
                commentsCreated = response.commentsCreated.split(',');
            }
            commentsCreated.push(response.id);
            const commentsCreatedToUpdate = commentsCreated.join(',');
            const query2_2 = `UPDATE users SET commentsCreated = ? WHERE id = ?`;
            result2_2 = await sql.query(query2_2, [commentsCreatedToUpdate, autorId]);
        } else if (result2[0].affectedRows === 0) {
            throw(error);
        };*/
        

        if (result[0].affectedRows === 1) {
            return res.status(201).json({ message: "comment created" });
        } else if (result[0].affectedRows === 0) {
            throw(error);
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ msg: 'Could not create comment' });
    };
};

// Envoie tous les commentaires d'une publication identifiée par son id
exports.getAllComments = async (req, res) => {
    const pubOriginId = req.params.pubId;
    try {
        const query = `SELECT c.id AS commId, c.text, c.autorId, c.date_insertion, c.date_modification, u.firstname, u.lastname, u.imageUrl FROM comments AS c INNER JOIN users AS u ON c.autorId = u.id WHERE c.pubOriginId = ? ORDER BY date_insertion ASC;`
        const result = await sql.query(query, pubOriginId);
        const response = result[0];
        console.log(response);
        if (response.length > 0) {
            return res.status(200).json({ response });
        } else if (response.length === 0) {
            throw(error);
        };
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Could not find comment'});
    }
};

exports.modifyComment = async (req, res) => {
    const text = req.body.text;
    const commId = req.params.commId;
    console.log(commId);
    try {
        const query = `UPDATE comments SET text = ? WHERE id = ? ;`
        const result = await sql.query(query, [text, commId]);
        console.log(result[0]);
        if (result[0].affectedRows === 1) {
            return res.status(200).json({ message: "comment modified" });
        } else if (result[0].affectedRows === 0) {
            throw(error);
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Impossible de modifier le commentaire'});
    };
};

exports.deleteComment = async (req, res) => {
    const commId = req.params.commId;
    try {
        const query = "DELETE FROM comments WHERE id = ?;"
        const result = await sql.query(query, commId);

        if (result[0].affectedRows === 1) {
            return res.status(200).json({ message: "comment deleted" });
        } else if (result[0].affectedRows === 0) {
            throw(error);
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Could not delete comment"});
    };
};