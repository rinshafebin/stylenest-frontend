import React, { useState, useCallback } from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  // Memoized input handler
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setError('');

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }

      try {
        const res = await axios.post(
          "http://127.0.0.1:8000/api/users/register/",
          {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }
        );

        if (res.status >= 200 && res.status < 300) {
          toast.success('Account created successfully!');
          navigate('/login');
        }
      } catch (err) {
        if (err.response?.data) {
          const data = err.response.data;
          const firstKey = Object.keys(data)[0];
          setError(Array.isArray(data[firstKey]) ? data[firstKey][0] : data[firstKey]);
        } else {
          setError('Registration failed');
        }
      }
    },
    [formData, navigate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create account</h2>
        <p className="text-sm text-center text-gray-500">Join us and start your journey today</p>

        {/* Username */}
        <div className="relative">
          <User className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full pl-10 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded-md hover:from-pink-600 hover:to-pink-700 transition duration-300"
        >
          Create Account <ArrowRight size={16} />
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-semibold text-rose-600 hover:text-rose-500 transition-colors"
          >
            Log in here
          </button>
        </p>
      </form>
    </div>
  );
}
