const sql = require('../models/db');

const moderatorVerification = async (userIdToVerif) => {
    const queryModerator = "SELECT moderator FROM users WHERE id = ? ;"
    resultModerator = await sql.query(queryModerator, userIdToVerif);
    const isModerator = resultModerator[0][0].moderator;
    console.log({"isModerator ?": isModerator})
    return isModerator;
}

exports.createComment = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
          message: "Content can not be empty!"
        });
    }
    // Récupère le texte du commentaire, ainsi que l'userId de son auteur, et l'id de la publication à laquelle il apparatient
    console.log(req);
    const text = req.body.text;
    const autorId = req.body.userId;
    const pubId = req.body.pubId;
    try {
        const query = `INSERT INTO comments (text, autorId, pubOriginId) VALUES (?, ?, ?);`;
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


        const query2 = `SELECT COUNT(*) FROM comments where pubOriginId = ?;`;
        const result2 = await sql.query(query2, [pubId]);
        const response2 = result2[0][0];
        console.log(response2);
        const newCommCount = response2[Object.keys(response2)[0]];
        console.log(newCommCount);

        const query3 = `UPDATE publications SET comments = ? WHERE id = ?;`;
        const result3 = await sql.query(query3, [newCommCount, pubId]);
        const response3 = result3[0];
        console.log(response3);
        

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
    console.log(pubOriginId);
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
    const userId = Number(req.query.userId);
    try {
        // Récupère autorId du commentaire
        const query1 = "SELECT * FROM comments WHERE id = ?;"
            const result1 = await sql.query(query1, commId);
            const response1 = result1[0][0];
            console.log(response1);
        // Permet de vérifier que la publication appartient bien à l'utilisateur qui tente de la modifier
        if (response1.autorId != userId) {

            let isModerator = await moderatorVerification(userId);
            if (isModerator != true) {
                return res.status(401).json({ message: "User does not have adequate rights to act on this comment" })
            }
        }


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
    const commId = req.query.commId;
    console.log({"commId:": commId});
    const userId = Number(req.query.userId);
    console.log({"userId:": userId});
    try {

        // Récupère autorId du commentaire
        const query1 = "SELECT * FROM comments WHERE id = ?;"
        const result1 = await sql.query(query1, commId);
        const response1 = result1[0][0];
        console.log(response1);
        // Permet de vérifier que la publication appartient bien à l'utilisateur qui tente de la modifier
        if (response1.autorId != userId) {

            let isModerator = await moderatorVerification(userId);
            if (isModerator != true) {
                return res.status(401).json({ message: "User does not have adequate rights to act on this comment" })
            }
        }
        const pubId = response1.pubOriginId;

        const query = "DELETE FROM comments WHERE id = ?;"
        const result = await sql.query(query, commId);


        const query2 = `SELECT COUNT(*) FROM comments where pubOriginId = ?;`;
        const result2 = await sql.query(query2, [pubId]);
        const response2 = result2[0][0];
        console.log(response2);
        const newCommCount = response2[Object.keys(response2)[0]];
        console.log(newCommCount);

        const query3 = `UPDATE publications SET comments = ? WHERE id = ?;`;
        const result3 = await sql.query(query3, [newCommCount, pubId]);
        const response3 = result3[0];
        console.log(response3);



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