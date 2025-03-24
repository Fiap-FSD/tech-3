/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Separator } from "@/app/components/Separator";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import AuthContext from "@/app/context/authContext"; 
import { useRouter } from "next/router";
import { extractYouTubeId } from '@/utils/extractYouTubeId';
import * as authUtils from "@/utils/authUtils";
import GlobalStyle from "@/app/componentStyles/globalStyles";
import { Bounce, ToastContainer, toast } from "react-toastify";

const HeaderHeight = "120px";

const Form = styled.form`
  max-width: 600px;
  margin: 2px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #333; 
  border-radius: 5px;
`;

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${HeaderHeight}; 
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #444; 
  color: white; 
  ::placeholder {
    color: #aaa; 
  }
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #444; 
  color: white; 
  min-height: 150px;
  ::placeholder {
    color: #aaa; 
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
    background-color: #005fc4; /* Tom mais escuro de verde ao passar o mouse */
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
  const authContext = useContext(AuthContext); 
  const router = useRouter(); 

  
  useEffect(() => {
    if (!authContext?.user) {
      router.push("/login");
    }
  }, [authContext, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = authUtils.getAuthToken();

    if (!token) {
      toast.error("Token inválido ou ausente. Faça login novamente!", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    const postData = {
      title: post.title,
      author: post.author,
      intro: post.intro,
      content: post.content,
      imageUrl: post.imagem,
      videoUrl: extractYouTubeId(post.video) || '',
    };

    try {
      const response = await fetch(
        "https://blog-posts-hori.onrender.com/post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify(postData), 
        }
      );

      let data = null;
      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      }
      toast.success("Post criado com sucesso!", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });

      setTimeout(() => {
        router.push("/");
      }, 1500); 

    } catch (error) {
      console.error("Erro ao criar o post:", error);
      toast.error("Erro ao criar o post. Tente novamente!", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

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
            setPost({ ...post, video: extractYouTubeId(e.target.value) || "" })
          }
        />
        <Button type="submit">Criar Post</Button>
      </Form>

      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        transition={Bounce}
      />
    </>
  );
};

export default PostCreate;
