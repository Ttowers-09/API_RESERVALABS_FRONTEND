import { useState } from "react";
import Header from "../components/Header";
import FiltroEliminar from "../components/FiltroEliminar";
import TablaReservas from "../components/TablaReservas";
import { useNavigate } from "react-router-dom";

function EliminarReservas() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState({ tipo: "", fecha: "" });

  // ✅ Función que manejará el cambio de filtro
  const handleFilterChange = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  return (
    <div>
      <Header />
      <h1 className="titulo">Eliminar Reservas</h1>
      
      {/* ✅ Pasamos la función onFilterChange como prop */}
      <FiltroEliminar onFilterChange={handleFilterChange} />
      
      {/* ✅ Pasamos el estado del filtro a la tabla */}
      <TablaReservas filtro={filtro} />

      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default EliminarReservas;
