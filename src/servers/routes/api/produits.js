const express=require("express")
const router=express.Router();

const Produits= require('../../../models/Produit')

router.get('/produits/',(req,res)=>
res.send('produits test'));

router.get('/',(req,res)=>{
    console.log(1)
    Produits.find()
    .then(produit=>res.json(produit))
    .catch(err=>res.status('404').json({noProduitsFound: 'Pas de produits trouvées...'}));
})

module.exports=router;