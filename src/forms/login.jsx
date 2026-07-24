import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../api/AuthContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      navigate('/dashboard');
    }
  }, [accessToken, navigate]);

  const url = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const handleGoogleLogin = () => {
    // Redirect the browser window to the backend route
    window.open(`${url}/auth/google`, "_self");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed! Please check your credentials.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F6F1E7] p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#F6F1E7] p-8 rounded-xl shadow-[0_25px_70px_-20px_rgba(22,20,15,0.3)] border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Sign in to your account</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-left font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B2E2B] focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-left font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              required
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4B2E2B] focus:outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8C4A32] hover:bg-[#A05A3F] cursor-pointer text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 mt-2"
          >
            Sign In
          </button>

          <button type='submit'
           className="w-full bg-[#8C4A32] hover:bg-[#A05A3F] cursor-pointer text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200" onClick={handleGoogleLogin}>
            Sign in with Google
          </button>

          <p>Don't have an account? <a href='/signup' className='text-[#8C4A32] hover:underline'>Sign up</a></p>
          
        </div>
      </form>
    </div>
  );
};

export default LoginForm;