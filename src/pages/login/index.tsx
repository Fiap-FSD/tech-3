'use client';
import { Separator } from '@/Components/Separator';
import router, { useRouter } from 'next/router';
import { useState, useContext } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AuthContext from '@/context/authContext';


// Estilo global para fundo preto e textos brancos
const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const HeaderHeight = '80px'; // Aumentando o valor para criar mais espaço

const Form = styled.form`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #222; /* Cor de fundo do formulário */
  margin-top: 20px; /* Ajustando o espaço acima do formulário */
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333; /* Fundo escuro para os campos de entrada */
  color: white; /* Texto branco nos campos */
`;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${HeaderHeight}; // Adicionando o padding para não sobrepor o header
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

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

interface Credentials {
  email: string;
  password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null); // Estado para mensagens de erro
  const authContext = useContext(AuthContext); // Usando o AuthContext
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Verifica se o authContext foi fornecido
    if (!authContext) {
      console.error('AuthContext não foi fornecido.');
      return;
    }

    try {
      // Tenta fazer login
      await authContext.login(credentials);

      // Verifica se o usuário foi autenticado
      if (authContext.user) {
        // Redireciona com base no papel (role) do usuário
        if (authContext.user.role === 'admin') {
          router.push('/admin'); // Redireciona para /admin se for administrador
        } else {
          router.push('/create'); // Redireciona para /create se for usuário comum
        }
      } else {
        // Se o usuário não existir, exibe uma mensagem de erro
        setError('Usuário não encontrado. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro ao fazer login. Tente novamente.'); // Mensagem de erro genérica
    }
  };

  return (
    <>
      <Container>
        <div>
          <Separator text="Faça o seu Login" />
        </div>
      </Container>

      {/* Aplica o estilo global para o fundo preto e texto branco */}
      <GlobalStyle />
      <Form onSubmit={handleSubmit}>
        {error && <ErrorMessage>{error}</ErrorMessage>} {/* Exibe a mensagem de erro */}

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
    </>
  );
};

export default Login;