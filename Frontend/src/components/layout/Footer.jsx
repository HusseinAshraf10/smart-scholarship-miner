import React from "react";
import { Link } from 'react-router-dom'
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer className="mt-16 border-t border-blue-100 bg-[#F5F9FF]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 md:flex-row">
        <Link to="/" className="flex items-center gap-3" >
        <div>
          <img className="h-10"
          src={logo} alt="Scholarship AI Assistant" />
          <h2 className="text-lg font-bold text-blue-600">
            Scholarship AI Assistant
            </h2>
          <p className="text-sm text-gray-500">
            Helping students discover scholarship opportunities with AI.
          </p>
        </div>
        {/* Links  */}
        </Link>
        <ul  className="flex items-center gap-10 text-sm">
          <li>
            <Link  className="cursor-pointer text-gray-600 transition-all duration-200 hover:text-blue-600"
            to="/" >
              Home
            </Link>
          </li>
          <li>
            <Link className="cursor-pointer text-gray-600 transition-all duration-200 hover:text-blue-600"
            to="/about" >
              About
            </Link>
          </li>
          <li>
            <Link className="cursor-pointer text-gray-600 transition-all duration-200 hover:text-blue-600"
            to="/features">
              Features
            </Link>
          </li>
          <li>
            <Link to="contact" className="cursor-pointer text-gray-600 transition-all duration-200 hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-100 py-5 text-center text-sm text-gray-500">
        © 2026 Scholarship AI Assistant
      </div>
    </footer>
  );
}

export default Footer;
