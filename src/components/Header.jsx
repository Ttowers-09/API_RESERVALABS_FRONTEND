import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Asegúrate de tener esta librería instalada
import "../assets/css/header.css";
import logo from "../assets/images/Logo_sistema.png";

function Header() {
  const navigate = useNavigate();
  const [rol, setRol] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setRol(decoded.rol || decoded.role); // Admite ambas claves
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

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

          {/* Mostrar solo si es administrador */}
          {rol === "admin" && (
            <li><Link to="/registro">Crear Usuarios</Link></li>
          )}
        </ul>
      </nav>

      <div className="header-buttons">
        <button onClick={() => navigate("/perfil")}>Perfil</button>
        <button onClick={handleLogout}>Salida segura</button>
      </div>
    </header>
  );
}

export default Header;
