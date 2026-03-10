import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './components/App.jsx'
import Journal from './components/Journal.jsx'
import Error from './components/ErrorElement.jsx'
import AudioRecorder from './components/speech-to-text/AudioRecorder.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error />,
  }, 
  {
    path: 'new',
    element: <AudioRecorder/>,
  },
  {
    path: ':id',
    element: <Journal />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
