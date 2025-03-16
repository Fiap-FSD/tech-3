import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const HeaderHeight = '120px'; // Aumentando o valor para criar mais espaço

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
  margin: 100px auto; /* Aumentei a margem superior para evitar sobreposição */
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #333; /* Cor de fundo do formulário */
  border-radius: 5px;
  margin-top: ${HeaderHeight}; /* Aumentando o espaçamento para não sobrepor o header */
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

const PostEdit: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: 'Post Exemplo',
    content: 'Conteúdo editável aqui...',
    author: 'João',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchedPost = { title: `Post ${id}`, content: `Conteúdo editável do post ${id}`, author: 'Autor' };
      setPost(fetchedPost);
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post editado:', post);
  };

  return (
    <>
      <GlobalStyle /> {/* Aplica o estilo global */}
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
        <Button type="submit">Salvar Alterações</Button>
      </Form>
    </>
  );
};

export default PostEdit;