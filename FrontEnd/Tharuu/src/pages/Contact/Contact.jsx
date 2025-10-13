import React from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const studioTimings = [
  { day: 'Monday – Friday', hours: '09:00 AM – 07:00 PM' },
  { day: 'Saturday', hours: '09:00 AM – 05:00 PM' },
  { day: 'Sunday', hours: 'By appointment only' }
];

const faqs = [
  {
    question: 'How far in advance should I book bridal services?',
    answer: 'Peak season bookings open 12 months ahead. Weekday and off-season events can usually be accommodated within 8 weeks.'
  },
  {
    question: 'Do you travel outside Colombo?',
    answer: 'Yes. We support destination weddings across Sri Lanka and overseas. Travel & accommodation charges are factored into your proposal.'
  },
  {
    question: 'Can we schedule trial sessions for the bridal party?',
    answer: 'Absolutely. Trials are hosted at our studio and can include hairstyling, draping, and skincare consultations for the entire party.'
  }
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F9] text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <section className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="mb-8">
            <img
              src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80"
              alt="Modern salon interior with styling chairs and mirrors"
              className="w-full max-h-72 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-8">
            <header className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Contact</span>
              <h1 className="font-serif text-4xl">Let&apos;s plan your bridal story</h1>
              <p className="text-sm leading-relaxed text-slate-600">
                Reach out to book consultations, trial sessions, or collaborative shoots. This placeholder will route submissions to the Node/Express API once the backend endpoints are ready.
              </p>
            </header>

            <div className="space-y-6">
              <div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-pink-400">Studio</h2>
                <p className="mt-2 font-serif text-2xl">47 Flower Road, Middeniya</p>
                <p className="text-sm text-slate-600">Near Middeniya Town · Parking available</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-pink-100 bg-white/90 p-6">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-pink-400">Appointments</h3>
                  <p className="mt-3 font-serif text-lg">+94 77 123 4567</p>
                  <p className="text-sm text-slate-600">hello@tharusalon.com</p>
                </div>
                <div className="rounded-3xl border border-pink-100 bg-white/90 p-6">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-pink-400">Collaborations</h3>
                  <p className="mt-3 font-serif text-lg">+94 71 456 7890</p>
                  <p className="text-sm text-slate-600">press@tharusalon.com</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-white/90 p-6 shadow-lg shadow-pink-100">
              <h3 className="text-xs uppercase tracking-[0.3em] text-pink-400">Studio timings</h3>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {studioTimings.map((slot) => (
                  <li
                    key={slot.day}
                    className="flex items-center justify-between rounded-xl bg-pink-50/60 px-4 py-3 text-sm font-medium text-slate-700"
                  >
                    <span>{slot.day}</span>
                    <span className="text-pink-500">{slot.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <form className="space-y-5 rounded-3xl border border-pink-100 bg-white/90 p-8 shadow-xl shadow-pink-100">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs uppercase tracking-[0.3em] text-pink-400">
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="e.g. Dilani Perera"
                className="w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.3em] text-pink-400">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-xs uppercase tracking-[0.3em] text-pink-400">
                Contact number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="(+94) 71 123 4567"
                className="w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-xs uppercase tracking-[0.3em] text-pink-400">
                Tell us your vision
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Share details about your ceremony, preferred dates, and styling inspiration."
                className="w-full rounded-xl border border-pink-100 bg-white px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-pink-300 focus:outline-none focus:ring focus:ring-pink-200"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-pink-400"
            >
              Submit request
            </button>
            <p className="text-xs leading-relaxed text-slate-500">
              Thank you for your patience—form submissions will be enabled after the backend integration milestone. For immediate inquiries, use the contact details listed above.
            </p>
          </form>
        </section>

        <section className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-pink-100 bg-white/90 p-8 shadow-lg shadow-pink-100">
            <h2 className="text-xs uppercase tracking-[0.3em] text-pink-400">FAQs</h2>
            <div className="mt-6 space-y-5">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-2xl border border-pink-100 bg-white px-5 py-4 text-sm text-slate-600 transition hover:border-pink-200"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-left font-medium text-slate-700">
                    <span>{faq.question}</span>
                    <span className="text-pink-400 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white/90 shadow-lg shadow-pink-100">
            <iframe
              title="Tharu Bridal Studio - Middeniya"
              src="https://www.google.com/maps?q=Middeniya%2C%20Sri%20Lanka&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
