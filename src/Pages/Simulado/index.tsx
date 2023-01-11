import Styles from './Index.module.css';

export function Simulado() {
  return (
    <div className={Styles.Container}>
      <div className={Styles.ContentContainer}>
        <h1>O simulado é uma ferramenta importante para você testar o seu conhecimento!</h1>
        <p>Você terá 1 hora para responder 30 questões com 4 alternativas cada</p>
        <button>FAZER SIMULADO</button>
        <p>O recurso de simulado NÃO é uma ferramenta oficial do DETRAN</p>
      </div>
    </div>
  )
}