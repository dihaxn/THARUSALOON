import React from 'react';

const footerLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Bridal Packages', href: '/packages' },
  { label: 'Contact', href: '/contact' }
];

const supportLinks = [
  { label: 'FAQs', href: '/faqs' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms' }
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://instagram.com',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.05-2.73a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
      </svg>
    )
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.2 22v-8.2h2.76L16.4 10h-3.2V8.1c0-.95.27-1.6 1.68-1.6h1.79V4.14c-.87-.09-1.75-.14-2.63-.14-2.6 0-4.37 1.41-4.37 4v2h-2.9v3.8h2.9V22h3.6Z" />
      </svg>
    )
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.04C6.5 2.04 2 6.19 2 10.96c0 3.02 1.83 5.61 4.53 6.73-.21-.57-.4-1.62.03-2.31.43-.72 2.74-4.64 2.74-4.64s-.69-1.38-.69-3.43c0-3.22 1.87-5.63 4.2-5.63 1.98 0 2.94 1.5 2.94 3.3 0 2.01-.89 3.64-1.99 3.64-.66 0-1.15-.55-.99-1.22.19-.81.57-1.69.57-2.28 0-1.52-2.15-1.31-2.15 1.44 0 .84.28 1.4.28 1.4l-1.13 4.78c-.34 1.42-.05 3.16-.03 3.34.02.18.26.24.37.09.16-.21 2.09-2.59 2.75-3.99.19-.41.74-1.51 1.1-2.41.27-.7.57-1.41.57-2.04 0-2.11-1.53-4.05-4.43-4.05-3.22 0-5.65 2.7-5.65 5.76 0 1.05.31 1.79.94 2.36.26.24.3.33.2.6-.07.2-.22.68-.29.87-.1.31-.33.42-.61.3-1.69-.69-2.47-2.53-2.47-4.6 0-3.42 3.02-7.52 9.01-7.52 4.82 0 7.99 3.47 7.99 7.19 0 4.96-2.76 8.67-6.83 8.67-1.37 0-2.66-.74-3.1-1.6l-.84 3.2c-.3 1.13-1.11 2.55-1.65 3.41.74.23 1.52.36 2.33.36 5.5 0 9.99-4.15 9.99-9.92C22 6.19 17.5 2.04 12 2.04Z" />
      </svg>
    )
  }
];

const Footer = () => {
  return (
    <footer className="relative mt-24 bg-gradient-to-b from-white via-[#FFF9F9] to-[#FFE7EE]">
      <div className="absolute inset-x-0 -top-16 mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/60 bg-white/95 p-8 shadow-2xl shadow-pink-100 backdrop-blur md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Plan with confidence</p>
            <h2 className="font-serif text-2xl font-semibold text-slate-900">Schedule a complimentary bridal consultation</h2>
            <p className="text-sm text-slate-500">Reserve a styling session with our lead artist and receive a curated gown mood board tailored to your love story.</p>
          </div>
          <a
            href="/bookings"
            className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600"
          >
            Book a consultation
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-28 md:px-6">
        <div className="grid gap-12 md:grid-cols-[1.3fr,1fr,1fr,1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-serif text-lg font-semibold text-pink-600 shadow-sm">
                TS
              </span>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-semibold text-slate-900">Tharu Bridal Studio</span>
                <span className="text-xs uppercase tracking-[0.2em] text-pink-500">Crafting timeless elegance</span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-slate-600">
              Premium bridal styling, couture gowns, and makeup artistry tailored to celebrate your signature love story.
            </p>
            <div className="flex items-center gap-3 text-sm text-slate-500">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-pink-100 text-pink-500">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92V21a1 1 0 0 1-1.1 1 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.08 11.73 19.8 19.8 0 0 1 0 3.1 1 1 0 0 1 1 2h4.09a1 1 0 0 1 1 .75c.18.74.44 1.46.77 2.15a1 1 0 0 1-.23 1L5.21 7.79a16.1 16.1 0 0 0 6.99 6.99l1.9-1.41a1 1 0 0 1 1-.23 12.3 12.3 0 0 0 2.15.77 1 1 0 0 1 .75 1V20a1 1 0 0 1-.78 1z" />
                </svg>
              </span>
              <div>
                <p>+94 71 123 4567</p>
                <p>hello@tharubridal.com</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Studio</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a className="transition hover:text-pink-500" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a className="transition hover:text-pink-500" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Stay inspired</h3>
            <p className="text-sm text-slate-600">Join our bridal muse list for gown drops, beauty rituals, and planning tips.</p>
            <form
              className="flex gap-2"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="you@example.com"
                className="flex-1 rounded-xl border border-pink-100 bg-white/90 px-4 py-3 text-sm text-slate-600 shadow-sm focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-100"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-xl bg-pink-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-md shadow-pink-200 transition hover:bg-pink-600"
              >
                Join
              </button>
            </form>
            <div className="flex gap-3">
              {socialLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  title={item.label}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 text-pink-500 transition hover:border-pink-400 hover:text-pink-600"
                >
                  {item.icon}
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Tharu Bridal Studio. Crafted with love in Colombo.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
