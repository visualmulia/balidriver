import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="container navbar-container">
        
        {/* Brand Logo */}
        <a href="#home" className="navbar-logo" onClick={() => setIsMobileMenuOpen(false)}>
          <span className="logo-icon">🌴🚗</span>
          <div className="logo-text">
            <span className="logo-main">Bali Driver</span>
            <span className="logo-sub">EXPLORER & DAY CHARTER</span>
          </div>
        </a>

        {/* Mobile Toggle */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <ul className="navbar-links">
          <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#fleet" onClick={() => setIsMobileMenuOpen(false)}>Cars & Rates</a></li>
          <li><a href="#calendar" onClick={() => setIsMobileMenuOpen(false)}>Availability</a></li>
          <li className="nav-btn-wrapper">
            <a 
              href="#booking" 
              className="btn btn-primary nav-cta-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Charter
            </a>
          </li>
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
