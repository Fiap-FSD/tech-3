'use client';
import styled from "styled-components";

const Title = styled.h1`
  text-align: center; 
  color: #ffffff; 
  font-size: 2rem; 
  font-weight: 800; 
  margin: 0 auto; 
  @media (min-width: 640px) {
    font-size: 3.75rem; 
  }
`;

const Description = styled.p`
  text-align: center; 
  color: #ffffff; 
  margin-top: 1rem;
  max-width: 36rem; 
  font-size: 1rem;
  margin-left: auto;
  margin-right: auto;
  @media (min-width: 640px) {
    font-size: 1.25rem; 
  }
`;

const PageContainer = styled.div`
  background-color: transparent; 
  color: white; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px; 
`;

interface HeroProps {
  showSearch?: boolean;
  title?: string;
  description?: string;
}

export const Hero = ({
  title = "Blog Post",
  description = "Use o campo abaixo para sua busca:",
}: HeroProps) => {
  return (
    <PageContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </PageContainer>
  );
};