import './Navbar.css'
import { Link,useNavigate } from 'react-router-dom';


function Navbar() {
   const isLoggedIn = localStorage.getItem('token'); 
   const Storedrole = localStorage.getItem('role'); 
   const navigate=useNavigate();
   const logout = () => {
    localStorage.clear(); 
    navigate('/Connexion'); 
  };
  return (
    <>
    <nav class="navbar navbar-expand-lg  fixed-top navbar-light bg-primary">
        <div class="container-fluid">
            <Link  class="navbar-brand" to="/">
                <img src='LogoIpssi.jpeg' alt="" width="30" height="30" class="d-inline-block align-text-top"/>
                <span class="stylish-text">Ipssi</span>
            </Link>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
        {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link stylish" to="/Connexion">Connexion</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link stylish" to="/Inscription">Inscription</Link>
                </li>
              </>
            )}
            {isLoggedIn &&  (
              <>
                <li className="nav-item">
                  <Link className="nav-link stylish" to="/ListeProduits">Liste Produits</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link stylish" to="/Panier">Panier</Link>
                </li>
                <li className="nav-item">
                <button className="nav-link stylish" onClick={logout}> Déconnexion</button>
                </li>
              </>
            )}
       </ul>
      </div>     
    </div>
    </nav>
    </>
  );
}
export default Navbar;
