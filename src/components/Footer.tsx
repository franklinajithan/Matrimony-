import React from "react";

const Footer = () => {
  return (
   
     
        
        <footer className="bg-gray-800 text-gray-300 py-6">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Matrimony Platform. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className="hover:text-white transition">Facebook</a>
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
          </div>
        </div>
      </footer>
  
  );
};

export default Footer;
