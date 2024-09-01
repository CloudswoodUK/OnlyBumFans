import React, { useState } from "react";

import { Link } from "react-router-dom";
import logo from "/obf-white.svg";
import {
  Menu,
  PoundSterling,
  X,
  ArrowRight,
  Power,
  MonitorDot,
  CreditCard,
} from "lucide-react";
import { userAuthStore } from "../store/authStore";

const DashboardHeader = () => {
  

  const { user, logout } = userAuthStore();
  const toggleDropdown = () => setIsDropdownOpen((prevState) => !prevState);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <header className="bg-zinc-950 border-b-2 border-red-700 text-white p-2 flex items-center justify-between">
        {/* Logo */}

        <img src={logo} alt="Logo" className="h-20 p-2" />

        {/* Navigation */}
        <div className="flex items-center space-x-4">
          {/* Navigation Links (if needed) */}

          {/* Dropdown */}
          <div className="relative mr-2">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2"
            >
              {isDropdownOpen ? (
                <X className="w-12 h-12 transition-transform duration-500 border-2 p-1 border-white rounded-md" />
              ) : (
                <Menu className="w-12 h-12 transition-transform duration-500 text-white border-2 p-1 border-white rounded-md" />
              )}

              {/*<ChevronDown className="w-5 h-5" />*/}
              <img
                src={user.profilePicture}
                alt="User Avatar"
                className="w-12 h-12 rounded-md border-2 p-1 mr-2 border-white"
              />
              <div className="flex flex-col text-left">
                <div className="text-lg font-medium text-white">
                  {user.name}
                </div>
                <p className="text-white flex text-yellow-300">
                  <PoundSterling className="w-5 h-5 text-yellow-600" />
                  {parseFloat(user.credit).toFixed(2)}
                </p>
              </div>
              {/* Dropdown arrow icon */}
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-48 p-3 bg-red-700 text-white rounded-lg shadow-lg z-50">
                <ul>
                  
                  
                  <li className="flex">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-white hover:text-black text-normal text-lg flex items-center w-full"
                    >
                      <ArrowRight className="w-5 h-5 mr-3" /> Profile
                    </Link>
                  </li>
                  <hr className="w-full border-t-1 border-white" />
                  <li className="flex">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-white hover:text-black text-normal text-lg flex items-center w-full"
                    >
                      <CreditCard className="w-5 h-5 mr-3" /> Transactions
                    </Link>
                  </li>
                  <hr className="w-full border-t-1 border-white" />
                  <li className="flex">
                    <Link
                      to="/settings"
                      className="block px-4 py-2 hover:bg-white hover:text-black text-normal text-lg flex items-center w-full"
                    >
                      <MonitorDot className="w-5 h-5 mr-3" /> History
                    </Link>
                  </li>
                  <hr className="w-full border-t-1 border-white" />
                  <li className="flex">
                    <Link
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-white hover:text-black text-normal text-lg flex items-center w-full"
                    >
                      <Power className="w-5 h-5 mr-3" /> Logout
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="relative flex items-center bg-zinc-800 text-white text-lg py-3 px-4 sm:justify-start justify-center shadow-lg">
        <ul className="flex list-none space-x-5">
          <li className="text-yellow-400 hover:text-white"><Link
                      to="/All">All</Link></li>
          <li className="hover:text-yellow-400"><Link
                      to="/All">Male</Link></li>
          <li className="hover:text-yellow-400"><Link
                      to="/All">Female</Link></li>
          <li className="hover:text-yellow-400"><Link
                      to="/All">Trans</Link></li>
          <li className="hover:text-yellow-400"><Link
                      to="/All">Gay</Link></li>
          <li className="hover:text-yellow-400"><Link
                      to="/All">Lesbian</Link></li>
        </ul>
      </div>
    </>
  );
};

export default DashboardHeader;
