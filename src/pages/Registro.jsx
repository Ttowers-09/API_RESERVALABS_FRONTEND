import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoEscuela from "../assets/images/Logo_Escuela.png";
import "../assets/css/index.css";
import api from "../services/api";

function Index() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("user");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const loginData = {
        name: usuario.trim(),
        password: contrasena.trim(),
      };

      console.log("🚀 Enviando login con:", {
        url: `/users/${tipoUsuario}/login`,
        ...loginData,
      });

      const response = await api.post(`/users/${tipoUsuario}/login`, loginData);

      const token = response.data.token; // 👈 aseguramos acceder a la propiedad "token"

      if (token && token !== "fail") {
        localStorage.setItem("token", token);
        localStorage.setItem("rol", tipoUsuario); // opcional: guardar rol
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

        <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
          <option value="user">Estudiante</option>
          <option value="admin">Administrador</option>
        </select>

        <button onClick={handleLogin}>Iniciar sesión</button>
        {error && <p className="error-message">{error}</p>}

        <button className="register-button" onClick={() => navigate("/registro")}>
          Deseo crear mi cuenta
        </button>
      </div>
    </div>
  );
}

export default Index;
