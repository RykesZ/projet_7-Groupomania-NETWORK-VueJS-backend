const sql = require('../models/db');
const fs = require('fs');

// Fonction qui permet de vérifier si l'utilisateur qui envoie une requête pour agir sur une publication ou un commentaire d'un autre utilisateur est un modérateur qui en a le droit
const moderatorVerification = async (userIdToVerif) => {
    const queryModerator = "SELECT moderator FROM users WHERE id = ? ;"
    resultModerator = await sql.query(queryModerator, userIdToVerif);
    const isModerator = resultModerator[0][0].moderator;
    console.log({"isModerator ?": isModerator})
    return isModerator;
}

// Fonction qui permet à un utilisateur de créer une nouvelle publication dans la base de données
exports.createPublication = async (req, res) => {
    const text = req.body.text;
    const autorId = req.body.userId;
    try {
        let imageUrl = "";
        // Si un media de publication est présent, construit la nouvelle URL à insérer dans les infos de la publication
        const newImageUrl = async () => {
            if (req.file) {
                try {
                    const type = req.file.filename.split('.')[1];
                    if (type == 'jpg' || type == 'png' || type == 'gif') {
                        return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    } /*else if (type == 'mp4' || type == 'm4v') {
                        return `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
                    }*/
                } catch (error) {
                    console.log(error);
                }
            } else {
                return '';
            };
        };
        imageUrl = await newImageUrl();
        const query = `INSERT INTO publications (text, autorId, imageUrl, likes) VALUES (?, ?, ?, 0);`
        const result = await sql.query(query, [text, autorId, imageUrl]);

        if (result[0].affectedRows === 1) {
            return res.status(201).json({ message: "publication created" });
        } else if (result[0].affectedRows === 0) {
            throw(error);
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ msg: 'Could not create publication' });
    };
};


// Fonction qui permet de récupérer les publications disponibles par tranche de 10, avec un offset en fonction de la page
exports.getAllPublications = async (req, res) => {
    const pageNumber = req.query.pageNumber;
    let offset = null;
    let allPubliLength = null;

    // Compte le nombre de publications dont le créateur ne sont pas des utilisateurs supprimés, pour la pagination
    try {
        const query1 = "SELECT COUNT(*) FROM publications INNER JOIN users ON publications.autorId = users.id WHERE users.deleted = FALSE;"
        const result1 = await sql.query(query1);
        const response1 = result1[0][0];
        allPubliLength = response1[Object.keys(response1)[0]];
        nbPubliLastPage = allPubliLength % 10;

        // Détermine la valeur de l'offset, soit pour avoir les 10 dernières publications, soit pour avoir celles de la page indiquée
        if (pageNumber == 'max') {
            try {
                console.log({"response:": response1});
                offset = allPubliLength - nbPubliLastPage;
                console.log({"offset:": offset})
            } catch(error) {
                console.log(error);
                return res.status(500).json({ msg: "Could not get publications" });
            };
        } else {
            offset = (pageNumber - 1) * 10;
        } 
        
        // Récupère 10 publications dont l'utilisateur n'est pas supprimé en fonction de l'offset déterminé par le numéro de la page à afficher
        try {
            const query = "SELECT p.id AS pubId, p.text, p.autorId, p.imageUrl AS pubImageUrl, p.usersLiked, p.likes, p.comments, p.date_insertion, p.date_modification, p.moderationIntervention, u.firstname, u.lastname, u.imageUrl, u.moderator FROM publications AS p INNER JOIN users AS u ON p.autorId = u.id WHERE u.deleted = FALSE ORDER BY date_insertion DESC LIMIT 10 OFFSET ? ;"
            const result = await sql.query(query, offset);
            const response = result[0];
            if (result.length === 0) {
                return res.status(500).json({message: "no publications to display"});
            };
            return res.status(200).json({ response, allPubliLength });
        } catch(error) {
            console.log(error);
            return res.status(500).json({ msg: "Could not get publications" });
        };
    } catch {
        return res.status(500).json({ msg: "Could not get publications" });
    };
}

// Fonction qui permet de récupérer les informations d'une seule publication à partir de son id
exports.getOnePublication = async (req, res) => {
    const pubId = req.params.pubId;
    try {
        const query = "SELECT p.id AS pubId, p.text, p.autorId, p.imageUrl AS pubImageUrl, p.usersLiked, p.likes, p.comments, p.date_insertion, p.date_modification, u.firstname, u.lastname, u.imageUrl FROM publications AS p INNER JOIN users AS u ON p.autorId = u.id WHERE p.id = ? AND u.deleted = FALSE;"
        const result = await sql.query(query, pubId);
        const response = result[0][0];
        if (result.length === 0) {
            return res.status(500).json({message: "no publications to display"});
        };
        return res.status(200).json({ response });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Could not get publications"});
    };
};

// Fonction qui permet à un utilisateur de modifier sa publication (ou de modifier celle d'un autre s'il est modérateur)
exports.modifyPublication = async (req, res) => {
    const text = req.body.text;
    const pubId = req.params.pubId;
    const removeFile = req.body.removeFile;
    console.log(removeFile);
    const userId = Number(req.query.userId);
    let lastModifiedByModerator = false;
    try {
        // Récupère autorId de la publication
        const query1 = "SELECT * FROM publications WHERE id = ?;"
        const result1 = await sql.query(query1, pubId);
        const response1 = result1[0][0];
        console.log(response1);
        // Permet de vérifier que la publication appartient bien à l'utilisateur qui tente de la modifier
        if (response1.autorId != userId) {

            let isModerator = await moderatorVerification(userId);
            if (isModerator != true) {
                return res.status(401).json({ message: "User does not have adequate rights to act on this publication" })
            } else {
                lastModifiedByModerator = true;
            }
        }
        try {
            // Supprime l'image actuelle de la publication
            if (req.file || removeFile == 'true') {
                if (response.imageUrl != '' || removeFile == 'true') {
                    try {
                        const filename = await response.imageUrl.split('/images/')[1];
                        fs.unlink(`images/${filename}`, (error) => {
                            if (error) {
                                throw(error);
                        }
                    });
                    } catch (error) {
                        console.log(error);
                        return res.status(500).json({ message: "Could not delete ancient file attached to publication" });
                    } 
                }
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Can't find publication"});
        };
        let imageUrl = "";
        const newImageUrl = async () => {
            if (req.file) {
                try {
                    const type = req.file.filename.split('.')[1];
                    if (type == 'jpg' || type == 'png') {
                        return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                    } /*else if (type == 'mp4' || type == 'm4v') {
                        return `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`;
                    }*/
                } catch (error) {
                    console.log(error);
                }
            } else if (removeFile == 'true') {
                return '';
            } else {
                return null;
            };
        };
        imageUrl = await newImageUrl();
        const query = `UPDATE publications SET text = ?, imageUrl = ?, moderationIntervention = ? WHERE id = ?;`
        const result = await sql.query(query, [text, imageUrl, lastModifiedByModerator, pubId]);

        if (result[0].affectedRows === 1) {
            return res.status(200).json({ message: "publication modified" });
        } else if (result[0].affectedRows === 0) {
            throw(error);
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: 'Impossible de modifier la publication'});
    };
};

// Fonction qui permet à un utilisateur de supprimer sa publication (ou de supprimer celle d'un autre s'il est modérateur)
exports.deletePublication = async (req, res) => {
    const pubId = req.query.pubId;
    const userId = Number(req.query.userId);
    console.log({"pubId": pubId});
    try {
        // Récupère autorId de la publication
        const query1 = "SELECT * FROM publications WHERE id = ?;"
        const result = await sql.query(query1, pubId);
        const response = result[0][0];
        console.log(response);
        // Permet de vérifier que la publication appartient bien à l'utilisateur qui tente de la supprimer
        if (response.autorId != userId) {

            let isModerator = await moderatorVerification(userId);
            if (isModerator != true) {
                return res.status(401).json({ message: "User does not have adequate rights to act on this publication" })
            }
        }

        // Supprime l'image stockée de la publication
        if (response.imageUrl != '') {
            try {
                const filename = await response.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, (error) => {
                    if (error) {
                        throw(error);
                }
            });
            } catch (error) {
                console.log(error);
                return res.status(500).json({ message: "Could not delete file attached to publication" });
            } 
        }
        // Supprime la publication de la BDD
        const query2 = "DELETE FROM publications WHERE id = ?;"
        const result2 = await sql.query(query2, pubId);

        if (result2[0].affectedRows === 1) {
            const query3 = "DELETE FROM comments WHERE pubOriginId = ?;"
            const result3 = await sql.query(query3, pubId);
            return res.status(200).json({ message: "publication deleted" });
        } else if (result[0].affectedRows === 0) {
            throw(error);
        };
    } catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Could not delete publication"});
    };
};

// Fonction qui permet à un utilisateur de like/dislike une publication à partir de l'id utilisateur, de l'id de publication, et de la valeur de like
exports.likePublication = async (req, res) => {
    const pubId = req.params.pubId;
    const userId = req.query.userId;
    const like = req.params.like;
    console.log({"pubId": pubId});
    console.log({"like": like});

    try {
        const querySelect = "SELECT usersLiked FROM publications WHERE id = ?;"
        const result = await sql.query(querySelect, pubId);
        const response = result[0][0];
        console.log({"response": response});
        if (result.length === 0) {
            return res.status(500).json({message: "this publication does not exist"});
        };
        let usersLiked = [];
        if (response.usersLiked != null) {
            usersLiked = response.usersLiked.split(',');
            // Permet de nettoyer l'array des valeurs vides
            if (usersLiked[0] == '') {
                usersLiked.shift();
            }
        }
        console.log(usersLiked);
        // En fonction de la valeur de "like" dans le corps de la requête, donne différents résultats
        switch (like) {
            /* Si like = 1, teste d'abord si le user à l'origine de la requête n'existe déjà pas dans la liste
            usersLiked de la publication, puis, si il n'y est pas, l'y ajoute, recalcule le nombre de likes de la publication en 
            fonction de la longueur de l'array usersLiked, et met à jour la publication dans la base de données
            avec les infos de la publication modifiée, avant d'envoyer une réponse de status 201 au frontend 
            Si le user est déjà dans usersLiked, envoie un message d'erreur et un status code */
            case '1':
                if (usersLiked.indexOf(userId) === -1) {
                    try {
                        usersLiked.push(userId);
                        console.log(usersLiked);
                        const usersLikedToUpdate = usersLiked.join(',');
                        console.log(usersLikedToUpdate);
                        const query1 = `UPDATE publications SET usersLiked = ?, likes = ? WHERE id = ?;`
                        console.log({"usersLikedToUpdate": usersLikedToUpdate});
                        console.log({"usersLiked.length": usersLiked.length});
                        console.log({"pubId": pubId});
                        const result1 = await sql.query(query1, [usersLikedToUpdate, usersLiked.length, pubId]);
                        if (result1[0].affectedRows === 1) {
                            return res.status(201).json({ message: "publication liked" });
                        } else if (result1[0].affectedRows === 0) {
                            throw(error);
                        };
                    } catch(error) {
                        return res.status(409).json({ error: error });
                    };
                } else {
                    return res.status(200).json({ message: "User already likes this post" });
                };
            break;
            /* Si like = 0, teste d'abord si le user à l'origine de la requête existe dans la liste
            usersLiked de la publication, puis : 
            -si il y est, le retire et recalcule le nombre de likes de la publication en 
            fonction de la longueur de l'array usersLiked, et met à jour la publication dans la base de données
            avec les infos de la publication modifiée, avant d'envoyer une réponse de status 201 au frontend 
            Si le user n'est pas l'array, envoie un message d'erreur et un status code */
            case '0':
                if (usersLiked.indexOf(userId) !== -1) {
                    try {
                        usersLiked.splice(usersLiked.indexOf(userId), 1);
                        const usersLikedToUpdate = usersLiked.join(',');
                        const query0 = `UPDATE publications SET usersLiked = ?, likes = ? WHERE id = ?;`
                        console.log({"usersLikedToUpdate": usersLikedToUpdate});
                        console.log({"usersLiked.length": usersLiked.length});
                        console.log({"pubId": pubId});
                        const result0 = await sql.query(query0, [usersLikedToUpdate, usersLiked.length, pubId]);
                        if (result0[0].affectedRows === 1) {
                            return res.status(201).json({ message: "publication unliked" });
                        } else if (result0[0].affectedRows === 0) {
                            throw(error);
                        };
                    } catch(error) {
                        return res.status(409).json({ error: error });
                    };
                } else {
                    return res.status(200).json({ message: "User does not an opinion about this post" });
                };
            break;
            // Si la valeur de like ne correspond à aucune valeur admise par le switch, throw une switchException
            default:
                return res.status(400).json({ message: "Like value is incorrect" });
        }
    } catch(error) {
        res.status(400).json({ error });
    };  
};