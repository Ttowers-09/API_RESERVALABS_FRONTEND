function TablaDisponibilidad({ laboratorios = [] }) {  // Valor por defecto
  return (
    <section className="tabla-citas">
      <h2>Laboratorios Disponibles</h2>
      <table>
        <thead>
          <tr>
            <th>Agendar</th>
            <th>ID</th>
            <th>Nombre Laboratorio</th>
            <th>Ubicación</th>
            <th>Capacidad</th>
            <th>Disponibilidad</th>
          </tr>
        </thead>
        <tbody>
          {laboratorios && laboratorios.length > 0 ? (  // Verifica que laboratorios no sea undefined
            laboratorios.map((lab, index) => (
              <tr key={index}>
                <td>
                  <button className="agendar">+</button>
                </td>
                <td>{lab.id}</td>
                <td>{lab.nombre}</td>
                <td>{lab.ubicacion}</td>
                <td>{lab.capacidad}</td>
                <td>{lab.disponibilidad ? "Disponible" : "No disponible"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay laboratorios disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}

export default TablaDisponibilidad;
