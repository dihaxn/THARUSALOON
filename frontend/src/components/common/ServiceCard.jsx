import React from 'react';

export default function ServiceCard({ service, onBook }) {
  return (
    <div className="rounded-lg border border-pink-100 bg-white p-6 shadow-md transition hover:shadow-lg">
      <h3 className="mb-2 text-xl font-semibold text-slate-900">{service.name}</h3>
      <p className="mb-2 text-sm text-slate-600">Category: {service.category}</p>
      <p className="mb-2 text-sm text-slate-600">Duration: {service.duration} mins</p>
      <p className="mb-4 text-2xl font-bold text-pink-500">${service.price}</p>
      {onBook && (
        <button
          onClick={() => onBook(service)}
          className="w-full rounded-lg bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600"
        >
          Book Now
        </button>
      )}
    </div>
  );
}
