'use client';
import { useState } from 'react';
import styled from 'styled-components';
import PostCard from './components/PostCard';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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

  return  (
    <Container>
      <SearchInput
        type="text"
        placeholder="Buscar posts..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      {filteredPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Container>
  );
}
