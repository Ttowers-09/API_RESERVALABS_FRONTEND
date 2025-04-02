import { useState, useEffect } from "react";
import Header from "../components/Header";
import FiltroReservas from "../components/FiltroReservas";
import TablaReservas from "../components/TablaReservas";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // 👈 Asegurate de importar la API

function MisReservas() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState({});
  const [reservas, setReservas] = useState([]);

  // ✅ Obtener reservas al cargar el componente
  useEffect(() => {
    api.get("/bookings")
      .then((res) => setReservas(res.data))
      .catch((err) => console.error("Error al obtener reservas:", err));
  }, []);

  // ✅ Función para manejar cambios de filtro
  const handleFilterChange = (nuevoFiltro) => {
    console.log("Nuevo filtro aplicado:", nuevoFiltro);
    setFiltro(nuevoFiltro); // Actualiza el estado con el nuevo filtro
  };

  return (
    <div>
      <Header />
      <h1 className="titulo">Mis Reservas</h1>

      <FiltroReservas onFilterChange={handleFilterChange} />

      {/* ✅ Ahora pasamos reservas reales y el filtro */}
      <TablaReservas reservas={reservas} filtro={filtro} />

      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default MisReservas;
