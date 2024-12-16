import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell, FaUser, FaEnvelope, FaSearch, FaCreditCard, FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../services/firebase"; // Import Firebase config
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null); // Store user details
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Track Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsUserLoggedIn(true);
        setUser(currentUser);
      } else {
        setIsUserLoggedIn(false);
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase
      // await signOut(auth);
      localStorage.clear();

      navigate("/login");

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 via-purple-500 to-violet-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo Section */}
      <div className="text-3xl font-bold text-white ">
        {isUserLoggedIn && (
          <Link to="/dashboard" className="text-white ">
            Matrimony
          </Link>
        )}
        {!isUserLoggedIn && (
          <Link to="/dashboard" className="text-white ">
            Matrimony
          </Link>
        )}
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-1/3">
        <FaSearch className="text-gray-500" />
        <input type="text" placeholder="Search for profiles..." className="bg-transparent outline-none px-2 flex-grow text-sm text-gray-700" />
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-6 ">
        {/* Payment Options */}
        <Link to="/payments" className="flex flex-col items-center text-white hover:text-gray-200 transition">
          <span className="text-lg font-semibold">Price</span>
        </Link>

        <Link to="/userList" className="flex flex-col items-center text-white hover:text-gray-200 transition">
          <span className="text-lg font-semibold">Find Your Match</span>
        </Link>

        {/* Messages Icon */}
        <div className="relative">
          <Link to="/messages" className="flex items-center">
            <FaEnvelope className="text-white hover:text-gray-300 transition" size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">5</span>
          </Link>
        </div>

        {/* Notifications Icon */}
        <div className="relative">
          <Link to="/notifications" className="flex items-center">
            <FaBell className="text-white hover:text-gray-300 transition" size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </Link>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setIsModalOpen(!isModalOpen)}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || "User"} className="w-10 h-10 rounded-full border-2 border-white" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-bold">{user?.displayName?.charAt(0) || "U"}</span>
              </div>
            )}
            <span className="text-white text-lg font-medium">{user?.displayName || "Account"}</span>
          </div>

          {isModalOpen && (
            <div className="absolute right-0 mt-2 bg-white text-gray-700 shadow-lg rounded-lg w-48 z-50 overflow-hidden">
              <div className="px-4 py-2 bg-gray-100">
                <h6 className="font-bold">{user?.displayName || "User"}</h6>
                <p className="text-sm">{user?.email}</p>
              </div>
              <div className="border-t">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200 transition">
                  My Profile
                </Link>
                <Link to="/settings" className="block px-4 py-2 hover:bg-gray-200 transition">
                  Settings
                </Link>
              </div>
              <div className="border-t">
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-200 transition">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* {isMenuOpen && (
        <ul className="bg-white text-gray-700 flex flex-col items-center py-4 space-y-4">
          <li>
            <Link to="/" className="block hover:text-purple-700">
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className="block hover:text-purple-700">
              Search
            </Link>
          </li>
          <li>
            <Link to="/matches" className="block hover:text-purple-700">
              Matches
            </Link>
          </li>
          <li>
            <Link to="/messages" className="block hover:text-purple-700">
              Messages
            </Link>
          </li>
          <li>
            <Link to="/notifications" className="block hover:text-purple-700">
              Notifications
            </Link>
          </li>
          <li>
            <Link to="/payments" className="block hover:text-purple-700">
              Payments
            </Link>
          </li>
          <li>
            <Link to="/profile" className="block hover:text-purple-700">
              My Profile
            </Link>
          </li>
          <li>
            <button onClick={handleLogout} className="block hover:text-purple-700">
              Logout
            </button>
          </li>
        </ul>
      )} */}
    </header>
  );
};

export default Navbar;
