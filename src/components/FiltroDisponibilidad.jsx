// Importing React hook to manage component state
import { useState } from "react";  

// Importing style files for consistent visual appearance
import "../assets/css/header.css";
import "../assets/css/botones.css";
import "../assets/css/filtros.css";
import "../assets/css/global.css";
import "../assets/css/tablas.css";

// Functional component that provides filters for selecting a lab and time
function FiltroDisponibilidad({ onFilterChange }) {

  // State variables for the selected lab type and time
  const [tipoLaboratorio, setTipoLaboratorio] = useState("");
  const [hora, setHora] = useState("");

  // Function that sends the selected filters to the parent component
  const handleFilterChange = () => {
    if (typeof onFilterChange === "function") {
      onFilterChange({ tipoLaboratorio, hora });
    } else {
      console.error("onFilterChange is not defined in the parent component.");
    }
  };

  // Component rendering: input for date, dropdowns for hour and lab type, and a filter button
  return (
    <div className="seleccion-container">
      <section className="seleccion-laboratorio">
        <h2>Seleccione la fecha y hora</h2>
        <input type="date" id="fecha" required />
        <select value={hora} onChange={(e) => setHora(e.target.value)}>
          <option value="">Todas</option>
        </select>
      </section>

      <div className="filtro">
        <h2>Filtrar por laboratorio</h2>
        <select value={tipoLaboratorio} onChange={(e) => setTipoLaboratorio(e.target.value)}>
          <option value="">Todos</option>
        </select>
      </div>
      <button onClick={handleFilterChange}>Filtrar</button>
    </div>
  );
}


export default FiltroDisponibilidad;
