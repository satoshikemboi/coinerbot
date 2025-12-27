import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to VentiCoin</h1>
        <p className="text-gray-500 mt-1">Your trusted platform for cryptocurrency trading</p>
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-100">
          <Link 
            to="/" 
            className="flex-1 py-4 text-center text-sm font-semibold text-green-600 bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            Login
          </Link>
          <div className="flex-1 py-4 text-center text-sm font-semibold bg-green-500 text-white">
            Sign Up
          </div>
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
          <p className="text-gray-400 text-sm mb-6 mt-1">Enter your details to create a new account</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input type="text" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="John Doe" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <input type="email" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="your@email.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
              <div className="flex gap-2">
                <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-700 font-medium">+254</div>
                <input type="text" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="123456789" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                <input type="password" title="password" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Confirm Password</label>
                <input type="password" title="confirm" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" placeholder="••••••••" />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <input type="checkbox" className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" id="terms" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the <span className="text-green-600 font-medium hover:underline cursor-pointer">Terms of Service</span>
              </label>
            </div>

            <button type="submit" className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition-all shadow-md">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;