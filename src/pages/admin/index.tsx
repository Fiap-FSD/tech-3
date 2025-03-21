"use client";import styled, { createGlobalStyle } from "styled-components";
import Link from "next/link";
import { Separator } from "@/app/components/Separator";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Usando o novo useRouter do Next.js 13+
import AuthContext from "@/app/context/authContext"; // Importando o AuthContext
import * as authUtils from "@/utils/authUtils"; // Importando todos os membros do utilitário de autenticação
import GlobalStyle from "@/app/componentStyles/globalStyles";

const HeaderHeight = "120px"; // Defina a altura do header

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${HeaderHeight}; // Adicionando o padding para não sobrepor o header
`;

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
  background-color:  #007bff;
  color: white;
  margin-right: 10px;
  &:hover {
    background-color: #005fc4;
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

const PostsContainer = styled.div`
  background-color: #333;  // Fundo cinza escuro para a lista de posts
  padding: 20px;
  border-radius: 8px;
  color: white; // Garantir que o texto permaneça visível
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); // Adiciona uma leve sombra para um toque mais moderno
`;

interface Post {
  id: number;
  title: string;
  author: string;
}


const Admin = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter(); // Hook para redirecionamento

  const [posts, setPosts] = useState<Post[]>([]);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!authContext?.user) {
      router.push("/login"); // Redireciona para a página de login se o usuário não estiver autenticado
    } else {
      // Carregar posts da API
      const fetchPosts = async () => {
        try {
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
        }
      };
      fetchPosts();
    }
  }, [authContext, router]);

  // Handle Delete Post
  const handleDelete = async (id: number) => {
    const token = authUtils.getAuthToken(); // Obtém o token do cookie

    if (!token) {
      alert("Token inválido ou ausente. Faça login novamente.");
      return;
    }
    try {
      // Envia a solicitação de exclusão
      const response = await fetch(`https://blog-posts-hori.onrender.com/post/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
        }
      });

      // Verifica se a resposta da API foi bem-sucedida
      if (response.ok) {
        // Atualiza a lista de posts sem o post excluído
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));
      } else {
        console.error("Erro ao excluir o post:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir post:", error);
    }
  };

  // Se o usuário não estiver autenticado, não renderiza o conteúdo
  if (!authContext?.user) {
    return null;
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <div>
          <Separator text="Administração" />
        </div>

        {/* Título em destaque */}
        <Title>Lista de posts:</Title>

        {/* Container para lista de posts com fundo preto */}
        <PostsContainer>
          {posts.map((post) => (
            <PostItem key={post.id}>
              <span>
                {post.title} - {post.author}
              </span>
              <div>
                <Link href={`/edit/${post.id}`} passHref>
                  <EditButton>Editar</EditButton>
                </Link>
                <DeleteButton onClick={() => handleDelete(post.id)}>
                  Excluir
                </DeleteButton>
              </div>
            </PostItem>
          ))}
        </PostsContainer>
      </Container>
    </>
  );
};

export default Admin;