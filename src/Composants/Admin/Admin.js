import React from 'react'
import NavAdmin from '../Header/NavAdmin'



export default function Admin() {
  return (

  
  
<html>
<head>
  <title>Compte Admin</title>
  <link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body>
<NavAdmin/>
  <div class="container">
    <form class="login-form">
      <h1>Compte Admin</h1>
      <div class="form-group">
        <label for="username">Nom d'utilisateur</label>
        <input type="text" id="username" name="username" placeholder="Nom d'utilisateur"/>
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder="Mot de passe"/>
      </div>
      <button type="submit">Se connecter</button>
    </form>
  </div>
</body>
</html>



  )
}
