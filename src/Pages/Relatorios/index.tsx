import Styles from './Index.module.css';
import * as Accordion from '@radix-ui/react-accordion';
import { ArrowDown } from 'phosphor-react';

export function Relatorios() {
  return (
    <div className={Styles.Container}>
      <div className={Styles.AccordionContainer}>
        <h1>Relatório de Alunos</h1>
        <Accordion.Root type="multiple">
          <Accordion.Item value="item1">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione o CFC</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2" className={Styles.AccordionItem}>
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione a Turma</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item3">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione o Aluno</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <p>Gerar Relatório</p>
      </div>
      <div className={Styles.AccordionContainer}>
        <h1>Relatório de Instrutor</h1>
        <Accordion.Root type="multiple">
          <Accordion.Item value="item1">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione o CFC</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2" className={Styles.AccordionItem}>
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione a Turma</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item3">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione o Instrutor</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <p>Gerar Relatório</p>
      </div>
      <div className={Styles.AccordionContainer}>
        <h1>Relatório de CFC</h1>
        <Accordion.Root type="multiple">
          <Accordion.Item value="item1">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione o CFC</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item2" className={Styles.AccordionItem}>
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione a Turma</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item3">
            <Accordion.Header className={Styles.AccordionHeader}>
              <Accordion.Trigger>
                <span>Selecione o Instrutor</span>
                <span><ArrowDown size={32} weight="thin" /></span>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content>
              <span className={Styles.AccordionContent}>
                TEXTO
              </span>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
        <p>Gerar Relatório</p>
      </div>
    </div>
  )
}