import React, { useState } from 'react';
import { ChevronDown, Mail, ShieldAlert, Calendar, Globe } from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('Personal Info');

  const tabs = [
    'Personal Info', 
    'Security', 
    'Preferences', 
    'Trading History', 
    'Notifications'
  ];

  return (
    <div className="min-h-screen bg-gray-50/30 p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0f172a]">RemoCoin Profile Settings</h1>
          <p className="text-gray-500">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Card */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm text-center">
              {/* Profile Avatar */}
              <div className="w-24 h-24 bg-[#2dd4bf] rounded-full mx-auto flex items-center justify-center mb-6">
                <span className="text-white text-2xl font-bold">VL</span>
              </div>

              {/* User Info */}
              <h2 className="text-xl font-bold text-gray-900 mb-1">Kevin Hegseth</h2>
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
                <Mail className="w-4 h-4" />
                <span>hegseth@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-amber-500 text-xs font-semibold uppercase tracking-wider mb-8">
                <ShieldAlert className="w-4 h-4" />
                <span>Not verified</span>
              </div>

              {/* Stats Metadata */}
              <div className="space-y-4 border-t border-gray-50 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member since</span>
                  <span className="text-gray-900 font-semibold">1/8/2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Country</span>
                  <span className="text-gray-900 font-semibold">Kenya</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-8 py-3 px-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 hover:bg-gray-50 transition-all">
                Complete Verification
              </button>
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="flex-1">
            {/* Navigation Tabs */}
            <div className="bg-gray-100/50 p-1 rounded-xl inline-flex mb-6 w-full md:w-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Form Card */}
            <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-1">Personal Information</h3>
              <p className="text-gray-500 text-sm mb-10">Update your personal details and contact information</p>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Kevin Hegseth"
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="718379861"
                    className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Country Select */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-900">Country</label>
                  <div className="relative">
                    <select className="w-full px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#2dd4bf] appearance-none bg-white text-gray-700">
                      <option value="">Select country</option>
                      <option value="ke" selected>Kenya</option>
                      <option value="ng">Nigeria</option>
                      <option value="za">South Africa</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-4">
                  <button className="bg-[#2dd4bf] hover:bg-[#26bba8] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default Profile;