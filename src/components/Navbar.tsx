import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-2xl font-bold text-gray-800">
          <Link to="/">Matrimony</Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-gray-600">
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
            <Link to="/login" className="hover:text-gray-800">
              Login
            </Link>
          </li>
          <li>
            <Link to="/signup" className="hover:text-gray-800">
              Signup
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
