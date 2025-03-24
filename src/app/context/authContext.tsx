/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode'; 
import * as authUtils from "@/pages/utils/authUtils";

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

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const response = await axios.post('https://blog-posts-hori.onrender.com/auth/login', credentials);

      if (response.data.access_token) {
        authUtils.setAuthToken(response.data.access_token); 

        const decodedToken: any = jwtDecode(response.data.access_token);

        const user = {
          id: decodedToken.sub,
          name: decodedToken.name || 'Unknown',
          email: decodedToken.email,
          role: decodedToken.role,
        };

        if (user && user.role) {
          setUser(user);
          router.push(user.role === 'admin' ? '/admin' : '/create');
        } else {
          console.error('Dados do usuário estão incompletos ou ausentes:', user);
          setUser(null);
          alert('Erro: Dados do usuário estão incompletos ou ausentes. Por favor, tente novamente mais tarde.');
        }
      } else {
        console.error('Token de acesso não encontrado na resposta:', response.data);
      }
    } catch (error: any) {
      console.error('Erro no login:', error.message); 
    }
  };

  const logout = () => {
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
  
    setUser(null);
    router.push('/login');
  };

  const checkAuth = async () => {
    const token = authUtils.getAuthToken();
  
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTime) {
          console.warn('Token expirado. Realizando logout...');
          authUtils.removeAuthToken();
          setUser(null);
          return;
        }
  
        const user = {
          id: decodedToken.sub,
          name: decodedToken.name || 'Unknown',
          email: decodedToken.email,
          role: decodedToken.role,
        };
  
        setUser(user);
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        authUtils.removeAuthToken();
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