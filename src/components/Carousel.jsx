import { useState, useEffect } from "react";
import "../assets/css/header.css";
import "../assets/css/botones.css";
import "../assets/css/filtros.css";
import "../assets/css/global.css";
import "../assets/css/tablas.css";

import realizarReserva from "../assets/images/realizar_reserva.jpg";
import eliminarReserva from "../assets/images/eliminar_reserva.jpg";
import misReservas from "../assets/images/mis_reservas.jpg";

const images = [
  { src: realizarReserva, text: "Reserva fácilmente tu laboratorio" },
  { src: eliminarReserva, text: "Elimina tus reservas sin problemas" },
  { src: misReservas, text: "Consulta tus reservas activas" },
];

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const moveSlide = (direction) => {
    const newIndex = (currentIndex + direction + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  // Cambio automático de imagen cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      moveSlide(1);
    }, 3000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, [currentIndex]);

  return (
    <section className="carousel-container">
      <div className="carousel-slide">
        <img src={images[currentIndex].src} alt="Carrusel" />
        <div className="carousel-text">{images[currentIndex].text}</div>
      </div>
      <button className="prev" onClick={() => moveSlide(-1)}>❮</button>
      <button className="next" onClick={() => moveSlide(1)}>❯</button>
    </section>
  );
}

export default Carousel;
