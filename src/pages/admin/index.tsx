/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import styled from "styled-components";
import Link from "next/link";
import { Separator } from "@/app/components/Separator";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import AuthContext from "@/app/context/authContext"; 
import * as authUtils from "@/app/utils/authUtils"; 
import GlobalStyle from "@/app/componentStyles/globalStyles";
import { Bounce, ToastContainer, toast } from "react-toastify";

const HeaderHeight = "120px"; 

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding-top: ${HeaderHeight}; 
`;

const Title = styled.h1`
  font-size: 2.5rem; 
  font-weight: 700; 
  color: white; 
  text-align: center; 
  margin-bottom: 1rem;
`;

const PostItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #555; 
  color: white; 

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  
  @media (max-width: 600px) {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: white;
`;

const EditButton = styled(Button)`
  background-color:  #007bff;
  color: white;
  margin-right: 10px;
  &:hover {
    background-color: #005fc4;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;

const PostsContainer = styled.div`
  background-color: #333;  
  padding: 20px;
  border-radius: 8px;
  color: white; 
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
`;

interface Post {
  id: number;
  title: string;
  author: string;
}


const Admin = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter(); 

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!authContext?.user) {
      router.push("/login"); 
    } else {
      const fetchPosts = async () => {
        try {
          const response = await fetch('https://blog-posts-hori.onrender.com/post'); 
          const data = await response.json();
          const mappedPosts = data.map((post: any) => ({
            id: post._id, 
            title: post.title,
            author: post.author,
            description: post.intro, 
            ...post, 
          }));
          setPosts(mappedPosts); 
        } catch (error) {
          console.error('Erro ao buscar os posts:', error);
          toast.error("Erro ao buscar os posts.", {
            position: "top-center",
            autoClose: 4000,
            theme: "colored",
            transition: Bounce,
          });
        }
      };
      fetchPosts();
    }
  }, [authContext, router]);

  const handleDelete = async (id: number) => {
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
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        }
      });

      if (response.ok) {
        toast.success("Post deletado com sucesso!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
          transition: Bounce,
        });
        
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== id));    

        
      } else {
        console.error("Erro ao excluir o post:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("Erro ao excluir post:", error);
      toast.error("Erro ao excluir o post. Tente novamente!", {
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
      <GlobalStyle />
      <Container>
        <div>
          <Separator text="Administração" />
        </div>

        <Title>Lista de posts:</Title>

        <PostsContainer>
          {posts.map((post) => (
            <PostItem key={post.id}>
              <span>
                {post.title} - {post.author}
              </span>
              <ButtonContainer>
                <Link href={`/edit/${post.id}`} passHref>
                  <EditButton>Editar</EditButton>
                </Link>
                <DeleteButton onClick={() => handleDelete(post.id)}>
                  Excluir
                </DeleteButton>
              </ButtonContainer>
            </PostItem>
          ))}
        </PostsContainer>
      </Container>

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

export default Admin;