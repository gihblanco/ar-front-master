import { useEffect, useState } from "react";
import { getUser } from "../../hooks/getUser";

import CapaCurso from '../../assets/capa.svg';
import biometria from '../../assets/biometria.svg';
import Calendario from '../../assets/calendario.svg';

import Styles from "./Index.module.css";

export default function Home() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = async () => {
      const data = await getUser(localStorage.getItem('userID'), localStorage.getItem('token'));
      setUser(data.user);      
    }
    user();
  }, []);

  
  
   return (
  <>
    <div className={Styles.container}>
      <div className={Styles.ClassContainer}>
        <div className={Styles.AulaContainer}>
          <h1>Seja bem-vindo{`(a) ${user.nome}!`}</h1>
          <p>Turma 2022 - ICETRAN</p>
          <p>Próxima aula: Fundamentos da Educação - 2</p>
          <button>ACESSAR A SALA</button>
          <p>Clique no botão para acessar a sala de aula</p>
        </div>
        <div className={Styles.Calendario}>
          <h1>MAIO 2022</h1>
          <img src={Calendario}></img>
        </div>
      </div>
      <div className={Styles.AvisoContainer}>
        <div className={Styles.CapaContainer}>
          <div className={Styles.CronogramaContainer}>
            <h1>CRONOGRAMA DE AULAS</h1>

            <button>DID 05/2022</button>
            <button>FDE 04/2022</button>
            <button>ADM 03/2022</button>
            <button>DIR 02/2022</button>
          </div>
          
            <img src={CapaCurso} alt="" />
          
        </div>
        <div className={Styles.BiometriaContainer}>
          <h1>Clique para visualizar as aulas anteriores</h1>
          <img src={biometria} alt="" />
        </div>
      </div>
    </div>
  </>)
}