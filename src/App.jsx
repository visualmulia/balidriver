import React from 'react';
import Navbar from './components/Navbar';
import DriverProfile from './components/DriverProfile';
import Fleet from './components/Fleet';
import CalendarTracker from './components/CalendarTracker';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import DriverConfirm from './components/DriverConfirm';
import DriverDashboard from './components/DriverDashboard';

function App() {
  // Simple path routing based on query params (?view=confirm or ?view=driver)
  const query = new URLSearchParams(window.location.search);
  const view = query.get('view');

  if (view === 'confirm') {
    return <DriverConfirm />;
  }

  if (view === 'driver') {
    return <DriverDashboard />;
  }

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
