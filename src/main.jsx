import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './api/AuthContext.jsx';
import { JournalProvider } from './components/JournalContext.jsx';
import Journal from './components/Journal.jsx';
import Error from './helpers/ErrorElement.jsx';
import AudioRecorder from './components/speech-to-text/AudioRecorder.jsx';
import LoginForm from './forms/login.jsx';
import SignupForm from './forms/signup.jsx';
import App from './components/App.jsx';
import ProtectedRoute from './helpers/ProtectedRoute.jsx';
import Layout from './components/Layout.jsx';
import QuoteSection from './components/quotes/Quotes.jsx';
import Logout from './components/Profile.jsx';
import './index.css';
import Home from './components/Home.jsx';

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      { element: <Layout />, children: [
        { path: '/dashboard', element: <ProtectedRoute><App /></ProtectedRoute> },
        { path: 'nuggets', element: <ProtectedRoute><QuoteSection /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Logout /></ProtectedRoute> },
      ],
      },
      
      { path: '/', element: <Home /> },
      { path: 'new', element: <ProtectedRoute><AudioRecorder /></ProtectedRoute> },
      { path: ':id', element: <ProtectedRoute><Journal /></ProtectedRoute> },
      { path: 'signin', element: <LoginForm /> },
      { path: 'signup', element: <SignupForm /> },
      
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <JournalProvider>
        <RouterProvider router={router} />
      </JournalProvider>
    </AuthProvider>
  </StrictMode>,
)
