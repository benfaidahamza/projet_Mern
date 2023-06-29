import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Inscription.css';
import Navbar from '../Header/Navbar';

export default function Inscription() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedToken && storedRole==='adherent') {
      navigate('/ListeProduits');
    }  else if (storedToken && storedRole==='admin') {
      navigate('/Admin');
    }
    else 
    navigate('/Inscription');
  }, [navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let role = 'adherent';
      const response = await axios.post('http://localhost:3001/api/auth/inscription', {
        username,
        email,
        password,
        phone,
        role
      });
      navigate('/connexion');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        setErrorMessage(errorMessage)
      } else {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1 className="inscriptionTitre">Inscription</h1>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <label htmlFor="username">Username :</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          /><br />

          <label htmlFor="email">Adresse e-mail :</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          /><br />

          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /><br />

          <label htmlFor="phone">Téléphone :</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          /><br />

          <input type="submit" value="S'inscrire" />
        </form>
      </div>
    </>
  );
}
