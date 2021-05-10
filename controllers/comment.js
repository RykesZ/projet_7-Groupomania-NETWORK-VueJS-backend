//const { json } = require('sequelize/types');
const { sequelize, User, Publication, Comment } = require('../models/index_seq');

exports.createComment = async (req, res) => {
    // Récupère le texte du commentaire, ainsi que l'uuid de son auteur et de la publciation à laquelle il apparatient
    const { text, autorUuid, publicationUuid } = req.body;
    try {
        // Cherche l'auteur et la publication dans la BDD avec leur uuid
        const user = await User.findOne({ where: { uuid: autorUuid } });
        const publication = await Publication.findOne({ where: { uuid: publicationUuid } });
        // Récupère la string-liste des ids des commentaires de la publication et la stocke sous forme d'array (en séparant les valeurs à chaque , )
        const listComms = publication.comments.split(',');

        // Crée un nouveau commentaire et le sauvegarde dans la BDD
        const comment = new Comment({ text, autorId: user.id});
        await comment.save();
        // Insère dans l'array-liste des ids des commentaires de la publication l'id du commentaire juste créé
        await listComms.push(comment.id);
        // Retransforme l'array-liste des ids de commentaires de la publication en string dans la publication (en séparant les valeurs par une , )
        publication.comments = listComms.join(',');

        // Sauvegarde la publication mise à jour
        await publication.save();

        return res.status(201).json({ message: 'Commentaire créé'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Could not create comment'});
    };
};

// Envoie tous les commentaires d'une publication identifiée par son uuid
exports.getAllComments = async (req, res) => {
    const pubUuid = req.params.pubUuid;
    try {
        const publication = await Publication.findOne({ where: { uuid: pubUuid } });
        const listComms = publication.comments.split(',');
        const comments = [];
        for (i = 0; i < listComms.length; i++) {
            let newComment = await Comment.findOne({ where: { id: listComms[i]} });
            comments.push(newComment);
        }
        if (comments.length === listComms.length) {
            return res.status(201).json({comments});
        } else {
            return res.status(500).json({ message: 'Unable to load comments'})
        }
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Could not find comment'});
    }
}