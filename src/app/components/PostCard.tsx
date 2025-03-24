'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { useState } from 'react';

const Card = styled.div`
  border: 1px solid #555;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #333;
  color: white;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 10px;
  color: white;
`;

const Author = styled.p`
  font-size: 14px;
  color: #aaa;
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 10px 0;
  color: white;
`;

const ReadMore = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    color: #0056b3;
  }
`;

interface Post {
  id: number;
  title: string;
  author: string;
  description: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const [postDetails, setPostDetails] = useState<Post | null>(null);  

  return (
    <Card>
      {postDetails ? (
        <>
          <Title>{postDetails.title}</Title>
          <Author>Autor: {postDetails.author}</Author>
          <Description>{postDetails.description}</Description>
          <ReadMore href="#" onClick={(e) => { e.preventDefault(); setPostDetails(null); }}>
            Voltar
          </ReadMore>
        </>
      ) : (
        <>
          <Title>{post.title}</Title>
          <Author>Autor: {post.author}</Author>
          <Description>{post.description}</Description>
          <ReadMore href={`/post/${post.id}`}>Ler mais</ReadMore>
        </>
      )}
    </Card>
  );
};

export default PostCard;