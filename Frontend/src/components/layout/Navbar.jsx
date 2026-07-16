import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
function Navbar() {
  return (
    <nav className="w-full shadow-sm  border-gray-200 bg-white">
      <div className="mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Scholearship AI logo" className="h-15" />
          <h1 className="text-xl font-bold text-blue-600">Scholarship AI Assistant</h1>
        </Link>
        <div className="flex items-center gap-8">
          <Link  className="text-gray-600 transition-colors duration-200 hover:text-blue-600" 
          to="/">Home</Link>
          <Link  className="text-gray-600 transition-colors duration-200 hover:text-blue-600" 
          to="/features">Features</Link>
          <Link  className="text-gray-600 transition-colors duration-200 hover:text-blue-600" 
          to="/about">About</Link>
          <Link  className="text-gray-600 transition-colors duration-200 hover:text-blue-600" 
          to="/howItWorks">How It Works</Link>
        </div>
        <Link className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md"
          to="/login"> Get Started</Link>{/* for later */}
      </div>
    </nav>
  );
}

export default Navbar;
