import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        
        <div className="footer-grid">
          
          {/* Column 1: Branding */}
          <div className="footer-col brand-col">
            <a href="#home" className="footer-logo">
              <span className="logo-icon">🌴🚗</span>
              <div className="logo-text">
                <span className="logo-main">Bali Driver</span>
                <span className="logo-sub">EXPLORER & DAY CHARTER</span>
              </div>
            </a>
            <p className="brand-desc">
              Your safe, friendly, and professional private driver in Bali. Book custom day tours and airport transfers at transparent flat rates.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="footer-col links-col">
            <h3 className="footer-title">Navigation</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#fleet">Cars & Rates</a></li>
              <li><a href="#calendar">Availability</a></li>
              <li><a href="#booking">Book Charter</a></li>
            </ul>
          </div>

          {/* Column 3: Contact details */}
          <div className="footer-col contact-col">
            <h3 className="footer-title">Contact & Support</h3>
            <p className="contact-intro">Feel free to message or call for custom tour itinerary planning:</p>
            
            <div className="footer-contact-items">
              <a href="https://wa.me/6281289653355" target="_blank" rel="noopener noreferrer" className="footer-contact-item">
                <span className="contact-icon-emoji">💬</span>
                <div>
                  <h4>WhatsApp (24/7)</h4>
                  <p>+62 812-8965-3355</p>
                </div>
              </a>

              <a href="tel:+6281289653355" className="footer-contact-item">
                <span className="contact-icon-emoji">📞</span>
                <div>
                  <h4>Hotline Call</h4>
                  <p>+62 812-8965-3355</p>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} Kutut Wayan Bali Driver. All Rights Reserved.</p>
            <p className="creator-credit">
              Designed & Developed by <a href="https://kriya.web.id" target="_blank" rel="noopener noreferrer">Kriya Web Studio</a>
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
