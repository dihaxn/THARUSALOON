import React from "react";

const Footer = () => {
  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Bridal Packages", href: "/packages" },
    { name: "Gallery", href: "/gallery" },
  ];

  const infoLinks = [
    { name: "FAQs", href: "/faqs" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const socialLinks = [
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.8A3.7 3.7 0 0 0 3.8 7.5v9a3.7 3.7 0 0 0 3.7 3.7h9a3.7 3.7 0 0 0 3.7-3.7v-9a3.7 3.7 0 0 0-3.7-3.7h-9ZM12 7.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2Zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Zm5.05-2.73a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
        </svg>
      ),
    },
    {
      label: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M13.2 22v-8.2h2.76L16.4 10h-3.2V8.1c0-.95.27-1.6 1.68-1.6h1.79V4.14c-.87-.09-1.75-.14-2.63-.14-2.6 0-4.37 1.41-4.37 4v2h-2.9v3.8h2.9V22h3.6Z" />
        </svg>
      ),
    },
    {
      label: "Pinterest",
      href: "https://pinterest.com",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2.04C6.5 2.04 2 6.19 2 10.96c0 3.02 1.83 5.61 4.53 6.73-.21-.57-.4-1.62.03-2.31.43-.72 2.74-4.64 2.74-4.64s-.69-1.38-.69-3.43c0-3.22 1.87-5.63 4.2-5.63 1.98 0 2.94 1.5 2.94 3.3 0 2.01-.89 3.64-1.99 3.64-.66 0-1.15-.55-.99-1.22.19-.81.57-1.69.57-2.28 0-1.52-2.15-1.31-2.15 1.44 0 .84.28 1.4.28 1.4l-1.13 4.78c-.34 1.42-.05 3.16-.03 3.34.02.18.26.24.37.09.16-.21 2.09-2.59 2.75-3.99.19-.41.74-1.51 1.1-2.41.27-.7.57-1.41.57-2.04 0-2.11-1.53-4.05-4.43-4.05-3.22 0-5.65 2.7-5.65 5.76 0 1.05.31 1.79.94 2.36.26.24.3.33.2.6-.07.2-.22.68-.29.87-.1.31-.33.42-.61.3-1.69-.69-2.47-2.53-2.47-4.6 0-3.42 3.02-7.52 9.01-7.52 4.82 0 7.99 3.47 7.99 7.19 0 4.96-2.76 8.67-6.83 8.67-1.37 0-2.66-.74-3.1-1.6l-.84 3.2c-.3 1.13-1.11 2.55-1.65 3.41.74.23 1.52.36 2.33.36 5.5 0 9.99-4.15 9.99-9.92C22 6.19 17.5 2.04 12 2.04Z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#FFF5F8] relative overflow-hidden pt-20 pb-10">
      {/* Top Gradient Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />
      </div>



      {/* Footer Content */}
      <div className="relative mx-auto max-w-6xl grid gap-12 border-t border-pink-100 pt-12 px-4 sm:px-6 lg:grid-cols-4">
        {/* Brand */}
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 font-serif text-lg font-semibold text-pink-600 shadow-sm">
              TS
            </span>
            <h3 className="font-serif text-2xl text-slate-900">
              Tharu Bridal Studio
            </h3>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            Creating unforgettable bridal experiences across Colombo, Kandy & Galle.
          </p>
          <div className="mt-4 flex justify-center lg:justify-start gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-200 text-pink-500 transition hover:border-pink-400 hover:text-pink-600"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Quick Links
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="transition hover:text-pink-500">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Information
          </h4>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {infoLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="transition hover:text-pink-500">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
            Contact Us
          </h4>
          <div className="mt-5 space-y-2 text-sm text-slate-600">
            <p>📍 47 Flower Road, Middeniya</p>
            <p>📞 +94 71 123 4567</p>
            <p>✉️ tharu@bridal.com</p>
            <a
              href="https://wa.me/94711234567"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-pink-500 font-semibold hover:text-pink-600 transition"
            >
              WhatsApp Bookings
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-12 border-t border-pink-100 pt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Tharu Bridal Studio — Designed with 💖 in Sri Lanka.
      </div>
    </footer>
  );
};

export default Footer;
