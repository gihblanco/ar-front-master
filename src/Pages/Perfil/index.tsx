import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { getUser } from "../../hooks/getUser";

import TesteUser from "../../assets/TesteUser.png";

import Styles from './Index.module.css';
import { Camera } from "phosphor-react";

export default function Perfil() {
  const [user, setUser] = useState({});
  useEffect(() => {
    const user = async () => {
      const data = await getUser(localStorage.getItem('userID'), localStorage.getItem('token'));
      setUser(data.user);      
    }
    user();
  }, []);
  return (<>
    <div className={Styles.Container}>
      <div className={Styles.ContentContainer}>
        <h1>MEU PERFIL</h1>
        <span className={Styles.SpanContainer}>
          <span className={Styles.CameraContainer}>
            <span></span>
            <img width={300} height={250} src={TesteUser} alt="Foto de perfil" />
          </span>
          <span onClick={() => { alert('alo')}}>
            <Camera className={Styles.PhotoIcon} size={44} />
          </span>
        </span>
        <span className={Styles.ButtonContainer}>
          <button className={Styles.SavePhoto}>Salvar Imagem</button>
        </span>
        <h1 className={Styles.LastH1}>Deseja alterar os seus dados cadastrais?</h1>
        <input type="text" placeholder="Digite seu nome..." />
        <input type="text" placeholder="Digite seu e-mail..." />
        <input type="text" placeholder="Digite sua senha..." />
        <input type="text" placeholder="Digite sua senha novamente..." />
        <button className={Styles.SaveData}>Salvar Dados</button>
      </div>     
    </div>
  </>)
}