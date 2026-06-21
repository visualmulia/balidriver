import React, { useState, useEffect } from 'react';
import { getBookingById, confirmBooking, rejectBooking } from '../utils/storage';
import './DriverConfirm.css';

const DriverConfirm = () => {
  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState('loading'); // loading, found, not_found, confirmed, rejected

  // Parse ID from query params (?view=confirm&id=xxx)
  const query = new URLSearchParams(window.location.search);
  const bookingId = query.get('id');

  useEffect(() => {
    if (!bookingId) {
      setStatus('not_found');
      return;
    }
    const data = getBookingById(bookingId);
    if (data) {
      setBooking(data);
      setStatus(data.status === 'pending' ? 'found' : data.status);
    } else {
      setStatus('not_found');
    }
  }, [bookingId]);

  const handleApprove = () => {
    const updated = confirmBooking(bookingId);
    if (updated) {
      setBooking(updated);
      setStatus('confirmed');
    }
  };

  const handleReject = () => {
    const updated = rejectBooking(bookingId);
    if (updated) {
      setBooking(updated);
      setStatus('rejected');
    }
  };

  const formatPrice = (p) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);
  };

  if (status === 'loading') {
    return (
      <div className="confirm-page-container">
        <div className="loading-spinner">Loading booking details...</div>
      </div>
    );
  }

  if (status === 'not_found' || !booking) {
    return (
      <div className="confirm-page-container">
        <div className="confirm-card glass-panel text-center">
          <span className="confirm-emoji">⚠️</span>
          <h2>Booking Not Found</h2>
          <p>This booking link is invalid or has expired.</p>
          <a href="/?view=driver" className="btn btn-primary mt-4">Go to Dashboard</a>
        </div>
      </div>
    );
  }

  return (
    <div className="confirm-page-container">
      <div className="confirm-card glass-panel">
        
        {/* Branding header */}
        <div className="confirm-brand text-center">
          <span>🌴🚗</span>
          <h3>FM Prabowo Bali Driver</h3>
          <span className="badge-pwa">Driver Panel</span>
        </div>

        <div className="divider"></div>

        {/* Status Messages */}
        {status === 'confirmed' && (
          <div className="alert alert-success text-center">
            <h4>✅ Booking Confirmed!</h4>
            <p>The schedule has been updated on the website and added to your Google Calendar.</p>
          </div>
        )}

        {status === 'rejected' && (
          <div className="alert alert-danger text-center">
            <h4>❌ Booking Declined</h4>
            <p>This booking request was declined. The slot remains available.</p>
          </div>
        )}

        {status === 'found' && (
          <div className="alert alert-pending text-center">
            <h4>📩 New Booking Request</h4>
            <p>Please review the details below and approve to lock the schedule.</p>
          </div>
        )}

        {/* Booking Details */}
        <div className="booking-details-box">
          <h4>Trip Summary</h4>
          
          <div className="detail-row">
            <span>Client Name:</span>
            <strong>{booking.name}</strong>
          </div>
          <div className="detail-row">
            <span>WhatsApp:</span>
            <a href={`https://wa.me/${booking.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
              {booking.whatsapp} 💬
            </a>
          </div>
          <div className="detail-row">
            <span>Service:</span>
            <strong>{booking.serviceName}</strong>
          </div>
          <div className="detail-row">
            <span>Date & Time:</span>
            <strong className="text-orange">{booking.date} at {booking.time} WITA</strong>
          </div>
          {booking.duration > 1 && (
            <div className="detail-row">
              <span>Duration:</span>
              <strong>{booking.duration} Day(s)</strong>
            </div>
          )}
          <div className="detail-row">
            <span>Pickup Hotel:</span>
            <strong>{booking.pickupLoc}</strong>
          </div>
          {booking.dropoffLoc && (
            <div className="detail-row">
              <span>Destination:</span>
              <strong>{booking.dropoffLoc}</strong>
            </div>
          )}
          {booking.notes && (
            <div className="detail-row notes-row">
              <span>Notes:</span>
              <p>"{booking.notes}"</p>
            </div>
          )}
          
          <div className="divider"></div>
          
          <div className="detail-row price-row">
            <span>Estimated Fee:</span>
            <strong className="price-amount">{formatPrice(booking.totalPrice)}</strong>
          </div>
        </div>

        {/* Action Buttons */}
        {status === 'found' && (
          <div className="action-buttons-grid">
            <button onClick={handleApprove} className="btn btn-accent btn-approve">
              Approve Booking 👍
            </button>
            <button onClick={handleReject} className="btn btn-secondary btn-decline">
              Decline Request ❌
            </button>
          </div>
        )}

        {/* Navigation Link */}
        <div className="footer-links text-center">
          <a href="/?view=driver" className="link-dashboard">
            Go to Driver Dashboard ➔
          </a>
        </div>

      </div>
    </div>
  );
};

export default DriverConfirm;
