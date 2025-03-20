'use client';
import styled from "styled-components";

// Estilo para o título (h1)
const Title = styled.h1`
  text-align: center; // Centraliza o texto
  color: #ffffff; // Texto branco
  font-size: 2rem; // Tamanho para telas pequenas
  font-weight: 800; // Extrabold
  margin: 0 auto; // Garante que o título fique centralizado na tela
  @media (min-width: 640px) {
    font-size: 3.75rem; // Tamanho para telas grandes
  }
`;

// Estilo para a descrição (p)
const Description = styled.p`
  text-align: center; // Centraliza o texto
  color: #ffffff; // Texto branco
  margin-top: 1rem;
  max-width: 36rem; // Largura máxima de 36rem (576px)
  font-size: 1rem;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 640px) {
    font-size: 1.25rem; // Tamanho maior em telas grandes
  }
`;

// Estilo global para o fundo da página (preto)
const PageContainer = styled.div`
  background-color: #000000; // Fundo preto
  color: white; // Cor do texto branco por padrão
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;  // Adiciona padding para não colar o conteúdo nas bordas
`;

interface HeroProps {
  showSearch?: boolean;
  title?: string;
  description?: string;
}

export const Hero = ({
  showSearch = true,
  title = "Portal de postagens de alunos e professores",
  description = "Use o campo de busca abaixo para localizar um conteúdo:",
}: HeroProps) => {
  return (
    <PageContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </PageContainer>
  );
};