import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { setApiAccessToken } from './axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
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
      const res = await axios.post(
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
      await axios.post('/auth/logout', {}, { withCredentials: true });
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
        const res = await axios.post('/auth/refresh', {}, { withCredentials: true });
      
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
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);