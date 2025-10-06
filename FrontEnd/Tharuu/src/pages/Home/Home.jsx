import React from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const heroImages = [
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bride having lipstick applied before ceremony'
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80&sat=-15',
    alt: 'Bride in lace gown adjusting veil'
  },
  {
    src: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bride holding bouquet and smiling'
  }
];

const services = [
  {
    title: 'Couture Bridal Styling',
    description: 'Handpicked designer gowns, bespoke veils, and custom fittings to highlight your silhouette.'
  },
  {
    title: 'Signature Makeup & Hair',
    description: 'Flawless, camera-ready looks tailored to your bridal mood board and skin tone.'
  },
  {
    title: 'Pre-Wedding Rituals',
    description: 'Glow facials, spa therapies, and henna artistry curated to calm and rejuvenate.'
  }
];

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
    label: 'The Royal Orchid Look'
  },
  {
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    label: 'Classic Kandyan Elegance'
  },
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    label: 'Sunset Destination Bride'
  }
];

const testimonials = [
  {
    quote:
      'Tharu and her team transformed me into the bride of my dreams. The attention to detail and calm energy made the morning so joyful.',
    name: 'Dilani & Nuwan',
    event: 'Galle Fort Wedding'
  },
  {
    quote:
      'From trial to the final touch-up, every style was personalized to perfection. The couture fittings were seamless.',
    name: 'Minali & Ashen',
    event: 'Colombo Ballroom Reception'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F9] text-slate-800">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-24">
        <section className="relative isolate mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <div className="mx-auto grid max-w-screen-xl gap-12 px-6 py-16 lg:grid-cols-12 lg:items-center lg:px-12 lg:py-20">
            <div className="mr-auto space-y-6 lg:col-span-7">
              <span className="inline-flex rounded-full bg-pink-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-pink-600">
                Bridal artistry reinvented
              </span>
              <h1 className="font-serif text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Capturing timeless elegance for your signature love story
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-slate-600">
                Tharu Bridal Studio curates luxury bridal styling, couture gowns, and calming spa rituals for modern brides across Sri Lanka. From dreamy destination ceremonies to grand ballroom receptions, our team designs every detail around your unique glow.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/bookings/new"
                  className="inline-flex items-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
                >
                  Book a consultation
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center rounded-full border border-pink-200 px-6 py-3 text-sm font-semibold text-pink-600 transition hover:border-pink-400 hover:text-pink-700"
                >
                  Explore services
                </a>
              </div>
              <dl className="grid grid-cols-2 gap-6 pt-6 text-sm text-slate-600 sm:grid-cols-3">
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-pink-400">Brides styled</dt>
                  <dd className="mt-2 font-serif text-3xl text-slate-900">850+</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-pink-400">Expert stylists</dt>
                  <dd className="mt-2 font-serif text-3xl text-slate-900">18</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.3em] text-pink-400">5-star reviews</dt>
                  <dd className="mt-2 font-serif text-3xl text-slate-900">1.2k</dd>
                </div>
              </dl>
            </div>

            <div className="relative hidden overflow-hidden rounded-3xl border border-pink-100 bg-white/70 p-6 shadow-2xl shadow-pink-100 lg:col-span-5 lg:flex">
              <div className="grid w-full grid-cols-3 gap-4">
                {heroImages.map((image, index) => (
                  <figure
                    key={image.alt}
                    className={`group relative aspect-[3/4] overflow-hidden rounded-2xl ${
                      index === 1 ? 'translate-y-6' : ''
                    } bg-slate-200 shadow-lg`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-xs font-medium text-white">
                      {image.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="flex items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Our signature experiences</span>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Tailored services for every bridal chapter</h2>
            </div>
            <a className="hidden rounded-full border border-pink-200 px-5 py-2 text-sm font-semibold text-pink-600 transition hover:border-pink-400 hover:text-pink-700 md:inline-flex" href="/services">
              View all services
            </a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="group rounded-3xl border border-pink-100 bg-white/70 p-8 shadow-lg shadow-pink-100 transition hover:-translate-y-1 hover:border-pink-200">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-lg text-pink-500">
                  ✦
                </div>
                <h3 className="mt-6 font-serif text-2xl text-slate-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.description}</p>
                <a className="mt-6 inline-flex items-center text-sm font-semibold text-pink-500 transition hover:text-pink-600" href="/services">
                  Discover packages →
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl bg-white/80 p-10 shadow-xl shadow-pink-100">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Real moments</span>
              <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">A gallery of love stories we&apos;ve styled</h2>
            </div>
            <a className="rounded-full border border-pink-200 px-5 py-2 text-sm font-semibold text-pink-600 transition hover:border-pink-400 hover:text-pink-700" href="/gallery">
              View full gallery
            </a>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {gallery.map((item) => (
              <figure key={item.label} className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-lg shadow-pink-100">
                <div className="overflow-hidden">
                  <img src={item.src} alt={item.label} className="h-64 w-full object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <figcaption className="p-5 text-sm font-medium text-slate-600">{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-8 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-pink-50 p-10 shadow-xl shadow-pink-100 lg:grid-cols-[1.1fr,1fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Testimonials</span>
            <h2 className="mt-3 font-serif text-3xl text-slate-900 sm:text-4xl">Loved by modern brides</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
              Our salon partners with each couple to mirror their story through couture styling, luxurious treatments, and assured timelines. Hear from brides who trusted Tharu Bridal Studio on their forever day.
            </p>
          </div>
          <div className="space-y-6">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-2xl border border-pink-100 bg-white/70 p-6 text-sm leading-relaxed text-slate-600 shadow-lg shadow-pink-100">
                “{testimonial.quote}”
                <footer className="mt-4 text-sm font-semibold text-pink-500">
                  {testimonial.name}
                  <span className="ml-1 text-xs font-normal text-slate-500">· {testimonial.event}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-pink-100 bg-white/80 p-10 text-center shadow-2xl shadow-pink-100">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Let&apos;s plan your day</span>
          <h2 className="mt-4 font-serif text-4xl text-slate-900">Reserve your bridal styling consultation</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600">
            Share your vision, venue, and timeline. Our concierge will craft a bespoke styling journey — from bridal trials and couture fittings to destination touch-ups.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/bookings/new" className="inline-flex items-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600">
              Schedule a call
            </a>
            <a href="/packages" className="inline-flex items-center rounded-full border border-pink-200 px-6 py-3 text-sm font-semibold text-pink-600 transition hover:border-pink-400 hover:text-pink-700">
              Download packages
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
