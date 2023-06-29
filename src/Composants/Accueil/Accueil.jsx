import React from 'react';
import Navbar from '../Header/Navbar';
import './Accueil.css';

export default function Accueil() {
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        <h1>Bienvenue sur notre site de sport</h1>
        <p>Découvrez notre sélection de sports et trouvez tout ce dont vous avez besoin pour vous entraîner.</p>
      </div>

      <div className="sports-section">
        <h2>Explorez nos catégories de sport :</h2>
        <div className="sports-grid">
          <div className="sport-card">
            <img src="football.png" alt="Football" />
            <h3>Football</h3>
          </div>
          <div className="sport-card">
            <img src="tennis.png" alt="Tennis" />
            <h3>handball</h3>
          </div>
          <div className="sport-card">
            <img src="basketball.png" alt="Basketball" />
            <h3>Basketball</h3>
          </div>
          <div className="sport-card">
            <img src="course.png" alt="course" />
            <h3>course</h3>
          </div>
        </div>
      </div>
    </div>
  );
}