const dotenv = require('dotenv').config();
const express = require('express');
const { sequelize, User, Publication } = require('./models');

const app = express();
app.use(express.json());

app.post('/users', async(req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const user = await User.create({ firstname, lastname, email, password });
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json(err);
    };
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.json(users);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Something failed somewhere'});
    };
});

app.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({
            where: { uuid },
            include: 'publications'
        });
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Something failed somewhere'});
    };
});

app.post('/publications', async (req, res) => {
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
        return res.status(500).json({ error: "Could not create publication"});
    };
});

app.listen({ port: 5000 }, async () => {
    console.log('Server up on http://localhost:5000');
    await sequelize.authenticate();
    console.log('Database Connected');
});

app.delete('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    try {
        const user = await User.findOne({ where: { uuid } });
        await user.destroy();
        return res.json({ message: 'User deleted' });
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Something failed somewhere'});
    };
});

app.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid;
    const { firstname, lastname, email, password } = req.body;
    try {
        const user = await User.findOne({ where: { uuid } });
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        await user.save();
        return res.json(user);
    } catch(err) {
        console.log(err);
        return res.status(500).json({ error: 'Something failed somewhere'});
    };
});