import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalBookings: 24,
    monthlyRevenue: 12450,
    activeStaff: 5,
    totalCustomers: 156,
    todayBookings: 8,
    pendingBookings: 3
  });

  const [recentBookings, setRecentBookings] = useState([
    { id: 1, customer: 'Sarah Johnson', service: 'Bridal Makeup', date: '2024-03-15', time: '2:00 PM', status: 'Confirmed', amount: 250 },
    { id: 2, customer: 'Emily Davis', service: 'Hair Styling', date: '2024-03-16', time: '10:00 AM', status: 'Pending', amount: 180 },
    { id: 3, customer: 'Lisa Wilson', service: 'Full Package', date: '2024-03-17', time: '3:00 PM', status: 'Confirmed', amount: 450 },
    { id: 4, customer: 'Maria Garcia', service: 'Consultation', date: '2024-03-18', time: '11:00 AM', status: 'Pending', amount: 75 },
    { id: 5, customer: 'Jennifer Brown', service: 'Trial Makeup', date: '2024-03-19', time: '1:00 PM', status: 'Confirmed', amount: 120 }
  ]);

  const [staff, setStaff] = useState([
    { id: 1, name: 'Priya Fernando', role: 'Senior Stylist', email: 'priya@tharubridal.lk', bookings: 12, rating: 4.9, address: 'No. 23, Thimbirigasyaya Road, Colombo 05' },
    { id: 2, name: 'Kavitha Perera', role: 'Traditional Makeup Artist', email: 'kavitha@tharubridal.lk', bookings: 8, rating: 4.8, address: 'No. 67, Havelock Road, Colombo 05' },
    { id: 3, name: 'Nethmi Silva', role: 'Traditional Hair Stylist', email: 'nethmi@tharubridal.lk', bookings: 15, rating: 4.9, address: 'No. 12, Horton Place, Colombo 07' },
    { id: 4, name: 'Tharani Rajapakse', role: 'Cultural Consultant', email: 'tharani@tharubridal.lk', bookings: 6, rating: 4.7, address: 'No. 45, Rosmead Place, Colombo 07' },
    { id: 5, name: 'Dilani Wickramasinghe', role: 'Assistant', email: 'dilani@tharubridal.lk', bookings: 4, rating: 4.6, address: 'No. 89, Gregory Road, Colombo 07' }
  ]);

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'bookings', name: 'Bookings', icon: '📅' },
    { id: 'staff', name: 'Staff', icon: '👥' },
    { id: 'customers', name: 'Customers', icon: '👤' },
    { id: 'reports', name: 'Reports', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-lg border border-pink-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Total Bookings</h3>
              <p className="text-3xl font-bold text-pink-600">{stats.totalBookings}</p>
              <p className="text-sm text-slate-500">This month</p>
            </div>
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
              <span className="text-pink-600 text-xl">📅</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Revenue</h3>
              <p className="text-3xl font-bold text-green-600">LKR {stats.monthlyRevenue.toLocaleString()}</p>
              <p className="text-sm text-slate-500">This month</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Active Staff</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.activeStaff}</p>
              <p className="text-sm text-slate-500">Team members</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Total Customers</h3>
              <p className="text-3xl font-bold text-purple-600">{stats.totalCustomers}</p>
              <p className="text-sm text-slate-500">Registered</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">👤</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Today's Bookings</h3>
              <p className="text-3xl font-bold text-orange-600">{stats.todayBookings}</p>
              <p className="text-sm text-slate-500">Scheduled</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">⏰</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg border border-red-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Pending</h3>
              <p className="text-3xl font-bold text-red-600">{stats.pendingBookings}</p>
              <p className="text-sm text-slate-500">Awaiting approval</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">⏳</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Bookings</h3>
          <div className="space-y-3">
            {recentBookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900">{booking.customer}</p>
                  <p className="text-sm text-slate-500">{booking.service} - {booking.date}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    booking.status === 'Confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </span>
                  <p className="text-sm font-medium text-slate-900 mt-1">LKR {booking.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performing Staff</h3>
          <div className="space-y-3">
            {staff.slice(0, 5).map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                <div>
                  <p className="font-medium text-slate-900">{member.name}</p>
                  <p className="text-sm text-slate-500">{member.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900">{member.bookings} bookings</p>
                  <p className="text-sm text-slate-500">⭐ {member.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderBookings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Booking Management</h2>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
          Add New Booking
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{booking.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-500">{booking.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-500">{booking.date} at {booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">LKR {booking.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-pink-600 hover:text-pink-900 mr-3">Edit</button>
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

  const renderStaff = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Staff Management</h2>
        <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
          Add Staff Member
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {staff.map((member) => (
          <div key={member.id} className="bg-white rounded-xl shadow-lg p-6 border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-pink-600 font-semibold text-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <span className="text-sm font-medium text-slate-500">⭐ {member.rating}</span>
            </div>
            <h3 className="font-semibold text-slate-900 mb-1">{member.name}</h3>
            <p className="text-sm text-slate-500 mb-2">{member.role}</p>
            <p className="text-sm text-slate-600 mb-4">{member.email}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-500">{member.bookings} bookings</span>
              <div className="flex gap-2">
                <button className="text-pink-600 hover:text-pink-800 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-800 text-sm">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderCustomers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Customer Management</h2>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {Array.from({ length: 10 }, (_, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">Customer {i + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-500">customer{i + 1}@example.com</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-500">+1 (555) {100 + i}-{1000 + i}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-900">{Math.floor(Math.random() * 10) + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-500">2024-03-{10 + i}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-pink-600 hover:text-pink-900 mr-3">View</button>
                    <button className="text-blue-600 hover:text-blue-900">Contact</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900">Reports & Analytics</h2>
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Export Report
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            <p className="text-slate-500">Revenue chart would go here</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Booking Trends</h3>
          <div className="h-64 flex items-center justify-center bg-slate-50 rounded-lg">
            <p className="text-slate-500">Booking chart would go here</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Popular Services</h3>
          <div className="space-y-3">
            {['Bridal Makeup', 'Hair Styling', 'Full Package', 'Consultation', 'Trial Makeup'].map((service, index) => (
              <div key={service} className="flex justify-between items-center">
                <span className="text-slate-700">{service}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-pink-500 h-2 rounded-full" 
                      style={{ width: `${80 - index * 10}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-500">{15 - index * 2}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Staff Performance</h3>
          <div className="space-y-3">
            {staff.map((member) => (
              <div key={member.id} className="flex justify-between items-center">
                <span className="text-slate-700">{member.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">{member.bookings} bookings</span>
                  <span className="text-sm text-pink-600">⭐ {member.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Settings</h2>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Salon Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Salon Name</label>
              <input type="text" defaultValue="Tharu Bridal Studio" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
              <textarea defaultValue="123 Bridal Street, Wedding City, WC 12345" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" rows="3"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input type="text" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-100 focus:border-pink-400" />
            </div>
            <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Business Hours</h3>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-slate-700">{day}</span>
                <div className="flex items-center gap-2">
                  <input type="time" defaultValue="09:00" className="px-2 py-1 border border-slate-300 rounded text-sm" />
                  <span className="text-slate-500">to</span>
                  <input type="time" defaultValue="18:00" className="px-2 py-1 border border-slate-300 rounded text-sm" />
                  <input type="checkbox" className="rounded" />
                </div>
              </div>
            ))}
          </div>
          <button className="mt-4 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">
            Update Hours
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'bookings': return renderBookings();
      case 'staff': return renderStaff();
      case 'customers': return renderCustomers();
      case 'reports': return renderReports();
      case 'settings': return renderSettings();
      default: return renderOverview();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex-1 px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900">Owner Dashboard</h1>
            <p className="mt-2 text-slate-600">Welcome back, {user?.name || 'Owner'}</p>
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

export default OwnerDashboard;
