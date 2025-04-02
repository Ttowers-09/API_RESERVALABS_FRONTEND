// Importing React hooks and core components
import { useState, useEffect } from "react";
import Header from "../components/Header";
import FiltroEliminar from "../components/FiltroEliminar";
import TablaReservas from "../components/TablaReservas";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

// Component for managing and deleting existing reservations
function EliminarReservas() {
  const navigate = useNavigate(); // Navigation hook for routing
  const [filtro, setFiltro] = useState({}); // State to store current filter
  const [reservas, setReservas] = useState([]); // State to store list of reservations

  // Fetch all reservations when the component mounts
  useEffect(() => {
    api.get("/bookings")
      .then((res) => setReservas(res.data))
      .catch((err) => console.error("Error al obtener reservas:", err));
  }, []);

  // Updates the filter state based on user input
  const handleFilterChange = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  // Handles the deletion of a reservation, using SweetAlert for confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la reserva permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        api.delete(`/bookings/${id}`)
          .then(() => {
            toast.success("✅ Reserva eliminada con éxito");

            // Remove the deleted reservation from state
            setReservas(prev => prev.filter(reserva => reserva.id !== id));
          })
          .catch((err) => {
            console.error("Error al eliminar reserva:", err);
            toast.error("❌ No se pudo eliminar la reserva");
          });
      }
    });
  };

  // Resets the filter to show all reservations
  const limpiarFiltros = () => {
    setFiltro({});
  };

  // Rendering the header, filter, table, and action buttons
  return (
    <div>
      <Header />
      <h1 className="titulo">Eliminar Reservas</h1>

      {/* Filter component to select which reservations to display */}
      <FiltroEliminar onFilterChange={handleFilterChange} />

      {/* Table showing filtered reservations and delete buttons */}
      <TablaReservas reservas={reservas} filtro={filtro} onDelete={handleDelete} />

      {/* Button to clear current filters */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button className="boton-filtrar" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
      </div>

      {/* Floating button to return to the home screen */}
      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default EliminarReservas;
