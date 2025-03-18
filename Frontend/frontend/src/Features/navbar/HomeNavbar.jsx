import React from 'react';

const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 bg-white shadow-sm flex items-center justify-between">
      {/* Logo and Brand */}
      <div className="flex items-center">
        <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-teal-400 rounded mr-3 flex items-center justify-center text-white font-bold">
          <span>TE</span>
        </div>
        <span className="text-xl font-bold">TLE Eliminators</span>
      </div>
      
      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-10">
        <a href="#" className="text-blue-600 font-medium">Home</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Courses</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">CP-31 Sheet</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">FAQs</a>
        <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Our Mentors</a>
      </div>
      
      {/* Profile Icon */}
      <div className="h-10 w-10 bg-purple-700 rounded-full flex items-center justify-center text-white font-medium">
        <span>S</span>
      </div>
      
      {/* Mobile Menu Button - Hidden by default */}
      <button className="md:hidden text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;