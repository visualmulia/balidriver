import React from 'react';
import './DriverProfile.css';
import profileImg from '../assets/bali_driver_profile.png';

const DriverProfile = () => {
  return (
    <section id="home" className="profile-section">
      <div className="container profile-container animate-fade-up">
        
        {/* Left Side: Avatar Card & Badges */}
        <div className="profile-visual">
          <div className="avatar-card glass-panel">
            <div className="avatar-wrapper">
              <img src={profileImg} alt="FM Prabowo - Bali Private Driver" className="avatar-img" />
              <span className="availability-dot">Available Today 🟢</span>
            </div>
            
            <h2 className="profile-name">FM Prabowo</h2>
            <p className="profile-title">Bali Tour Guide & Private Driver</p>
            
            <div className="tripadvisor-rating">
              <span className="stars">⭐⭐⭐⭐⭐</span>
              <span className="review-count">5.0 (480+ Reviews)</span>
            </div>

            <div className="profile-quick-actions">
              <a href="https://wa.me/6282236551616" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-wa">
                💬 WhatsApp Chat
              </a>
              <a href="tel:+6282236551616" className="btn btn-secondary btn-call">
                📞 Call Driver
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Introduction & Trust points */}
        <div className="profile-content">
          <span className="profile-studio-tag">PRIVATE TOUR SERVICE</span>
          <h1 className="profile-headline">
            Your Trustworthy Companion to Explore <span className="highlight-orange">Bali Island</span>
          </h1>
          <p className="profile-bio">
            Om Swastyastu! I am FM Prabowo, a native Balinese private driver and tour guide. For more than 8 years, I have helped families, couples, and solo travelers navigate Bali safely while sharing the rich history, culture, and scenic hidden gems of my home island.
          </p>

          <div className="profile-features-grid">
            <div className="profile-feature">
              <span className="feature-icon">🗣️</span>
              <div>
                <h4>Fluent English</h4>
                <p>Easy communication without language barriers during your day tour.</p>
              </div>
            </div>

            <div className="profile-feature">
              <span className="feature-icon">🛡️</span>
              <div>
                <h4>Safe & Licensed</h4>
                <p>Fully licensed driver with a perfect safety record and child seats available.</p>
              </div>
            </div>

            <div className="profile-feature">
              <span className="feature-icon">🗺️</span>
              <div>
                <h4>Custom Itineraries</h4>
                <p>Freedom to plan your own route or choose my pre-vetted scenic tours.</p>
              </div>
            </div>

            <div className="profile-feature">
              <span className="feature-icon">🥤</span>
              <div>
                <h4>Complimentary Amenities</h4>
                <p>Free cold mineral water, clean towels, and onboard Wi-Fi hotspot.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DriverProfile;
