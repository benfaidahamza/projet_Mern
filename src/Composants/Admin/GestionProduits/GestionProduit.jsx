import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Header/Navbar';

export default function GestionProduits() {
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [panier, setPanier] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduit, setNewProduit] = useState({
    nom: '',
    description: '',
    quantite: '',
    prix: '',
    categorie: '',
  });
  const [editingProduit, setEditingProduit] = useState(null);
  const [updatedProduit, setUpdatedProduit] = useState({
    nom: '',
    description: '',
    quantite: '',
    prix: '',
    categorie: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedToken && (storedRole==='admin')){
      navigate('/GestionProduit');
    } 
    else 
    navigate('/connexion');
  }, [navigate]);


  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (!storedToken && storedRole!=='admib') 
      navigate('/connexion');
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
    localStorage.setItem('panier', JSON.stringify(panier));
  }, [panier]);

  const deleteProduit = async (produitId) => {
    try {
      const storedToken = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      await axios.delete(`http://localhost:3001/api/produits/${produitId}`);
      const updatedProduits = produits.filter((produit) => produit._id !== produitId);
      setProduits(updatedProduits);
      alert('Produit supprimé avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduit((prevProduit) => ({
      ...prevProduit,
      [name]: value,
    }));
  };

  const handleUpdateInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProduit((prevProduit) => ({
      ...prevProduit,
      [name]: value,
    }));
  };

  const addProduit = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      const response = await axios.post('http://localhost:3001/api/produits/CreateProduit', newProduit);
      const createdProduit = response.data;
      setProduits([...produits, createdProduit]);
      setShowForm(false);
      setNewProduit({
        nom: '',
        description: '',
        quantite: '',
        prix: '',
        categorie: '',
      });
      window.location.reload();
      alert('Produit ajouté avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  const editProduit = (produit) => {
    setEditingProduit(produit);
    setUpdatedProduit({
      nom: produit.nom,
      description: produit.description,
      quantite: produit.quantite,
      prix: produit.prix,
      categorie: produit.categorie,
    });
  };

  const updateProduit = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      const response = await axios.put(`http://localhost:3001/api/produits/${editingProduit._id}`, updatedProduit);
      const updatedProduitData = response.data;
      const updatedProduits = produits.map((produit) => {
        if (produit._id === editingProduit._id) {
          return updatedProduitData;
        }
        return produit;
      });
      setProduits(updatedProduits);
      setEditingProduit(null);
      setUpdatedProduit({
        nom: '',
        description: '',
        quantite: '',
        prix: '',
        categorie: '',
      });
      window.location.reload();
      alert('Produit mis à jour avec succès !');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container1">
        <h2>Liste des produits</h2>
        <button className="btn btn-primary mb-4" onClick={() => setShowForm(true)}>
          Ajouter un produit
        </button>
        {showForm && (
          <div className="center-form">
            <h3>Ajouter un produit</h3>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input
                type="text"
                name="nom"
                value={newProduit.nom}
                onChange={handleFormInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                value={newProduit.description}
                onChange={handleFormInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Quantité</label>
              <input
                type="text"
                name="quantite"
                value={newProduit.quantite}
                onChange={handleFormInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Prix</label>
              <input
                type="text"
                name="prix"
                value={newProduit.prix}
                onChange={handleFormInputChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Catégorie</label>
              <input
                type="text"
                name="categorie"
                value={newProduit.categorie}
                onChange={handleFormInputChange}
                className="form-control"
              />
            </div>
            <button className="btn btn-primary" onClick={addProduit}>
              Enregistrer
            </button>
          </div>
        )}
        <div className="row">
          {produits.map((produit) => (
            <div className="col-md-4" key={produit._id}>
              <div className="card">
                <img src={`${produit.categorie}.png`} className="card-icon" alt={produit.categorie} />
                <div className="card-body d-flex flex-column">
                  {editingProduit && editingProduit._id === produit._id ? (
                    <>
                      <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input
                          type="text"
                          name="nom"
                          value={updatedProduit.nom}
                          onChange={handleUpdateInputChange}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                          type="text"
                          name="description"
                          value={updatedProduit.description}
                          onChange={handleUpdateInputChange}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Quantité</label>
                        <input
                          type="text"
                          name="quantite"
                          value={updatedProduit.quantite}
                          onChange={handleUpdateInputChange}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Prix</label>
                        <input
                          type="text"
                          name="prix"
                          value={updatedProduit.prix}
                          onChange={handleUpdateInputChange}
                          className="form-control"
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Catégorie</label>
                        <input
                          type="text"
                          name="categorie"
                          value={updatedProduit.categorie}
                          onChange={handleUpdateInputChange}
                          className="form-control"
                        />
                      </div>
                      <button className="btn btn-primary" onClick={updateProduit}>
                        Enregistrer
                      </button>
                    </>
                  ) : (
                    <>
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
                        <button className="btn btn-danger me-2" onClick={() => deleteProduit(produit._id)}>
                          Supprimer
                        </button>
                        <button className="btn btn-primary" onClick={() => editProduit(produit)}>
                          Modifier
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
