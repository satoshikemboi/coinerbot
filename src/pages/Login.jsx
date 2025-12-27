
import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to VentiCoin</h1>
        <p className="text-gray-500 mt-1">Your trusted platform for cryptocurrency trading</p>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-112.5 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100">
          <div className="flex-1 py-4 text-center text-sm font-semibold bg-green-500 text-white">
            Login
          </div>
          <Link 
            to="/signup" 
            className="flex-1 py-4 text-center text-sm font-semibold text-green-600 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900">Login to your account</h2>
          <p className="text-gray-400 text-sm mb-6 mt-1">Enter your email and password to access your account</p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input 
                  type="email" 
                  className="w-full pl-10 pr-4 py-3 bg-blue-50 border-none rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="jaymars0001@gmail.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input 
                  type="password" 
                  className="w-full pl-10 pr-4 py-3 bg-blue-50 border-none rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                  placeholder="••••••••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all shadow-md mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;