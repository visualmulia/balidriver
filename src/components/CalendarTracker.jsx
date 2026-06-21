import React, { useState, useEffect } from 'react';
import './CalendarTracker.css';
import { getBookings, getBlockedDates } from '../utils/storage';

// Mock schedule base data
const baseBookedDates = {
  '2026-06-20': { status: 'booked', label: 'Ubud Tour (Full Day)' },
  '2026-06-22': { status: 'booked', label: 'Airport Transfer + Kuta' },
};

const CalendarTracker = () => {
  const [dynamicSchedule, setDynamicSchedule] = useState({});

  useEffect(() => {
    const bookings = getBookings();
    const blockedDates = getBlockedDates();
    
    // Combine base schedule with dynamic schedules
    const scheduleMap = { ...baseBookedDates };
    
    // Add manually blocked dates from driver dashboard
    blockedDates.forEach(dateStr => {
      scheduleMap[dateStr] = { status: 'booked', label: 'Unavailable' };
    });
    
    // Add confirmed bookings from client bookings
    bookings.forEach(b => {
      if (b.status === 'confirmed') {
        scheduleMap[b.date] = { 
          status: 'booked', 
          label: `${b.name} (${b.duration > 1 ? `${b.duration} Days` : 'Tour'})` 
        };
      }
    });

    setDynamicSchedule(scheduleMap);
  }, []);

  // Generate list of next 9 days starting from current date (June 21, 2026 as per local system date)
  const baseDate = new Date('2026-06-21');
  const daysToShow = Array.from({ length: 9 }).map((_, i) => {
    const d = new Date(baseDate);
    d.setDate(baseDate.getDate() + i);
    const dateStr = d.toISOString().split('T')[0];
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    
    const schedule = dynamicSchedule[dateStr] || { status: 'available', label: 'Open Schedule' };
    return {
      dateStr,
      dayName,
      dayNum,
      monthName,
      status: schedule.status,
      label: schedule.label
    };
  });

  return (
    <section id="calendar" className="section calendar-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header text-center">
          <span className="subtitle">Driver Schedule Tracker</span>
          <h2 className="title">Availability Status</h2>
          <p className="description">
            Check FM Prabowo's live schedule below. Book open slots instantly to secure your tour dates.
          </p>
        </div>

        {/* Calendar Grid */}
        <div className="calendar-scroll-wrapper">
          <div className="calendar-days-row">
            {daysToShow.map(day => (
              <div 
                key={day.dateStr} 
                className={`calendar-day-card glass-panel ${day.status}`}
              >
                <span className="cal-month">{day.monthName}</span>
                <span className="cal-num">{day.dayNum}</span>
                <span className="cal-name">{day.dayName}</span>
                
                <div className="cal-status-badge">
                  {day.status === 'booked' && '🔴 Booked'}
                  {day.status === 'available' && '🟢 Available'}
                  {day.status === 'half-day' && '🟡 PM Only'}
                </div>
                
                <span className="cal-label">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Integration Feature Info */}
        <div className="calendar-sync-notice glass-panel">
          <div className="sync-icon-box">📲</div>
          <div className="sync-text">
            <h3>Automated Calendar Sync Active</h3>
            <p>
              This tracker connects directly with the driver's phone **Google Calendar**. When FM Prabowo logs a booking in his phone, the website schedule updates instantly. No manual web updates required.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CalendarTracker;
