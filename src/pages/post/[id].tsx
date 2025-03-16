import { Separator } from '@/Components/Separator';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Estilizando o fundo global da página
const GlobalStyle = createGlobalStyle`
  body {
    background-color: black; /* Fundo preto */
    color: white; /* Texto branco */
    margin: 0;
    font-family: Arial, sans-serif;
  }
`;

const Container = styled.div`
  padding: 100px 20px 20px; /* Adiciona espaço no topo para não sobrepor o header */
  max-width: 800px;
  margin: 0 auto;
  background-color: #222; /* Cor escura para o fundo do conteúdo */
  border-radius: 5px;

  @media (max-width: 600px) {
    padding: 10px 10px 10px; /* Ajuste para telas menores */
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
  color: white; /* Título branco */
`;

const Author = styled.p`
  font-size: 16px;
  color: #ccc; /* Autor com cor cinza claro */
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 1.6;
  color: white; /* Texto do conteúdo em branco */
`;

interface PostData {
  title: string;
  content: string;
  author: string;
}

const PostView = () => {
  const [mockPost, setMockPost] = useState<PostData>({
    title: '',
    author: '',
    content: '',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchedPost = { title: `Post Exemplo de ${id}`, content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit... do post ${id}`, author: `Author do post ${id}` };
      setMockPost(fetchedPost);
    }
  }, [id]);

  return (
    <>
      <GlobalStyle /> {/* Aplica o estilo global */}
      <Container>
        <Title>{mockPost.title}</Title>
        <Author>Autor: {mockPost.author}</Author>
        <Content>{mockPost.content}</Content>
      </Container>
    </>
  );
};

export default PostView;