import React from 'react';
import NavBar from '../components/navBar.jsx';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <NavBar />
      <main className="pt-20 max-w-4xl mx-auto p-4">
  <h1 className="text-4xl font-bold text-blue-600">Welcome to Bloggy</h1>
  <p className="diagnostic-red mt-4 text-gray-600 dark:text-gray-300" style={{ color: '#e53e3e' }}>This is the home page. Redux was removed for now and routes are local.</p>
      </main>
    </div>
  );
}
