'use client';
import { useState } from 'react';
import styled from 'styled-components';

const HeaderHeight = '120px'; // Aumentando o valor para criar mais espaço

const Form = styled.form`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: ${HeaderHeight}; /* Aumentando o espaçamento para não sobrepor o header */
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  username: string;
  password: string;
}

const Login = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    username: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login:', credentials);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Usuário"
        value={credentials.username}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setCredentials({ ...credentials, username: e.target.value })
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
  );
};

export default Login;