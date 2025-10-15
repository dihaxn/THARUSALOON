import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const StaffDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('schedule');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [stats, setStats] = useState({
    todayAppointments: 8,
    completedThisWeek: 15,
    upcomingAppointments: 12,
    totalCustomers: 45,
    averageRating: 4.8,
    hoursWorked: 42
  });

  const [appointments, setAppointments] = useState([
    { id: 1, customer: 'Sanduni Jayasinghe', service: 'Traditional Kandyan Consultation', date: '2024-03-15', time: '10:00 AM', duration: 60, status: 'Confirmed', phone: '+94 76 345 6789', notes: 'First time bride, wants traditional Kandyan look' },
    { id: 2, customer: 'Priyanka Silva', service: 'Hindu Bridal Trial', date: '2024-03-15', time: '2:00 PM', duration: 90, status: 'Confirmed', phone: '+94 77 456 7890', notes: 'Outdoor Hindu wedding, needs long-lasting makeup' },
    { id: 3, customer: 'Kavitha Perera', service: 'Traditional Hair Styling', date: '2024-03-15', time: '4:00 PM', duration: 120, status: 'Pending', phone: '+94 71 567 8901', notes: 'Traditional updo with jasmine flowers' },
    { id: 4, customer: 'Nethmi Fernando', service: 'Full Package Trial', date: '2024-03-16', time: '9:00 AM', duration: 180, status: 'Confirmed', phone: '+94 76 678 9012', notes: 'Complete traditional trial run' },
    { id: 5, customer: 'Tharani Wickramasinghe', service: 'Hair Consultation', date: '2024-03-16', time: '1:00 PM', duration: 45, status: 'Confirmed', phone: '+94 77 789 0123', notes: 'Considering traditional hair accessories' },
    { id: 6, customer: 'Dilani Rajapakse', service: 'Muslim Bridal Application', date: '2024-03-17', time: '11:00 AM', duration: 60, status: 'Confirmed', phone: '+94 71 890 1234', notes: 'Muslim wedding day application' }
  ]);

  const [customers, setCustomers] = useState([
    { id: 1, name: 'Sanduni Jayasinghe', email: 'sanduni@tharubridal.lk', phone: '+94 76 345 6789', lastVisit: '2024-03-10', totalVisits: 3, preferences: 'Traditional Kandyan makeup, long hair' },
    { id: 2, name: 'Priyanka Silva', email: 'priyanka@tharubridal.lk', phone: '+94 77 456 7890', lastVisit: '2024-03-08', totalVisits: 2, preferences: 'Hindu bridal look, traditional accessories' },
    { id: 3, name: 'Kavitha Perera', email: 'kavitha@tharubridal.lk', phone: '+94 71 567 8901', lastVisit: '2024-03-12', totalVisits: 4, preferences: 'Traditional style, jasmine flowers' },
    { id: 4, name: 'Nethmi Fernando', email: 'nethmi@tharubridal.lk', phone: '+94 76 678 9012', lastVisit: '2024-03-05', totalVisits: 1, preferences: 'Traditional colors, curly hair' },
    { id: 5, name: 'Tharani Wickramasinghe', email: 'tharani@tharubridal.lk', phone: '+94 77 789 0123', lastVisit: '2024-03-14', totalVisits: 2, preferences: 'Minimalist traditional, straight hair' }
  ]);

  const tabs = [
    { id: 'schedule', name: 'Schedule', icon: '📅' },
    { id: 'appointments', name: 'Appointments', icon: '💄' },
    { id: 'customers', name: 'Customers', icon: '👥' },
    { id: 'services', name: 'Services', icon: '✨' },
    { id: 'profile', name: 'Profile', icon: '👤' }
  ];

  const getTodaysAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments.filter(apt => apt.date === today);
  };

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">My Schedule</h2>
        <div className="flex gap-3">
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Add Break
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              {getTodaysAppointments().map((appointment) => (
                <div key={appointment.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">{appointment.service}</h4>
                      <p className="text-slate-600">{appointment.customer}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm text-slate-500">
                    <div>
                      <span className="font-medium">Time:</span> {appointment.time}
                    </div>
                    <div>
                      <span className="font-medium">Duration:</span> {appointment.duration} min
                    </div>
                  </div>
                  {appointment.notes && (
                    <div className="mt-2 p-2 bg-slate-50 rounded text-sm text-slate-600">
                      <span className="font-medium">Notes:</span> {appointment.notes}
                    </div>
                  )}
                  <div className="mt-3 flex gap-2">
                    <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">Start Service</button>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Contact Customer</button>
                    <button className="text-slate-600 hover:text-slate-800 text-sm font-medium">Reschedule</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Today's Appointments</span>
                <span className="font-semibold text-pink-600">{stats.todayAppointments}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Completed This Week</span>
                <span className="font-semibold text-green-600">{stats.completedThisWeek}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Hours Worked</span>
                <span className="font-semibold text-blue-600">{stats.hoursWorked}h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Average Rating</span>
                <span className="font-semibold text-yellow-600">⭐ {stats.averageRating}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Upcoming</h3>
            <div className="space-y-3">
              {appointments.filter(apt => apt.date > new Date().toISOString().split('T')[0]).slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="p-3 bg-slate-50 rounded-lg">
                  <p className="font-medium text-slate-900 text-sm">{appointment.customer}</p>
                  <p className="text-xs text-slate-500">{appointment.service}</p>
                  <p className="text-xs text-slate-500">{appointment.date} at {appointment.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">All Appointments</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400">
            <option>All Status</option>
            <option>Confirmed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            New Appointment
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{appointment.customer}</div>
                      <div className="text-sm text-slate-500">{appointment.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{appointment.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{appointment.date}</div>
                    <div className="text-sm text-slate-500">{appointment.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {appointment.duration} min
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
                    <button className="text-pink-600 hover:text-pink-900 mr-3">Edit</button>
                    <button className="text-green-600 hover:text-green-900 mr-3">Start</button>
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

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">My Customers</h2>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Add Customer
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-600 font-semibold text-lg">
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-500">{customer.totalVisits} visits</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{customer.name}</h3>
            <p className="text-sm text-slate-500 mb-2">{customer.email}</p>
            <p className="text-sm text-slate-600 mb-3">{customer.phone}</p>
            <p className="text-sm text-slate-500 mb-4">Last visit: {customer.lastVisit}</p>
            <div className="mb-4">
              <p className="text-xs text-slate-500 mb-1">Preferences:</p>
              <p className="text-sm text-slate-600">{customer.preferences}</p>
            </div>
            <div className="flex gap-2">
              <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">Book Service</button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Contact</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">My Services</h2>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
          Add Service
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          { name: 'Bridal Makeup', duration: 60, price: 45000, description: 'Full bridal makeup application' },
          { name: 'Hair Styling', duration: 90, price: 35000, description: 'Complete hair styling and updo' },
          { name: 'Makeup Trial', duration: 90, price: 30000, description: 'Trial run for bridal makeup' },
          { name: 'Hair Consultation', duration: 30, price: 15000, description: 'Hair styling consultation' },
          { name: 'Full Package', duration: 180, price: 105000, description: 'Complete hair and makeup package' },
          { name: 'Touch-ups', duration: 30, price: 22500, description: 'Quick touch-ups and fixes' }
        ].map((service, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <h3 className="font-semibold text-slate-900 mb-2">{service.name}</h3>
            <p className="text-sm text-slate-600 mb-3">{service.description}</p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-slate-500">Duration: {service.duration} min</span>
              <span className="font-semibold text-pink-600">LKR {service.price.toLocaleString()}</span>
            </div>
            <div className="flex gap-2">
              <button className="text-pink-600 hover:text-pink-800 text-sm font-medium">Edit</button>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Bookings</button>
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
              <input type="text" defaultValue={user?.name || 'Staff Member'} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" defaultValue={user?.email || 'staff@tharubridal.lk'} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Specialization</label>
              <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400">
                <option>Makeup Artist</option>
                <option>Hair Stylist</option>
                <option>Consultant</option>
                <option>Assistant</option>
              </select>
            </div>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total Appointments</span>
              <span className="font-semibold text-slate-900">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Average Rating</span>
              <span className="font-semibold text-yellow-600">⭐ 4.8</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Hours This Month</span>
              <span className="font-semibold text-blue-600">168</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Repeat Customers</span>
              <span className="font-semibold text-green-600">89%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">On-time Rate</span>
              <span className="font-semibold text-purple-600">96%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'schedule': return renderSchedule();
      case 'appointments': return renderAppointments();
      case 'customers': return renderCustomers();
      case 'services': return renderServices();
      case 'profile': return renderProfile();
      default: return renderSchedule();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Staff Dashboard</h1>
            <p className="mt-2 text-slate-600">Welcome back, {user?.name || 'Staff Member'}</p>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
