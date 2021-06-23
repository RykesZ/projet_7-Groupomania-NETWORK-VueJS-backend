const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sql = require('../models/db');
const fs = require('fs');
const fsPromises = fs.promises;

// Fonction qui permet à un nouvel utilisateur de s'inscrire dans la BDD avec les infos du formulaire d'inscription
exports.signup = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
          message: "Content can not be empty!"
        });
    }
    const { firstname, lastname, email, password, birthdate, gender } = req.body.data;
    try {
        console.log(password);
        let hash = await bcrypt.hash(password, 10);
        try {
            const query = `INSERT INTO users (firstname, lastname, email, password, birthdate, gender, imageUrl, deleted, moderator) VALUES (?, ?, ?, ?, ?, ?, "http://localhost:5000/images/PP_default.png", 0, 0);`
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


// Fonction qui permet à l'utilisateur de s'authentifier pour accéder au contenu de la web app à partir de l'email et du mdp qu'il a fourni
exports.login = async (req, res) => {
    const { email, password } = req.body.data;
    try {
        const query = "SELECT id, password FROM users WHERE email = ? ;"
        const rows = await (sql.query(query, email))
        /*console.log(rows);
        console.log(rows[0]);
        console.log(rows[0][0]);
        console.log(rows[0][0].password);*/
        const hashedPass = rows[0][0].password;
        const userId = rows[0][0].id;
        // Vérifie que le mdp fourni correspond à celui hashé enregistré dans la BDD puis fourni un token d'authentification si c'est le cas
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
        return res.status(500).json({ error: "Utilisateur inconnu" });
    };
};


// Fonction qui permet de récupérer les informations non-sensibles d'un utilisateur à partir de son id
exports.getUserInfo = async (req, res) => {
    if (!req.query) {
        return res.status(400).json({
          message: "Demand can not be empty!"
        });
    }
    const userId = Number(req.query.userId);
    console.log(userId);
    try {
        const query = "SELECT firstname, lastname, email, birthdate, gender, imageUrl, moderator FROM users WHERE id = ? ;"
        const result = await sql.query(query, userId)
        //console.log(result);

        /*console.log(result);
        console.log(result[0]);
        console.log(result[0][0]);
        console.log(result[0][0].id);*/

        const response = result[0][0];

        if (result.length === 0) {
            return res.status(500).json({message: "user not found"});
        };
        console.log(response)
        return res.status(200).json({ response });
    } catch(err) {
        return res.status(500).json({message: "user not found"})
    };
};


// Fonction qui permet à un utilisateur de modifier les informations personnelles de son compte
exports.modifyUser = async (req, res) => {
    // Remplace les champs du formulaire vides ("null") par la valeur null qui sera reconnue par la BDD
    try {
        let fields = req.body;
        for (let field in fields) {
            if (fields[field] === "null") {
                fields[field] = null;
            }
        }
        const { userId, firstname, lastname, email, password, birthdate, gender } = fields;
        let imageUrl = null;
        // Obtient le filename de l'image de profil actuelle
        const getFileName = async () => {
            try {
                const query2 = "SELECT imageUrl FROM users WHERE id = ?;"
                const resultUrl = await sql.query(query2, [userId]);
                return resultUrl[0][0].imageUrl.split('/images/')[1];
                console.log({"l120": filename});
            } catch {
                console.log("unable to get filename");
            }
        }
        let filename = await getFileName();
        

        // Si un fichier d'image de profil est présent, construit la nouvelle URL à insérer dans les infos du user
        const newImageUrl = async () => {
            if (req.file) {
                try {
                    return `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                } catch (error) {
                    console.log(error);
                }
            } else {
                return null;
            }
        }


        // Fonction qui met à jour les infos du user
        const updateUserInfos = async () => {
            try {
                imageUrl = await newImageUrl();
                console.log({"l144": imageUrl});
                let hash = null;
                if (password) {
                    hash = await bcrypt.hash(password, 10);
                }
                console.log({"l150": imageUrl});
                const query = "UPDATE users SET firstname = ?, lastname = ?, email = ?, password = ?, birthdate = ?, gender = ?, imageUrl = ? WHERE id = ?;"
                const result = await sql.query(query, [firstname, lastname, email, hash, birthdate, gender, imageUrl, userId]);
                if (result[0].affectedRows == 0) {
                    return res.status(500).json("user not found");
                }
                // Si la précédente image de profil n'était pas celle par défaut, la supprime du stockage en la repérant au filename obtenu plus tôt
                const deleteOldImage = () => {
                    if (filename != "PP_default.png" && imageUrl != null) {
                        try {
                            fs.unlink(`images/${filename}`, () => {
                            });
                        } catch (error) {
                            console.log({error: "l128 error"});
                        }
                    }
                }
                deleteOldImage();

                // Renvoie enfin la réponse à la requête
                return res.status(200).json({ message: "user updated" })
            } catch(err) {
                console.log(err);
                return res.status(500).json({ err });
            }
        };
        updateUserInfos();
        
    } catch(err) {
        return res.status(400).json({ message : "Bad request error"});
    }
    
};


// Fonction qui permet à un utilisateur de supprimer son compte, avec l'option de garder en ligne ses commentaires anonymisés, ou de supprimer ses publications et commentaires entièrement
exports.deleteUser = async (req, res) => {
    const userId = Number(req.query.userId);
    const deletePubAndComms = req.query.deletePubAndComms;
    const getFileName = async () => {
        try {
            const query2 = "SELECT imageUrl FROM users WHERE id = ?;"
            const resultUrl = await sql.query(query2, [userId]);
            return resultUrl[0][0].imageUrl.split('/images/')[1];
        } catch {
            console.log("unable to get filename");
        }
    }
    let filename = await getFileName();

    const deleteOldImage = () => {
        if (filename != "PP_default.png") {
            try {
                fs.unlink(`images/${filename}`, () => {
                });
            } catch (error) {
                console.log({error: "unable to delete old image"});
            }
        }
    }
    deleteOldImage();


    // Si l'option est désactivée, anonymise le compte, ce qui cachera les publications aux autres utilisateurs, tout en laissant visible les commentaires
    if (deletePubAndComms !== "on") {
        try {
            const query = `UPDATE users SET firstname = "Utilisateur", lastname = "supprimé", email = "", password = "", birthdate = 0000-00-00,imageUrl = "http://localhost:5000/images/PP_default.png", deleted = TRUE WHERE id = ? ;`
            const result = await sql.query(query, userId)
            if (result[0].affectedRows == 0) {
                console.log(result[0].affectedRows);
                return res.status(500).json({ message: "user not found" });
            }
            return res.status(200).json({ message: "user deleted" })
        } catch(error) {
            return res.status(500).json({ error })
        };
    // Si l'option est activée, supprime entièrement le compte, ses publications, et ses commentaires
    } else if (deletePubAndComms === "on") {
        try {
            const query = `DELETE FROM users WHERE id = ? ;`
            const result = await sql.query(query, userId)
            if (result[0].affectedRows == 0) {
                console.log(result[0].affectedRows);
                return res.status(500).json({ message: "user not found" });
            };
            try {
                const query2 = `DELETE FROM publications WHERE autorId = ? ;`
                const result2 = await sql.query(query2, userId);
            } finally {
                try {
                    const query3 = `DELETE FROM comments WHERE autorId = ? ;`
                    const result3 = await sql.query(query3, userId);
                } finally {
                    return res.status(200).json({ message: "user deleted" })
                };
            }
        } catch {
            return res.status(500).json({ message: "DB error" })
        }
    };
};





