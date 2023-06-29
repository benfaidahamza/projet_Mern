import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Header/Navbar';
import './Connexion.css';
import { useNavigate } from 'react-router-dom';

export default function Connexion() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const  navigate= useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedRole==='adherent') {
      navigate('/ListeProduits');
    }  else if (storedToken && storedRole==='admin') {
      navigate('/Admin');
    }
    else 
    navigate('/connexion');
  }, [navigate]);

  const handleFormSubmit = async (e) => {
    setUsername('');
    setPassword('');
    setError('');
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);

      if (response.data.role === 'adherent') {
        navigate('/ListeProduits');
      } else if (response.data.role === 'admin') {
        navigate('/Admin'); 
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Nom d\'utilisateur ou mot de passe incorrect');
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="login-form" onSubmit={handleFormSubmit}>
          <h1>Connexion</h1>
          <div className="error-message">{error}</div>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Se connecter</button>
        </form>
      </div>
    </>
  );
}