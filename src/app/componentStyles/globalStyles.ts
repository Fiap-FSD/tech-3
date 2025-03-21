// src/app/globalstyles.ts
'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #000000; /* Cor de fundo */
    color: white; /* Texto branco */
    margin: 0;
    font-family: Arial, sans-serif;
    background-image: url('/layout.webp'); /* Caminho para a imagem na pasta public */
    background-size: cover; /* Cobre toda a tela */
    background-position: center; /* Centraliza a imagem de fundo */
    background-attachment: fixed; /* A imagem de fundo fica fixa ao rolar */
  }
`;

export default GlobalStyle;
