import React, { useState, useEffect } from 'react';
import './BookingForm.css';
import { fleets } from './Fleet';

const services = [
  { id: 'full-day', name: 'Full Day Tour Charter (10 hrs)', rate: 1 },
  { id: 'half-day', name: 'Half Day Charter (5 hrs)', rate: 0.7 },
  { id: 'airport-pickup', name: 'Airport Pickup Transfer', rate: 0.5 },
  { id: 'airport-drop', name: 'Airport Dropoff Transfer', rate: 0.45 }
];

const BookingForm = () => {
  const [booking, setBooking] = useState({
    serviceId: 'full-day',
    carId: 'standard-mpv',
    date: '',
    time: '',
    duration: 1, // days
    pickupLoc: '',
    dropoffLoc: '',
    name: '',
    whatsapp: '',
    notes: ''
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Recalculate price
  useEffect(() => {
    const selectedCar = fleets.find(c => c.id === booking.carId);
    const selectedService = services.find(s => s.id === booking.serviceId);
    if (selectedCar && selectedService) {
      // Rates formula: Car Day price * Service multiplier * duration days
      const multiplier = selectedService.rate;
      let calculatedPrice = selectedCar.price * multiplier;
      
      // If airport transfer, duration doesn't multiply daily
      if (booking.serviceId === 'full-day' || booking.serviceId === 'half-day') {
        calculatedPrice = calculatedPrice * booking.duration;
      }
      setTotalPrice(calculatedPrice);
    }
  }, [booking.carId, booking.serviceId, booking.duration]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!booking.name || !booking.whatsapp || !booking.date || !booking.time || !booking.pickupLoc) {
      alert('Please fill in all required fields.');
      return;
    }

    const car = fleets.find(c => c.id === booking.carId);
    const service = services.find(s => s.id === booking.serviceId);
    const formatPrice = (p) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(p);

    // Construct Google Calendar template URL for driver's quick add
    // Format date: YYYYMMDD
    const cleanDate = booking.date.replace(/-/g, '');
    const cleanTime = booking.time.replace(/:/g, '');
    // e.g. Event Title: Booked: [Name] - [Service]
    const eventTitle = `Booked: ${booking.name} (${service ? service.name : ''})`;
    const eventStart = `${cleanDate}T${cleanTime}00`;
    // End time is roughly start time + 10 hours for full day, 5 hours for half, 2 hours for transfer
    const durationHours = booking.serviceId === 'full-day' ? 10 : booking.serviceId === 'half-day' ? 5 : 2;
    const endHour = parseInt(booking.time.split(':')[0]) + durationHours;
    const formattedEndHour = endHour < 10 ? `0${endHour}` : endHour > 23 ? '23' : `${endHour}`;
    const eventEnd = `${cleanDate}T${formattedEndHour}${booking.time.split(':')[1] || '00'}00`;
    
    const eventDetails = `Client Name: ${booking.name}
WhatsApp: ${booking.whatsapp}
Car: ${car ? car.name : ''}
Hotel Pickup: ${booking.pickupLoc}
Notes: ${booking.notes || 'None'}
Total Price: ${formatPrice(totalPrice)}`;

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${eventStart}/${eventEnd}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(booking.pickupLoc)}`;

    // Format WhatsApp message
    const msg = `Hello FM Prabowo Driver 🌴🚗
I would like to book a travel charter service:

*Booking details:*
• Service: ${service ? service.name : ''}
• Vehicle: ${car ? car.name : ''} (${car ? car.models : ''})
• Date & Time: ${booking.date} at ${booking.time} WITA
${(booking.serviceId === 'full-day' || booking.serviceId === 'half-day') ? `• Duration: ${booking.duration} Day(s)` : ''}
• Pickup Location: ${booking.pickupLoc}
${booking.dropoffLoc ? `• Destination/Dropoff: ${booking.dropoffLoc}` : ''}

*Client info:*
• Name: ${booking.name}
• Contact: ${booking.whatsapp}
${booking.notes ? `• Trip Itinerary / Notes: ${booking.notes}` : ''}

*Total Estimated Price:* ${formatPrice(totalPrice)}

--------------------------------------
📲 *Driver Calendar Quick Add:*
${calendarUrl}

Please confirm my charter booking. Thank you!`;

    const driverWA = '6282236551616'; // Driver WhatsApp
    const url = `https://wa.me/${driverWA}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="booking" className="section booking-section">
      <div className="container">
        
        <div className="booking-grid">
          
          {/* Left Column: Form Card */}
          <div className="booking-form-container glass-panel animate-fade-up">
            <h3 className="booking-title">Charter Booking Planner</h3>
            <p className="booking-subtitle">Fill in the travel details and get instant confirmation via WhatsApp.</p>
            
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="serviceId">Travel Service</label>
                  <select 
                    id="serviceId" 
                    name="serviceId" 
                    value={booking.serviceId}
                    onChange={handleInputChange}
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="carId">Vehicle Type</label>
                  <input 
                    type="text" 
                    id="carId" 
                    value="Toyota Avanza (Standard MPV)" 
                    readOnly 
                    className="readonly-input"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Charter Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    name="date"
                    value={booking.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Pickup Time</label>
                  <input 
                    type="time" 
                    id="time" 
                    name="time"
                    value={booking.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pickupLoc">Pickup Location (Hotel/Villa)</label>
                  <input 
                    type="text" 
                    id="pickupLoc" 
                    name="pickupLoc"
                    placeholder="e.g. W Bali Seminyak / Airport Terminal"
                    value={booking.pickupLoc}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dropoffLoc">Dropoff / Tour Destination</label>
                  <input 
                    type="text" 
                    id="dropoffLoc" 
                    name="dropoffLoc"
                    placeholder="e.g. Ubud Area / Uluwatu Temple / Same Hotel"
                    value={booking.dropoffLoc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                {(booking.serviceId === 'full-day' || booking.serviceId === 'half-day') && (
                  <div className="form-group">
                    <label htmlFor="duration">Duration (Days)</label>
                    <select 
                      id="duration" 
                      name="duration" 
                      value={booking.duration}
                      onChange={handleInputChange}
                    >
                      <option value={1}>1 Day</option>
                      <option value={2}>2 Days</option>
                      <option value={3}>3 Days</option>
                      <option value={4}>4 Days</option>
                      <option value={5}>5 Days</option>
                    </select>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    placeholder="e.g. Jane Smith"
                    value={booking.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {!(booking.serviceId === 'full-day' || booking.serviceId === 'half-day') && (
                  <div className="form-group">
                    <label htmlFor="whatsapp">WhatsApp Number</label>
                    <input 
                      type="tel" 
                      id="whatsapp" 
                      name="whatsapp"
                      placeholder="e.g. +61 400-000-000"
                      value={booking.whatsapp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
              </div>

              {(booking.serviceId === 'full-day' || booking.serviceId === 'half-day') && (
                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp Number</label>
                  <input 
                    type="tel" 
                    id="whatsapp" 
                    name="whatsapp"
                    placeholder="e.g. +61 400-000-000"
                    value={booking.whatsapp}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="notes">Trip Itinerary Notes / Special Requests (Optional)</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  rows="3"
                  placeholder="e.g. Request baby seat, Ubud Monkey Forest and Tegalalang Rice Terrace tour..."
                  value={booking.notes}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-submit-charter">
                Send Booking Request via WhatsApp 💬
              </button>
            </form>
          </div>

          {/* Right Column: Quote Summary Card */}
          <div className="booking-summary-card glass-panel">
            <h4 className="summary-title">Trip Estimate</h4>
            <div className="divider"></div>
            
            <div className="summary-items">
              <div className="summary-item">
                <span>Service:</span>
                <strong>{services.find(s => s.id === booking.serviceId)?.name}</strong>
              </div>
              <div className="summary-item">
                <span>Vehicle:</span>
                <strong>{fleets.find(c => c.id === booking.carId)?.name}</strong>
              </div>
              <div className="summary-item">
                <span>Pickup Hotel:</span>
                <strong>{booking.pickupLoc || 'Pending input'}</strong>
              </div>
              {(booking.serviceId === 'full-day' || booking.serviceId === 'half-day') && (
                <div className="summary-item">
                  <span>Duration:</span>
                  <strong>{booking.duration} Day(s)</strong>
                </div>
              )}
            </div>

            <div className="divider"></div>

            <div className="summary-total">
              <span className="total-label">Total Estimated Fee:</span>
              <span className="total-price">
                {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice)}
              </span>
            </div>

            <p className="summary-guarantee">
              💡 <strong>No Prepayment Needed.</strong> Pay the driver at the end of the day or trip.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BookingForm;
