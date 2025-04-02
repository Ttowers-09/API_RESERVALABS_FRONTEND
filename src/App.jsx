import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PantallaPrincipal from "./pages/PantallaPrincipal";
import ConsultarDisponibilidad from "./pages/ConsultarDisponibilidad";
import EliminarReservas from "./pages/EliminarReservas";
import MisReservas from "./pages/MisReservas";
import RealizarReservas from "./pages/RealizarReservas";

import Registro from "./pages/Registro";
import Perfil from "./pages/Perfil";


import Index from "./pages/Index";

// Estilos globales
import "./assets/css/global.css"; 
import "./assets/css/header.css";

// Importación de Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/inicio" element={<PantallaPrincipal />} />
        <Route path="/consultar-disponibilidad" element={<ConsultarDisponibilidad />} />
        <Route path="/eliminar-reservas" element={<EliminarReservas />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/perfil" element={<Perfil /> }/>
        <Route path="/realizar-reservas" element={<RealizarReservas />} />
      </Routes>
      {/* ✅ Aquí van las notificaciones */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </Router>
  );
}

export default App;
