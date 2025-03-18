'use client';
import styled from 'styled-components';
import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';

// Estilizando o Header
const Header = styled.header`
  background-color: #1f2937;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  height: 80px;
`;

// Container para o conteúdo do Header
const HeaderContent = styled.div`
  max-width: 1536px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  padding-left: 1rem;
  padding-right: 1rem;
  align-items: center;
`;

// Estilizando o Navbar
const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  margin-left: 0.5rem;
`;

// Estilizando os Links de Navegação
const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  &:hover {
    text-decoration: underline;
  }
`;

// Logo com estilização
const Logo = styled(Link)`
  font-weight: bold;
  text-transform: uppercase;
  font-size: 1.25rem;
  color: #f3f4f6;
  display: block;
  margin-right: 2rem;
`;

const AuthContainer = styled.div`
  color: white;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: 1px solid white;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto; /* Move o botão para o canto direito */
`;

// Estilizando o conteúdo da página, com o padding-top para compensar o Header fixo
const MainContent = styled.main`
  padding-top: 80px;  // Tamanho do Header para empurrar o conteúdo para baixo
`;

export default function Navbar() {

  const authContext = useContext(AuthContext);
  const logout = authContext?.logout;
  const user = authContext?.user;

  return (
    <>
      <Header>
        <HeaderContent>
          <div className="flex items-center">
            <Logo href="/">FIAP</Logo>
          </div>

          <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/create">Criar Post</NavLink>
            <NavLink href="/admin">Admin</NavLink>
            <NavLink href="/login">Login</NavLink>
          </Nav>

          <NavRight>
            {user && <LogoutButton onClick={logout}>Logout</LogoutButton>}
          </NavRight>

        </HeaderContent>
      </Header>
      </>
  );
}