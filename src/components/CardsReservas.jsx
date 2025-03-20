import { useNavigate } from "react-router-dom";
import "../assets/css/header.css";
import "../assets/css/botones.css";
import "../assets/css/filtros.css";
import "../assets/css/global.css";
import "../assets/css/tablas.css";

import realizarReserva from "../assets/images/realizar_reserva.jpg";
import misReservas from "../assets/images/mis_reservas.jpg"
import cancelarReservas from "../assets/images/eliminar_reserva.jpg"

function CardsReservas() {
  const navigate = useNavigate();

  const cards = [
    {
      img: realizarReserva,
      title: "Realizar Reservas",
      description: "Agenda fácilmente un laboratorio para tus necesidades.",
      route: "/realizar-reservas"
    },
    {
      img: misReservas,
      title: "Mis Reservas",
      description: "Consulta y administra tus reservas activas.",
      route: "/mis-reservas"
    },
    {
      img: cancelarReservas,
      title: "Cancelar Reservas",
      description: "Cancela reservas de forma rápida y sencilla.",
      route: "/eliminar-reservas"
    }
  ];

  return (
    <section className="cards-wrapper">
      <div className="cards-container">
        {cards.map((card, index) => (
          <div className="card" key={index}>
            <img src={card.img} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <button onClick={() => navigate(card.route)}>Ingresar</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CardsReservas;