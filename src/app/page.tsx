/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PostCard from './components/PostCard';
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';
import GlobalStyle from "@/app/componentStyles/globalStyles";

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; // Ajuste conforme necessário
  svg {
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const SearchInput = styled.input`
  min-width: 450px;
  border: 1px solid #555; /* Ajuste da borda para uma cor mais escura */
  padding: 15px;
  margin-bottom: 10px;
  margin-left: auto; /* Centraliza à esquerda */
  margin-right: auto; /* Centraliza à direita */
  display: block; /* Faz com que o campo seja um bloco para que os margens automáticos funcionem */
  border-radius: 5px;
  background-color: #333; /* Fundo escuro para o card */
  color: white; /* Cor do texto dentro do card */
  transition: box-shadow 0.2s;

  /* A largura total do campo será 100% menos as margens */
  width: calc(100% - 800px); /* Calcula a largura da caixa de texto subtraindo a margem total de 40px (20px de cada lado) */

  &:hover {
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1); 
}
`;

const MainContent = styled.main`
  padding-top: 80px;  // A altura do Header fixo
`;

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]); // Estado para armazenar os posts
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true); // Inicia o carregamento
        const response = await fetch('https://blog-posts-hori.onrender.com/post'); // Chamada à API
        const data = await response.json();
        const mappedPosts = data.map((post: any) => ({
          id: post._id, // Mapeia _id para id
          title: post.title,
          author: post.author,
          description: post.intro, // Usa intro como descrição
          ...post, // Inclui outras propriedades, se necessário
        }));
        setPosts(mappedPosts); // Atualiza o estado com os dados mapeados
      } catch (error) {
        console.error('Erro ao buscar os posts:', error);
      } finally {
        setLoading(false); // Finaliza o carregamento, independentemente do sucesso ou erro
      }
    };

    fetchPosts();
  }, []); // Executa apenas uma vez ao montar o componente

  const filteredPosts = posts.filter((post) =>
    (post.title?.toLowerCase().includes(search.toLowerCase()) || // Verifica se title existe
     post.description?.toLowerCase().includes(search.toLowerCase()) || // Verifica se description existe
     post.author?.toLowerCase().includes(search.toLowerCase())) // Verifica se author existe
  );

  return (
    <>
      {/* Aplica o estilo global */}
      <GlobalStyle />

      {/* Navbar (Header) será fixo no topo */}
      <Navbar />

      {/* Conteúdo da página */}
      <MainContent>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:flex-col lg:min-h-screen">
          <Hero />
          <div className="mx-auto max-w-3xl text-center">
            {/* Campo de pesquisa */}
            <SearchInput
              type="text"
              placeholder="Pesquisar por post..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Container>
            {loading ? (
                <LoadingSpinner>
                  <svg viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="100" />
                  </svg>
                </LoadingSpinner>
              ) : (
                filteredPosts.map((post, index) => (
                  <PostCard key={post.id || index} post={post} /> // Usa o índice como fallback para a key
                ))
              )
            }
          </Container>
        </div>
      </MainContent>
    </>
  );
}
