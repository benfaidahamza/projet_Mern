

const express = require('express')
const route = require('./livre')
const app = express()

const livres = require('./livres.json');



// Affichage à de tous les livres




app.get('/', (req, res) => {

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`Bonjour <h1>Page d'accuil</h1> <input/>`);

});
// Affichage à de tous les livres

app.get('/livres', (req, res) => {

    res.status(200).json(livres)

});

// // Affichage à partir de l'identifiant
app.get('/livres/:id', (req, res) => {

    const id = parseInt(req.params.id)
    const leLivre = livres.find(livres => livres.id === id)

    res.status(200).json(leLivre)

});

// // Affichage à partir de nom

app.get('/livres/:titre', (req, res) => {

    const titre = (req.params.titre)
    const leLivre = livres.find(livres => livres.titre === titre)

    res.status(200).json(leLivre)

});

app.use(express.json())

app.post('/livres', (req, res) => {
    livres.push(req.body)
    res.status(200).json(livres)
})


app.listen(3000, () => {
    console.log(`serveur connecté`)
})

// AJOUT DES ROUTES POSTS



// const app = express();

// // Utilisation du middleware cors
// app.use(cors());

// // Vos routes et gestionnaires de route ici...

// // Démarrer le serveur
// app.listen(3000, () => {
//   console.log('Le serveur est en écoute sur le port 3000');
// });
