import { useAuth } from '../api/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { accessToken, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!accessToken) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;