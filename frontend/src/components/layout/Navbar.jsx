import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return null;
    const roleMap = {
      owner: '/dashboard/owner',
      staff: '/dashboard/staff',
      customer: '/dashboard/customer'
    };
    return roleMap[user.role] || '/home';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-pink-500">
              Tharu Bridal Studio
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/home" className="text-slate-700 hover:text-pink-500">
              Home
            </Link>
            <Link to="/services" className="text-slate-700 hover:text-pink-500">
              Services
            </Link>
            <Link to="/gallery" className="text-slate-700 hover:text-pink-500">
              Gallery
            </Link>
            <Link to="/contact" className="text-slate-700 hover:text-pink-500">
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to={getDashboardLink()}
                  className="text-slate-700 hover:text-pink-500"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-700 hover:text-pink-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
