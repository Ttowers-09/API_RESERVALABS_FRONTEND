
import { useEffect, useState } from "react";
import "../assets/css/tablas.css";

// Component to display a filtered list of reservations in table format
function TablaReservas({ reservas = [], filtro = {}, onDelete }) {
  // State to store filtered reservations based on current filter
  const [reservasFiltradas, setReservasFiltradas] = useState([]);

  // Filters reservations whenever the 'reservas' or 'filtro' props change
  useEffect(() => {

    const convertirFechaFiltro = (fechaISO) => {
      if (!fechaISO) return "";
      const [year, month, day] = fechaISO.split("-");
      return `${day}-${month}-${year}`;
    };

    // Filters by date and lab name (if provided)
    const filtradas = reservas.filter((reserva) => {
      const matchFecha = filtro.date
        ? reserva.date === convertirFechaFiltro(filtro.date)
        : true;

      const matchLab = filtro.labName
        ? reserva.labName === filtro.labName
        : true;

      return matchFecha && matchLab;
    });

    // Updates filtered reservations in state
    setReservasFiltradas(filtradas);
  }, [reservas, filtro]);

  // Renders the reservation table
  return (
    <section className="tabla-reservas">
      <h2>Reservas</h2>
      <table>
        <thead>
          <tr>
            {onDelete && <th>Acción</th>}
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora inicio</th>
            <th>Hora fin</th>
            <th>Laboratorio</th>
            <th>Descripción</th>
            <th>Prioridad</th> {/* ✅ Nueva columna */}
          </tr>
        </thead>
        <tbody>
          {reservasFiltradas.length > 0 ? (
            reservasFiltradas.map((reserva, index) => (
              <tr key={index}>
                {onDelete && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => onDelete(reserva.id)}
                      title="Eliminar"
                    >
                      X
                    </button>
                  </td>
                )}
                <td>{reserva.id}</td>
                <td>{reserva.date}</td>
                <td>{reserva.initHour}</td>
                <td>{reserva.finalHour}</td>
                <td>{reserva.labName}</td>
                <td>{reserva.description}</td>
                <td>
                  {(() => {
                    switch (reserva.priority) {
                      case "1":
                      case 1:
                        return "1 - Baja";
                      case "2":
                      case 2:
                        return "2 - Baja-Media";
                      case "3":
                      case 3:
                        return "3 - Media";
                      case "4":
                      case 4:
                        return "4 - Media-Alta";
                      case "5":
                      case 5:
                        return "5 - Alta";
                      default:
                        return reserva.priority || "N/A";
                    }
                  })()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={onDelete ? 8 : 7}>
                No hay reservas que coincidan con el filtro.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}


export default TablaReservas;
