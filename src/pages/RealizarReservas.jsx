import { useState } from "react";
import Header from "../components/Header";
import FormularioReservas from "../components/FormularioReservas";
import TablaDisponibilidad from "../components/TablaDisponibilidad";
import { useNavigate } from "react-router-dom";

function RealizarReservas() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState(null);

  // ✅ Función para manejar la reserva y actualizar el estado
  const handleReservaSubmit = (data) => {
    console.log("Datos de reserva recibidos:", data);
    setFiltros(data); // Guarda los filtros para actualizar la tabla
  };

  return (
    <div>
      <Header />
      <h1 className="titulo">Realizar Reservas</h1>
      {/* ✅ Se pasa correctamente la función como prop */}
      <FormularioReservas onReservaSubmit={handleReservaSubmit} />
      <TablaDisponibilidad filtros={filtros} />
      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default RealizarReservas;
