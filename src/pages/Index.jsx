import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoEscuela from "../assets/images/Logo_Escuela.png";
import "../assets/css/index.css";
import api from "../services/api";
import {jwtDecode} from "jwt-decode"; // Asegúrate de instalar jwt-decode

function Index() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      // Limpia cualquier token anterior
      localStorage.removeItem("token");

      const response = await api.post("/users/login", {
        name: usuario,
        password: contrasena
      });

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);

        // Decodificamos el token para obtener el rol
        const decoded = jwtDecode(token);
        const rol = decoded.role || decoded.rol; // Por si el claim se llama 'rol'

        // Redirección según rol
        if (rol === "admin") {
          navigate("/inicio");
        } else {
          navigate("/inicio");
        }
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
  );
}

export default Index;
