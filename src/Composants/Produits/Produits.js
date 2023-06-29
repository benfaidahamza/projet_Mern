import React from 'react'
import NavProduits from '../Header/NavProduits'
import './Produits.css'

export default function Produits() {
  return (
    <>
<NavProduits/>
      <div className='Produits'>
        <div className="wrapper" >
          <div className="col" >
            <div className="card border-warning mb-3">
              <img
                src=""
                className="card-img-top"
                alt=''
              />

              <div className="card-body">

                <h4 className="card-title">
                  Détails
                </h4>

                <p className="card-text">
                  Description du produit:
                  <br />
                  Prix:
                  <br />

                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
