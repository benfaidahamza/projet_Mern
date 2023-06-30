import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListeProduits.css';
import Navbar from '../../Header/Navbar';

export default function ListeProduits() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedToken) {
      setUser({ token: storedToken, role: storedRole });
    } else {
      navigate('/connexion');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        const response = await axios.get('http://localhost:3001/api/produits');
        setProduits(response.data);
      } catch (error) {
        console.error(error);
        setProduits([]);
      }
    };

    fetchProduits();
  }, []);

  useEffect(() => {
    const fetchPanier = () => {
      const storedPanier = localStorage.getItem('panier');
      if (storedPanier) {
        setPanier(JSON.parse(storedPanier));
      }
    };

    fetchPanier();
  }, []);

  useEffect(() => {
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);

  const addToCart = async (produit) => {
    try {
      const existingItemIndex = panier.findIndex((item) => item.produit._id === produit._id);
  
      if (existingItemIndex !== -1) {
        const updatedPanier = [...panier];
        const existingItem = updatedPanier[existingItemIndex];
  
        const response = await axios.get(`http://localhost:3001/api/produits/${produit._id}`);
        const updatedProduit = response.data;
  
        if (existingItem.quantitepanier < updatedProduit.quantite) {
          existingItem.quantitepanier += 1;
          setPanier(updatedPanier);
          alert('Produit ajouté au panier !');
        } else {
          alert('La quantité du produit dans le panier ne peut pas dépasser la quantité disponible.');
        }
      } else {
        if (produit.quantite > 0) {
          const response = await axios.get(`http://localhost:3001/api/produits/${produit._id}`);
          const updatedProduit = response.data;
          
          setPanier([...panier, { produit: updatedProduit, quantitepanier: 1 }]);
          alert('Produit ajouté au panier !');
        } else {
          alert('Le produit est en rupture de stock.');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const filteredProduits = produits.filter((produit) => produit.quantite >= 1);

  return (
    <div>
      <Navbar />
      <div className="container1">
        <h2>Liste des produits</h2>
        <div className="row">
          {filteredProduits.map((produit) => {
            const item = panier.find((item) => item.produit.id === produit.id);
            const quantitePanier = item ? item.quantitepanier : 0;
            return (
              <div className="col-md-4" key={produit.id}>
                <div className="card">
                  <img src={`${produit.categorie}.png`} className="card-icon" alt={produit.categorie} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{produit.nom}</h5>
                    <ul className="card-info">
                      <li>
                        <strong>Description:</strong> {produit.description}
                      </li>
                      <li>
                        <strong>Quantité:</strong> {produit.quantite}
                      </li>
                      <li>
                        <strong>Prix:</strong> {produit.prix}
                      </li>
                    </ul>
                    <div className="d-flex justify-content-center align-items-center mt-auto">
                      <button className="btn btn-primary" onClick={() => addToCart(produit)}>
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
