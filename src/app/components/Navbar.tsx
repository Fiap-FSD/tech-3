'use client';
import Link from "next/link";
import styled from "styled-components";

const Header = styled.header`
  background-color: #007bff;
  padding: 10px 20px;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => (
  <Header>
    <Nav>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/create">Criar Post</NavLink>
      <NavLink href="/admin">Admin</NavLink>
      <NavLink href="/login">Login</NavLink>
    </Nav>
  </Header>
);

export default Navbar;