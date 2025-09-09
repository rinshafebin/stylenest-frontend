import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPage() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        try {
            const response = await axiosInstance.post('auth/changepassword/', {
                old_password: oldPassword,
                new_password: newPassword,
            });
            setMessage(response.data.message);
            setOldPassword('');
            setNewPassword('');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-100 flex items-center justify-center p-4">
            {/* Background blur decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-200 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Change Password</h1>
                        <p className="text-gray-600">Update your account security</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Old Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">Current Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showOldPassword ? 'text' : 'password'}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    placeholder="Enter current password"
                                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowOldPassword(!showOldPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showOldPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 block">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Enter new password"
                                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl bg-gray-50 hover:bg-white focus:bg-white focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Feedback Messages */}
                        {message && (
                            <div className="text-green-600 text-sm text-center">{message}</div>
                        )}
                        {error && (
                            <div className="text-red-600 text-sm text-center">{error}</div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-rose-600 hover:to-pink-600 focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl group"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <span>Update Password</span>
                                <CheckCircle className="h-5 w-5 group-hover:scale-110 transition-transform" />
                            </div>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
