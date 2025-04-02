// Importing necessary hooks and components
import { useState } from "react";
import Header from "../components/Header";
import FormularioReservas from "../components/FormularioReservas";
import TablaDisponibilidad from "../components/TablaDisponibilidad";
import { useNavigate } from "react-router-dom";

// Functional component for the "Realizar Reservas" page
function RealizarReservas() {
  const navigate = useNavigate(); // Hook to navigate between routes

  // State to store filters that will be passed to the availability table
  const [filtros, setFiltros] = useState(null);

  // Callback function to receive reservation data from the form
  const handleReservaSubmit = (data) => {
    console.log("Datos de reserva recibidos:", data);
    setFiltros(data); // Set the filters to update the availability table
  };

  // Render the reservation form, the availability table and a floating button
  return (
    <div>
      <Header />
      <h1 className="titulo">Realizar Reservas</h1>

      {/* Reservation form that sends data up via callback */}
      <FormularioReservas onReservaSubmit={handleReservaSubmit} />

      {/* Table that displays lab availability based on the filters */}
      <TablaDisponibilidad filtros={filtros} />

      {/* Floating button to return to the homepage */}
      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

// Exporting the component to be used in routing
export default RealizarReservas;
