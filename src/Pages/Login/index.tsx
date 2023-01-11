import { FormHandles, SubmitHandler } from "@unform/core";
import { useNavigate } from 'react-router';
import { Form } from "@unform/web";
import { useRef, useState } from "react";
import Logo from "../../assets/logo.svg";
import Input from "../../components/input";
import Styles from "./Index.module.css";
import { CircleNotch } from "phosphor-react";
import { useLogin } from "../../hooks/useLogin";

interface FormProps {
  email: string;
  senha: string;
}


export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const [IsLoading, setIsLoading] = useState(false);

  const handleSubmit: SubmitHandler<FormProps> = (data) => {
    setIsLoading(true);
    useLogin(data).then((response) => {
      setIsLoading(response.isLoading);
      navigate('/home')
    }).catch(() => {
      setIsLoading(false);
    })  
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.versionContainer}>
        <p>Plataforma Minha Aula Remota - Versão 1.0</p>
      </div>
      <img src={Logo} height="200" width="200" alt="Minha Aula Remota" />
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className={Styles.FormHeader}>
          <p>LOGIN</p>
        </div>

        <Input name="email" label="Digite seu email" type="email" />
        <Input name="senha" label="Digite sua senha" type="password" />

        {IsLoading ? (
          <button className={Styles.Button} disabled>
            <CircleNotch size={25} className={Styles.Spinner} />
          </button>
        ) : (
          <button type="submit" className={Styles.Button}>
            ENTRAR
          </button>
        )}
      </Form>
    </div>
  );
}
