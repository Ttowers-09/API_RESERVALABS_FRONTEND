import { useState } from "react";  
import "../assets/css/header.css";
import "../assets/css/botones.css";
import "../assets/css/filtros.css";
import "../assets/css/global.css";
import "../assets/css/tablas.css";

function FiltroDisponibilidad({ onFilterChange }) {
  const [tipoLaboratorio, setTipoLaboratorio] = useState("");
  const [hora, setHora] = useState("");

  const handleFilterChange = () => {
    if (typeof onFilterChange === "function") {
      onFilterChange({ tipoLaboratorio, hora });
    } else {
      console.error("onFilterChange no está definido en el componente padre.");
    }
  };

  return (
    <div className="seleccion-container">
      <section className="seleccion-laboratorio">
        <h2>Seleccione la fecha y hora</h2>
        <input type="date" id="fecha" required />
        <select value={hora} onChange={(e) => setHora(e.target.value)}>
          <option value="">Todas</option>
          <option value="07:00">07:00</option>
          <option value="08:30">08:30</option>
          <option value="10:00">10:00</option>
          <option value="11:30">11:30</option>
          <option value="13:00">13:00</option>
          <option value="14:30">14:30</option>
          <option value="16:00">16:00</option>
          <option value="17:30">17:30</option>
        </select>
      </section>

      <div className="filtro">
        <h2>Filtrar por laboratorio</h2>
        <select value={tipoLaboratorio} onChange={(e) => setTipoLaboratorio(e.target.value)}>
          <option value="">Todos</option>
          <option value="Desarrollo de Software">Desarrollo de Software</option>
          <option value="Redes de Computadores">Redes de Computadores</option>
          <option value="Multiplataforma">Multiplataforma</option>
          <option value="Computación">Computación</option>
        </select>
      </div>
      <button onClick={handleFilterChange}>Filtrar</button>
    </div>
  );
}

export default FiltroDisponibilidad;
