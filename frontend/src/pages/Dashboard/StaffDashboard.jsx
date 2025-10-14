import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { getAppointments, getSalesOrders } from '../../lib/api';
import { useNotification } from '../../context/NotificationContext';

export default function StaffDashboard() {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, ordersData] = await Promise.all([
          getAppointments(token),
          getSalesOrders(token)
        ]);
        setAppointments(appointmentsData);
        setOrders(ordersData);
      } catch (error) {
        addNotification('Failed to load dashboard data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token, addNotification]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl text-slate-600">Loading dashboard...</div>
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
          <h1 className="mb-8 font-serif text-4xl font-bold text-slate-900">
            Staff Dashboard - {user?.name}
          </h1>
          
          <div className="mb-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Total Appointments</h3>
              <p className="text-4xl font-bold text-pink-500">{appointments.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Total Orders</h3>
              <p className="text-4xl font-bold text-pink-500">{orders.length}</p>
            </div>
          </div>

          <section className="mb-8">
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Today's Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-slate-600">No appointments scheduled</p>
            ) : (
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="rounded-lg bg-white p-4 shadow">
                    <p className="font-semibold">Appointment #{apt.id.slice(0, 8)}</p>
                    <p className="text-sm text-slate-600">Customer: {apt.customerId}</p>
                    <p className="text-sm text-slate-600">Date: {apt.date}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="text-slate-600">No orders to process</p>
            ) : (
              <div className="space-y-4">
                {orders.slice(0, 10).map((order) => (
                  <div key={order.id} className="rounded-lg bg-white p-4 shadow">
                    <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-slate-600">Customer: {order.customerId}</p>
                    <p className="text-sm text-slate-600">Total: ${order.total}</p>
                    <p className="text-sm text-slate-600">Status: {order.status}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
