import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getServices, getStaff, createAppointment } from '../../lib/api';

const BookingForm = ({ onBookingCreated, onCancel }) => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    serviceId: '',
    staffId: '',
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
    location: ''
  });
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadServices();
    loadStaff();
  }, []);

  const mockServices = [
    { id: 1, name: 'Bridal', price: 200, durationMinutes: 120 },
    { id: 2, name: 'Hair', price: 120, durationMinutes: 60 },
    { id: 3, name: 'Nails', price: 80, durationMinutes: 45 },
    { id: 4, name: 'Body', price: 150, durationMinutes: 90 },
    { id: 5, name: 'Skin', price: 100, durationMinutes: 60 },
    { id: 6, name: 'Bridal Makeup', price: 150, durationMinutes: 90 },
    { id: 7, name: 'Hair Styling', price: 120, durationMinutes: 60 },
    { id: 8, name: 'Makeup Trial', price: 100, durationMinutes: 60 },
    { id: 9, name: 'Full Package', price: 350, durationMinutes: 180 }
  ];

  const mockStaff = [
    { id: 1, name: 'Sarah Johnson' },
    { id: 2, name: 'Emma Thompson' },
    { id: 3, name: 'Sophie Chen' },
    { id: 4, name: 'Jessica Lee' }
  ];

  const loadServices = async () => {
    try {
      const servicesData = await getServices();
      if (Array.isArray(servicesData) && servicesData.length > 0) {
        setServices(servicesData);
      } else {
        setServices(mockServices);
      }
    } catch (error) {
      setServices(mockServices);
      console.error('Error loading services:', error);
    }
  };

  const loadStaff = async () => {
    try {
      const staffData = await getStaff(token);
      if (Array.isArray(staffData) && staffData.length > 0) {
        setStaff(staffData);
      } else {
        setStaff(mockStaff);
      }
    } catch (error) {
      setStaff(mockStaff);
      console.error('Error loading staff:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const appointmentData = {
        customerId: user.id,
        staffId: formData.staffId || null,
        serviceId: formData.serviceId,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        notes: formData.notes,
        location: formData.location || 'Tharu Bridal Studio'
      };

      await createAppointment(appointmentData, token);
      
      // Reset form
      setFormData({
        serviceId: '',
        staffId: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
        location: ''
      });

      if (onBookingCreated) {
        onBookingCreated();
      }
    } catch (error) {
      setError(error.message || 'Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find(s => s.id === parseInt(formData.serviceId));

  return (
  <div className="fixed inset-0 flex items-center justify-center p-4 z-50" style={{ background: 'rgba(252, 231, 243, 0.85)' }}>
      <div
        className="rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
        style={{
          background: '#fff0fa', // light pink
          scrollbarColor: '#ec4899 #fce7f3',
          scrollbarWidth: 'thin'
        }}
      >
        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #ec4899;
            border-radius: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #fce7f3;
            border-radius: 8px;
          }
        `}</style>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Book New Appointment</h2>
            <button
              onClick={onCancel}
              className="text-slate-400 hover:text-slate-600 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Service Selection */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Service *
                </label>
                <select
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                >
                  <option value="">Select a service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - ${service.price} ({service.durationMinutes} min)
                    </option>
                  ))}
                </select>
              </div>

              {/* Staff Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Preferred Staff
                </label>
                <select
                  name="staffId"
                  value={formData.staffId}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                >
                  <option value="">Any available staff</option>
                  {staff.map(member => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Time *
                </label>
                <input
                  type="time"
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Tharu Bridal Studio"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                />
              </div>

              {/* Notes */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Special Requests or Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Any special requests, allergies, or notes..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
                />
              </div>
            </div>

            {/* Service Details */}
            {selectedService && (
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <h3 className="font-semibold text-slate-900 mb-2">Service Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-600">Duration:</span>
                    <span className="ml-2 text-slate-900">{selectedService.durationMinutes} minutes</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-600">Price:</span>
                    <span className="ml-2 text-slate-900">${selectedService.price}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="font-medium text-slate-600">Description:</span>
                    <span className="ml-2 text-slate-900">{selectedService.description}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-[#ec4899] text-white rounded-lg hover:bg-[#db2777] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Booking...' : 'Book Appointment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
