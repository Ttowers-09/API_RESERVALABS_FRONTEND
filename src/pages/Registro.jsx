import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../assets/css/registro.css";
import LogoEscuela from "../assets/images/Logo_Escuela.png";
import { toast } from "react-toastify";

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    rol: "ROLE_user",
    password: "",
  });
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No estás autenticado. Inicia sesión primero.");
      return;
    }

    // Decodificar el token y obtener el rol
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rolUsuario = payload.role || payload.rol;

      if (rolUsuario !== "admin") {
        toast.error("No tienes permisos para crear cuentas");
        return;
      }
    } catch (err) {
      toast.error("Token inválido");
      return;
    }

    try {
      console.log("Datos enviados al backend:", form);

      await api.post("/users/add/user", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("✅ Usuario registrado con éxito");
      navigate("/inicio");
    } catch (error) {
      console.error("❌ Error al crear cuenta:", error.response?.data || error.message);
      toast.error("❌ Error al crear cuenta");
    }
  };

  return (
    <div className="registro-container">
      <img src={LogoEscuela} alt="Logo Universidad" className="registro-logo" />
      <form onSubmit={handleSubmit} className="registro-form">
        <h2>Registro de Usuario</h2>

        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={handleChange}
          required
        />

        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="user">Estudiante</option>
          <option value="admin">Administrador</option>
        </select>

        <div className="input-password">
          <input
            type={mostrarContrasena ? "text" : "password"}
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            required
          />
          <label>
            <input
              type="checkbox"
              onChange={() => setMostrarContrasena(!mostrarContrasena)}
            />{" "}
            Mostrar contraseña
          </label>
        </div>

        <button type="submit">Crear cuenta</button>
        <button type="button" onClick={() => navigate("/inicio")}>
          Volver al inicio
        </button>
      </form>
    </div>
  );
}

export default Registro;
