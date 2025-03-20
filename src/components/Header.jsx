import { Link } from "react-router-dom";
import "../assets/css/header.css";
import logo from "../assets/images/Logo_sistema.png"; 

function Header() {
  return (
    <header className="header-container">
      <div className="logo">
        <img src={logo} alt="Logo_sistema" />
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/inicio">Inicio</Link></li>
          <li><a href="#quienes-somos">Nosotros</a></li>
          <li><a href="#contactanos">Contáctanos</a></li>
        </ul>
      </nav>
      <div className="header-buttons">
        <button>Perfil</button>
        <button onClick={() => window.location.href='/realizar-reservas'}>
          Consultar disponibilidad de laboratorios
        </button>
      </div>
    </header>
  );
}

export default Header;