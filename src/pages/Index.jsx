import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoEscuela from "../assets/images/Logo_Escuela.png";
import "../assets/css/index.css";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";

function Index() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Limpia datos anteriores
      localStorage.removeItem("token");
      localStorage.removeItem("rol");

      const response = await api.post("/users/login", {
        name: usuario,
        password: contrasena,
      });
  
      const { token } = response.data;
  
      if (token) {
        localStorage.setItem("token", token);
  
        const decoded = jwtDecode(token);
        const rol = decoded.role || decoded.rol; 
  
        if (rol) {
          localStorage.setItem("rol", rol); 
        }
  
        navigate("/inicio");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="index-container">
      <img src={LogoEscuela} alt="Logo Universidad" className="index-logo" />

      <div className="login-box">
        <h2 className="form-title">Inicio de sesión</h2>

        <div className="login-form">
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className={error ? "input-error" : ""}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            className={error ? "input-error" : ""}
          />
          <button onClick={handleLogin}>Iniciar sesión</button>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Index;
