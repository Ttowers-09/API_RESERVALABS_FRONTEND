import Header from "../components/Header";
import Carousel from "../components/Carousel";
import CardsReservas from "../components/CardsReservas";
import Contactanos from "../components/Contactanos";
import bloqueLab from "../assets/images/bloque.jpg";

import "../assets/css/pantallaPrincipal.css";
function PantallaPrincipal() {
  return (
    <div>
      <Header />
      <Carousel />
      <CardsReservas />
      <section id="quienes-somos" className="about-container">
        <div className="about-content">
          <div className="about-text">
            <h2>¿Quiénes somos?</h2>
            <p>
              Somos un equipo de desarrollo que tiene como objetivo
               facilitar la reserva de laboratorios para los estudiantes de
              la asignatura de Ciclos de Vida de Desarrollo de Software.
            </p>
            <p>
              Contamos con un <strong>equipo de soporte</strong> que te ayudará en todo momento
              para que puedas realizar tus reservas de forma sencilla y rápida.
            </p>
            <button className="about-button">Saber más</button>
          </div>
          <div className="about-image">
            <img src = {bloqueLab} alt="Edificio del Laboratorio" />
          </div>
        </div>
      </section>
      <Contactanos />
    </div>
  );
}

export default PantallaPrincipal;