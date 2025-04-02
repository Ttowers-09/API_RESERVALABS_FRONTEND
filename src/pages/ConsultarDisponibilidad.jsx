// Importing React hooks and necessary components
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import FiltroDisponibilidad from "../components/FiltroDisponibilidad";
import TablaDisponibilidad from "../components/TablaDisponibilidad";

// Functional component to consult lab availability based on filters
function ConsultarDisponibilidad() {
  const navigate = useNavigate(); // Hook to navigate between pages

  // State to store the selected filter values (lab type and time)
  const [filtros, setFiltros] = useState({ tipoLaboratorio: "", hora: "" });

  // Callback function to update filters when received from FiltroDisponibilidad
  const handleFilterChange = (nuevosFiltros) => {
    console.log("Filtros actualizados:", nuevosFiltros);
    setFiltros(nuevosFiltros);
  };

  // Render the page: header, filter component, availability table, and return button
  return (
    <div>
      <Header />
      <h1 className="titulo">Consultar Disponibilidad de Laboratorios</h1>

      {/* Filter selection component */}
      <FiltroDisponibilidad onFilterChange={handleFilterChange} />

      {/* Table that shows availability based on selected filters */}
      <TablaDisponibilidad filtros={filtros} />

      {/* Floating button to return to the homepage */}
      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default ConsultarDisponibilidad;
