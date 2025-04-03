
import { useState, useEffect } from "react";
import api from "../services/api"; 
import "../assets/css/global.css";
import "../assets/css/filtros.css";
import "../assets/css/botones.css";
import { toast } from "react-toastify"; 

// Reservation form component
function FormularioReservas() {
  // List of labs loaded from the backend
  const [laboratorios, setLaboratorios] = useState([]);

  // State to handle all form fields
  const [reserva, setReserva] = useState({
    labName: "",
    date: "",
    initHour: "",
    finalHour: "",
    description: "",
    priority: "1",
  });

  // Today's date (used to prevent selecting past dates)
  const today = new Date().toISOString().split("T")[0];

  // Format date from YYYY-MM-DD to DD-MM-YYYY
  const formatFecha = (fechaISO) => {
    const [year, month, day] = fechaISO.split("-");
    return `${day}-${month}-${year}`;
  };

  // Fetch the list of labs when the component is first mounted
  useEffect(() => {
    api.get("/labs")
      .then(res => setLaboratorios(res.data))
      .catch(err => {
        console.error("Error al cargar laboratorios", err);
        toast.error("Error al cargar laboratorios");
      });
  }, []);

  // Update state when a form field changes
  const handleChange = (e) => {
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  // Submit the form data to the backend
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate time: end hour must be after start hour
    if (reserva.initHour >= reserva.finalHour) {
      toast.error("La hora de fin debe ser mayor que la hora de inicio");
      return;
    }

    // Prepare reservation with formatted date
    const reservaFormateada = {
      ...reserva,
      date: formatFecha(reserva.date),
    };

    // Send reservation data to backend
    api.post("/bookings", reservaFormateada)
      .then(() => {
        toast.success(" Reserva creada con éxito");
        // Reset form fields
        setReserva({
          labName: "",
          date: "",
          initHour: "",
          finalHour: "",
          description: "",
          priority: "1",
        });
      })
      .catch((err) => {
        const mensaje = err.response?.data?.message || err.response?.data;

        // Show specific error if lab is already booked
        if (typeof mensaje === "string" && mensaje.toLowerCase().includes("asignado")) {
          toast.error("Error: laboratorio ya está asignado");
        } else {
          toast.error("Error al crear la reserva");
        }

        console.error("Error al crear reserva:", mensaje || err.message);
      });
  };

  // Render the reservation form
  return (
    <form onSubmit={handleSubmit} className="formulario-reservas">
      <div className="formulario-grid">
        {/* Section to select lab */}
        <section className="filtro-box">
          <h2>Selecciona un laboratorio</h2>
          <select
            name="labName"
            value={reserva.labName}
            onChange={handleChange}
            required
          >
            <option value="">-- Selecciona --</option>
            {laboratorios.map((lab) => (
              <option key={lab.id} value={lab.name}>
                {lab.name}
              </option>
            ))}
          </select>
        </section>

        {/* Section to select date and time */}
        <section className="filtro-box">
          <h2>Selecciona la fecha</h2>
          <input
            type="date"
            name="date"
            value={reserva.date}
            onChange={handleChange}
            min={today}
            required
          />

          <h2>Hora de inicio</h2>
          <input
            type="time"
            name="initHour"
            value={reserva.initHour}
            onChange={handleChange}
            required
          />

          <h2>Hora de fin</h2>
          <input
            type="time"
            name="finalHour"
            value={reserva.finalHour}
            onChange={handleChange}
            required
            min={reserva.initHour}
          />
        </section>

        {/* Section for description and priority */}
        <section className="filtro-box">
          <h2>Descripción</h2>
          <input
            type="text"
            name="description"
            value={reserva.description}
            onChange={handleChange}
            placeholder="Descripción de la reserva"
            required
          />

          <h2>Prioridad</h2>
          <select
            name="priority"
            value={reserva.priority}
            onChange={handleChange}
            required
          >
            <option value="1">1 - Baja</option>
            <option value="2">2 - Baja - Media</option>
            <option value="3">3 - Media</option>
            <option value="4">4 - Media - Alta</option>
            <option value="5">5 - Alta</option>
          </select>
        </section>
      </div>

      {/* Submit button */}
      <div className="formulario-reservas-boton">
        <button type="submit" className="boton-reserva">
          Reservar
        </button>
      </div>
    </form>
  );
}

export default FormularioReservas;
