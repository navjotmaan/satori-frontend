import { createContext, useState, useContext, useEffect } from 'react';
import api from './axiosInstance';
import { setApiAccessToken } from './axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await api.post(
        '/auth/signup',
        { name, email, password },
        { withCredentials: true }
      );
      setAccessToken(res.data.accessToken);
      setApiAccessToken(res.data.accessToken);
      return res.data;
    } catch (err) {
      console.error('Signup failed:', err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
      );
      setAccessToken(res.data.accessToken);
      setApiAccessToken(res.data.accessToken);
      
      return res.data;
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/auth/logout', {}, { withCredentials: true });
    } catch (err) {
      console.error('Logout failed:', err.response?.data?.message || err.message);
    } finally {
      setAccessToken(null);
      setApiAccessToken(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const res = await api.post('/auth/refresh', {}, { withCredentials: true });
      
        setAccessToken(res.data.accessToken);
        setApiAccessToken(res.data.accessToken);
      } catch (err) {
        setAccessToken(null);
        setApiAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);
  
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, signup, login, logout, loading }}>
      {loading ? <div class="flex items-center justify-center mt-50">
        <div class="h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"></div>
      </div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);