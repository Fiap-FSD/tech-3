// src/app/globalstyles.ts
'use client';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #000000; 
    color: white; 
    margin: 0;
    font-family: Arial, sans-serif;
    background-image: url('/layout.webp'); 
    background-size: cover; 
    background-position: center; 
    background-attachment: fixed;
  }
`;

export default GlobalStyle;
