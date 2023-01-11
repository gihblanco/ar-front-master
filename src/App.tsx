import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login/index";

import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";
import Perfil from "./Pages/Perfil";
import { Biblioteca } from "./Pages/Biblioteca";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./hooks/getUser";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Ajuda } from "./Pages/Ajuda";
import { Simulado } from "./Pages/Simulado";
import { Relatorios } from "./Pages/Relatorios";
import { Cadastros } from "./Pages/Cadastros";
import { CadastroAulas } from "./Pages/Cadastros/Aulas";

function App() {
  
   async function User() {
    const user = await getUser(localStorage.getItem('userID'), localStorage.getItem('token'))
    return user.user;
  }

  const { data } = useQuery(['user'], User)

  let location = useLocation();

  return (
      <div>
        {location.pathname == "/" || location.pathname == '/Login' ? null : <Header/>}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Perfil" element={<Perfil />} />
          <Route path="/Biblioteca" element={<Biblioteca />} />
          <Route path="/Ajuda" element={<Ajuda />} />
          <Route path="/Simulado" element={<Simulado />} />
          <Route path="/Relatorios" element={<Relatorios />} />
          <Route path="/Cadastros" element={<Cadastros />} />
          <Route path="/Aulas" element={<CadastroAulas />} />
        </Routes>
        {location.pathname === "/" || location.pathname === '/Login' ? null : <Footer/>}   
    </div>
 
  );
}

export default App;
