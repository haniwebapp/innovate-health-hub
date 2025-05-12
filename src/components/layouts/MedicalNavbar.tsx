
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { MedicalButton } from '../ui/medical-button';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, User, Bell, Settings } from 'lucide-react';

// Navigation links configuration
const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Challenges', path: '/challenges' },
  { name: 'Innovations', path: '/innovations' },
  { name: 'Regulatory', path: '/regulatory' },
  { name: 'Investment', path: '/investment' },
  { name: 'Knowledge', path: '/knowledge' },
  { name: 'About', path: '/about' },
];

export const MedicalNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants = {
    closed: { x: 20, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <motion.header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-md py-2' 
          : 'bg-transparent py-4'
      )}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <motion.img 
            src="/moh-logo.svg" 
            alt="MOH Logo" 
            className="h-10 mr-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
          <motion.div 
            className="text-lg md:text-xl font-bold text-moh-darkGreen"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-moh-green">Health</span>
            <span>Innovate</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={link.path} 
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'text-moh-green bg-moh-green/10'
                    : 'text-gray-700 hover:text-moh-green hover:bg-moh-green/5'
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    className="h-0.5 w-full bg-moh-green mt-0.5 rounded-full"
                    layoutId="activeNavIndicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Auth/User Section */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="flex items-center">
              <motion.button 
                className="p-2 rounded-full hover:bg-moh-green/5 text-moh-darkGreen mr-1"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="h-5 w-5" />
              </motion.button>
              
              <Link to="/dashboard">
                <MedicalButton 
                  variant="outline" 
                  size="sm"
                  icon={<User className="h-4 w-4" />}
                >
                  Dashboard
                </MedicalButton>
              </Link>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to="/auth/login">
                <MedicalButton variant="outline" size="sm">Sign In</MedicalButton>
              </Link>
              <Link to="/auth/register">
                <MedicalButton variant="primary" size="sm">Register</MedicalButton>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Trigger */}
        <motion.button
          className="md:hidden p-2 rounded-md text-gray-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 top-16 bg-white md:hidden z-40 pt-4 px-4 pb-20 overflow-y-auto"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="space-y-1 pb-3 pt-2">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={menuItemVariants}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link 
                    to={link.path} 
                    className={cn(
                      'block px-4 py-3 rounded-md text-base font-medium transition-colors',
                      location.pathname === link.path
                        ? 'text-moh-green bg-moh-green/10'
                        : 'text-gray-700 hover:text-moh-green hover:bg-moh-green/5'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Mobile Auth/User Section */}
            <motion.div
              className="pt-4 pb-3 border-t border-gray-200"
              variants={menuItemVariants}
            >
              {isAuthenticated ? (
                <div className="space-y-3 px-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img 
                        className="h-10 w-10 rounded-full border-2 border-moh-green" 
                        src={user?.avatar_url || '/default-avatar.png'} 
                        alt={user?.first_name || 'User'} 
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user?.first_name} {user?.last_name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user?.organization || 'Healthcare Innovator'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-moh-green hover:bg-moh-green/5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/dashboard/profile" 
                      className="block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-moh-green hover:bg-moh-green/5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Your Profile
                    </Link>
                    <Link 
                      to="/dashboard/settings" 
                      className="block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-moh-green hover:bg-moh-green/5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button 
                      className="w-full text-left px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        // Handle sign out logic
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 px-4">
                  <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <MedicalButton fullWidth variant="outline">
                      Sign In
                    </MedicalButton>
                  </Link>
                  <Link to="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                    <MedicalButton fullWidth variant="primary">
                      Register
                    </MedicalButton>
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
