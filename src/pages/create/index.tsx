'use client';
import { Separator } from '@/Components/Separator';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const HeaderHeight = '80px'; 

// Estilo global para o fundo preto e texto branco
const GlobalStyle = createGlobalStyle`
  body {
    background-color: black; /* Cor de fundo preto */
    color: white; /* Cor do texto branco */
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const Form = styled.form`
  max-width: 600px;
  margin: 2px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #333; /* Cor de fundo do formulário */
  border-radius: 5px;
`;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${HeaderHeight}; // Adicionando o padding para não sobrepor o header
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #444; /* Fundo mais escuro para o input */
  color: white; /* Texto branco dentro do input */
  ::placeholder {
    color: #aaa; /* Placeholder em cinza */
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #444; /* Fundo mais escuro para o textarea */
  color: white; /* Texto branco dentro do textarea */
  min-height: 150px;
  ::placeholder {
    color: #aaa; /* Placeholder em cinza */
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
    background-color: #218838; /* Tom mais escuro de verde ao passar o mouse */
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
    <Container>
    <div>
        <Separator text="Inclua uma nova postagem" />
      </div>
    </Container>
    
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