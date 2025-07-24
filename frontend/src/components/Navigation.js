import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/portfolio', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/skills', label: 'Skills' },
    { path: '/projects', label: 'Projects' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/contact', label: 'Contact' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1e1a2e] via-[#5c4f6e] to-[#b3A8C9] border-b border-gray-200 animate-slideDown">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-xl font-semibold text-white hover:text-gray-200 transition-all duration-300 hover:scale-105 transform"
            >
              Alex Johnson
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label }, index) => (
              <Link
                key={path}
                to={path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ${
                  isActive(path)
                    ? 'text-white border-b-2 border-white animate-pulse'
                    : 'text-gray-200 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-200 hover:text-white transition-all duration-300 hover:rotate-90 transform"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-400/30 animate-slideDown">
            <div className="px-4 py-4 space-y-2">
              {navItems.map(({ path, label }, index) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-all duration-300 transform hover:translate-x-2 ${
                    isActive(path)
                      ? 'text-white bg-white/20 rounded-md'
                      : 'text-gray-200 hover:text-white hover:bg-white/10 rounded-md'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;