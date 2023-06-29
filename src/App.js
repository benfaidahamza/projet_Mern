import { Route, Routes } from 'react-router-dom';
import Inscription from './Composants/Inscription/Inscription'
import Connection from './Composants/Connections/Connection'
// import Navbar from './Composants/Header/Navbar'
import Footer from './Composants/Footer/Footer'
import Accueil from './Composants/Accueil/Accueil'
import Admin from './Composants/Admin/Admin';

import './App.css';
import Produits from './Composants/Produits/Produits';



function App() {
  return (
   

   <>
  {/* <Navbar /> */}
    <Routes>
    <Route path={"/accueil"} element={ <Accueil/>} />
    <Route path={"/"} element={ <Accueil/>} />
    <Route path="/Admin" element={<Admin/>} />
    <Route path="/Produits" element={<Produits/>} />

      <Route path="/Connection" element={<Connection/>} />
      <Route path="/Inscription" element={<Inscription/> } />
    </Routes>
    <Footer />
    </>
  
  );
}

export default App;
