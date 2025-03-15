import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #fff;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Title = styled.h2`
  font-size: 20px;
  margin: 0 0 10px;
`;

const Author = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

const ReadMore = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
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

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <Title>{post.title}</Title>
      <Author>Autor: {post.author}</Author>
      <Description>{post.description}</Description>
      <ReadMore to={`/post/${post.id}`}>Ler mais</ReadMore>
    </Card>
  );
};

export default PostCard;