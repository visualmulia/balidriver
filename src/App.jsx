import React from 'react';
import Navbar from './components/Navbar';
import DriverProfile from './components/DriverProfile';
import Fleet from './components/Fleet';
import CalendarTracker from './components/CalendarTracker';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Navbar />
      <DriverProfile />
      <Fleet />
      <CalendarTracker />
      <BookingForm />
      <Footer />
    </>
  );
}

export default App;
