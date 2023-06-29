import React from 'react'
import { Link } from 'react-router-dom';
import './NavProduits.css'


export default function Navbar() {
  return (



    <header className="App-header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to='/accueil' className='accueil'>
            <img className='navbar-brand' src="LogoIpssi.jpeg" alt="Logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-link">
                <Link to='/accueil' id='Accueil' className="nav-link " aria-current="page" >Accueil</Link>
              </li>
              <li className="nav-link">
                <Link to='/produits' id='Produits' className="nav-link" >Liste Produits</Link>
              </li>
              <li className="nav-link">
                <Link to='/admin'  className=" nav-link"  >
                  Administrateur
                </Link>
              </li>

            </ul>

         <input className='saisis'placeholder=' Saisir le nom de votre produit' />
          <input className='rechercher' type="submit" value="Rechercher " />

            {/* <Link  className="navbar-text ml-3">
  <i className="fa fa-shopping-cart"></i> Panier</Link>
         */}
          </div>
        </div>
      </nav>
    </header>



  )
}
