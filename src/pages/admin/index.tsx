'use client';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const PostItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
`;

const EditButton = styled(Button)`
  background-color: #ffc107;
  color: white;
  margin-right: 10px;
  &:hover {
    background-color: #e0a800;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
  color: white;
  &:hover {
    background-color: #c82333;
  }
`;

interface Post {
  id: number;
  title: string;
  author: string;
}

const Admin = () => {
  const mockPosts: Post[] = [
    { id: 1, title: 'Post 1', author: 'João' },
    { id: 2, title: 'Post 2', author: 'Maria' },
  ];

  const handleDelete = (id: number) => {
    console.log('Deletar post:', id);
  };

  return (
    <Container>
      <h1>Administração</h1>
      {mockPosts.map((post) => (
        <PostItem key={post.id}>
          <span>
            {post.title} - {post.author}
          </span>
          <div>
            <Link href={`/edit/${post.id}`} passHref>
              <EditButton>Editar</EditButton>
            </Link>
            <DeleteButton onClick={() => handleDelete(post.id)}>Excluir</DeleteButton>
          </div>
        </PostItem>
      ))}
    </Container>
  );
};

export default Admin;