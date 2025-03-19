import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styled from 'styled-components';

// Estilização do container
const Container = styled.div`
  background-color: black;
  padding: 20px;
  max-width: 800px;
  margin: 100px auto;
  background-color: #333;
  color: white;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 16px;
  color: #aaa;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.5;
`;

interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
}

const PostDetails = () => {
  const params = useParams(); // Obtém os parâmetros da URL
  const id = params?.id as string; // Garante que 'id' seja tratado como uma string
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const response = await fetch(`https://blog-posts-hori.onrender.com/post/${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar o post com ID ${id}: ${response.statusText}`);
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error('Erro ao buscar os detalhes do post:', error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) {
    return <Container>Carregando...</Container>;
  }

  return (
    <Container>
      <Title>{post.title}</Title>
      <Author>Autor: {post.author}</Author>
      <Content>{post.content}</Content>
    </Container>
  );
};

export default PostDetails;
