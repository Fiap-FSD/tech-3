'use client';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Estilizando o fundo global da página
const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const HeaderHeight = '120px'; // Aumentei a altura do header para criar mais espaço

// Estilizando o formulário
const Form = styled.form`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: ${HeaderHeight}; /* Aumenta o espaçamento para não sobrepor o header */
  background-color: #222; /* Fundo escuro para o formulário */
  border-radius: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #555; /* Cor de borda mais escura */
  border-radius: 5px;
  background-color: #333; /* Fundo escuro para o input */
  color: white; /* Cor do texto dentro do input */
  ::placeholder {
    color: #aaa; /* Cor do placeholder */
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #555; /* Cor de borda mais escura */
  border-radius: 5px;
  background-color: #333; /* Fundo escuro para o textarea */
  color: white; /* Cor do texto dentro do textarea */
  min-height: 150px;
  ::placeholder {
    color: #aaa; /* Cor do placeholder */
  }
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

interface PostData {
  title: string;
  content: string;
  author: string;
}

const PostCreate = () => {
  const [post, setPost] = useState<PostData>({ title: '', content: '', author: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post criado:', post);
  };

  return (
    <>
      <GlobalStyle />
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Título"
          value={post.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, title: e.target.value })
          }
        />
        <Textarea
          placeholder="Conteúdo"
          value={post.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setPost({ ...post, content: e.target.value })
          }
        />
        <Input
          type="text"
          placeholder="Autor"
          value={post.author}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, author: e.target.value })
          }
        />
        <Button type="submit">Criar Post</Button>
      </Form>
    </>
  );
};

export default PostCreate;