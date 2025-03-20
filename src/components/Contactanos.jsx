import "../assets/css/header.css";
import "../assets/css/botones.css";
import "../assets/css/filtros.css";
import "../assets/css/global.css";
import "../assets/css/tablas.css";

function Contactanos() {
    return (
      <section id="contactanos" className="contact-container">
        <div className="contact-content">
          <h2>Contáctanos</h2>
          <p>Síguenos en nuestras redes sociales y mantente informado.</p>
          <div className="social-icons">
            <div className="social-item">
              <a href="https://wa.me/573162210527" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp" />
              </a>
              <span>WhatsApp</span>
            </div>
            <div className="social-item">
              <a href="https://github.com/juan-beltran0518" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-github" />
              </a>
              <span>GitHub</span>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Contactanos;