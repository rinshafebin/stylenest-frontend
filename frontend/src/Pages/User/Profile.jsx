import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Pencil } from 'lucide-react';
import axiosInstance from '../../api/axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    phone_number: '',
    address: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setFormData({
        username: parsedUser.username || '',
        phone_number: parsedUser.phone_number || '',
        address: parsedUser.address || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axiosInstance.patch('user/profile/', formData);
      setUser(res.data.data);
      localStorage.setItem('user', JSON.stringify(res.data.data));
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed', error.response?.data || error.message);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {user.username || user.name || 'No Username'}
            </h2>
            <p className="text-sm text-gray-500">
              Welcome back to <span className="font-semibold text-rose-500">StyleNest</span>
            </p>
          </div>

          {/* Edit Button */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:scale-105 hover:shadow-md text-white text-sm rounded-lg transition-all duration-200"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Pencil className="w-4 h-4" />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <hr className="my-4 border-gray-200" />

        {/* Profile Details or Edit Form */}
        {isEditing ? (
          <div className="space-y-5">
            {[
              { label: 'Username', name: 'username', type: 'text' },
              { label: 'Phone', name: 'phone_number', type: 'text' },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-600">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
              />
            </div>

            <button
              onClick={handleUpdate}
              className="w-full px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg shadow hover:scale-[1.02] transition-all duration-200"
            >
              Save Changes
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {[
              { icon: Mail, label: 'Email', value: user.email || 'Not provided' },
              { icon: Phone, label: 'Phone', value: user.phone_number || 'Not provided' },
              { icon: MapPin, label: 'Address', value: user.address || 'No address available' },
            ].map(({ icon: Icon, label, value }, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <Icon className="w-5 h-5 text-rose-600" />
                <div>
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className="text-base text-gray-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Profile;
