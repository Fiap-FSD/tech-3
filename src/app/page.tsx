'use client';
import { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import PostCard from './components/PostCard';
import Navbar from './components/Navbar';
import { Hero } from './components/Hero';

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
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;



const SearchInput = styled.input`
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
  const mockPosts: Post[] = [
    { id: 1, title: 'Post 1', author: 'João', description: 'Um breve resumo...' },
    { id: 2, title: 'Post 2', author: 'Maria', description: 'Outro resumo...' },
  ];

  const filteredPosts = mockPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
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
            {filteredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Container>
        </div>
      </MainContent>
    </>
  );
}
