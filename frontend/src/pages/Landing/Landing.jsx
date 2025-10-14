import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="text-center">
        <h1 className="mb-4 font-serif text-6xl font-bold text-slate-900">
          Tharu Bridal Studio
        </h1>
        <p className="mb-8 text-xl text-slate-600">
          Your dream wedding starts here
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/home"
            className="rounded-lg bg-pink-500 px-8 py-3 text-lg font-semibold text-white shadow-lg hover:bg-pink-600"
          >
            Enter Site
          </Link>
          <Link
            to="/register"
            className="rounded-lg border-2 border-pink-500 bg-white px-8 py-3 text-lg font-semibold text-pink-500 shadow-lg hover:bg-pink-50"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
