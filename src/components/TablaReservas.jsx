function TablaReservas({ reservas = [], onDelete }) { // Valor por defecto a reservas
  return (
    <section className="tabla-reservas">
      <h2>Reservas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Nombre del Laboratorio</th>
            <th>Ubicación</th>
            {onDelete && <th>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {reservas && Array.isArray(reservas) && reservas.length > 0 ? (  // Verifica que reservas sea un array válido
            reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.id}</td>
                <td>{reserva.fecha}</td>
                <td>{reserva.hora}</td>
                <td>{reserva.laboratorio}</td>
                <td>{reserva.ubicacion}</td>
                {onDelete && (
                  <td>
                    <button className="delete-btn" onClick={() => onDelete(reserva.id)}>
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={onDelete ? 6 : 5}>No hay reservas disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default TablaReservas;
