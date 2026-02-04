
import React, { useState } from 'react';
import { Moon, Sun, Save } from 'lucide-react';

const Preferences = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    accountMode: 'Real Account',
    emailNotifications: true,
    tradeConfirmations: true,
    marketUpdates: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (setting) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://remocoin.onrender.com/api/users/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        alert('Preferences saved successfully!');
      }
    } catch (err) {
      console.error('Failed to save preferences');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl font-nunito animate-in fade-in duration-500">
      
      {/* Interface Settings */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Interface Settings</h2>
        <p className="text-gray-500 text-sm mb-8">Customize the look and feel of your trading interface</p>

        <div className="space-y-6">
          {/* Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Dark Mode</h3>
              <p className="text-xs text-gray-500">Toggle between light and dark theme</p>
            </div>
            <button 
              onClick={() => handleToggle('darkMode')}
              className={`p-2 rounded-lg transition-colors ${settings.darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-100 text-gray-400'}`}
            >
              {settings.darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Account Mode Dropdown */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">Account Mode</h3>
              <p className="text-xs text-gray-500">Switch between demo and real accounts</p>
            </div>
            <select 
              value={settings.accountMode}
              onChange={(e) => setSettings({...settings, accountMode: e.target.value})}
              className="bg-white border border-gray-200 text-sm font-semibold rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
            >
              <option>Real Account</option>
              <option>Demo Account</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
        <p className="text-gray-500 text-sm mb-8">Manage how and when you receive updates</p>

        <div className="space-y-6">
          <ToggleRow 
            label="Email Notifications" 
            sublabel="Receive important account updates via email" 
            active={settings.emailNotifications} 
            onToggle={() => handleToggle('emailNotifications')}
          />
          <ToggleRow 
            label="Trade Confirmations" 
            sublabel="Get notified when your trades are executed" 
            active={settings.tradeConfirmations} 
            onToggle={() => handleToggle('tradeConfirmations')}
          />
          <ToggleRow 
            label="Market Updates" 
            sublabel="Receive daily market analysis and trends" 
            active={settings.marketUpdates} 
            onToggle={() => handleToggle('marketUpdates')}
          />
        </div>

        <div className="flex justify-end mt-10">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-emerald-400 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {isSaving ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom Toggle Component
const ToggleRow = ({ label, sublabel, active, onToggle }) => (
  <div className="flex items-center justify-between">
    <div>
      <h3 className="text-sm font-bold text-gray-900">{label}</h3>
      <p className="text-xs text-gray-500">{sublabel}</p>
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-emerald-400' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);

export default Preferences;