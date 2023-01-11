import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { FilePdf } from 'phosphor-react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Styled from './Index.module.css';

export function Biblioteca() {
  const array = [1,2,3,4,5,6,7,8,9,10,11,12]
  return (
  <>
    <div className={Styled.Container}>
      <div className={Styled.Search}>
        <h1>BIBLIOTECA</h1>
        <input type="text" placeholder="Filtros e pesquisa" />
      </div>
      

      <nav className={Styled.Nav}>
        <h1>BIBLIOTECA</h1>
        <div>
          <p>Filtrar por</p>
          <SeparatorPrimitive.Root className={Styled.Separator} />
          <p>Data</p>
          <SeparatorPrimitive.Root className={Styled.Separator} />
          <p>Últimos 30 dias</p>
        </div>
      </nav>

      <div className={Styled.CardContainer}>
        
        {array.map(() => {
          return (
          <div className={Styled.Card}>
            <FilePdf size={60} weight="thin" />
            <p>Apostila psico</p>
          </div>
          )
        })}
        
      </div>
    </div>
  </>
  )
}