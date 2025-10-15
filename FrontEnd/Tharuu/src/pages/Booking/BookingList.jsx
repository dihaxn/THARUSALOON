import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const bookingHeroImage = 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80';
import { fetchBookings } from '../../lib/api.js';

const FALLBACK_BOOKINGS = [
  {
    id: 'BK-1024',
    couple: 'Dilani & Nuwan',
    service: 'Signature Bridal Makeup',
    stylist: 'Ishara',
    date: '2025-11-12',
    status: 'Confirmed'
  },
  {
    id: 'BK-1025',
    couple: 'Minali & Ashen',
    service: 'Couture Gown Styling',
    stylist: 'Ruwanthi',
    date: '2025-12-03',
    status: 'Pending'
  },
  {
    id: 'BK-1026',
    couple: 'Asha & Pradeep',
    service: 'Destination Bridal Companion',
    stylist: 'Tharu',
    date: '2026-01-18',
    status: 'In Review'
  }
];

const bookingStats = [
  { label: 'Consultations this month', value: '18', trend: '+4 since last month' },
  { label: 'Artists on duty', value: '07', trend: 'Across makeup, hair & draping' },
  { label: 'Weekend slots left', value: '05', trend: 'Reserve early for peak season' }
];

const workflowSteps = [
  {
    title: 'Discovery call',
    description: 'Share your story, themes, and bridal party details so we can curate the right team.'
  },
  {
    title: 'Trial sessions',
    description: 'Lock in key looks with makeup, hair, and saree draping rehearsals at our studio.'
  },
  {
    title: 'Final timeline',
    description: 'We coordinate artist call times, travel logistics, and touch-up schedules with your planner.'
  }
];

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const loadBookings = useCallback(async (controller) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchBookings({ signal: controller.signal });
      const rows = Array.isArray(response?.data) ? response.data : [];
      const normalised = rows.map((item, index) => ({
        id: item.id || `booking-${index}-${Date.now()}`,
        couple: item.couple || item.client || '—',
        service: item.service || '—',
        stylist: item.artist || item.stylist || 'To assign',
        date: item.eventDate || item.date || null,
        status: item.status || item.statusLabel || 'PENDING'
      }));
      setBookings(normalised);
      setLastUpdated(new Date());
    } catch (err) {
      if (err.name === 'AbortError') {
        return;
      }
      setError(err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(() => {
    const controller = new AbortController();
    loadBookings(controller);
    return controller;
  }, [loadBookings]);

  useEffect(() => {
    const controller = refresh();
    return () => controller.abort();
  }, [refresh]);

  const effectiveBookings = useMemo(() => {
    if (loading) {
      return [];
    }
    if (bookings.length > 0) {
      return bookings;
    }
    if (error) {
      return FALLBACK_BOOKINGS;
    }
    return [];
  }, [bookings, error, loading]);

  const formatStatus = (value) => {
    if (!value) return 'Pending';
    const transformed = value
      .toString()
      .trim()
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return transformed;
  };

  const formatDate = (value) => {
    if (!value) return 'TBC';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const showFallbackNotice = !loading && error;

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-slate-800">
      <Navbar />
      <div className="mb-8">
        <img
          src={bookingHeroImage}
          alt="Modern salon interior with styling chairs and mirrors"
          className="w-full max-h-72 object-cover rounded-xl shadow-lg"
        />
      </div>
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <section className="mt-16 space-y-12">
          <header className="space-y-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Bookings</span>
            <h1 className="font-serif text-4xl text-slate-900">Salon schedule overview</h1>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600">
              Track consultations, trials, and event-day glam in one glance. This view will sync with the Spring Boot booking API for live updates, artist assignments, and smart filtering.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {bookingStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl border border-pink-100 bg-white/90 p-6 text-center shadow-lg shadow-pink-100"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-pink-400">{stat.label}</p>
                <p className="mt-3 font-serif text-4xl text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.trend}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white/90 shadow-xl shadow-pink-100">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-pink-50 text-xs uppercase tracking-[0.2em] text-pink-400">
                <tr>
                  <th className="px-6 py-4">Booking</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Stylist</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {loading && (
                  Array.from({ length: 3 }).map((_, index) => (
                    <tr key={`skeleton-${index}`} className="animate-pulse text-slate-600">
                      <td className="px-6 py-6">
                        <div className="mb-2 h-3 w-40 rounded bg-pink-100" />
                        <div className="h-2 w-24 rounded bg-pink-50" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-3 w-32 rounded bg-pink-100" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-3 w-24 rounded bg-pink-100" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-3 w-20 rounded bg-pink-100" />
                      </td>
                      <td className="px-6 py-6">
                        <div className="h-6 w-24 rounded-full bg-pink-100" />
                      </td>
                    </tr>
                  ))
                )}

                {!loading && effectiveBookings.length === 0 && !showFallbackNotice && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-sm text-slate-500">
                      No bookings found yet. Check back after adding new consultations.
                    </td>
                  </tr>
                )}

                {!loading && effectiveBookings.map((booking) => (
                  <tr key={booking.id} className="text-slate-600">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-900">{booking.couple}</p>
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">{booking.reference || booking.id}</p>
                    </td>
                    <td className="px-6 py-4">{booking.service}</td>
                    <td className="px-6 py-4">{booking.stylist}</td>
                    <td className="px-6 py-4">{formatDate(booking.date)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center rounded-full border border-pink-200 px-3 py-1 text-xs font-semibold text-pink-500">
                        {formatStatus(booking.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showFallbackNotice && (
            <div className="rounded-3xl border border-amber-200 bg-amber-50/80 p-6 text-center text-sm text-amber-700">
              <p className="font-semibold uppercase tracking-[0.3em]">Live data unavailable</p>
              <p className="mt-2 text-amber-800">
                We couldn&apos;t reach the API, so we&apos;re showing sample bookings instead.{' '}
                <button
                  type="button"
                  onClick={() => refresh()}
                  className="font-semibold text-pink-500 underline-offset-4 hover:underline"
                >
                  Try again
                </button>
              </p>
            </div>
          )}

          {lastUpdated && !showFallbackNotice && (
            <p className="text-right text-xs uppercase tracking-[0.3em] text-slate-400">
              Updated {lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          )}

          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <div className="space-y-6 rounded-3xl border border-pink-100 bg-white/90 p-8 shadow-lg shadow-pink-100">
              <h2 className="text-xs uppercase tracking-[0.3em] text-pink-400">How bookings flow</h2>
              <ul className="space-y-5 text-sm leading-relaxed text-slate-600">
                {workflowSteps.map((step) => (
                  <li key={step.title} className="rounded-2xl bg-pink-50/60 px-5 py-4">
                    <p className="font-serif text-lg text-slate-900">{step.title}</p>
                    <p>{step.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-3xl border border-pink-100 bg-white/90 p-8 text-center shadow-lg shadow-pink-100">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-pink-400">Need a bespoke slot?</p>
                <h3 className="font-serif text-2xl text-slate-900">Reserve your bridal glam</h3>
                <p className="text-sm leading-relaxed text-slate-600">
                  Let us know your ceremonies, timelines, and preferred stylists. Our concierge will coordinate a customised artist roster within 24 hours.
                </p>
              </div>
              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-pink-400"
              >
                Contact concierge
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BookingList;
