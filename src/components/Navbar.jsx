import React from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 bg-green-500 rounded-full text-white font-bold flex items-center justify-center">
          +
        </button>
        <span className="text-green-600 font-bold text-lg">VentiCoin</span>
      </div>

      {/* Middle: Links */}
      <div className="flex items-center gap-6">
        <Link
          to="/dashboard"
          className="flex items-center gap-1 text-white bg-green-500 px-3 py-1 rounded font-semibold hover:bg-green-600"
        >
          <span className="material-icons">home</span>
          Dashboard
        </Link>
        <Link to="/markets" className="text-gray-700 hover:text-green-500 font-medium">
          Markets
        </Link>
        <Link to="/spot-trading" className="text-gray-700 hover:text-green-500 font-medium">
          Spot Trading
        </Link>
        <Link to="/futures" className="text-gray-700 hover:text-green-500 font-medium">
          Futures
        </Link>
        <Link to="/bots" className="text-gray-700 hover:text-green-500 font-medium">
          Bots
        </Link>
        <div className="relative group">
          <button className="text-gray-700 font-medium flex items-center gap-1 hover:text-green-500">
            Accounts
            <span className="material-icons font-bold text-sm">⌄</span>
          </button>
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
            <Link to="/account/profile" className="block px-4 py-2 hover:bg-green-50">
              Profile
            </Link>
            <Link to="/account/settings" className="block px-4 py-2 hover:bg-green-50">
              Settings
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Balance & User */}
      <div className="flex items-center gap-4">
        <div className="bg-green-100 text-green-600 font-semibold px-3 py-1 rounded">
          $0.00
        </div>
        <FaUserCircle className="text-4xl text-gray-700 cursor-pointer hover:text-green-500" />
      </div>
    </nav>
  );
}

export default Navbar;
