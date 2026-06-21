import React, { useState, useEffect } from 'react';
import { getBookings, confirmBooking, rejectBooking, getBlockedDates, toggleBlockedDate } from '../utils/storage';
import './DriverDashboard.css';

const DriverDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [blockedDates, setBlockedDates] = useState([]);
  const [filter, setFilter] = useState('all'); // all, pending, confirmed
  const [activeTab, setActiveTab] = useState('bookings'); // bookings, availability

  useEffect(() => {
    setBookings(getBookings());
    setBlockedDates(getBlockedDates());
  }, []);

  const refreshData = () => {
    setBookings(getBookings());
    setBlockedDates(getBlockedDates());
  };

  const handleApprove = (id) => {
    confirmBooking(id);
    refreshData();
  };

  const handleReject = (id) => {
    rejectBooking(id);
    refreshData();
  };

  const handleToggleBlock = (dateStr) => {
    toggleBlockedDate(dateStr);
    refreshData();
  };

  // Generate next 9 days for availability management
  const baseDate = new Date('2026-06-21'); // Base date matching CalendarTracker
  const nextDays = Array.from({ length: 9 }).map((_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const formattedDate = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    return { dateStr, formattedDate };
  });

  const filteredBookings = bookings.filter(b => {
    if (filter === 'all') return b.status !== 'rejected'; // hide rejected by default
    return b.status === filter;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first

  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;

  const formatPrice = (p) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
  };

  return (
    <div className="dashboard-container">
      
      {/* Header bar */}
      <header className="dashboard-header glass-panel">
        <div className="db-brand">
          <span className="logo-emoji">🌴🚗</span>
          <div>
            <h2>FM Prabowo</h2>
            <p>Bali Driver Hub</p>
          </div>
        </div>
        
        <div className="db-quick-stats">
          <div className="stat-pill pending">
            <span>Pending:</span> <strong>{pendingCount}</strong>
          </div>
          <div className="stat-pill confirmed">
            <span>Confirmed:</span> <strong>{confirmedCount}</strong>
          </div>
        </div>
      </header>

      {/* Main navigation tabs */}
      <div className="db-tabs">
        <button 
          className={`db-tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setActiveTab('bookings')}
        >
          📅 Bookings List
        </button>
        <button 
          className={`db-tab-btn ${activeTab === 'availability' ? 'active' : ''}`}
          onClick={() => setActiveTab('availability')}
        >
          🔒 Block Dates
        </button>
      </div>

      {/* Tab Content: Bookings List */}
      {activeTab === 'bookings' && (
        <div className="tab-content animate-fade-up">
          
          {/* Filters */}
          <div className="db-filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Bookings
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending {pendingCount > 0 && <span className="badge-count">{pendingCount}</span>}
            </button>
            <button 
              className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
              onClick={() => setFilter('confirmed')}
            >
              Confirmed
            </button>
          </div>

          {/* Bookings Card List */}
          <div className="bookings-list">
            {filteredBookings.length === 0 ? (
              <div className="empty-state glass-panel text-center">
                <span>📭</span>
                <h3>No Bookings Found</h3>
                <p>No bookings match the current filter.</p>
              </div>
            ) : (
              filteredBookings.map(b => (
                <div key={b.id} className={`booking-card glass-panel status-${b.status}`}>
                  <div className="card-header">
                    <div>
                      <h3>{b.name}</h3>
                      <a href={`https://wa.me/${b.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="client-wa">
                        {b.whatsapp} 💬
                      </a>
                    </div>
                    <span className={`status-badge ${b.status}`}>{b.status}</span>
                  </div>

                  <div className="card-divider"></div>

                  <div className="card-info-grid">
                    <div className="info-item">
                      <span>Service:</span>
                      <strong>{b.serviceName}</strong>
                    </div>
                    <div className="info-item">
                      <span>Date & Time:</span>
                      <strong className="text-orange">{b.date} at {b.time} WITA</strong>
                    </div>
                    <div className="info-item">
                      <span>Pickup:</span>
                      <strong>{b.pickupLoc}</strong>
                    </div>
                    {b.dropoffLoc && (
                      <div className="info-item">
                        <span>Dropoff:</span>
                        <strong>{b.dropoffLoc}</strong>
                      </div>
                    )}
                    {b.notes && (
                      <div className="info-item full-width">
                        <span>Notes:</span>
                        <p className="card-notes">"{b.notes}"</p>
                      </div>
                    )}
                  </div>

                  <div className="card-divider"></div>

                  <div className="card-footer">
                    <div className="price-box">
                      <span>Price Estimate:</span>
                      <strong>{formatPrice(b.totalPrice)}</strong>
                    </div>
                    
                    {b.status === 'pending' && (
                      <div className="card-actions">
                        <button 
                          onClick={() => handleApprove(b.id)} 
                          className="btn-action approve"
                          title="Confirm booking"
                        >
                          Approve 👍
                        </button>
                        <button 
                          onClick={() => handleReject(b.id)} 
                          className="btn-action decline"
                          title="Decline request"
                        >
                          Decline ❌
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      )}

      {/* Tab Content: Availability / Block Dates */}
      {activeTab === 'availability' && (
        <div className="tab-content animate-fade-up">
          <div className="info-card glass-panel">
            <h3>🔒 Manual Availability Control</h3>
            <p>
              Tap dates to toggle your schedule between **Available** and **Unavailable (Blocked)**. Blocked dates will automatically show as **Booked** on the website, preventing customers from scheduling bookings.
            </p>
          </div>

          <div className="availability-grid">
            {nextDays.map(day => {
              // check if it has a confirmed booking in database
              const isBooked = bookings.some(b => b.date === day.dateStr && b.status === 'confirmed');
              const isBlocked = blockedDates.includes(day.dateStr);
              
              let statusLabel = 'Available 🟢';
              let statusClass = 'available';
              if (isBooked) {
                statusLabel = 'Booked (Client) 🔴';
                statusClass = 'booked';
              } else if (isBlocked) {
                statusLabel = 'Blocked (Manual) 🔴';
                statusClass = 'blocked';
              }

              return (
                <div key={day.dateStr} className={`avail-card glass-panel ${statusClass}`}>
                  <div className="avail-info">
                    <h4>{day.formattedDate}</h4>
                    <span className="avail-status">{statusLabel}</span>
                  </div>
                  
                  <button 
                    onClick={() => !isBooked && handleToggleBlock(day.dateStr)}
                    className={`btn-toggle-block ${isBlocked ? 'blocked' : ''}`}
                    disabled={isBooked}
                  >
                    {isBooked ? 'Occupied' : isBlocked ? 'Unblock Slot 🟢' : 'Block Slot 🔴'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Home link */}
      <div className="db-footer-nav text-center">
        <a href="/" className="link-home">➔ Back to Public Website</a>
      </div>

    </div>
  );
};

export default DriverDashboard;
