import { useState } from "react";

function FiltroReservas({ onFilterChange }) {
  const [filtro, setFiltro] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [fecha, setFecha] = useState("");

  const handleFilterChange = () => {
    onFilterChange({ filtro, laboratorio, fecha });
  };

  return (
    <div className="filtro-container">
      <h2>Filtrar por:</h2>

      <div className="filtro-row">
        <label className="filtro-label">Seleccionar filtro:</label>
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="filtro-select">
          <option value="">Todos</option>
          <option value="laboratorio">Laboratorio</option>
          <option value="fecha">Fecha</option>
        </select>
      </div>

      {/* Si el usuario elige "Laboratorio", muestra la lista de laboratorios */}
      {filtro === "laboratorio" && (
        <div className="filtro-row">
          <label className="filtro-label">Seleccionar laboratorio:</label>
          <select value={laboratorio} onChange={(e) => setLaboratorio(e.target.value)} className="filtro-laboratorio">
            <option value="">Seleccione un laboratorio</option>
            <option value="Desarrollo de Software">Desarrollo de Software</option>
            <option value="Redes de Computadores">Redes de Computadores</option>
            <option value="Multiplataforma">Multiplataforma</option>
            <option value="Computación">Computación</option>
          </select>
        </div>
      )}

      {/* Si el usuario elige "Fecha", muestra el selector de fecha */}
      {filtro === "fecha" && (
        <div className="filtro-row">
          <label className="filtro-label">Seleccionar fecha:</label>
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} className="filtro-fecha" />
        </div>
      )}

      <button onClick={handleFilterChange} className="boton-filtrar">Filtrar</button>
    </div>
  );
}

export default FiltroReservas;
