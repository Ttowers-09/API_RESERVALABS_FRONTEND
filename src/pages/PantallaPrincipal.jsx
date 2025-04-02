// Importing custom components used to build the main page
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import CardsReservas from "../components/CardsReservas";
import Contactanos from "../components/Contactanos";

// Importing image asset for the "About Us" section
import bloqueLab from "../assets/images/bloque.jpg";

// Importing CSS styles for the main page layout
import "../assets/css/pantallaPrincipal.css";

// Functional component that represents the main screen of the app
function PantallaPrincipal() {
  return (
    <div>
      {/* Top navigation bar */}
      <Header />

      {/* Image carousel */}
      <Carousel />

      {/* Interactive cards for reservation options */}
      <CardsReservas />

      {/* About section: who we are and what we do */}
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

            {/* External link to the program page */}
            <a
              href="https://www.escuelaing.edu.co/es/programas/ingenieria-de-sistemas/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-button"
            >
              Saber más
            </a>
          </div>

          {/* Image of the lab building */}
          <div className="about-image">
            <img src = {bloqueLab} alt="Edificio del Laboratorio" />
          </div>
        </div>
      </section>

      {/* Contact section */}
      <Contactanos />
    </div>
  );
}


export default PantallaPrincipal;
