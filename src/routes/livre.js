
const express = require('express')
const route = require('./livre')
const app = express()
const livres = require('./livres.json');
// const cors = require('cors');




// app.use(cors());

// AFFICHAGE A DE L'ACCUEIL


app.get('/', (req, res) => {

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`Bonjour <h1>Page d'accuil</h1> <input/>`);

});
// AFFICHAGE DE TOUS LES LIVRES

app.get('/livres', (req, res) => {

    res.status(200).json(livres)

});

// AFFICHAGE A PARTIR DE L'IDENTIFIANT
app.get('/livres/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const leLivre = livres.find(livres => livres.id === id)

    res.status(200).json(leLivre)

});

// AFFICHAGE A PARTIR DU NOM

app.get('/livres/:titre', (req, res) => {

    const titre = (req.params.titre)
    const leLivre = livres.find(livres => livres.titre === titre)

    res.status(200).json(leLivre)

});

// AJOUT DES ROUTES POSTS
app.use(express.json())

app.post('/livres', (req, res) => {
    livres.push(req.body)
    res.status(200).json(livres)
})


app.listen(3000, () => {
    console.log(`serveur à l'écoute du port 3000`)
})




