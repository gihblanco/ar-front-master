import Styles from './Index.module.css';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowDown } from 'phosphor-react';

export function Ajuda() {
  return (
    <div className={Styles.Container}>
      <div className={Styles.AccordionContainer}>
        <h1>SALA DE AULA</h1>
        <Accordion.Root type="multiple">
          <Accordion.Item value="item1">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Como realizar a validação biométrica?</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
              Posicionar o rosto de frente para câmera do computador ou celular, sem acessórios no rosto, sem outras pessoas na tela, com uma boa iluminação e nitidez. Clique no botão para confirmar sua biometria ou aguarde alguns segundos olhando para a câmera que o sistema detectará automaticamente sua biometria. Confirme e tenha uma boa aula!
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2" className={Styles.AccordionItem}>
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Como acessar a sala de aula?</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
              15 (quinze) minutos antes da aula começar o instrutor poderá abrir a sala, após a abertura você poderá se conectar a plataforma clicando no botão verde "Acessar a sala", faça sua validação biométrica e tenha uma boa aula.
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item3">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Onde vejo minhas aulas?</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
              Na página "Home" você poderá verificar o cronograma de aulas, e logo abaixo estará disponivel um link escrito "Clique para visualizar as aulas anteriores", clicando no link você conseguirá ver as aulas dessa matrícula cadastradas no sistema, tanto as anteriores quanto as futuras.
              </span>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>

        <p>Mais opções</p>
      </div>
      <div className={Styles.AccordionContainer}>
        <h1>VIDEOCHAMADA</h1>
        <Accordion.Root type="multiple">
          <Accordion.Item value="item1">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Como habilitar e desabilitar a câmera?</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
              No canto inferior da tela tem um ícone de camera, clique no mesmo e sua webcam/câmera padrão vai ser ligada. Após clicar novamente ela será desligada.
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2" className={Styles.AccordionItem}>
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Como ativar e desativar o som na videochamada?</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
              No canto inferior da tela tem um ícone de um microfone, clique no mesmo e seu microfone padrão vai ser ligado. Após clicar novamente ele será desligado.
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item3">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Como levantar a mão e fazer uma pergunta para o professor?</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                No canto inferior da tela tem um ícone de mão, clique no mesmo e o professor será notificado de que alguém levantou a mão para fazer pergunta. Após clicar novamente ele será desligado.
              </span>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>

        <p>Mais opções</p>
      </div>
    </div>
  )
}