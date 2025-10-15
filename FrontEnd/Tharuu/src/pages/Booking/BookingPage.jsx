import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getBookings, deleteBooking } from '../../lib/api';
import BookingForm from './BookingForm';

const BookingPage = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBooking, setEditingBooking] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getBookings({ token });
      setBookings(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch bookings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings();
    }
  }, [token]);

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id, token);
      fetchBookings();
    } catch (error) {
      setError(error.message || 'Failed to delete booking.');
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingBooking(null);
    fetchBookings();
  };

  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingBooking(null);
    setShowForm(true);
  };

  const isOwnerOrStaff = user?.role === 'OWNER' || user?.role === 'STAFF';

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Bookings</h1>
      {isOwnerOrStaff && (
        <button onClick={handleAddNew}>Add New Booking</button>
      )}
      {showForm && (
        <BookingForm booking={editingBooking} onSave={handleSave} />
      )}
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Reference: {booking.reference}</p>
              <p>Client: {booking.clientName}</p>
              <p>Service: {booking.service}</p>
              <p>Artist: {booking.artist}</p>
              <p>Event Date: {booking.eventDate}</p>
              <p>Status: {booking.status}</p>
              {isOwnerOrStaff && (
                <>
                  <button onClick={() => handleEdit(booking)}>Edit</button>
                  <button onClick={() => handleDelete(booking.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingPage;