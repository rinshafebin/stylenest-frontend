import React, { useState, useCallback } from 'react';
import axios from 'axios'; // normal axios
import { KeyRound, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e) => {
    setOtp(e.target.value);
  }, []);

  const handleVerifyOtp = useCallback(
    async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');

      try {
        const email = localStorage.getItem('resetEmail');
        if (!email) {
          setMessage('Email not found. Please restart the process.');
          setLoading(false);
          return;
        }

        const res = await axios.post('http://127.0.0.1:8000/api/users/verify-otp/', { email, otp });
        setMessage(res.data.message || 'OTP verified successfully!');
        setTimeout(() => navigate('/resetpassword'), 1500);
      } catch (error) {
        setMessage(error.response?.data?.error || 'Invalid OTP');
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [otp, navigate]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the 6-digit OTP sent to your registered email.
        </p>
        <form onSubmit={handleVerifyOtp} className="space-y-5">
          <div className="relative">
            <KeyRound className="absolute top-3 left-3 text-rose-400" size={20} />
            <input
              type="text"
              value={otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              maxLength={6}
              required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 
                       bg-gradient-to-r from-pink-500 to-pink-600 
                       text-white py-2 rounded-md 
                       hover:from-pink-600 hover:to-pink-700 
                       transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify OTP'} <CheckCircle2 size={18} />
          </button>

          {message && (
            <p className="text-sm text-center text-rose-500 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
