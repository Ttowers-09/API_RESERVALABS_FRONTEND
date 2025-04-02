import { useEffect, useState } from "react";
import "../assets/css/tablas.css";
import Swal from "sweetalert2";


function TablaReservas({ reservas = [], filtro = {}, onDelete }) {
  const [reservasFiltradas, setReservasFiltradas] = useState([]);

  useEffect(() => {
    const convertirFechaFiltro = (fechaISO) => {
      if (!fechaISO) return "";
      const [year, month, day] = fechaISO.split("-");
      return `${day}-${month}-${year}`;
    };

    const filtradas = reservas.filter((reserva) => {
      const matchFecha = filtro.date
        ? reserva.date === convertirFechaFiltro(filtro.date)
        : true;

      const matchLab = filtro.labName
        ? reserva.labName === filtro.labName
        : true;

      return matchFecha && matchLab;
    });

    setReservasFiltradas(filtradas);
  }, [reservas, filtro]);

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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={onDelete ? 7 : 6}>No hay reservas que coincidan con el filtro.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default TablaReservas;
