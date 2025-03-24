/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { extractYouTubeId } from '@/utils/extractYouTubeId';
import * as authUtils from "@/utils/authUtils";
import GlobalStyle from "@/app/componentStyles/globalStyles";
import { Separator } from '@/app/components/Separator';
import { Bounce, ToastContainer, toast } from "react-toastify";

const HeaderHeight = '120px';

const Form = styled.form`
  max-width: 600px;
  margin: 100px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #333;
  border-radius: 5px;
  margin-top: 1px;
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
    background-color: #005fc4;
  }
`;

interface PostData {
  title: string;
  author: string;
  intro: string;
  content: string;
  imageUrl: string,
  videoUrl: string,
}

const PostEdit: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: 'Post Exemplo',
    content: 'Conteúdo editável aqui...',
    author: 'João',
    intro: 'Introdução ao post',
    imageUrl: 'test',
    videoUrl: 'test',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {

      const fetchPost = async () => {
        try {
          const response = await fetch(`https://blog-posts-hori.onrender.com/post/${id}`);
          const fetchedPost = await response.json();
          setPost({
            title: fetchedPost.title,
            content: fetchedPost.content,
            author: fetchedPost.author,
            intro: fetchedPost.intro || '',
            imageUrl: fetchedPost.imageUrl || '',
            videoUrl: fetchedPost.videoUrl || '',
          });
        } catch (error) {
          console.error('Erro ao buscar os detalhes do post:', error);
        }
      };

      fetchPost();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      alert('ID do post não encontrado.');
      toast.error("ID do post não encontrado. Busque novamente!", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

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

    try {
      const response = await fetch(`https://blog-posts-hori.onrender.com/post/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      const updatedPost = await response.json();
      
      toast.success("Post atualizado com sucesso!", {
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
      console.error('Erro ao atualizar o post:', error);
      toast.error("Erro ao atualizar o post. Tente novamente!", {
        position: "top-center",
        autoClose: 4000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <>
      <Container>
        <div>
          <Separator text="Edite o Post" />
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
          value={post.imageUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, imageUrl: e.target.value })
          }
        />

        <Input
          type="text"
          placeholder="Link Video"
          value={post.videoUrl}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPost({ ...post, videoUrl: extractYouTubeId(e.target.value) || '' }) 
          }
        />
        <Button type="submit">Salvar alterações</Button>
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

export default PostEdit;