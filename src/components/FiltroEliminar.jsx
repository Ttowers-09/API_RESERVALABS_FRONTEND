import { useState } from "react";

function FiltroEliminar({ onFilterChange }) {
  const [filtro, setFiltro] = useState(""); // Estado para saber qué filtro se está aplicando
  const [laboratorio, setLaboratorio] = useState("");
  const [fecha, setFecha] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ filtro, laboratorio, fecha });
  };

  return (
    <div className="filtro-container">
      <h2>Filtrar por:</h2>
      
      {/* Selector del filtro */}
      <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="filtro-select">
        <option value="">Seleccione un filtro</option>
        <option value="laboratorio">Laboratorio</option>
        <option value="fecha">Fecha</option>
      </select>

      {/* Aparece solo si el filtro es "laboratorio" */}
      {filtro === "laboratorio" && (
        <select value={laboratorio} onChange={(e) => setLaboratorio(e.target.value)} className="filtro-laboratorio">
          <option value="">Seleccione un laboratorio</option>
          <option value="Desarrollo de Software">Desarrollo de Software</option>
          <option value="Redes de Computadores">Redes de Computadores</option>
          <option value="Multiplataforma">Multiplataforma</option>
          <option value="Computación">Computación</option>
        </select>
      )}

      {/* Aparece solo si el filtro es "fecha" */}
      {filtro === "fecha" && (
        <input 
          type="date" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} 
          className="filtro-fecha"
        />
      )}

      <button onClick={handleFilterChange} className="boton-filtrar">Filtrar</button>
    </div>
  );
}

export default FiltroEliminar;
