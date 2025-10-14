import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#FFF9F9]">
      <Navbar />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-pink-100 to-purple-100 py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="mb-6 font-serif text-5xl font-bold text-slate-900">
              Welcome to Tharu Bridal Studio
            </h1>
            <p className="mb-8 text-xl text-slate-600">
              Creating unforgettable bridal experiences with elegance and style
            </p>
            <a
              href="/services"
              className="inline-block rounded-lg bg-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-pink-600"
            >
              View Our Services
            </a>
          </div>
        </section>
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-12 text-center font-serif text-4xl font-bold text-slate-900">
              Why Choose Us
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-pink-500">Expert Team</h3>
                <p className="text-slate-600">
                  Our experienced professionals ensure every detail is perfect for your special day.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-pink-500">Premium Services</h3>
                <p className="text-slate-600">
                  From bridal makeup to hair styling, we offer comprehensive beauty solutions.
                </p>
              </div>
              <div className="rounded-lg bg-white p-8 shadow-lg">
                <h3 className="mb-4 text-2xl font-semibold text-pink-500">Personalized Care</h3>
                <p className="text-slate-600">
                  Every bride is unique. We tailor our services to match your vision and style.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
