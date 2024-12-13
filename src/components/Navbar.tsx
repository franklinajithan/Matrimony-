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
        debugger;
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
      await signOut(auth);
      setIsUserLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="bg-purple-700 text-white py-4 px-6 flex justify-between items-center shadow-md">
      {/* Logo Section */}
      <div className="text-3xl font-bold text-white ">
        <Link to="/" className="text-white ">Matrimony</Link>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2 w-1/3">
        <FaSearch className="text-gray-500" />
        <input type="text" placeholder="Search for profiles..." className="bg-transparent outline-none px-2 flex-grow text-sm text-gray-700" />
      </div>

      {/* Action Icons */}
      <div className="flex items-center space-x-4">
        {/* Message Icon */}
        <div className="relative">
          <Link to="/messages">
            <FaEnvelope className="text-white hover:text-gray-300" size={20} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
          </Link>
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <Link to="/notifications">
            <FaBell className="text-white hover:text-gray-300" size={20} />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
          </Link>
        </div>

        {/* Payment Icon */}
        <Link to="/payments">
          <FaCreditCard className="text-white hover:text-gray-300" size={20} />
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          {/* Trigger Button */}
          <div className="flex items-center space-x-2" onClick={() => setIsModalOpen(!isModalOpen)}>
            {user?.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || "User"} className="w-8 h-8 rounded-full border-2 border-white" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 font-bold">{user?.displayName?.charAt(0) || "U"}</span>
              </div>
            )}
            <span className="text-lg text-white">{user?.displayName || "Account"}</span>
          </div>

          {/* Modal Content */}
          {isModalOpen && (
            <div className="absolute right-0 top-full mt-2 bg-white text-gray-700 shadow-lg rounded-md w-48 z-50">
              <div className="px-3 py-2">
                <h6 className="font-bold">{user?.displayName || "User"}</h6>
                <p className="text-sm">{user?.email}</p>
              </div>
              <div className="border-t">
                <Link to="/profile" className="block px-3 py-2 hover:bg-gray-100">
                  My Profile
                </Link>
                <Link to="/settings" className="block px-3 py-2 hover:bg-gray-100">
                  Settings
                </Link>
              </div>
              <div className="border-t">
                <button onClick={handleLogout} className="w-full text-left px-3 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        {/* <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button> */}
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
