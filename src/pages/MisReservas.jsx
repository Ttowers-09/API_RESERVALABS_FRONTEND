import { useState } from "react";
import Header from "../components/Header";
import FiltroReservas from "../components/FiltroReservas";
import TablaReservas from "../components/TablaReservas";
import { useNavigate } from "react-router-dom";

function MisReservas() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState({});

  // ✅ Función para manejar cambios de filtro
  const handleFilterChange = (nuevoFiltro) => {
    console.log("Nuevo filtro aplicado:", nuevoFiltro);
    setFiltro(nuevoFiltro); // Actualiza el estado con el nuevo filtro
  };

  return (
    <div>
      <Header />
      <h1 className="titulo">Mis Reservas</h1>
      
      {/* ✅ Pasamos handleFilterChange como prop */}
      <FiltroReservas onFilterChange={handleFilterChange} />
      
      {/* ✅ Pasamos el filtro a la tabla para actualizar los datos */}
      <TablaReservas filtro={filtro} />
      
      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default MisReservas;
