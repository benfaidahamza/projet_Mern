const express = require('express');
const app= express()
let cors=require('cors')
app.use(express.json())
app.use(cors())

app.listen(3000,()=>{
    console.log("Serveur à l'écoute")
})