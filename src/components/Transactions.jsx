import React, { useState, useEffect } from 'react';

const Transactions = () => {
  const [activeTab, setActiveTab] = useState('Withdrawals');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // Simulate data fetching
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      // Set to an empty array to match your "No withdrawals found" state
      setData([]); 
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [activeTab]);

  const tabs = ['All Transactions', 'Deposits', 'Withdrawals'];

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
        <p className="text-gray-500 mb-8">View your deposit and withdrawal history</p>

        {/* Tab Switcher */}
        <div className="flex bg-gray-100 p-1 rounded-lg mb-6 min-w-150">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white border border-gray-100 rounded-xl shadow-sm min-h-50 flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              {/* Simple Spinner */}
              <div className="w-8 h-8 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-2"></div>
              <p className="text-gray-400 text-sm">Loading transactions...</p>
            </div>
          ) : (
            <div className="py-12">
              {data.length > 0 ? (
                <div className="text-left w-full px-6">
                  {/* Map your transaction data here */}
                  <p>Transaction list goes here.</p>
                </div>
              ) : (
                <p className="text-gray-400 font-medium">No {activeTab.toLowerCase()} found</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;