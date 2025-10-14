import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getAppointments } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

export default function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAppointments(token);
        setBookings(data);
      } catch (error) {
        addNotification('Failed to load bookings', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token, addNotification]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl text-slate-600">Loading bookings...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center font-serif text-4xl font-bold text-slate-900">
            My Bookings
          </h1>
          {bookings.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-slate-600">No bookings found</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-lg bg-white p-6 shadow-lg">
                  <h3 className="mb-2 text-xl font-semibold text-slate-900">Booking #{booking.id.slice(0, 8)}</h3>
                  <p className="text-sm text-slate-600">Date: {booking.date}</p>
                  <p className="text-sm text-slate-600">Status: {booking.status || 'pending'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
