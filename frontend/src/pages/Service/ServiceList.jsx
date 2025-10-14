import React, { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ServiceCard from '../../components/common/ServiceCard';
import { getServices } from '../../lib/api';
import { useNotification } from '../../context/NotificationContext';

export default function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (error) {
        addNotification('Failed to load services', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [addNotification]);

  const handleBook = (service) => {
    addNotification(`Please login to book ${service.name}`, 'info');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <div className="text-xl text-slate-600">Loading services...</div>
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
            Our Services
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} onBook={handleBook} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
