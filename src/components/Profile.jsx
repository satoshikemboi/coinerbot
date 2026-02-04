import React, { useState, useEffect } from 'react';
import { Mail, ShieldAlert, Calendar, Globe } from 'lucide-react';
import ProfileCard from './ProfileCard';
import PersonalInformation from './PersonalInformation';
import Security from './Security'
import Preferences from './Preferences';
import History from './History';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Personal Info');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://remocoin.onrender.com/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (data.success) {
          setUserData(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error}</div>;

  const tabs = ['Personal Info', 'Security', 'Preferences', 'Trading History', 'Notifications'];

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-10 font-nunito">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0f172a]">Profile</h1>
          <p className="text-sm md:text-base text-gray-500">Manage your settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Pass userData to ProfileCard */}
          <ProfileCard userData={userData} />

          <main className="flex-1 min-w-0">
            <div className="mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              <div className="bg-gray-100 p-1 rounded-lg flex md:inline-flex min-w-max">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 md:px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      activeTab === tab ? 'bg-emerald-400 text-gray-900 shadow-sm' : 'text-gray-500'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Only show content if tab is active and pass userData */}
            {activeTab === 'Personal Info' && <PersonalInformation userData={userData} />}
            {activeTab === 'Security' && <Security />}
            {activeTab == 'Preferences' && <Preferences />}
            {activeTab === 'Trading History' && <History />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;