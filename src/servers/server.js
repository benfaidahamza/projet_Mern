require('dotenv').config()
const express = require('express');
let cors=require('cors')

//routes 
const Produits=require('./routes/api/Produits')

const app= express()

//connexion BDD
const connectDB=require('./db/conn')

app.use(express.json())
app.use(cors())

//Connect Database 
connectDB();

app.use('/api/produits',Produits)

app.listen(3001,()=>{
    console.log("Serveur à l'écoute")
})