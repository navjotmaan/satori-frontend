import { useAuth } from '../api/AuthContext';
import { Navigate } from 'react-router-dom';
import Home from '../components/Home';

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useAuth();

  if (loading) return <div className='mt-50'>Loading...</div>;
  if (!accessToken) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;