import './Navbar.css'
import { Link } from 'react-router-dom';

function Navbar() {
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
        <li class="nav-item">
        <Link class="nav-link stylish" to="/Connexion">Connexion</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link stylish" to="/Inscription">Inscription</Link>
        </li>
       </ul>
      </div>     
    </div>
    </nav>
    </>
  );
}
export default Navbar;
