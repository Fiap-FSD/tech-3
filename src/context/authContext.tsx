// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

// Define os tipos para o contexto
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provedor de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', credentials);
      if (response.data.token) {
        Cookies.set('token', response.data.token, { expires: 7 });
        setUser(response.data.user);
        router.push(response.data.user.role === 'admin' ? '/admin' : '/create');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/login');
  };

  const checkAuth = async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        Cookies.remove('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;