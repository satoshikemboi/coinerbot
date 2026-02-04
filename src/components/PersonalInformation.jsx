import React from 'react';

// Receive userData as a prop from Profile.jsx
const PersonalInformation = ({ userData }) => {
  
  // If the parent is still loading, userData might be null initially
  if (!userData) {
    return <div className="p-8 text-gray-500 text-center">No user data available.</div>;
  }

  return (
    <div className="bg-white text-gray-800 p-6 md:p-8 max-w-2xl font-nunito rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-gray-900">Personal information</h2>
      </div>

      <div className="space-y-6">
        <InfoRow label="Country of Residence" value={userData.country} />
        <InfoRow label="Legal Name" value={userData.name} />
        <InfoRow label="Email Address" value={userData.email} />
        <InfoRow label="Phone Number" value={userData.phoneNumber} />
        <InfoRow 
          label="Date of Signing Up" 
          value={userData.signupDate ? new Date(userData.signupDate).toLocaleDateString() : 'N/A'} 
        />
      </div>
    </div>
  );
};

// Helper component for clean rows
const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0">
    <span className="text-gray-400 text-sm font-medium">{label}</span>
    <span className="text-sm font-semibold text-gray-900">{value || 'Not provided'}</span>
  </div>
);

export default PersonalInformation;