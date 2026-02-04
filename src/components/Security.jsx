
import React, { useState } from 'react';
import { Shield, Lock, AlertCircle } from 'lucide-react';

const Security = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return setStatus({ type: 'error', message: 'New passwords do not match' });
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://remocoin.onrender.com/api/users/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Password updated successfully!' });
        setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setStatus({ type: 'error', message: data.message });
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Server error. Try again later.' });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl font-nunito">
      {/* Change Password Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Change Password</h2>
        <p className="text-gray-500 text-sm mb-6">Update your password to keep your account secure</p>

        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          {status.message && (
            <p className={`text-sm font-bold ${status.type === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
              {status.message}
            </p>
          )}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-md"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Account Security Card */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Account Security</h2>
        <p className="text-gray-500 text-sm mb-6">Additional security settings for your account</p>

        <div className="border border-gray-100 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-gray-50 rounded-lg">
              <Shield className="w-5 h-5 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-gray-900">Two-factor authentication</h3>
              <p className="text-sm text-gray-500 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              <button disabled className="flex items-center gap-2 bg-gray-50 text-gray-400 px-4 py-2 rounded-lg text-xs font-bold cursor-not-allowed border border-gray-200">
                <Lock className="w-3 h-3" />
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;