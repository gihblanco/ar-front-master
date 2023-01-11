import Styles from './Index.module.css';

import WhiteLogo from '../../assets/logo_azul-2.svg';

import IcetranLogo from '../../assets/ICETRAN/logo.svg';  

export default function Footer() {
  return (<>
    <div className={Styles.Container}>
      <div className={Styles.LeftContainer}>
      <div className={Styles.ContantoContainer}>
          <h1>Ainda tem alguma dúvida? Entre em contato com o ICETRAN:</h1>
          <p>pedagogico@icetran.com.br</p>
          <p>0800 006 9090</p>
        </div>
        <div className={Styles.MediaContainer}>
          <span>
            <img src={WhiteLogo} alt="AULA REMOTA" />
            <img src={IcetranLogo} alt="ICETRAN" />
          </span>
        </div>  
      </div>
      <div className={Styles.HelpContainer}>
        <div>
          <h1>SALA DE AULA</h1>
          <p>Como realizar a validação biométrica</p>
          <p>Como acessar a sala de aula</p>
          <p>Onde vejo minhas aulas</p>
        </div>
        <div>
          <h1>VIDEOCHAMADA</h1>
          <p>Como habilitar a câmera</p>
          <p>Como ativar o som na videochamada</p>
          <p>‎ ‎ ‎ ‎ ‎ </p>
        </div>
      </div>
    </div>
  </>)
}