import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-4 text-lg font-semibold">Tharu Bridal Studio</h3>
            <p className="text-sm text-slate-300">
              Creating beautiful bridal experiences since 2020.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/services" className="text-slate-300 hover:text-pink-400">Services</a></li>
              <li><a href="/gallery" className="text-slate-300 hover:text-pink-400">Gallery</a></li>
              <li><a href="/contact" className="text-slate-300 hover:text-pink-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <p className="text-sm text-slate-300">Email: info@tharubridal.com</p>
            <p className="text-sm text-slate-300">Phone: (555) 123-4567</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          © 2025 Tharu Bridal Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
