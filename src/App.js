import { Route, Routes } from 'react-router-dom';
import Inscription from './Composants/Inscription/Inscription'
import Connexion from './Composants/Connexion/Connexion'
import Footer from './Composants/Footer/Footer'
import Accueil from './Composants/Accueil/Accueil'
import Admin from './Composants/Admin/Admin';
import Adherent from './Composants/Adherent/Adherent';

import './App.css';
import Produits from './Composants/Produits/Produits';
import ListeProduits from './Composants/Adherent/ListeProduits/ListeProduits';
import Panier from './Composants/Adherent/Panier/Panier';

function App() {
  return (
   <>
    <Routes>
    <Route path={"/accueil"} element={ <Accueil/>} />
    <Route path={"/"} element={ <Accueil/>} />
    <Route path="/Admin" element={<Admin/>} />
    <Route path="/Produits" element={<Produits/>} />
    <Route path="/Connexion" element={<Connexion/>} />
    <Route path="/ListeProduits" element={<ListeProduits/> } />
    <Route path="/Inscription" element={<Inscription/> } />
    <Route path="/Panier" element={<Panier/> } />
    </Routes>
    <Footer />
    </>
  
  )};

  export default App;