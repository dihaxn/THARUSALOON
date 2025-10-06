import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const primaryNavItems = [
  { label: 'Home', to: '/home' },
  { label: 'Services', to: '/services' },
  { label: 'Bookings', to: '/bookings' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' }
];

const Navbar = ({ user }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-pink-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 text-xs uppercase tracking-[0.25em] text-slate-600">
        <Link to="/home" className="flex items-center gap-2 text-[0.65rem] font-semibold text-pink-500">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-pink-200 text-[0.7rem]">
            TS
          </span>
          Tharu Bridal Studio
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {primaryNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `transition-colors duration-200 ${
                  isActive
                    ? 'text-pink-600'
                    : 'text-slate-500 hover:text-pink-500'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <Link
              to="/dashboard"
              className="rounded-full border border-pink-200 px-3 py-1 text-[0.65rem] font-medium text-pink-600 transition hover:border-pink-400 hover:text-pink-700"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[0.65rem] font-semibold text-slate-500 transition hover:text-pink-500"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-pink-500 px-4 py-1 text-[0.65rem] font-semibold text-white shadow-sm transition hover:bg-pink-600"
              >
                Book a Consultation
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-pink-200 p-2 text-pink-500 transition hover:border-pink-400 hover:text-pink-600 lg:hidden"
          aria-label="Toggle navigation"
        >
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
