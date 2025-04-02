import { useState, useEffect } from "react";
import Header from "../components/Header";
import FiltroEliminar from "../components/FiltroEliminar";
import TablaReservas from "../components/TablaReservas";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function EliminarReservas() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState({});
  const [reservas, setReservas] = useState([]);

  // ✅ Cargar reservas al montar el componente
  useEffect(() => {
    api.get("/bookings")
      .then((res) => setReservas(res.data))
      .catch((err) => console.error("Error al obtener reservas:", err));
  }, []);

  // ✅ Manejar cambios en el filtro
  const handleFilterChange = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
  };

  // ✅ Eliminar reserva con notificación y actualización inmediata
  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta reserva?")) {
      api.delete(`/bookings/${id}`)
        .then(() => {
          toast.success("✅ Reserva eliminada con éxito");

          // 🔥 Actualizar la lista local sin recargar todo
          setReservas(prev => prev.filter(reserva => reserva.id !== id));
        })
        .catch((err) => {
          console.error("Error al eliminar reserva:", err);
          toast.error("❌ No se pudo eliminar la reserva");
        });
    }
  };

  // ✅ Limpiar filtros
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
