import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import { getAppointments, getSalesOrders, getInvoices } from '../../lib/api';
import { useNotification } from '../../context/NotificationContext';

export default function CustomerDashboard() {
  const { user, token } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appointmentsData, ordersData, invoicesData] = await Promise.all([
          getAppointments(token),
          getSalesOrders(token),
          getInvoices(token)
        ]);
        setAppointments(appointmentsData);
        setOrders(ordersData);
        setInvoices(invoicesData);
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
            Welcome, {user?.name}!
          </h1>
          
          <div className="mb-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Appointments</h3>
              <p className="text-4xl font-bold text-pink-500">{appointments.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Orders</h3>
              <p className="text-4xl font-bold text-pink-500">{orders.length}</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <h3 className="mb-2 text-sm font-semibold uppercase text-slate-500">Invoices</h3>
              <p className="text-4xl font-bold text-pink-500">{invoices.length}</p>
            </div>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Recent Appointments</h2>
              {appointments.length === 0 ? (
                <p className="text-slate-600">No appointments yet</p>
              ) : (
                <div className="space-y-4">
                  {appointments.slice(0, 5).map((apt) => (
                    <div key={apt.id} className="rounded-lg bg-white p-4 shadow">
                      <p className="font-semibold">Appointment #{apt.id.slice(0, 8)}</p>
                      <p className="text-sm text-slate-600">Date: {apt.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Recent Orders</h2>
              {orders.length === 0 ? (
                <p className="text-slate-600">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="rounded-lg bg-white p-4 shadow">
                      <p className="font-semibold">Order #{order.id.slice(0, 8)}</p>
                      <p className="text-sm text-slate-600">Total: ${order.total}</p>
                      <p className="text-sm text-slate-600">Status: {order.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
