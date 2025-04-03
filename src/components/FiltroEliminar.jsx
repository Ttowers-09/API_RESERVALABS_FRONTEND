import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify"; 

function FiltroEliminar({ onFilterChange }) {
  const [filtro, setFiltro] = useState("");
  const [laboratorio, setLaboratorio] = useState("");
  const [fecha, setFecha] = useState("");
  const [laboratorios, setLaboratorios] = useState([]);

  //Cargar laboratorios reales desde el backend
  useEffect(() => {
    api.get("/labs")
      .then((res) => setLaboratorios(res.data))
      .catch((err) => {
        console.error("Error al cargar laboratorios", err);
        toast.error(" Error al cargar laboratorios");
      });
  }, []);

  const handleFilterChange = () => {
    if (filtro === "laboratorio" && laboratorio) {
      onFilterChange({ labName: laboratorio });
      toast.success("Filtrado por laboratorio");
    } else if (filtro === "fecha" && fecha) {
      onFilterChange({ date: fecha });
      toast.success(" Filtrado por fecha");
    } else {
      onFilterChange({});
      toast.success(" Filtro limpiado");
    }
  };

  return (
    <div className="filtro-container">
      <h2>Filtrar por:</h2>

      {/* Selector del tipo de filtro */}
      <select
        value={filtro}
        onChange={(e) => {
          setFiltro(e.target.value);
          setLaboratorio("");
          setFecha("");
        }}
        className="filtro-select"
      >
        <option value="">Seleccione un filtro</option>
        <option value="laboratorio">Laboratorio</option>
        <option value="fecha">Fecha</option>
      </select>

      {/* Si se selecciona filtro por laboratorio */}
      {filtro === "laboratorio" && (
        <select
          value={laboratorio}
          onChange={(e) => setLaboratorio(e.target.value)}
          className="filtro-laboratorio"
        >
          <option value="">Seleccione un laboratorio</option>
          {laboratorios.map((lab) => (
            <option key={lab.id} value={lab.name}>
              {lab.name}
            </option>
          ))}
        </select>
      )}

      {/* Si se selecciona filtro por fecha */}
      {filtro === "fecha" && (
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="filtro-fecha"
        />
      )}

      <button onClick={handleFilterChange} className="boton-filtrar">
        Filtrar
      </button>
    </div>
  );
}

export default FiltroEliminar;
