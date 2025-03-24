"use client";
import { Separator } from "@/app/components/Separator";
import { useRouter } from "next/router";
import { useState, useContext } from "react";
import styled from "styled-components";
import AuthContext from "@/app/context/authContext";
import GlobalStyle from "@/app/componentStyles/globalStyles";
import { Bounce, ToastContainer, toast } from "react-toastify";


const HeaderHeight = "120px";

const Form = styled.form`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #222;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: white;
`;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${HeaderHeight};
`;


const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: "",
    password: "",
  });

  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authContext) {
      console.error("AuthContext não foi fornecido.");
      return;
    }

    try {
      await authContext.login(credentials);

      if (authContext.user) {
        if (authContext.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/create");
        }
      } else {
        toast.error("Usuário não encontrado. Verifique suas credenciais.", {
          position: "top-center",
          autoClose: 4000,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro ao fazer login. Tente novamente.", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <Container>
        <div>
          <Separator text="Faça o seu Login" />
        </div>
      </Container>

      <GlobalStyle />
      <Form onSubmit={handleSubmit}>       
        <Input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Senha"
          value={credentials.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button type="submit">Entrar</Button>
      </Form>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default Login;
