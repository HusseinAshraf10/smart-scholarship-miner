import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";

function Footer() {
  return (
    <footer className="mt-12 bg-[#1E3A5F] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-[2fr_1fr_1fr]">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Scholarship AI" className="h-11" />
            <h2 className="text-lg font-bold">Scholarship AI</h2>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-blue-100/80">
            Helping students discover scholarship opportunities with AI-powered
            recommendations.
          </p>
        </div>
        {/* Navigation */}
        <div>
          <h3 className="mb-4 text-base font-semibold">Navigation</h3>
          <ul className="space-y-2 text-sm text-blue-100/80">
            <li>
              <Link to="/"
              className="transition-colors duration-300 hover:text-white">
                Home </Link>
            </li>
            <li>
              <Link to="/features" 
              className="transition-colors duration-300 hover:text-white">
                Features</Link>
            </li>
            <li>
              <Link
              to="/#faq"className="transition-colors duration-300 hover:text-white">
                FAQ</Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors duration-300 hover:text-white">
              Contact</Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-4 text-base font-semibold">Company</h3>
          <ul className="space-y-2 text-sm text-blue-100/80">
            <li>
              <Link to="/about" className="transition-colors duration-300 hover:text-white" >
                About </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors duration-300 hover:text-white" >
                Privacy Policy </Link>
            </li>

            <li>
              <Link to="/terms" className="transition-colors duration-300 hover:text-white" >
                Terms of Service </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm text-blue-100/70">
          <p>© 2026 Scholarship AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
