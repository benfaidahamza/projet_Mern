const express = require('express');
const router = express.Router();
const Users = require('../../../models/User');
const {generateToken } = require('./jwt');

router.post('/login', (req, res) => {
    const login = req.body.username;
    const password = req.body.password;

    Users.findOne({
        $or: [
            { username: login },
            { email: login }
        ]
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ noUserFound: 'Pas d\'utilisateur trouvé avec cet identifiant.' });
            }
            if (user.password === password) {
                const token = generateToken(user);
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Mot de passe incorrect.' });
            }
        })
        .catch(err => res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur.' }));
});

module.exports = router;