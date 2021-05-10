const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model.js');

exports.signup = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
          message: "Content can not be empty!"
        });
    }
    const { firstname, lastname, email, password, birthdate, gender } = req.body;
    try {
        let hash = await bcrypt.hash(password, 10);
        try {
            const user = await new User({ firstname, lastname, email, password: hash, birthdate, gender });
            User.signup(user, (err, data) => {
                return res.status(201).json({ data });
            });
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
        console.log({ user });
        let upassword = user.password;
        console.log({ upassword })
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userUuid: user.uuid,
                    token: jwt.sign(
                        { userUuid: user.uuid },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h'}
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
            
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
        let hash = "";
        if (password) {
            hash = await bcrypt.hash(password, 10);
            user.password = hash;
        }
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
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
