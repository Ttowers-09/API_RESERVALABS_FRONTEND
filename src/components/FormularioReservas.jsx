import { useState, useEffect } from "react";
import api from "../services/api";
import "../assets/css/global.css";
import "../assets/css/filtros.css";
import "../assets/css/botones.css";

// Importamos Toastify
import { toast } from "react-toastify";

function FormularioReservas() {
  const [laboratorios, setLaboratorios] = useState([]);
  const [reserva, setReserva] = useState({
    labName: "",
    date: "",
    initHour: "",
    finalHour: "",
    description: ""
  });

  // ✅ Función para convertir fecha de yyyy-MM-dd → dd-MM-yyyy
  const formatFecha = (fechaISO) => {
    const [year, month, day] = fechaISO.split("-");
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    api.get('/labs')
      .then(res => setLaboratorios(res.data))
      .catch(err => {
        console.error('Error al cargar laboratorios', err);
        toast.error("❌ Error al cargar laboratorios");
      });
  }, []);

  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reservaFormateada = {
      ...reserva,
      date: formatFecha(reserva.date)
    };

    console.log("📦 Datos enviados al backend:", reservaFormateada);

    api.post('/bookings', reservaFormateada)
      .then(() => {
        toast.success("✅ Reserva creada con éxito");
        setReserva({
          labName: "",
          date: "",
          initHour: "",
          finalHour: "",
          description: ""
        });
      })
      .catch((err) => {
        console.error("❌ Error al crear reserva:", err.response?.data || err.message);
        toast.error("❌ Error al crear la reserva");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-reservas">
      <section className="filtro-laboratorio">
        <h2>Selecciona un laboratorio</h2>
        <select name="labName" value={reserva.labName} onChange={handleChange} required>
          <option value="">-- Selecciona --</option>
          {laboratorios.map((lab) => (
            <option key={lab.id} value={lab.name}>
              {lab.name}
            </option>
          ))}
        </select>
      </section>

      <section className="filtro-fecha">
        <h2>Selecciona la fecha</h2>
        <input type="date" name="date" value={reserva.date} onChange={handleChange} required />

        <h2>Hora de inicio</h2>
        <input type="time" name="initHour" value={reserva.initHour} onChange={handleChange} required />

        <h2>Hora de fin</h2>
        <input type="time" name="finalHour" value={reserva.finalHour} onChange={handleChange} required />
      </section>

      <section className="filtro-fecha">
        <h2>Descripción</h2>
        <input
          type="text"
          name="description"
          value={reserva.description}
          onChange={handleChange}
          placeholder="Descripción de la reserva"
          required
        />
      </section>

      <button type="submit" className="boton-reserva">Reservar</button>
    </form>
  );
}

export default FormularioReservas;
