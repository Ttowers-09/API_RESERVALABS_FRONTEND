import { useState } from "react";
import Header from "../components/Header";
import FormularioReservas from "../components/FormularioReservas";
import TablaDisponibilidad from "../components/TablaDisponibilidad";
import { useNavigate } from "react-router-dom";

function RealizarReservas() {
  const navigate = useNavigate();
  const [filtros, setFiltros] = useState(null);


  const handleReservaSubmit = (data) => {
    console.log("Datos de reserva recibidos:", data);
    setFiltros(data); 
  };

  return (
    <div>
      <Header />
      <h1 className="titulo">Realizar Reservas</h1>

      <FormularioReservas onReservaSubmit={handleReservaSubmit} />
      <TablaDisponibilidad filtros={filtros} />
      <button className="boton-flotante" onClick={() => navigate("/inicio")}>
        Volver al inicio
      </button>
    </div>
  );
}

export default RealizarReservas;
