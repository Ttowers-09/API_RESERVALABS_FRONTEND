import { useEffect, useState } from "react";
import api from "../services/api";
import "../assets/css/tablas.css";

function TablaDisponibilidad() {
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    api.get("/labs")
      .then((res) => setLaboratorios(res.data))
      .catch((err) => {
        console.error(" Error al obtener laboratorios:", err);
      });
  }, []);

  return (
    <div className="tabla-container">
      <h2>Laboratorios Disponibles</h2>
      <table className="tabla-labs">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre Laboratorio</th>
            <th>Ubicación</th>
            <th>Capacidad</th>
            <th>Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {laboratorios.length === 0 ? (
            <tr>
              <td colSpan="5">No hay laboratorios disponibles</td>
            </tr>
          ) : (
            laboratorios.map((lab) => (
              <tr key={lab.id}>
                <td>{lab.id}</td>
                <td>{lab.name}</td>
                <td>{lab.location}</td>
                <td>{lab.capacity}</td>
                <td>{lab.available ? "Disponible" : "No disponible"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDisponibilidad;
