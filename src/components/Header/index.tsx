import BlueLogo from '../../assets/BlueLogo.svg';
import Styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { getUser } from '../../hooks/getUser';
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ChartLineUp, Gear, House, List, Notebook, SignOut, User } from 'phosphor-react';
import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';


export default function Header(props: any) {

  const [isMobile, setIsMobile] = useState(false)
 
//choose the screen size 
const handleResize = () => {
  if (window.innerWidth < 1200) {
      setIsMobile(true)
  } else {
      setIsMobile(false)
  }
}

const Mobile = window.addEventListener("resize", handleResize);

Mobile

  const FetchUser = async () => {
    const user = await getUser(localStorage.getItem('userID'), localStorage.getItem('token'))
    return user.user;
  }

  const { data, isError, isLoading } = useQuery(['user'], FetchUser)



  return (
    <div className={Styles.Container}>
      <div className={Styles.LogoContainer}>
          <img src={BlueLogo} alt="Logo" />
        </div>
      <nav className={Styles.NavContainer}>
        {
        isMobile 
        ? 
        <>
         <DropdownMenu.Root>
          <DropdownMenu.Trigger className={Styles.NavTrigger}>
            <li><List size={25} weight="thin" />MENU</li>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className={Styles.NavContent}>
              <DropdownMenu.DropdownMenuItem>
                <Link to="/Home"><li><House size={32} />HOME</li></Link>
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem>
              <Link to="/Cadastros"><li><User size={32} />CADASTROS</li></Link>
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem>
                <Link to="/Biblioteca"><li><BookOpen size={32} />BIBLIOTECA</li></Link>
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem>
                <Link to="/Simulado"><li><Notebook size={32} />SIMULADO</li></Link>
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem>
                <Link to="/Ajuda"><li><Gear size={32} />AJUDA</li></Link>
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem>
                <Link to="/Relatorios"><li><ChartLineUp size={32} weight="thin" />RELATÓRIOS</li></Link>
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem>
                <Link to="/Perfil"><li><User size={32} />{isLoading ? null : data.nome.toUpperCase()}</li></Link>
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem>
                <Link to="/"><li><SignOut size={32} />SAIR</li></Link>
              </DropdownMenu.DropdownMenuItem>

            </DropdownMenu.Content>
          </DropdownMenu.Portal>

         </DropdownMenu.Root>
        </>
        : 
        <>
          <div>
            <Link to="/Home"><li><House size={32} />HOME</li></Link>
            <Link to="/Cadastros"><li><User size={32} />CADASTRO</li></Link>
              <Link to="/Biblioteca"><li><BookOpen size={32} />BIBLIOTECA</li></Link>
              <Link to="/Simulado"><li><Notebook size={32} />SIMULADO</li></Link>
              <Link to="/Ajuda"><li><Gear size={32} />AJUDA</li></Link>
              <Link to="/Relatorios"><li><ChartLineUp size={32} weight="thin" />RELATÓRIOS</li></Link>
            </div>
            <div>
            <Link to="/Perfil"><li><User size={32} />{isLoading ? null : data.nome.toUpperCase()}</li></Link>
            <Link to="/"><li><SignOut size={32} />SAIR</li></Link>
          </div>
        </>}
      </nav>
    </div>
  )
}