import React, { useState, useEffect } from 'react';
import { Menu, X} from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b shadow-sm bg-white ${
          isScrolled || isOpen ? 'shadow-md' : 'shadow-sm'}`}
        >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <span className="ml-2 text-xl font-bold text-red-700">ResQ-Bridge</span>
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/about" className="px-3 py-2 text-sm text-gray-700 hover:text-red-500 transition-colors">
                About
              </Link>
              <Link to="/features" className="px-3 py-2 text-sm text-gray-700 hover:text-red-500 transition-colors">
                Features
              </Link>
              <Link to="/login" className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors">
                Login
              </Link>

            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/about"
              className="block px-3 py-2 text-base text-gray-700 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/features"
              className="block px-3 py-2 text-base text-gray-700 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 text-base text-gray-700 hover:text-red-500"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/crowdfunding"
              className="block mx-3 mt-3 px-4 py-2 text-base rounded-md bg-red-500 text-white hover:bg-red-600"
              onClick={() => setIsOpen(false)}
            >
              Support Our Mission
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
