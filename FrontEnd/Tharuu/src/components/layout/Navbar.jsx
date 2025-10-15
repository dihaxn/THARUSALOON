import React, { useMemo, useState } from 'react';
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
  const { user, logout, ROLES } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardPath = useMemo(() => {
    if (!user) return '/login';
    switch (user.role) {
      case ROLES.OWNER:
        return '/dashboard/owner';
      case ROLES.STAFF:
        return '/dashboard/staff';
      case ROLES.CUSTOMER:
      default:
        return '/dashboard/customer';
    }
  }, [user, ROLES]);

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
                    ? 'text-pink-400 font-bold underline underline-offset-4'
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
                to={dashboardPath}
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
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-pink-900 bg-slate-900/95 text-white lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-3 text-xs uppercase tracking-[0.25em]">
            <div className="flex flex-col gap-3">
              {primaryNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `transition-colors duration-200 ${
                      isActive ? 'text-pink-400 font-bold underline underline-offset-4' : 'text-slate-200 hover:text-pink-400'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link
                    to={dashboardPath}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full border border-pink-700 px-3 py-1 text-[0.65rem] font-medium text-pink-400 transition hover:border-pink-400 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="text-[0.65rem] font-semibold text-slate-200 transition hover:text-pink-400"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-[0.65rem] font-semibold text-slate-200 transition hover:text-pink-400"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-full bg-pink-700 px-4 py-1 text-[0.65rem] font-semibold text-white shadow-sm transition hover:bg-pink-800"
                  >
                    Book a Consultation
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
