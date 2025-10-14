import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Contact() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center font-serif text-4xl font-bold text-slate-900">
            Contact Us
          </h1>
          <div className="rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-8 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Address</h3>
                <p className="text-slate-600">123 Bridal Street, Beauty City, BC 12345</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Phone</h3>
                <p className="text-slate-600">(555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Email</h3>
                <p className="text-slate-600">info@tharubridal.com</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Hours</h3>
                <p className="text-slate-600">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-slate-600">Sunday: By appointment only</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
