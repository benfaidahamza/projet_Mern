import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListeProduits.css';
import Navbar from '../../Header/Navbar';

export default function ListeProduits() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [produits, setProduits] = useState([]);

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

  return (
    <div><Navbar/>
    <div className="container1">
      <div className="row">
        {produits.map((produit) => (
          <div className="col-md-4" key={produit.id}>
            <div className="card">
              <img src={`${produit.categorie}.png`} className="card-icon" alt={produit.categorie} />
              <div className="card-body">
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
