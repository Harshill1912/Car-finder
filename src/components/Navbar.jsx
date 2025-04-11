import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Search, Car, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav className="bg-indigo-600 dark:bg-gray-900 text-white dark:text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <Car size={28} />
          <span>Dream Cars</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200">
            <span className="flex items-center gap-1">
              <Search size={18} />
              <span className="hidden sm:inline">Search</span>
            </span>
          </Link>

          <Link to="/wishlist" className="hover:text-gray-300 dark:hover:text-gray-400 transition-colors duration-200">
            <span className="flex items-center gap-1">
              <Heart size={18} />
              <span className="hidden sm:inline">Wishlist</span>
            </span>
          </Link>

          <Button
            variant="outline"
            className="hidden md:flex bg-transparent border-white text-white hover:bg-white hover:text-indigo-600 dark:border-gray-300 dark:hover:bg-gray-100 dark:hover:text-gray-900"
          >
            Contact Us
          </Button>

          {/* Toggle Button Inline in Navbar */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 rounded-full bg-white dark:bg-gray-800 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
