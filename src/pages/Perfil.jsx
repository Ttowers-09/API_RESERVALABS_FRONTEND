import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../assets/css/perfil.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const nombre = decoded.sub;
        const rol = decoded.role;

        if (rol === "admin") {
          // Admin: obtiene datos completos desde backend
          api.get(`/users/get/${nombre}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((res) => {
              setUsuario({
                ...res.data,
                role: rol, // usamos el rol del token
              });
            })
            .catch((err) => {
              console.error("Error al obtener usuario (admin):", err);
              // Fallback si falla
              setUsuario({
                name: nombre,
                role: rol,
                id: "No disponible",
                email: "No disponible",
              });
            });
        } else {
          // User: solo usamos lo que viene en el token
          setUsuario({
            name: nombre,
            role: rol,
            id: decoded.id || "No disponible",
            email: decoded.email || "No disponible",
          });
        }
      } catch (err) {
        console.error("Error al decodificar token:", err);
      }
    }
  }, []);

  if (!usuario) return <p className="cargando">Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <h2>Perfil del Usuario</h2>

      <div className="perfil-card">
        <p><span className="label">Usuario:</span> {usuario.name}</p>
        <p><span className="label">Rol:</span> {usuario.role}</p>
        <p><span className="label">Email:</span> {usuario.email}</p>
        <p><span className="label">ID:</span> {usuario.id}</p>
      </div>

      <button className="volver-button" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default Perfil;
