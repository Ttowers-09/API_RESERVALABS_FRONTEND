import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoEscuela from "../assets/images/Logo_Escuela.png";
import "../assets/css/index.css";

function Index() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Aquí puedes poner tu lógica real de autenticación
    if ((usuario === "admin" && contrasena === "admin123") || (usuario === "estudiante" && contrasena === "123")) {
      navigate("/inicio");
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="index-container">
      <img src={LogoEscuela} alt="Logo Universidad" className="index-logo" />
      <div className="login-form">
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar sesión</button>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Index;
