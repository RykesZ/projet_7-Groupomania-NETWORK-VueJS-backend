const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize, User } = require('../models');

exports.signup = async (req, res) => {
    const { firstname, lastname, email, password, birthdate, gender } = req.body;
    try {
        let hash = await bcrypt.hash(password, 10);
        try {
            const user = new User({ firstname, lastname, email, password: hash, birthdate, gender });
            await user.save();
            return res.status(201).json({ user });
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
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        if (bcrypt.compare(password, user.password)) {
            res.status(200).json({
                userUuid: user.uuid,
                token: jwt.sign(
                    { userUuid: user.uuid },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h'}
                )
            });
        } else {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
        }
    } catch(error) {
        return res.status(500).json({ error });
    };
};

exports.getUserInfo = async (req, res) => {
    const uuid = req.body.uuid;
    try {
        const user = await User.findOne({ where: { uuid } })
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        return res.status(200).json(user)
    } catch(error) {
        return res.status(500).json({ error })
    };
};

exports.modifyUser = async (req, res) => {
    const { uuid, firstname, lastname, email, password, birthdate, gender } = req.body;
    try {
        const user = await User.findOne({ where: { uuid } });
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        let hash = await bcrypt.hash(password, 10);
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = hash;
        user.birthdate = birthdate;
        user.gender = gender;
        await user.save();
        return res.status(201).json({ message: 'Utilisateur modifié'});
    } catch(error) {
        return res.status(500).json({ error });
    }
};

exports.deleteUser = async (req, res) => {
    const uuid = req.body.userUuid;
    try {
        const user = await User.findOne({ where: { uuid } })
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        await user.destroy();
        return res.status(200).json({ message: 'Utilisateur supprimé' })
    } catch(error) {
        return res.status(500).json({ error })
    };
};


/*
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
*/

