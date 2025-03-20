import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FiltroDisponibilidad from "../components/FiltroDisponibilidad";
import TablaDisponibilidad from "../components/TablaDisponibilidad";

function ConsultarDisponibilidad() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState({ tipoLaboratorio: "", hora: "" });

  // Función que recibe los filtros desde FiltroDisponibilidad
  const handleFilterChange = (nuevosFiltros) => {
    console.log("Filtros actualizados:", nuevosFiltros);
    setFiltros(nuevosFiltros);
  };

  return (
    <div>
      <Header />
      <h1 className="titulo">Consultar Disponibilidad de Laboratorios</h1>
      
      {/* Pasar la función onFilterChange como prop */}
      <FiltroDisponibilidad onFilterChange={handleFilterChange} />
      
      {/* También puedes pasar los filtros a TablaDisponibilidad */}
      <TablaDisponibilidad filtros={filtros} />

      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default ConsultarDisponibilidad;
