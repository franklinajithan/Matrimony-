import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaEnvelope, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Track Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsUserLoggedIn(!!currentUser);
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/login");
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 via-purple-600 to-violet-700 text-white py-4 px-6 shadow-md">
      {/* Top Navigation */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          <Link to="/dashboard">
            <span className="text-white">Matrimony</span>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-2xl focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Search Bar (Hidden on Mobile) */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-1 w-1/3">
          <FaSearch className="text-gray-500" />
          <input type="text" placeholder="Search profiles..." className="bg-transparent outline-none px-2 flex-grow text-sm text-gray-700" />
        </div>

        {/* Action Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/payments" className="hover:text-gray-200 text-white">
            Price
          </Link>
          <Link to="/friends" className="hover:text-gray-200 text-white">
            Friends
          </Link>

          <Link to="/userList" className="hover:text-gray-200 text-white">
            Find Your Match
          </Link>
          <Link to="/chatPage" className="relative hover:text-gray-300 text-white">
            <FaEnvelope size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">5</span>
          </Link>
          <Link to="/notifications" className="relative hover:text-gray-300 text-white">
            <FaBell size={20} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">3</span>
          </Link>
          <div onClick={() => setIsModalOpen(!isModalOpen)} className="flex items-center space-x-2 focus:outline-none text-white">
            <FaUser size={20} />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col items-center bg-purple-900 text-white py-4 space-y-4 mt-2">
          <Link to="/dashboard" className="hover:text-gray-300 text-white">
            Home
          </Link>
          <Link to="/payments" className="hover:text-gray-300 text-white">
            Price
          </Link>
          <Link to="/userList" className="hover:text-gray-300 text-white">
            Find Your Match
          </Link>
          <Link to="/chatPage" className="hover:text-gray-300 text-white">
            Messages
          </Link>
          <Link to="/notifications" className="hover:text-gray-300 text-white">
            Notifications
          </Link>
          <Link to="/profile" className="hover:text-gray-300 text-white">
            My Profile
          </Link>
          <div onClick={handleLogout} className="hover:text-gray-300 text-white font-semibold">
            Logout
          </div>
        </nav>
      )}

      {/* Profile Dropdown */}
      {isModalOpen && (
        <div className="absolute right-0 mt-2 bg-white text-gray-700 shadow-lg rounded-lg w-48 z-50">
          <div className="px-4 py-2 bg-gray-100">
            <h6 className="font-bold">{user?.displayName || "User"}</h6>
            <p className="text-sm">{user?.email}</p>
          </div>
          <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
            My Profile
          </Link>
          <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200">
            Settings
          </Link>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200">
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
