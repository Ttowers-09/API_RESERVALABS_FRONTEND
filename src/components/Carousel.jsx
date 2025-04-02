// Importing React hooks to manage state and lifecycle effects
import { useState, useEffect } from "react";

// Importing stylesheets to apply styling to the carousel and layout
import "../assets/css/header.css";
import "../assets/css/botones.css";
import "../assets/css/filtros.css";
import "../assets/css/global.css";
import "../assets/css/tablas.css";

// Importing images that will be shown in the carousel
import realizarReserva from "../assets/images/realizar_reserva.jpg";
import eliminarReserva from "../assets/images/eliminar_reserva.jpg";
import misReservas from "../assets/images/mis_reservas.jpg";

// Array of image objects, each containing an image source and a descriptive text
const images = [
  { src: realizarReserva, text: "Reserva fácilmente tu laboratorio" },
  { src: eliminarReserva, text: "Elimina tus reservas sin problemas" },
  { src: misReservas, text: "Consulta tus reservas activas" },
];

// Functional component that renders a basic image carousel
function Carousel() {

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically changes the image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Inline logic to calculate next image index
      const newIndex = (currentIndex + 1 + images.length) % images.length;
      setCurrentIndex(newIndex);
    }, 3000);

    // Cleanup function to clear the interval
    return () => clearInterval(interval); 
  }, [currentIndex]);

  // Render the carousel with navigation buttons and current image + text
  return (
    <section className="carousel-container">
      <div className="carousel-slide">
        <img src={images[currentIndex].src} alt="Carrusel" />
        <div className="carousel-text">{images[currentIndex].text}</div>
      </div>
      <button className="prev" onClick={() => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
      }}>❮</button>
      <button className="next" onClick={() => {
        const newIndex = (currentIndex + 1 + images.length) % images.length;
        setCurrentIndex(newIndex);
      }}>❯</button>
    </section>
  );
}

export default Carousel;
