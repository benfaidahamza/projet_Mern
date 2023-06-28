const mongoose=require('mongoose')

const ProduitsShema= new mongoose.Schema({
    nom: {
        type:String
    },
    description: {
        type:String
    },
    quantite_disponible: {
        type:Number
    },
    categorie: {
        type:String
    }
})

module.exports= Produits = mongoose.model('Produits',ProduitsShema,"Produits");