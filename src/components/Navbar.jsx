import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-scroll';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage for theme preference
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') return false;
    if (storedTheme === 'dark') return true;
    // Default to dark
    return true;
  });

  const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Certifications', to: 'certifications' },
    { name: 'Education', to: 'education' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  // Handle scroll effect - navbar stays transparent until next section appears
  useEffect(() => {
    const handleScroll = () => {
      // Get viewport height and check if we've scrolled past hero section
      const viewportHeight = window.innerHeight;
      const scrollThreshold = viewportHeight - 100; // Trigger when next section is 100px visible
      setScrolled(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };
  // On mount, apply theme from localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isOpen) setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.15 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 md:bg-white/90 md:dark:bg-gray-900/90 md:backdrop-blur-md shadow-lg'
          : 'bg-transparent backdrop-blur-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            className="flex-shrink-0"
          >
            <Link
              to="hero"
              spy={true}
              smooth={true}
              duration={1}
              className="cursor-pointer"
            >
              <span 
                className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300"
                style={{
                  filter: !scrolled 
                    ? (isDark 
                      ? 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.7))'
                      : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 4px rgba(0, 0, 0, 0.4)) drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.3))')
                    : 'none',
                  WebkitTextStroke: !scrolled && !isDark ? '1px rgba(0, 0, 0, 0.3)' : '0',
                }}
              >
                Portfolio
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.03 * index }}
                >
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    duration={1}
                    offset={-80}
                    onSetActive={() => setActiveSection(item.to)}
                    className={`px-3 py-2 rounded-md text-sm font-medium cursor-pointer transition-all duration-300 ${
                      activeSection === item.to
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                        : scrolled
                        ? 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                        : 'text-white dark:text-white hover:text-indigo-300 dark:hover:text-indigo-400'
                    }`}
                    style={{
                      textShadow: !scrolled 
                        ? (isDark 
                          ? '0 0 10px rgba(0, 0, 0, 0.9), 0 0 20px rgba(0, 0, 0, 0.7)'
                          : '0.5px 0.5px 1.5px rgba(0, 0, 0, 0.5), 0 0 3px rgba(0, 0, 0, 0.4), 1px 1px 4px rgba(0, 0, 0, 0.3)')
                        : 'none',
                      fontWeight: !scrolled ? '700' : '500',
                      WebkitTextStroke: !scrolled && !isDark ? '0.5px rgba(0, 0, 0, 0.3)' : '0',
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dark Mode Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                  : 'bg-white/30 dark:bg-black/20 backdrop-blur-sm text-white dark:text-white hover:bg-white/40 dark:hover:bg-black/30'
              }`}
              style={{
                filter: !scrolled 
                  ? (isDark 
                    ? 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.7))'
                    : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 4px rgba(0, 0, 0, 0.4))')
                  : 'none'
              }}
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaMoon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <FaSun className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                scrolled
                  ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700'
                  : 'bg-white/30 dark:bg-black/20 backdrop-blur-sm text-white dark:text-white hover:bg-white/40 dark:hover:bg-black/30'
              }`}
              style={{
                filter: !scrolled 
                  ? (isDark 
                    ? 'drop-shadow(0 0 10px rgba(0, 0, 0, 0.9)) drop-shadow(0 0 20px rgba(0, 0, 0, 0.7))'
                    : 'drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.5)) drop-shadow(0 0 4px rgba(0, 0, 0, 0.4))')
                  : 'none'
              }}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <HiX className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    <HiMenu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.15 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12, delay: 0.02 * index }}
                >
                  <Link
                    to={item.to}
                    spy={true}
                    smooth={true}
                    duration={1}
                    offset={-80}
                    onClick={() => setIsOpen(false)}
                    onSetActive={() => setActiveSection(item.to)}
                    className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer transition-all duration-300 ${
                      activeSection === item.to
                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
