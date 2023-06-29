import { Route, Routes } from 'react-router-dom';
import Inscription from './Composants/Inscription/Inscription'
import Connexion from './Composants/Connexion/Connexion'
import Footer from './Composants/Footer/Footer'
import Accueil from './Composants/Accueil/Accueil'
import Admin from './Composants/Admin/Admin';
import Adherent from './Composants/Adherent/Adherent';

import './App.css';
import Produits from './Composants/Produits/Produits';

function App() {
  return (
   <>
    <Routes>
    <Route path={"/accueil"} element={ <Accueil/>} />
    <Route path={"/"} element={ <Accueil/>} />
    <Route path="/Admin" element={<Admin/>} />
    <Route path="/Produits" element={<Produits/>} />
    <Route path="/Connexion" element={<Connexion/>} />
    <Route path="/Adherent" element={<Adherent/> } />
    <Route path="/Inscription" element={<Inscription/> } />
    </Routes>
    <Footer />
    </>
  
  )};

  export default App;