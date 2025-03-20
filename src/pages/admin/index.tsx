'use client';
import styled, { createGlobalStyle } from 'styled-components';
import Link from 'next/link';
import { Separator } from '@/Components/Separator';

const HeaderHeight = '80px'; // Defina a altura do header

// Estilizando o fundo global da página
const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    color: white;
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${HeaderHeight}; // Adicionando o padding para não sobrepor o header
`;

// Estilizando o título "Administração"
const Title = styled.h1`
  font-size: 2.5rem; // Tamanho maior para destacar o título
  font-weight: 700; // Negrito
  color: white; 
  text-align: center; // Centraliza o título
  margin-bottom: 1rem;
`;

// Estilizando o item do post
const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #555; // Cor da borda alterada para mais suave (cinza)
  color: white; // Cor do texto dentro do item de post
`;

// Botão base
const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: white; 
`;

// Botão Editar
const EditButton = styled(Button)`
  background-color: #007bff;
  color: white;
  margin-right: 10px;
  &:hover {
    background-color: #e0a800;
  }
`;

// Botão Excluir
const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;

interface Post {
  id: number;
  title: string;
  author: string;
}

const Admin = () => {
  const mockPosts: Post[] = [
    { id: 1, title: 'Post 1', author: 'João' },
    { id: 2, title: 'Post 2', author: 'Maria' },
  ];

  const handleDelete = (id: number) => {
    console.log('Deletar post:', id);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
      <div>
        <Separator text="Administração" />
      </div>

        {/* Título em destaque */}
        <Title></Title>
        {mockPosts.map((post) => (
          <PostItem key={post.id}>
            <span>{post.title} - {post.author}</span>
            <div>
              <Link href={`/edit/${post.id}`} passHref>
                <EditButton>Editar</EditButton>
              </Link>
              <DeleteButton onClick={() => handleDelete(post.id)}>Excluir</DeleteButton>
            </div>
          </PostItem>
        ))}
      </Container>
    </>
  );
};

export default Admin;