
import React from 'react';
import { Mail, ShieldAlert, ShieldCheck } from 'lucide-react';

const ProfileCard = ({ userData }) => {
  const getInitials = (name) => {
    if (!name) return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm text-center">
        {/* Dynamic Initials Circle */}
        <div className="w-20 h-20 md:w-24 md:h-24 bg-[#2dd4bf] rounded-full mx-auto flex items-center justify-center mb-4 md:mb-6">
          <span className="text-white text-xl md:text-2xl font-bold">
            {getInitials(userData.name)}
          </span>
        </div>

        {/* Dynamic Name and Email */}
        <h2 className="text-xl font-bold text-gray-900 mb-1">{userData.name}</h2>
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mb-2">
          <Mail className="w-4 h-4" />
          <span className="truncate">{userData.email}</span>
        </div>

        {/* Dynamic Verification Status */}
        <div className={`flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider mb-6 md:mb-8 ${
          userData.isVerified ? 'text-emerald-500' : 'text-amber-500'
        }`}>
          {userData.isVerified ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
          <span>{userData.isVerified ? "Verified" : "Not verified"}</span>
        </div>

        <div className="space-y-4 border-t border-gray-50 pt-6 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Member since</span>
            <span className="text-gray-900 font-semibold">
              {new Date(userData.signupDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Country</span>
            <span className="text-gray-900 font-semibold">{userData.country}</span>
          </div>
        </div>

        {!userData.isVerified && (
          <button className="w-full mt-8 py-3 px-4 border border-gray-200 rounded-xl text-sm font-bold text-gray-800 bg-emerald-500 hover:bg-gray-50 transition-all">
            Complete Verification
          </button>
        )}
      </div>
    </aside>
  );
};

export default ProfileCard;