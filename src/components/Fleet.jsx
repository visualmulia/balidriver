import React from 'react';
import './Fleet.css';

export const fleets = [
  {
    id: 'standard-mpv',
    name: "Standard MPV",
    models: "Toyota Avanza / Suzuki Ertiga",
    guests: "1 - 5 Guests",
    luggage: "3 Luggage Bags",
    price: 600000,
    bestFor: "Budget-friendly travel, couples, and small families.",
    emoji: "🚗",
    popular: false
  },
  {
    id: 'premium-mpv',
    name: "Premium MPV",
    models: "Toyota Innova Reborn",
    guests: "1 - 6 Guests",
    luggage: "4 Luggage Bags",
    price: 800000,
    bestFor: "Luxury suspension, quiet cabins, and long mountain rides.",
    emoji: "SUV",
    popular: true
  },
  {
    id: 'minibus',
    name: "Mini Bus Commuter",
    models: "Toyota HiAce Commuter",
    guests: "1 - 12 Guests",
    luggage: "6 Luggage Bags",
    price: 1200000,
    bestFor: "Large families, friend groups, or carrying surf boards.",
    emoji: "🚐",
    popular: false
  }
];

const Fleet = () => {
  const formatPrice = (p) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
  };

  return (
    <section id="fleet" className="section fleet-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="subtitle">Our Fleet & Rates</span>
          <h2 className="title">Select Your Ride</h2>
          <p className="description">
            Transparent pricing with no hidden charges. All rates include petrol, driver, passenger insurance, and toll fees.
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="fleet-grid">
          {fleets.map(car => (
            <div key={car.id} className={`fleet-card glass-panel ${car.popular ? 'popular' : ''}`}>
              {car.popular && <span className="best-badge">Best Choice 🌟</span>}
              
              <div className="fleet-header">
                <div className="fleet-icon-box">
                  {car.id === 'premium-mpv' ? '✨' : car.emoji}
                </div>
                <div>
                  <h3 className="fleet-name">{car.name}</h3>
                  <span className="fleet-models">{car.models}</span>
                </div>
              </div>

              <div className="fleet-specs">
                <div className="spec-item">
                  <span className="spec-icon">👥</span>
                  <span>Seats: {car.guests}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-icon">🧳</span>
                  <span>Storage: {car.luggage}</span>
                </div>
              </div>

              <p className="fleet-desc">{car.bestFor}</p>
              
              <div className="fleet-price-box">
                <span className="price-label">Daily Rate (10 hrs):</span>
                <span className="price-amount">{formatPrice(car.price)}</span>
              </div>

              <a href="#booking" className="btn btn-secondary fleet-cta">
                Select Vehicle
              </a>
            </div>
          ))}
        </div>

        {/* Trust Note */}
        <div className="fleet-inclusion-notice glass-panel">
          <h4>✅ What is Included:</h4>
          <ul className="inclusions-list">
            <li>✔️ Air-conditioned private vehicle</li>
            <li>✔️ Professional English-speaking driver</li>
            <li>✔️ Fuel / Petrol</li>
            <li>✔️ Toll road charges</li>
            <li>✔️ Free Wi-Fi hotspot in car</li>
            <li>✔️ Chilled bottled mineral water</li>
          </ul>
          <div className="divider"></div>
          <p className="exclusion-note">
            ⚠️ <em>Excludes: Attraction tickets, parking fees, meals, and driver tip.</em>
          </p>
        </div>

      </div>
    </section>
  );
};

export default Fleet;
