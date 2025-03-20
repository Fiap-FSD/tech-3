import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
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

interface PostData {
  title: string;
  content: string;
  author: string;
}


const PostView = () => {

   const [mockPost, setMockPost] = useState<PostData>({
    title: '',
    author: '',
    content: '',
  });

  const router = useRouter();
  const { id } = router.query;

    useEffect(() => {
      if (id) {
        const fetchedPost = { title: `Post Exemplo de ${id}`, content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit... do post ${id}`, author: `Author do post ${id}` };
        setMockPost(fetchedPost);
      }
    }, [id]);

  return (
    <Container>
      <Title>{mockPost.title}</Title>
      <Author>Autor: {mockPost.author}</Author>
      <Content>{mockPost.content}</Content>
    </Container>
  );
};

export default PostView;