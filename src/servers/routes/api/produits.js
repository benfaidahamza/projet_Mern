const express = require('express');
const router = express.Router();
const Produits = require('../../../models/Produit');
const jwtSecret = 'ma_cle_secrete'; 
const { verifyToken } = require('./jwt');

router.get('/', verifyToken, (req, res) => {
  console.log(1)
  Produits.find()
    .then(produits => res.json(produits))
    .catch(err => res.status(404).json({ noProduitsFound: 'Pas de produits trouvés...' }));
});

router.get('/:id', verifyToken, (req, res) => {
  Produits.findById(req.params.id)
    .then(produit => res.json(produit))
    .catch(err => res.status(404).json({ produitNotFound: 'Produit non trouvé...' }));
});

router.get('/categorie/:categorie', verifyToken, (req, res) => {
  const categorie = req.params.categorie;
  Produits.find({ categorie: categorie })
    .then(produits => res.json(produits))
    .catch(err => res.status(404).json({ noProduitsFound: 'Pas de produits trouvés pour cette catégorie...' }));
});

router.post('/CreateProduit', verifyToken, (req, res) => {
  Produits.create(req.body)
    .then(produit => res.json({ msg: 'produit bien ajouté !' }))
    .catch(err => res.status(400).json({ error: 'Impossible d\'ajouter le produit' }));
});

router.put('/:id', verifyToken, (req, res) => {
  Produits.findByIdAndUpdate(req.params.id, req.body)
    .then(produit => res.json({ msg: 'produit bien modifié!' }))
    .catch(err => res.status(400).json({ error: 'Erreur lors de la mise à jour du produit...' }));
});

router.delete('/:id', verifyToken, (req, res) => {
  Produits.findByIdAndDelete(req.params.id)
    .then(() => res.json({ success: 'Produit supprimé avec succès' }))
    .catch(err => res.status(404).json({ produitNotFound: 'Produit non trouvé...' }));
});

module.exports = router;