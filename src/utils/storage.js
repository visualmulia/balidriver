// Storage Utility for Bali Driver Booking System
// Uses localStorage for reliable local storage and simulation

const BOOKINGS_KEY = 'balidriver_bookings';
const BLOCKED_KEY = 'balidriver_blocked';

// Initial Mock Bookings to make the dashboard look realistic on first load
const initialBookings = [
  {
    id: 'bk-mock-1',
    name: 'John Doe',
    whatsapp: '+61 400-111-222',
    serviceName: 'Full Day Tour Charter (10 hrs)',
    carName: 'Toyota Avanza',
    date: '2026-06-20',
    time: '09:00',
    duration: 1,
    pickupLoc: 'W Bali Seminyak',
    dropoffLoc: 'Ubud Area',
    notes: 'Need baby seat.',
    totalPrice: 600000,
    status: 'confirmed',
    createdAt: new Date('2026-06-19T10:00:00').toISOString()
  },
  {
    id: 'bk-mock-2',
    name: 'Sarah Connor',
    whatsapp: '+1 202-555-0143',
    serviceName: 'Airport Pickup Transfer',
    carName: 'Toyota Avanza',
    date: '2026-06-22',
    time: '14:30',
    duration: 1,
    pickupLoc: 'Ngurah Rai Airport',
    dropoffLoc: 'Kuta Hotel',
    notes: 'Flight SQ-882',
    totalPrice: 300000,
    status: 'confirmed',
    createdAt: new Date('2026-06-19T14:00:00').toISOString()
  }
];

const initialBlocked = ['2026-06-24', '2026-06-30']; // Pre-blocked dates

// Initialize storage if empty
export const initStorage = () => {
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
  }
  if (!localStorage.getItem(BLOCKED_KEY)) {
    localStorage.setItem(BLOCKED_KEY, JSON.stringify(initialBlocked));
  }
};

// Get all bookings
export const getBookings = () => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || [];
  } catch (e) {
    console.error('Error parsing bookings from storage', e);
    return [];
  }
};

// Save a booking
export const saveBooking = (booking) => {
  const bookings = getBookings();
  const newBooking = {
    ...booking,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  return newBooking;
};

// Find booking by ID
export const getBookingById = (id) => {
  const bookings = getBookings();
  return bookings.find(b => b.id === id);
};

// Confirm a booking
export const confirmBooking = (id) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => {
    if (b.id === id) {
      return { ...b, status: 'confirmed' };
    }
    return b;
  });
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  return updatedBookings.find(b => b.id === id);
};

// Reject / Delete a booking
export const rejectBooking = (id) => {
  const bookings = getBookings();
  const updatedBookings = bookings.map(b => {
    if (b.id === id) {
      return { ...b, status: 'rejected' };
    }
    return b;
  });
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  return updatedBookings.find(b => b.id === id);
};

// Get manual blocked dates
export const getBlockedDates = () => {
  initStorage();
  try {
    return JSON.parse(localStorage.getItem(BLOCKED_KEY)) || [];
  } catch (e) {
    console.error('Error parsing blocked dates', e);
    return [];
  }
};

// Toggle date block status (manual block from dashboard)
export const toggleBlockedDate = (dateStr) => {
  const blocked = getBlockedDates();
  let updated;
  if (blocked.includes(dateStr)) {
    updated = blocked.filter(d => d !== dateStr);
  } else {
    updated = [...blocked, dateStr];
  }
  localStorage.setItem(BLOCKED_KEY, JSON.stringify(updated));
  return updated;
};
