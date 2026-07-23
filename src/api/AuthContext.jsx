import { createContext, useState, useContext, useEffect } from 'react';
import api from './axiosInstance';
import { setApiAccessToken } from './axiosInstance';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [actionLoading, setActionLoading] = useState(false); 

  const { data: accessToken, isLoading: isAuthLoading } = useQuery({
    queryKey: ['auth', 'refresh'],
    queryFn: async () => {
      try {
        const res = await api.post('/auth/refresh');
        return res.data.accessToken;
      } catch {
        return null; 
      }
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setApiAccessToken(accessToken ?? null);
  }, [accessToken]);

  // Helper to update the cached token directly (avoids an extra refetch)
  const setAccessToken = (token) => {
    queryClient.setQueryData(['auth', 'refresh'], token);
  };

  const signup = async (name, email, password) => {
    setActionLoading(true);
    try {
      const res = await api.post(
        '/auth/signup',
        { name, email, password }
      );
      setAccessToken(res.data.accessToken);
      setApiAccessToken(res.data.accessToken);
      return res.data;
    } catch (err) {
      console.error('Signup failed:', err.response?.data?.message || err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const login = async (email, password) => {
    setActionLoading(true);
    try {
      const res = await api.post(
        '/auth/login',
        { email, password }
      );
      setAccessToken(res.data.accessToken);
      setApiAccessToken(res.data.accessToken);
      
      return res.data;
    } catch (err) {
      console.error('Login failed:', err.response?.data?.message || err.message);
      throw err;
    } finally {
      setActionLoading(false);
    }
  };

  const logout = async () => {
    setActionLoading(true);
    try {
      await api.post('/auth/logout');
    } catch (err) {
      console.error('Logout failed:', err.response?.data?.message || err.message);
    } finally {
      setAccessToken(null);
      setApiAccessToken(null);
      setActionLoading(false);
    }
  };

  const loading = isAuthLoading || actionLoading;
  
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken, signup, login, logout, loading }}>
      { loading ? <div className="flex flex-col gap-5 items-center justify-center mt-50">
        <span className="text-center text-gray-500 font-semibold">
          <p>It takes a few seconds to load.</p>
          <p>Please wait...</p>
        </span>
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#4B2E2B] border-t-transparent"></div>
      </div> 
      : children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);