import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  @media (max-width: 600px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 10px;
`;

const Author = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 1.6;
`;

const PostView: React.FC = () => {
  const mockPost = {
    title: 'Post Exemplo',
    author: 'João',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
  };

  return (
    <Container>
      <Title>{mockPost.title}</Title>
      <Author>Autor: {mockPost.author}</Author>
      <Content>{mockPost.content}</Content>
    </Container>
  );
};

export default PostView;