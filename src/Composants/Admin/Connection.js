import React from 'react'
import './Connection.css'

export default function Connection() {
  return (
    <>
      <div class="container">
        <form class="login-form">
          <h1>Connexion</h1>
          <div class="form-group">
            <label for="username">Nom d'utilisateur</label>
            <input type="text" id="username" name="username" placeholder="Nom d'utilisateur" />
          </div>
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" placeholder="Mot de passe" />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>

    </>

  )
}
