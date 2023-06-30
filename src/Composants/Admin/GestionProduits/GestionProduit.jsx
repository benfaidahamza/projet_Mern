import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Header/Navbar';

export default function GestionProduit() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [produits, setProduits] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduit, setEditedProduit] = useState({
    nom: '',
    description: '',
    quantite: '',
    prix: '',
    categorie: '',
  });

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

  const deleteProduit = async (produitId) => {
    try {
      const storedToken = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      await axios.delete(`http://localhost:3001/api/produits/${produitId}`);
      setProduits(produits.filter((produit) => produit._id !== produitId));
      alert('Produit supprimé avec succès !');
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression du produit.');
    }
  };

  const handleEditInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduit((prevProduit) => ({
      ...prevProduit,
      [name]: value,
    }));
  };

  const editProduit = async (produitId) => {
    if (editingId === produitId) {
      try {
        const storedToken = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        await axios.put(`http://localhost:3001/api/produits/${produitId}`, editedProduit);
        const updatedProduits = produits.map((produit) => {
          if (produit._id === produitId) {
            return { ...produit, ...editedProduit };
          }
          return produit;
        });
        setProduits(updatedProduits);
        setEditingId(null);
        alert('Produit modifié avec succès !');
      } catch (error) {
        console.error(error);
        alert('Erreur lors de la modification du produit.');
      }
    } else {
      setEditingId(produitId);
      const produitToEdit = produits.find((produit) => produit._id === produitId);
      setEditedProduit({ ...produitToEdit });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container1">
        <h2>Liste des produits</h2>
        <div className="row">
          {produits.map((produit) => (
            <div className="col-md-4" key={produit._id}>
              <div className="card">
                <img src={`${produit.categorie}.png`} className="card-icon" alt={produit.categorie} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{produit.nom}</h5>
                  {editingId === produit._id ? (
                    <>
                      <input
                        type="text"
                        name="nom"
                        value={editedProduit.nom}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="text"
                        name="description"
                        value={editedProduit.description}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="text"
                        name="quantite"
                        value={editedProduit.quantite}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="text"
                        name="prix"
                        value={editedProduit.prix}
                        onChange={handleEditInputChange}
                      />
                      <input
                        type="text"
                        name="categorie"
                        value={editedProduit.categorie}
                        onChange={handleEditInputChange}
                      />
                    </>
                  ) : (
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
                  )}
                  <div className="d-flex justify-content-center align-items-center mt-auto">
                    {editingId === produit._id ? (
                      <>
                        <button
                          className="btn btn-success"
                          onClick={() => editProduit(produit._id)}
                        >
                          Appliquer
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => setEditingId(null)}
                        >
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary"
                          onClick={() => editProduit(produit._id)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteProduit(produit._id)}
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
