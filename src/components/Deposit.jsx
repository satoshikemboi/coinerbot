import React, { useState } from "react";
import DepositCrypto from "./DepositCrypto";
import { FaPhoneAlt, FaWallet, FaCreditCard, FaExclamationCircle } from "react-icons/fa";
import Mpesa from "./Mpesa";
import Card from "./Card";

const Deposit = () => {
  // State to track which tab is active: 'mobile', 'crypto', or 'card'
  const [activeTab, setActiveTab] = useState("mobile");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const handleChange = (e) => {
    setSelectedAsset(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#0a1f44] mb-2">Fund Your Account</h1>
        <p className="text-gray-500">Choose your preferred deposit method below</p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Tabs Navigation */}
        <div className="flex p-6 bg-gray-50 gap-2">
          <button
            onClick={() => setActiveTab("mobile")}
            className={`flex-1 flex items-center justify-center gap-1 py-1 text-gray-800 rounded-lg font-bold transition-all ${
              activeTab === "mobile"
                ? "bg-linear-to-r from-green-500 to-green-400 text-white shadow-md"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaPhoneAlt /> Mobile
          </button>
          
          <button
            onClick={() => setActiveTab("crypto")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
              activeTab === "crypto"
                ? "bg-linear-to-r from-green-500 to-green-400 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <FaWallet /> Crypto
          </button>

          <button
            onClick={() => setActiveTab("card")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-bold transition-all ${
              activeTab === "card"
                ? "bg-linear-to-r from-green-500 to-green-400 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <FaCreditCard /> Card
          </button>
        </div>

        {/* Dynamic Content Area */}
        <div className="p-8 bg-orange-50/30">
          {activeTab === "mobile" && (
            <div className="flex flex-col items-center text-center animate-fadeIn">
              {/* Icon Circle */}
              <div className="w-20 h-20 bg-linear-to-b from-green-500 to-green-400 rounded-full flex items-center justify-center text-white text-3xl mb-6 shadow-lg">
                <FaPhoneAlt />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">M-Pesa Payment</h2>
              <p className="text-gray-500 mb-8">Quick deposits via mobile money</p>

              <div className="w-full max-w-xs">
                <p className="text-left text-sm font-bold text-gray-700 mb-3">Mobile Money Provider</p>
                <div className="bg-white rounded-xl p-6 flex justify-center items-center mb-4 transition-transform hover:scale-105">
                  {/* Placeholder for M-Pesa Logo */}
                  <img 
                    src="./Mpesa.png" 
                    alt="M-Pesa" 
                    className="h-32 object-contain"
                  />
                </div>
                <p className="text-xs text-gray-400 italic">Currently, only M-Pesa is supported</p>
              </div>

              {/* Risk Disclaimer */}
              <div className="max-w-md mx-auto mt-6 px-4">
      <div className="bg-[#fff5f5] border border-[#ffebeb] rounded-2xl p-6 relative overflow-hidden">
        {/* Red accent bar on the left */}
        
        <div className="flex gap-3">
          <div className="text-[#ff4d4d] shrink-0 mt-1">
            <FaExclamationCircle size={20} />
          </div>
          
          <div className="flex flex-col gap-3 p-4 bg-red-50/50 rounded-2xl border border-red-100">
  {/* Header */}
  <div className="flex items-center gap-2">
    {/* Optional: Added an icon to make it more professional on mobile */}
    <div className="w-1.5 h-4 bg-[#8b0000] rounded-full" />
    <h3 className="text-[#8b0000] font-black text-sm md:text-lg uppercase tracking-tight">
      Risk Disclaimer
    </h3>
  </div>
  
  {/* Warning Message */}
  <p className="text-[#a14a4a] text-[11px] md:text-xs leading-relaxed font-semibold text-left">
    Cryptocurrency trading is a high-risk business. Users should 
    trade carefully and only deposit money they can afford to 
    lose in case of losses. Do not use savings or emergency funds 
    for trading. By depositing, you acknowledge that you have 
    read and understood this warning, and agree that no 
    reversals can be issued once funds have been deposited.
  </p>
</div>
        </div>
      </div>
    </div>
              <Mpesa/>
            </div>
          )}

          {activeTab === "crypto" && (
            <div>
              <DepositCrypto selectedAsset={selectedAsset} handleChange={handleChange} />
            </div>
          )}

          {activeTab === "card" && (
            <div className="py-20 text-center text-gray-500 italic">
              <Card />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Deposit;