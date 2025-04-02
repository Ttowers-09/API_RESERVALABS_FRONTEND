import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify"; // ✅ Importamos toast

function FiltroReservas({ onFilterChange }) {
  const [filtro, setFiltro] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [fecha, setFecha] = useState("");
  const [laboratorios, setLaboratorios] = useState([]);

  useEffect(() => {
    api.get("/labs")
      .then((res) => setLaboratorios(res.data))
      .catch((err) => {
        console.error("Error al cargar laboratorios", err);
        toast.error("❌ Error al cargar laboratorios");
      });
  }, []);

  const handleFilterChange = () => {
    if (filtro === "laboratorio" && laboratorio) {
      onFilterChange({ labName: laboratorio });
      toast.success("✅ Filtrado por laboratorio con éxito");
    } else if (filtro === "fecha" && fecha) {
      onFilterChange({ date: fecha });
      toast.success("✅ Filtrado por fecha con éxito");
    } else {
      onFilterChange({});
      toast.success("✅ Filtro limpio, mostrando todo");
    }
  };

  return (
    <div className="filtro-container">
      <h2>Filtrar por:</h2>

      <div className="filtro-row">
        <label className="filtro-label">Seleccionar filtro:</label>
        <select
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setLaboratorio("");
            setFecha("");
          }}
          className="filtro-select"
        >
          <option value="">Todos</option>
          <option value="laboratorio">Laboratorio</option>
          <option value="fecha">Fecha</option>
        </select>
      </div>

      {/* Filtro por laboratorio */}
      {filtro === "laboratorio" && (
        <div className="filtro-row">
          <label className="filtro-label">Seleccionar laboratorio:</label>
          <select
            value={laboratorio}
            onChange={(e) => setLaboratorio(e.target.value)}
            className="filtro-laboratorio"
          >
            <option value="">-- Mostrar Todos --</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.name}>
                {lab.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filtro por fecha */}
      {filtro === "fecha" && (
        <div className="filtro-row">
          <label className="filtro-label">Seleccionar fecha:</label>
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="filtro-fecha"
          />
        </div>
      )}

      <button onClick={handleFilterChange} className="boton-filtrar">
        Filtrar
      </button>
    </div>
  );
}

export default FiltroReservas;
