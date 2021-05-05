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
