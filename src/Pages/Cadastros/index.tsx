import Styled from './Index.module.css';
import * as Tabs from '@radix-ui/react-tabs';

import { Usuário } from './components/users';
import Turma from './components/turmas';
import { CadastroMatriculas } from './components/matriculas';

export function Cadastros() {
  return (
  <>
    <div className={Styled.container}>
      <Tabs.Root orientation='vertical' className={Styled.ContentContainer}>
        <Tabs.List className={Styled.TriggerContainer}>
          <Tabs.Trigger value='Usuarios' className={Styled.TabsButton}>
            Usuários
          </Tabs.Trigger>
          <Tabs.Trigger value='Turmas' className={Styled.TabsButtonMiddle}>
            Turmas
          </Tabs.Trigger>
          <Tabs.Trigger value='Matriculas' className={Styled.TabsButton}>
            Matrículas
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value='Usuarios'>
          <Usuário />
        </Tabs.Content>
        <Tabs.Content value='Turmas'>
         <Turma />
        </Tabs.Content>
        <Tabs.Content value='Matriculas'>
          <CadastroMatriculas />
        </Tabs.Content>
      </Tabs.Root>
    </div>
    
  </>
  )
}