import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell, FaUser, FaBars, FaTimes } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // Example: Change based on authentication state

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Matrimony</Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-gray-600">
          <li>
            <Link to="/" className="hover:text-gray-800">
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className="hover:text-gray-800">
              Search
            </Link>
          </li>
          <li>
            <Link to="/matches" className="hover:text-gray-800">
              Matches
            </Link>
          </li>
          {isUserLoggedIn ? (
            <>
              <li>
                <Link to="/messages" className="hover:text-gray-800">
                  Messages
                </Link>
              </li>
              <li className="relative group">
                {/* Notifications */}
                <div className="cursor-pointer flex items-center space-x-2">
                  <FaBell className="text-gray-600 hover:text-gray-800" size={18} />
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </div>
              </li>
              <li className="relative group">
                {/* Profile Dropdown */}
                <div className="cursor-pointer flex items-center space-x-2">
                  <FaUser className="text-gray-600 hover:text-gray-800" size={18} />
                  <span>Profile</span>
                </div>
                <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md hidden group-hover:block z-10">
                  <li>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                    >
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                      onClick={() => {
                        setIsUserLoggedIn(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-gray-800">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-800">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden bg-white shadow-md">
          <li className="border-b">
            <Link to="/" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Home
            </Link>
          </li>
          <li className="border-b">
            <Link to="/search" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Search
            </Link>
          </li>
          <li className="border-b">
            <Link to="/matches" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
              Matches
            </Link>
          </li>
          {isUserLoggedIn ? (
            <>
              <li className="border-b">
                <Link
                  to="/messages"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Messages
                </Link>
              </li>
              <li className="border-b">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  My Profile
                </Link>
              </li>
              <li className="border-b">
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  Settings
                </Link>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                  onClick={() => {
                    setIsUserLoggedIn(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="border-b">
                <Link to="/login" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="block px-4 py-2 text-gray-600 hover:bg-gray-100">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
