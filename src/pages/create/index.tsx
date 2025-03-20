"use client";import { Separator } from "@/app/components/Separator";
import { useContext, useEffect, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import AuthContext from "@/app/context/authContext"; // Importando o AuthContext
import { useRouter } from "next/router";
import { extractYouTubeId } from '@/utils/extractYouTubeId';
import * as authUtils from "@/utils/authUtils";

const HeaderHeight = "80px";

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
  intro: string;
  imagem: string;
  video: string;
}

const PostCreate = () => {
  const [post, setPost] = useState<PostData>({
    title: "",
    content: "",
    author: "",
    intro: "",
    imagem: "",
    video: "",
  });
  const authContext = useContext(AuthContext); // Usando o AuthContext
  const router = useRouter(); // Hook para redirecionamento

  // Verifica se o usuário está autenticado
  useEffect(() => {
    if (!authContext?.user) {
      router.push("/login"); // Redireciona para a página de login se o usuário não estiver autenticado
    }
  }, [authContext, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = authUtils.getAuthToken(); // Obtém o token do cookie

    if (!token) {
      alert("Token inválido ou ausente. Faça login novamente.");
      return;
    }

    const postData = {
      title: post.title,
      author: post.author,
      intro: post.intro,
      content: post.content,
      imageUrl: post.imagem,
      videoUrl: extractYouTubeId(post.video) || '', // Usa a função utilitária
    };

    try {
      const response = await fetch(
        "https://blog-posts-hori.onrender.com/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho
          },
          body: JSON.stringify(postData), // Envia os dados como JSON
        }
      );

      // Verifica se a resposta contém um corpo antes de chamar response.json()
      let data = null;
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }
      alert("Post criado com sucesso!");
      router.push("/"); // Redireciona para a página inicial após criar o post
    } catch (error) {
      console.error("Erro ao criar o post:", error);
      alert("Erro ao criar o post. Tente novamente.");
    }
  };

  // Se o usuário não estiver autenticado, não renderiza o conteúdo
  if (!authContext?.user) {
    return null;
  }

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

        <Input
          type="text"
          placeholder="Introdução"
          value={post.intro}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, intro: e.target.value })
          }
        />

        <Input
          type="text"
          placeholder="Link Imagem"
          value={post.imagem}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, imagem: e.target.value })
          }
        />

        <Input
          type="text"
          placeholder="Link Video"
          value={post.video}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, video: extractYouTubeId(e.target.value) || "" }) // Extrai o ID ao alterar o valor
          }
        />
        <Button type="submit">Criar Post</Button>
      </Form>
    </>
  );
};

export default PostCreate;
