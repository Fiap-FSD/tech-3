'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';

// Estilizando o Card
const Card = styled.div`
  border: 1px solid #555; /* Ajuste da borda para uma cor mais escura */
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #333; /* Fundo escuro para o card */
  color: white; /* Cor do texto dentro do card */
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1); /* Efeito de hover com sombra mais leve */
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 10px;
  color: white; /* Cor do título em branco */
`;

const Author = styled.p`
  font-size: 14px;
  color: #aaa; /* Cor do texto do autor em cinza claro */
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: white; /* Cor do texto da descrição em branco */
`;

const ReadMore = styled(Link)`
  color: #007bff; /* Cor do link em azul */
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #0056b3; /* Cor do link ao passar o mouse */
  }
`;

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);

  const handleReadMore = async () => {
    try {
      const response = await fetch(`https://blog-posts-hori.onrender.com/post/${post.id}`);
      if (!response.ok) {
        throw new Error(`Erro ao buscar o post com ID ${post.id}: ${response.statusText}`);
      }
      const data = await response.json();
      setPostDetails(data); // Atualiza os detalhes do post
    } catch (error) {
      console.error('Erro ao buscar os detalhes do post:', error);
    }
  };

  return (
    <Card>
      {postDetails ? (
        // Renderiza os detalhes do post
        <>
          <Title>{postDetails.title}</Title>
          <Author>Autor: {postDetails.author}</Author>
          <Description>{postDetails.description}</Description>
          <ReadMore href="#" onClick={(e) => { e.preventDefault(); setPostDetails(null); }}>
            Voltar
          </ReadMore>
        </>
      ) : (
        // Renderiza o resumo do post
        <>
          <Title>{post.title}</Title>
          <Author>Autor: {post.author}</Author>
          <Description>{post.description}</Description>
          <ReadMore href={`/post/${post.id}`}>Ler mais</ReadMore> {/* Certifique-se de que o ID está correto */}
        </>
      )}
    </Card>
  );
};

export default PostCard;