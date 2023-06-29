import React from 'react'
import './Footer.css'

export default function Footer() {
  return (

    <footer>
    <div className="footer-content">
      <div className="footer-column">
      <img src="Dev.jpeg" alt="Image 2"/>
      <br/>
        <h3>Jordy AKRA MESCHEBA</h3>
      </div>
      <div className="footer-column">
      <img src="Dev.jpeg" alt="Image 2"/>
      <br/>
        <h3>Youssef AZARRAF</h3>
      </div>
      <div className="footer-column">
      <img src="Dev.jpeg" alt="Image 2"/>
      <br/>
        <h3>Hamza BENFAIDA</h3>
      </div>
    </div>
    <div className="footer-bottom">
      <p>Tous droits réservés &copy; 2023 Votre Société. | <a href="#">Politique de confidentialité</a> | <a href="#">Conditions d'utilisation</a></p>
    </div>
  </footer>
  
  )

}


