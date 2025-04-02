import { useEffect, useState } from "react";
import api from "../services/api";
import "../assets/css/perfil.css";


function Perfil() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    // Extraer el nombre del usuario desde el token
    const payload = JSON.parse(atob(token.split(".")[1]));
    const nombreUsuario = payload.sub;

    api.get(`/users/name/${nombreUsuario}`)
      .then((res) => {
        setUsuario(res.data);
      })
      .catch((err) => {
        console.error("Error al obtener perfil:", err);
      });
  }, []);

  if (!usuario) return <p>Cargando perfil...</p>;

  return (
    <div className="index-container">
      <h2>Mi Perfil</h2>
      <div className="login-form">
        <p><strong>Nombre:</strong> {usuario.name}</p>
        <p><strong>Correo:</strong> {usuario.email}</p>
        <p><strong>Rol:</strong> {usuario.rol}</p>
      </div>
    </div>
  );
}

export default Perfil;
