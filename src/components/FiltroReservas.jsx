
import { useState, useEffect } from "react";
import api from "../services/api";               
import { toast } from "react-toastify";         

// Functional component to filter reservations by lab or date
function FiltroReservas({ onFilterChange }) {
  // State for selected filter type (lab or date)
  const [filtro, setFiltro] = useState("");

  // State for selected lab and date
  const [laboratorio, setLaboratorio] = useState("");
  const [fecha, setFecha] = useState("");

  // List of labs fetched from the backend
  const [laboratorios, setLaboratorios] = useState([]);

  // useEffect runs once when the component mounts to load available labs
  useEffect(() => {
    api.get("/labs")
      .then((res) => setLaboratorios(res.data))
      .catch((err) => {
        console.error("Error loading labs", err);
        toast.error("Error loading labs");
      });
  }, []);

  // Function that applies the selected filter and sends it to the parent
  const handleFilterChange = () => {
    if (filtro === "laboratorio" && laboratorio) {
      onFilterChange({ labName: laboratorio });
      toast.success("✅ Successfully filtered by lab");
    } else if (filtro === "fecha" && fecha) {
      onFilterChange({ date: fecha });
      toast.success("✅ Successfully filtered by date");
    } else {
      onFilterChange({});
      toast.success("✅ Filter cleared, showing all");
    }
  };

  // Rendering the filter form, showing either lab or date input depending on selection
  return (
    <div className="filtro-container">
      <h2>Filtrar por:</h2>

      {/* Dropdown to choose the filter type */}
      <div className="filtro-row">
        <label className="filtro-label">Seleccionar filtro:</label>
        <select
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setLaboratorio(""); // Clear lab selection when changing filter
            setFecha("");       // Clear date selection when changing filter
          }}
          className="filtro-select"
        >
          <option value="">Todos</option>
          <option value="laboratorio">Laboratorio</option>
          <option value="fecha">Fecha</option>
        </select>
      </div>

      {/* Conditionally render lab selector */}
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

      {/* Conditionally render date picker */}
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

      {/* Button to apply the selected filter */}
      <button onClick={handleFilterChange} className="boton-filtrar">
        Filtrar
      </button>
    </div>
  );
}

export default FiltroReservas;
