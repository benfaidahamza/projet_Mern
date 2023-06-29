import React from 'react'
import NavAdmin from '../Header/NavAdmin'
import './Inscription.css'

export default function Inscription() {
  return (
<>
<NavAdmin/>
<div className="container">
    <form className="login-form">
    <h1 className='inscriptionTitre'>Inscription</h1>
    <label for="nom">Nom :</label>
          <input type="text" id="nom" name="nom" required /><br/>

            <label for="prenom">Prénom :</label>
            <input type="text" id="prenom" name="prenom" required /><br/>

              <label for="email">Adresse e-mail :</label>
              <input type="email" id="email" name="email" required /><br/>

                <label for="motdepasse">Mot de passe :</label>
                <input type="password" id="motdepasse" name="motdepasse" required /><br/>

                  <input  type="submit" value="S'inscrire"/>
    </form>
  </div>
  



        




              </>

              )
}
