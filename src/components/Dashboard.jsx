import App from './App';
import { useAuth } from '../api/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Dashboard = () => {
  const { accessToken, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate('/login');
    }
  }, [accessToken, loading, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!accessToken) return null;

  return <App />;
};

export default Dashboard;
