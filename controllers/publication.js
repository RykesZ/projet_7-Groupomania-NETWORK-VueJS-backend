const { sequelize, User, Publication } = require('../models');
const fs = require('fs');
const user = require('../models/user');

exports.createPublication = async (req, res) => {
    const { text, autorUuid } = req.body;
    try {
        const user = await User.findOne({ where: { uuid: autorUuid }});
        const publication = new Publication({ text, autorId: user.id });
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
        await Publication.update({ ...publication }, { where: { uuid } })
        return res.status(201).json({ message: 'Publication modifiée'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Imposible de modifier la publication'});
    };
};

exports.deletePublication = async (req, res) => {
    const uuid = req.params.uuid;
    try {
        await Publication.destroy({ where: { uuid } })
        return res.status(200).json({ message: 'Sauce supprimée'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: "Could not get publications"});
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
