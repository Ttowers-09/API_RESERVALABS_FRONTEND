import { Link, useNavigate } from "react-router-dom"; // <-- AÑADIDO useNavigate
import "../assets/css/header.css";
import logo from "../assets/images/Logo_sistema.png"; 

function Header() {
  const navigate = useNavigate(); 

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
        <button onClick={() => navigate("/perfil")}>Perfil</button>
        <button onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("rol"); // si lo usas
          navigate("/");
        }}>
          Salida segura
        </button>
      </div>
    </header>
  );
}

export default Header;
