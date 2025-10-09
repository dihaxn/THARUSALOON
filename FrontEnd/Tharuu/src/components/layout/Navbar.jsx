import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const primaryNavItems = [
  { label: 'Home', to: '/home' },
  { label: 'Services', to: '/services' },
  { label: 'Bookings', to: '/bookings' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' }
];

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-pink-900 bg-slate-900/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 text-xs uppercase tracking-[0.25em] text-white">
        <Link to="/home" className="flex items-center gap-2 text-[0.65rem] font-semibold text-pink-400">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-pink-700 text-[0.7rem] bg-slate-900 text-white">
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
                    ? 'text-pink-400 font-bold'
                    : 'text-slate-200 hover:text-pink-400'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full border border-pink-700 px-3 py-1 text-[0.65rem] font-medium text-pink-400 transition hover:border-pink-400 hover:text-white"
              >
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="text-[0.65rem] font-semibold text-slate-200 transition hover:text-pink-400"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-[0.65rem] font-semibold text-slate-200 transition hover:text-pink-400"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-pink-700 px-4 py-1 text-[0.65rem] font-semibold text-white shadow-sm transition hover:bg-pink-800"
              >
                Book a Consultation
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center rounded-full border border-pink-700 p-2 text-pink-400 transition hover:border-pink-400 hover:text-white lg:hidden"
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
