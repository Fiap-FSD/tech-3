// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode'; // Importa a biblioteca jwt-decode
import * as authUtils from "@/utils/authUtils";

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
      const response = await axios.post('https://blog-posts-hori.onrender.com/auth/login', credentials);

      if (response.data.access_token) {
        // Cookies.set('token', response.data.access_token, { expires: 7 });
        authUtils.setAuthToken(response.data.access_token); // Define o token no cookie


        // Decodifica o token para extrair as informações do usuário
        const decodedToken: any = jwtDecode(response.data.access_token);

        const user = {
          id: decodedToken.sub,
          name: decodedToken.name || 'Unknown', // Ensure 'name' is included
          email: decodedToken.email,
          role: decodedToken.role,
        };

        if (user && user.role) {
          setUser(user);
          router.push(user.role === 'admin' ? '/admin' : '/create');
        } else {
          console.error('Dados do usuário estão incompletos ou ausentes:', user); // Log detalhado
          setUser(null); // Garante que o estado do usuário seja limpo
          alert('Erro: Dados do usuário estão incompletos ou ausentes. Por favor, tente novamente mais tarde.');
        }
      } else {
        console.error('Token de acesso não encontrado na resposta:', response.data); // Log detalhado
        // throw new Error('Token de acesso não encontrado na resposta.');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Erro ao realizar login. Por favor, verifique suas credenciais ou tente novamente mais tarde.');
      // throw error;
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
    const token = authUtils.getAuthToken(); // Cookies.get('token'); // Obtém o token do cookie
     
    if (token) {
      try {
        // Decodifica o token para extrair as informações do usuário
        const decodedToken: any = jwtDecode(token);

        const user = {
          id: decodedToken.sub,
          name: decodedToken.name || 'Unknown', // Garante que 'name' esteja presente
          email: decodedToken.email,
          role: decodedToken.role,
        };

        setUser(user); // Define o usuário no estado
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        authUtils.removeAuthToken(); // Remove o token inválido
        setUser(null);
      }
    }
    setLoading(false); // Define o carregamento como concluído
  };

  useEffect(() => {
    checkAuth(); // Verifica a autenticação ao carregar o aplicativo
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