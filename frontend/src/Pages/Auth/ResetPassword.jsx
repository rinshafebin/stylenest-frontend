import React, { useState } from 'react';
import { Lock, CheckCircle2 } from 'lucide-react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const email = localStorage.getItem('resetEmail');
    if (!email) {
      setMessage('Email not found in session. Please restart the reset process.');
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post('auth/reset-password/', {
        email,
        password,
        confirm_password: confirmPassword,
      });

      setMessage(res.data.message || 'Password reset successful!');
      localStorage.removeItem('resetEmail');
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.error ||
        error.response?.data?.non_field_errors ||
        'Password reset failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Reset Password
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter your new password below.
        </p>
        <form onSubmit={handleResetPassword} className="space-y-5">
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-rose-400" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
          <div className="relative">
            <Lock className="absolute top-3 left-3 text-rose-400" size={20} />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>
          
          {/* Matching RegisterPage button theme */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 
                       bg-gradient-to-r from-pink-500 to-pink-600 
                       text-white py-2 rounded-md 
                       hover:from-pink-600 hover:to-pink-700 
                       transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Resetting...' : 'Reset Password'} <CheckCircle2 size={18} />
          </button>

          {message && (
            <p className="text-sm text-center text-rose-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
