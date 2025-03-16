import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import styled from 'styled-components';
import Home from './Pages/Home';
import PostView from './Pages/PostView';
import PostCreate from './Pages/PostCreate';
import PostEdit from './Pages/PostEdit';
import Admin from './Pages/Admin';
import Login from './Pages/Login';

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

const App: React.FC = () => {
  return (
    <Router>
      <Header>
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/create">Criar Post</NavLink>
          <NavLink to="/admin">Admin</NavLink>
          <NavLink to="/login">Login</NavLink>
        </Nav>
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/create" element={<PostCreate />} />
        <Route path="/edit/:id" element={<PostEdit />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;