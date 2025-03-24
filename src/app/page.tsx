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
  height: 300px;
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
  min-width: 200px;
  border: 1px solid #555;
  padding: 15px;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  border-radius: 5px;
  background-color: #333;
  color: white;
  transition: box-shadow 0.2s;

  
  width: calc(100% - 800px);

  &:hover {
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1); 
}
`;

const MainContent = styled.main`
  padding-top: 80px;
`;

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

export default function Home() {
  const [search, setSearch] = useState<string>('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    (post.title?.toLowerCase().includes(search.toLowerCase()) || 
     post.description?.toLowerCase().includes(search.toLowerCase()) || 
     post.author?.toLowerCase().includes(search.toLowerCase())) 
  );

  return (
    <>
      <GlobalStyle />

      <Navbar />

      <MainContent>
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:flex-col lg:min-h-screen">
          <Hero />
          <div className="mx-auto max-w-3xl text-center">
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
                  <PostCard key={post.id || index} post={post} /> 
                ))
              )
            }
          </Container>
        </div>
      </MainContent>
    </>
  );
}
