import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './api/AuthContext.jsx'
import Journal from './components/Journal.jsx'
import Error from './components/ErrorElement.jsx'
import AudioRecorder from './components/speech-to-text/AudioRecorder.jsx'
import LoginForm from './forms/login.jsx';
import SignupForm from './forms/signup.jsx';
import Dashboard from './components/Dashboard.jsx';

const router = createBrowserRouter([
  {
    errorElement: <Error />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'new', element: <AudioRecorder /> },
      { path: ':id', element: <Journal /> },
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
