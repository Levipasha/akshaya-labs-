import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Footer } from './Footer';
import WhatsAppWidget from './WhatsAppWidget';
import './Layout.css';

import logo from '../logo.png';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 150) { 
          // if scrolling down and scrolled more than 150px
          setIsVisible(false);
        } else {
          // if scrolling up
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="layout">
      {/* Navigation */}
      <nav className="navbar-wrapper">
        <motion.div 
          className="navbar-glass"
          initial={{ y: 0, opacity: 1 }}
          animate={{ 
            y: isVisible ? 0 : -100,
            opacity: isVisible ? 1 : 0
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="nav-logo">
            <Link to="/" className="logo-container">
              <motion.img 
                src={logo}
                alt="Akshay Labs"
                whileHover={{ scale: 1.1 }}
                className="logo-icon"
              />
              <span className="logo-text-new">AKSHAYA LAB<br/>TECHNOLOGIES</span>
            </Link>
          </div>

          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <motion.div
                key={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to={link.path} 
                  className={`nav-item-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>


          <button className="mobile-toggle" onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </motion.div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="mobile-menu-container">
                <div className="mobile-menu-header">
                  <div className="logo-container">
                    <img src={logo} alt="Akshay Labs" className="logo-icon" />
                    <span className="logo-text-new">AKSHAYA LAB<br/>TECHNOLOGIES</span>
                  </div>
                  <button className="mobile-close" onClick={toggleMenu}>
                    <X size={24} />
                  </button>
                </div>
                <div className="mobile-links">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link 
                        to={link.path} 
                        className="mobile-link" 
                        onClick={toggleMenu}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer */}
      <Footer />
      <WhatsAppWidget />
    </div>
  );
};

export default Layout;
