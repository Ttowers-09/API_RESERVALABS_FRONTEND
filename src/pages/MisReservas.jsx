// Importing React hooks and components needed for the page
import { useState, useEffect } from "react";
import Header from "../components/Header";
import FiltroReservas from "../components/FiltroReservas";
import TablaReservas from "../components/TablaReservas";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // Axios instance for API requests

// Functional component that displays the user's reservations
function MisReservas() {
  const navigate = useNavigate(); // Hook for route navigation

  // State to store the current filter selected by the user
  const [filtro, setFiltro] = useState({});

  // State to store the list of all reservations
  const [reservas, setReservas] = useState([]);

  // Fetch reservations from the backend when the component mounts
  useEffect(() => {
    api.get("/bookings")
      .then((res) => setReservas(res.data))
      .catch((err) => console.error("Error al obtener reservas:", err));
  }, []);

  // Update the filter when the user interacts with the filter component
  const handleFilterChange = (nuevoFiltro) => {
    console.log("Nuevo filtro aplicado:", nuevoFiltro);
    setFiltro(nuevoFiltro); 
  };

  // Render the page with header, filter, reservations table, and return button
  return (
    <div>
      <Header />
      <h1 className="titulo">Mis Reservas</h1>

      {/* Component for selecting a filter */}
      <FiltroReservas onFilterChange={handleFilterChange} />

      {/* Table showing reservations based on applied filters */}
      <TablaReservas reservas={reservas} filtro={filtro} />

      {/* Floating button to return to the home page */}
      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

// Exporting the component for use in the app
export default MisReservas;
