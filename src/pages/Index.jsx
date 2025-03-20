import { useNavigate } from "react-router-dom";
import LogoEscuela from "../assets/images/Logo_Escuela.png";
import "../assets/css/index.css";

function Index() {
  const navigate = useNavigate();

  return (
    <div className="index-container">
      <img src={LogoEscuela} alt="Logo Universidad" className="index-logo" />
      <div className="index-buttons">
        <button onClick={() => navigate("/inicio")}>Administrador</button>
        <button onClick={() => navigate("/inicio")}>Estudiante</button>
      </div>
    </div>
  );
}

export default Index;
