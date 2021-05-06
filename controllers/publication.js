const { sequelize, User, Publication } = require('../models');
const fs = require('fs');
const user = require('../models/user');

// Fonction qui permet de créer une nouvelle publication dans la base de données
exports.createPublication = async (req, res) => {
    const { text, autorUuid } = req.body;
    try {
        const user = await User.findOne({ where: { uuid: autorUuid }});
        
        const publication = new Publication({ text, autorId: user.id});
        if (req.file) {
            publication.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };

        await publication.save();
        return res.status(201).json({ message: 'Publication créée'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Could not create publication'});
    };
};

exports.getAllPublications = async (req, res) => {
    const pageNumber = req.body.pageNumber;
    const offset = (pageNumber - 1) * 10;
    try {
        const publications = await Publication.findAll({ include: 'user', order: [[ 'createdAt', 'DESC']], offset: offset, limit: 10 });
        return res.json(publications);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Could not get publications"});
    };
};

exports.getOnePublication = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const publication = await Publication.findOne({ where: { uuid }, include: 'user'});
        return res.json(publication);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Could not get publications"});
    };
};

exports.modifyPublication = async (req, res) => {
    const autorUuid = req.body.autorUuid;
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({ where: { uuid: autorUuid }});
        let publication = await Publication.findOne({ where: { uuid }, include: 'user'});
        publication = { ...req.body };
        publication.autorId = user.id;
        if (req.file) {
            publication.imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        await Publication.update({ ...publication }, { where: { uuid } })
        return res.status(201).json({ message: 'Publication modifiée'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Impossible de modifier la publication'});
    };
};

exports.deletePublication = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const publication = await Publication.findOne({ where: { uuid }});
        const filename = publication.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`);
        await Publication.destroy({ where: { uuid } })
        return res.status(200).json({ message: 'Sauce supprimée'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Could not get publications"});
    };
};

// Besoin de : uuid de la publication en paramètre d'URL, like(int de valeur 0 ou 1), userUuid(uuid de l'utilisateur ayant liké/disliké)
exports.likePublication = async (req, res) => {
    try {
        // Crée un nouveau type d'exception pour le switch à venir
        const switchException = (message, status) => {
            this.message = message;
            this.status = status;
        };
        // Cherche la publication correspondante d'après l'uuid fournie par la requête
        const publication = await Publication.findOne({ where: { uuid: req.params.uuid } });
        // En fonction de la valeur de "like" dans le corps de la requête, donne différents résultats
            switch (req.body.like) {
                /* Si like = 1, teste d'abord si le user à l'origine de la requête n'existe déjà pas dans la liste
                usersLiked de la sauce, puis, si il n'y est pas, l'y ajoute, recalcule le nombre de likes de la sauce en 
                fonction de la longueur de l'array usersLiked, et met à jour la sauce dans la base de données
                avec les infos de la sauce modifiée, avant d'envoyer une réponse de status 201 au frontend 
                Si le user est déjà dans usersLiked, throw une switchException avec un message d'erreur et un status code */
                case 1:
                    if (publication.usersLiked.indexOf(req.body.userUuid) === -1) {
                        try {
                        publication.usersLiked.push(req.body.userUuid);
                        publication.likes = publication.usersLiked.length;
                        await Publication.update({ publication }, { where: { uuid } })
                        return res.status(201).json({ message : "Post liked!" });
                        } catch(error) {
                            return res.status(409).json({ error: error });
                        };
                    } else {
                        throw new switchException("User already likes this post!", 200);
                    };
                    break;
                /* Si like = 0, teste d'abord si le user à l'origine de la requête existe dans la liste
                usersLiked de la sauce, puis : 
                -si il y est, le retire et recalcule le nombre de likes de la sauce en 
                fonction de la longueur de l'array usersLiked, et met à jour la sauce dans la base de données
                avec les infos de la sauce modifiée, avant d'envoyer une réponse de status 201 au frontend 
                -s'il n'y est pas, teste si le user à l'origine de la requête existe dans la liste
                usersDisliked de la sauce, et s'il y est, le retire et recalcule le nombre de dislikes de la sauce en 
                fonction de la longueur de l'array usersDisliked, et met à jour la sauce dans la base de données
                avec les infos de la sauce modifiée, avant d'envoyer une réponse de status 201 au frontend 
                Si le user n'est dans aucun des deux arrays, throw une switchException avec un message d'erreur et un status code */
                case 0:
                    if ((userToRemoveIndex = publication.usersLiked.indexOf(req.body.userUuid)) !== -1) {
                        try {
                        publication.usersLiked.splice(userToRemoveIndex, 1)
                        publication.likes = publication.usersLiked.length;
                        await Publication.update({ publication }, { where: { uuid } })
                        return res.status(201).json({ message : "Post unliked!" });
                        } catch(error) {
                            return res.status(409).json({ error: error });
                        };
                    } else if ((userToRemoveIndex = publication.usersDisliked.indexOf(req.body.userUuid)) !== -1) {
                        try {
                        publication.usersDisliked.splice(userToRemoveIndex, 1)
                        publication.dislikes = publication.usersDisliked.length;
                        await Publication.update({ publication }, { where: { uuid } })
                        return res.status(201).json({ message : "Post unliked!" });
                        } catch(error) {
                            return res.status(409).json({ error: error });
                        };
                    } else {
                        throw new switchException("User does not have an opinion about this post.", 200);
                    };
                    break;
                // Si la valeur de like ne correspond à aucune valeur admise par le switch, throw une switchException
                default:
                    throw new switchException("Like value is incorrect.", 400);
        }
    } catch(error) {
        res.status(error.status).json({error: error.message });
    };
};

/*app.post('/publications', async (req, res) => {
    const { userUuid, text } = req.body;
    try {
        const user = await User.findOne({ where: { uuid: userUuid }});
        const publication = await Publication.create({ text, autorId: user.id });
        return res.json(publication);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Could not create publication"});
    };
});

app.get('/publications', async (req, res) => {
    try {
        const publications = await Publication.findAll({ include: 'user' });
        return res.json(publications);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Could not get publication"});
    };
});*/
