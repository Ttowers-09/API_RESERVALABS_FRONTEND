import { useState, useEffect } from "react";
import Header from "../components/Header";
import FiltroEliminar from "../components/FiltroEliminar";
import TablaReservas from "../components/TablaReservas";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

import Swal from "sweetalert2";

function EliminarReservas() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState({});
  const [reservas, setReservas] = useState([]);


  useEffect(() => {
    api.get("/bookings")
      .then((res) => setReservas(res.data))
      .catch((err) => console.error("Error al obtener reservas:", err));
  }, []);


  const handleFilterChange = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

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


            setReservas(prev => prev.filter(reserva => reserva.id !== id));
          })
          .catch((err) => {
            console.error("Error al eliminar reserva:", err);
            toast.error("❌ No se pudo eliminar la reserva");
          });
      }
    });
  };


  const limpiarFiltros = () => {
    setFiltro({});
  };

  return (
    <div>
      <Header />
      <h1 className="titulo">Eliminar Reservas</h1>

      <FiltroEliminar onFilterChange={handleFilterChange} />

      <TablaReservas reservas={reservas} filtro={filtro} onDelete={handleDelete} />

      <div style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
        <button className="boton-filtrar" onClick={limpiarFiltros}>
          Limpiar filtros
        </button>
      </div>

      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default EliminarReservas;
