import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './api/AuthContext.jsx';
import Journal from './components/Journal.jsx';
import Error from './components/ErrorElement.jsx';
import AudioRecorder from './components/speech-to-text/AudioRecorder.jsx';
import LoginForm from './forms/login.jsx';
import SignupForm from './forms/signup.jsx';
import App from './components/App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      { path: '/', element: <ProtectedRoute><App /></ProtectedRoute> },
      { path: 'new', element: <ProtectedRoute><AudioRecorder /></ProtectedRoute> },
      { path: ':id', element: <ProtectedRoute><Journal /></ProtectedRoute> },
      { path: 'login', element: <LoginForm /> },
      { path: 'signup', element: <SignupForm /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
