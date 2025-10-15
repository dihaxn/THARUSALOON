import React, { useState } from 'react';
import BookingForm from '../../components/booking/BookingForm';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('');

  const [stats, setStats] = useState({
    upcomingAppointments: 2,
    completedServices: 8,
    totalSpent: 1250,
    loyaltyPoints: 125,
    favoriteServices: 5,
    reviewsWritten: 3
  });

  const [appointments, setAppointments] = useState([
    { id: 1, service: 'Bridal Makeup Trial', date: '2024-03-15', time: '2:00 PM', duration: 90, staff: 'Sarah Johnson', status: 'Confirmed', price: 100, location: 'Tharu Bridal Studio' },
    { id: 2, service: 'Hair Consultation', date: '2024-03-20', time: '10:00 AM', duration: 45, staff: 'Emma Thompson', status: 'Confirmed', price: 50, location: 'Tharu Bridal Studio' },
    { id: 3, service: 'Full Package Trial', date: '2024-04-05', time: '11:00 AM', duration: 180, staff: 'Sophie Chen', status: 'Pending', price: 200, location: 'Tharu Bridal Studio' },
    { id: 4, service: 'Wedding Day Makeup', date: '2024-04-15', time: '8:00 AM', duration: 120, staff: 'Sarah Johnson', status: 'Confirmed', price: 150, location: 'Wedding Venue' }
  ]);

  const [history, setHistory] = useState([
    { id: 1, service: 'Bridal Consultation', date: '2024-02-10', staff: 'Emma Thompson', price: 75, rating: 5, review: 'Amazing consultation! Emma really understood my vision.' },
    { id: 2, service: 'Hair Trial', date: '2024-02-15', staff: 'Sophie Chen', price: 120, rating: 4, review: 'Great service, Sophie was very professional.' },
    { id: 3, service: 'Makeup Trial', date: '2024-02-20', staff: 'Sarah Johnson', price: 100, rating: 5, review: 'Perfect! Exactly what I was looking for.' },
    { id: 4, service: 'Final Consultation', date: '2024-03-01', staff: 'Emma Thompson', price: 50, rating: 5, review: 'Final details sorted perfectly.' }
  ]);

  const [favorites, setFavorites] = useState([
  { id: 1, type: 'service', name: 'Bridal Makeup', description: 'Full bridal makeup application', price: 150, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { id: 2, type: 'service', name: 'Hair Styling', description: 'Complete hair styling and updo', price: 120, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: 3, type: 'look', name: 'Natural Glam', description: 'Soft, natural bridal look', price: 180, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { id: 4, type: 'look', name: 'Classic Elegance', description: 'Timeless bridal elegance', price: 200, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { id: 5, type: 'service', name: 'Full Package', description: 'Complete hair and makeup', price: 350, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🏠' },
    { id: 'appointments', name: 'Appointments', icon: '📅' },
    { id: 'history', name: 'History', icon: '📋' },
    { id: 'favorites', name: 'Favorites', icon: '❤️' },
    { id: 'profile', name: 'Profile', icon: '👤' }
  ];

  const services = [
    { id: 1, name: 'Bridal Makeup', duration: 60, price: 150, description: 'Full bridal makeup application', category: 'Makeup' },
    { id: 2, name: 'Hair Styling', duration: 90, price: 120, description: 'Complete hair styling and updo', category: 'Hair' },
    { id: 3, name: 'Makeup Trial', duration: 90, price: 100, description: 'Trial run for bridal makeup', category: 'Makeup' },
    { id: 4, name: 'Hair Consultation', duration: 30, price: 50, description: 'Hair styling consultation', category: 'Hair' },
    { id: 5, name: 'Full Package', duration: 180, price: 350, description: 'Complete hair and makeup package', category: 'Package' },
    { id: 6, name: 'Touch-ups', duration: 30, price: 75, description: 'Quick touch-ups and fixes', category: 'Makeup' }
  ];

  const staff = [
  { id: 1, name: 'Sarah Johnson', role: 'Senior Makeup Artist', rating: 4.9, specialties: ['Bridal Makeup', 'Natural Looks'], avatar: 'https://images.unsplash.com/photo-1512757776216-dae2681a1480?auto=format&fit=crop&w=60&q=80' },
  { id: 2, name: 'Emma Thompson', role: 'Hair Stylist', rating: 4.8, specialties: ['Updos', 'Hair Color'], avatar: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=60&q=80' },
  { id: 3, name: 'Sophie Chen', role: 'Makeup Artist', rating: 4.9, specialties: ['Glamorous Looks', 'Airbrush'], avatar: 'https://images.unsplash.com/photo-1519014959394-6f2a9b8c9a3b?auto=format&fit=crop&w=60&q=80' },
  { id: 4, name: 'Jessica Lee', role: 'Hair & Makeup', rating: 4.7, specialties: ['Complete Packages'], avatar: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=60&q=80' }
  ];

  const handleBookingCreated = () => {
    setShowBookingModal(false);
    // Optionally refresh appointments here
  };

  const handleBookingCancel = () => {
    setShowBookingModal(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-lg border border-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Upcoming</h3>
              <p className="text-3xl font-bold text-pink-600">{stats.upcomingAppointments}</p>
              <p className="text-sm text-slate-500">Appointments</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 text-xl">📅</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Completed</h3>
              <p className="text-3xl font-bold text-green-600">{stats.completedServices}</p>
              <p className="text-sm text-slate-500">Services</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Total Spent</h3>
              <p className="text-3xl font-bold text-blue-600">${stats.totalSpent}</p>
              <p className="text-sm text-slate-500">Lifetime</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Loyalty Points</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.loyaltyPoints}</p>
              <p className="text-sm text-slate-500">Available</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">⭐</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Favorites</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.favoriteServices}</p>
              <p className="text-sm text-slate-500">Saved items</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">❤️</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Reviews</h3>
              <p className="text-3xl font-bold text-red-600">{stats.reviewsWritten}</p>
              <p className="text-sm text-slate-500">Written</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">✍️</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-4">
            {appointments.filter(apt => apt.status === 'Confirmed').slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900">{appointment.service}</p>
                  <p className="text-sm text-slate-500">{appointment.date} at {appointment.time}</p>
                  <p className="text-sm text-slate-500">with {appointment.staff}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-slate-900">${appointment.price}</span>
                  <div className="mt-1">
                    <button className="text-pink-600 hover:text-pink-800 text-xs">Reschedule</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              className="w-full rounded-lg bg-pink-500 px-4 py-3 text-white hover:bg-pink-600 transition text-left"
              onClick={() => setShowBookingModal(true)}
            >
              <span className="font-medium">Book New Appointment</span>
              <p className="text-sm opacity-90">Schedule your next service</p>
            </button>
            <button className="w-full rounded-lg bg-blue-500 px-4 py-3 text-white hover:bg-blue-600 transition text-left">
              <span className="font-medium">View Gallery</span>
              <p className="text-sm opacity-90">Browse our work</p>
            </button>
            <button className="w-full rounded-lg bg-green-500 px-4 py-3 text-white hover:bg-green-600 transition text-left">
              <span className="font-medium">Contact Stylist</span>
              <p className="text-sm opacity-90">Get in touch with your team</p>
            </button>
            <button className="w-full rounded-lg bg-purple-500 px-4 py-3 text-white hover:bg-purple-600 transition text-left">
              <span className="font-medium">Write Review</span>
              <p className="text-sm opacity-90">Share your experience</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">My Appointments</h2>
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
          onClick={() => setShowBookingModal(true)}
        >
          Book New Appointment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Staff</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{appointment.service}</div>
                      <div className="text-sm text-slate-500">{appointment.duration} min - ${appointment.price}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{appointment.staff}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{appointment.date}</div>
                    <div className="text-sm text-slate-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{appointment.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-pink-600 hover:text-pink-900 mr-3">Reschedule</button>
                    <button className="text-blue-600 hover:text-blue-900 mr-3">Contact</button>
                    <button className="text-red-600 hover:text-red-900">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Service History</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400">
            <option>All Services</option>
            <option>Makeup</option>
            <option>Hair</option>
            <option>Package</option>
          </select>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Export History
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {history.map((service) => (
          <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 mb-2">{service.service}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 mb-3">
                  <div>
                    <span className="font-medium">Date:</span> {service.date}
                  </div>
                  <div>
                    <span className="font-medium">Staff:</span> {service.staff}
                  </div>
                  <div>
                    <span className="font-medium">Price:</span> ${service.price}
                  </div>
                  <div>
                    <span className="font-medium">Rating:</span> 
                    <span className="ml-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className={i < service.rating ? 'text-yellow-400' : 'text-slate-300'}>⭐</span>
                      ))}
                    </span>
                  </div>
                </div>
                {service.review && (
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <p className="text-sm text-slate-600 italic">"{service.review}"</p>
                  </div>
                )}
              </div>
              <div className="ml-6">
                <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">Book Again</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFavorites = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">My Favorites</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400">
            <option>All</option>
            <option>Services</option>
            <option>Looks</option>
          </select>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Browse Gallery
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favorites.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
            <div className="h-48 bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
              <span className="text-4xl">💄</span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-slate-900">{item.name}</h3>
                <span className="text-xs bg-pink-100 text-pink-600 px-2 py-1 rounded-full">
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-pink-600">${item.price}</span>
                <div className="flex gap-2">
                  <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">Book Now</button>
                  <button className="text-slate-600 hover:text-slate-800 text-sm">Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">My Profile</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Personal Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
              <input type="text" defaultValue={user?.name || 'Customer'} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" defaultValue={user?.email || 'customer@example.com'} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Wedding Date</label>
              <input type="date" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Preferred Style</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400">
                <option>Natural</option>
                <option>Glamorous</option>
                <option>Classic</option>
                <option>Boho</option>
                <option>Vintage</option>
              </select>
            </div>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Member Since</span>
              <span className="font-semibold text-slate-900">March 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Services</span>
              <span className="font-semibold text-pink-600">{stats.completedServices}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Loyalty Points</span>
              <span className="font-semibold text-purple-600">{stats.loyaltyPoints}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Spent</span>
              <span className="font-semibold text-blue-600">${stats.totalSpent}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Reviews Written</span>
              <span className="font-semibold text-green-600">{stats.reviewsWritten}</span>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">Preferences</h4>
            <div className="space-y-2 text-sm">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-pink-300 text-pink-600 focus:ring-pink-200" />
                <span className="ml-2 text-slate-600">Email notifications for appointments</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="rounded border-pink-300 text-pink-600 focus:ring-pink-200" />
                <span className="ml-2 text-slate-600">SMS reminders</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-pink-300 text-pink-600 focus:ring-pink-200" />
                <span className="ml-2 text-slate-600">Marketing emails</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'appointments': return renderAppointments();
      case 'history': return renderHistory();
      case 'favorites': return renderFavorites();
      case 'profile': return renderProfile();
      default: return renderOverview();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Your Dashboard</h1>
            <p className="mt-2 text-slate-600">Welcome back, {user?.name || 'Customer'}</p>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <nav className="flex space-x-8 border-b border-slate-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition ${
                    activeTab === tab.id
                      ? 'border-pink-500 text-pink-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {renderContent()}
          {showBookingModal && (
            <BookingForm
              onBookingCreated={handleBookingCreated}
              onCancel={handleBookingCancel}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
