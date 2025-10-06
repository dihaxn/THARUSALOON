import React from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';


const bridalServices = [
  {
    title: 'Signature Bridal Makeup',
    subtitle: 'Makeup & Hair',
    description:
      'Airbrush or HD makeup with custom contouring, luxury false lashes, and long-wear finishing for ceremonies lasting up to 12 hours.',
    price: 'LKR 45,000',
    duration: '3.5 hours',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Couture Gown Styling',
    subtitle: 'Couture Styling',
    description:
      'Personalized gown fitting, veil placement, jewellery curation, and bustle support with 3 couture changeovers for reception looks.',
    price: 'LKR 38,000',
    duration: 'Full day support',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Luxury Pre-Wedding Rituals',
    subtitle: 'Spa & Rituals',
    description:
      'Three-day ritual plan featuring herbal body polish, brightening facial, and calming spa therapy designed to create a radiant glow.',
    price: 'LKR 52,000',
    duration: '3 days',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Destination Bridal Companion',
    subtitle: 'On-location',
    description:
      'Travel-ready stylist for destination weddings with touch-ups, weather-friendly finishing, and ceremonial attire management.',
    price: 'LKR 165,000',
    duration: '2 days travel',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Bridal Party Glam',
    subtitle: 'Attendants',
    description:
      'Coordinated hair and makeup looks for bridesmaids, mother of the bride, and flower girls with cohesive palettes and accessories.',
    price: 'LKR 12,000 / person',
    duration: '1.5 hours each',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Gentleman Grooming Suite',
    subtitle: 'Groom Styling',
    description:
      'Hot towel shave, hair sculpting, and skincare refresh plus wardrobe steaming to keep the groom photo-ready all day long.',
    price: 'LKR 18,000',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1200&q=80'
  }
];

const ServiceList = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F9] text-slate-800">
      <Navbar />
      
      {/* Hero Section with Navigation Pills */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-200 via-purple-100 to-pink-100 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-5xl font-bold text-purple-900">Bridal</h1>
            <div className="text-right">
              <div className="mb-2 text-sm font-medium text-purple-700">SERVICES LIST</div>
              <div className="flex gap-3">
                <a href="/services/waxing" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-purple-900 shadow-md transition hover:shadow-lg">Waxing</a>
                <a href="/services/hair" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-purple-900 shadow-md transition hover:shadow-lg">Hair</a>
                <a href="/services/skin" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-purple-900 shadow-md transition hover:shadow-lg">Skin</a>
                <a href="/services/nail" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-purple-900 shadow-md transition hover:shadow-lg">Nail</a>
                <a href="/services/body" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-purple-900 shadow-md transition hover:shadow-lg">Body</a>
                <a href="/services/kids" className="rounded-full bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-purple-900 shadow-md transition hover:shadow-lg">Kids</a>
                <a href="/services/bridal" className="rounded-full bg-purple-800 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white shadow-md transition hover:bg-purple-900">Bridal</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-24">
        <section className="mt-16 rounded-3xl bg-white/80 p-10 shadow-2xl shadow-pink-100">
          <div className="space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Service catalogue</span>
            <h2 className="font-serif text-4xl text-slate-900">Curated bridal experiences</h2>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600">
              Select from our signature experiences or combine them for a bespoke celebration. All services include a pre-event consultation and personalised lookbook delivered by our concierge team.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {bridalServices.map((service) => (
              <ServiceCard key={service.title} {...service} href="/bookings/new" ctaLabel="Plan with stylist" />
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-10 text-center shadow-xl shadow-pink-100">
          <h2 className="font-serif text-3xl text-slate-900">Need a custom package?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Our creative directors craft tailored experiences for Sri Lankan, Western, Hindu, and fusion ceremonies. Share your venue, size, and vision — we will design a styling journey aligned to your traditions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/bookings/new" className="inline-flex items-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600">
              Book discovery call
            </a>
            <a href="mailto:hello@tharubridals.lk" className="inline-flex items-center rounded-full border border-pink-200 px-6 py-3 text-sm font-semibold text-pink-600 transition hover:border-pink-400 hover:text-pink-700">
              Email concierge team
            </a>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceList;