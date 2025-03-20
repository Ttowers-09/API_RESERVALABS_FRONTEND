import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PantallaPrincipal from "./pages/PantallaPrincipal";
import ConsultarDisponibilidad from "./pages/ConsultarDisponibilidad";
import EliminarReservas from "./pages/EliminarReservas";
import MisReservas from "./pages/MisReservas";
import RealizarReservas from "./pages/RealizarReservas";
import Index from "./pages/Index";

import "./assets/css/global.css"; 
import "./assets/css/header.css";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inicio" element={<PantallaPrincipal />} />
        <Route path="/consultar-disponibilidad" element={<ConsultarDisponibilidad />} />
        <Route path="/eliminar-reservas" element={<EliminarReservas />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/realizar-reservas" element={<RealizarReservas />} />
      </Routes>
    </Router>
  );
}

export default App;
