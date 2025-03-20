import { useState } from "react";
import PropTypes from "prop-types";

function FormularioReservas({ onReservaSubmit }) {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [tipoLaboratorio, setTipoLaboratorio] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onReservaSubmit({ fecha, hora, tipoLaboratorio });
  };

  return (
    <form className="formulario-reservas" onSubmit={handleSubmit}>
      
      {/* Sección de Fecha y Hora */}
      <section className="filtro-fecha">
        <h2>Seleccione la fecha y hora</h2>
        <input 
          type="date" 
          value={fecha} 
          onChange={(e) => setFecha(e.target.value)} 
          required 
        />
        <select value={hora} onChange={(e) => setHora(e.target.value)} required>
          <option value="">Seleccione una hora</option>
          <option value="07:00">07:00</option>
          <option value="08:30">08:30</option>
          <option value="10:00">10:00</option>
          <option value="11:30">11:30</option>
          <option value="13:00">13:00</option>
          <option value="14:30">14:30</option>
          <option value="16:00">16:00</option>
          <option value="17:30">17:30</option>
        </select>
      </section>

      {/* Sección de Tipo de Laboratorio */}
      <section className="filtro-laboratorio">
        <h2>Seleccione el tipo de laboratorio</h2>
        <select value={tipoLaboratorio} onChange={(e) => setTipoLaboratorio(e.target.value)} required>
          <option value="">Seleccione un laboratorio</option>
          <option value="Desarrollo de Software">Desarrollo de Software</option>
          <option value="Redes de Computadores">Redes de Computadores</option>
          <option value="Multiplataforma">Multiplataforma</option>
          <option value="Computación">Computación</option>
        </select>
      </section>

      <button type="submit" className="boton-reserva">Buscar Disponibilidad</button>
    </form>
  );
}

// Validación de props con propTypes
FormularioReservas.propTypes = {
  onReservaSubmit: PropTypes.func.isRequired,
};

export default FormularioReservas;
