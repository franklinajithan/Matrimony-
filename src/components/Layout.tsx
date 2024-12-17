import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // List of paths where the Navbar should not appear
  const hideNavbarPaths = ["/login", "/signup", "/"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Conditionally render Navbar */}
      {!hideNavbarPaths.includes(location.pathname) && (
        <header className="bg-white shadow-md w-full max-w-full">
          <Navbar />
        </header>
      )}

      {/* Main Content - Centered */}
      <main className="flex-1 items-center justify-center w-full max-w-full overflow-x-hidden">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-200 w-full max-w-full">
  <Footer />
</footer>
    </div>
  );
};

export default Layout;
