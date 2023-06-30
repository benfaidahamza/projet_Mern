import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Header/Navbar';

const Panier = () => {
  const [panierItems, setPanierItems] = useState([]);

  useEffect(() => {
    const storedPanierItems = JSON.parse(localStorage.getItem('panier')) || [];
    setPanierItems(storedPanierItems);
  }, []);

  const removeFromCart = (produitId) => {
    const updatedCartItems = panierItems.filter((produit) => produit.produit.id !== produitId);
    setPanierItems(updatedCartItems);
    localStorage.setItem('panier', JSON.stringify(updatedCartItems));
    alert('Produit supprimé du panier !');
  };

  const decrementQuantite = (produitId) => {
    const updatedCartItems = panierItems.map((item) => {
      if (item.produit.id === produitId) {
        if (item.quantitepanier > 0) {
          item.quantitepanier -= 1;
        }
      }
      return item;
    });

    const updatedCartItemsFiltered = updatedCartItems.filter((item) => item.quantitepanier > 0);

    setPanierItems(updatedCartItemsFiltered);
    localStorage.setItem('panier', JSON.stringify(updatedCartItemsFiltered));
  };

  const removeAllItems = () => {
    setPanierItems([]);
    localStorage.removeItem('panier');
    alert('Panier vidé !');
  };

  const confirmCart = () => {
      const updatedProduits = panierItems.map((item) => {
      const updatedQuantite = item.produit.quantite - item.quantitepanier;
      return { ...item.produit, quantite: updatedQuantite };
    });
    console.log(updatedProduits)
    const storedToken = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    axios
      .put('http://localhost:3001/api/produits', updatedProduits)
      .then(() => {
        setPanierItems([]);
        localStorage.removeItem('panier');
        alert('Panier confirmé !');
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la liste de produits', error);
      });
  };

  return (
    <>
    <Navbar></Navbar>
    <div className="container1">
      <h2>Panier</h2>
      {panierItems.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <div>
          <div className="row">
            {panierItems.map((item) => (
              <div className="col-md-4" key={item.produit.id}>
                <div className="card">
                  <img src={`${item.produit.categorie}.png`} className="card-icon" alt={item.produit.categorie} />
                  <div className="card-body">
                    <h5 className="card-title">{item.produit.nom}</h5>
                    <ul className="card-info">
                      <li>
                        <strong>Description:</strong> {item.produit.description}
                      </li>
                      <li>
                        <strong>Quantité:</strong> {item.quantitepanier}
                      </li>
                      <li>
                        <strong>Prix:</strong> {item.produit.prix}
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center">
                      <button className="btn btn-danger" onClick={() => removeFromCart(item.produit.id)}>
                        Supprimer
                      </button>
                      <button className="btn btn-secondary ml-2" onClick={() => decrementQuantite(item.produit.id)}>
                        Décrémenter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-danger" onClick={removeAllItems}>
              Supprimer tous
            </button>
            <button className="btn btn-primary ml-2" onClick={confirmCart}>
              Confirmer
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Panier;
