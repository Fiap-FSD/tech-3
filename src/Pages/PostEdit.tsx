import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 150px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #218838;
  }
`;

interface PostData {
  title: string;
  content: string;
  author: string;
}

const PostEdit: React.FC = () => {
  const [post, setPost] = useState<PostData>({
    title: 'Post Exemplo',
    content: 'Conteúdo editável aqui...',
    author: 'João',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Post editado:', post);
  };

  return (
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
      <Button type="submit">Salvar Alterações</Button>
    </Form>
  );
};

export default PostEdit;