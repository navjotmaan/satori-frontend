import { useState } from 'react';
import { signup } from '../api/authService';

const SignupForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
 
  const { name, email, password } = formData;
  signup(name, email, password);
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              required
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              required
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 mt-2"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;