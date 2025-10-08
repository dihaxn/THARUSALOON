import React from 'react';

const ServiceCard = ({ title, subtitle, description, price, duration, image, ctaLabel = 'View details', href = '#' }) => {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-pink-100 bg-white/80 shadow-xl shadow-pink-100 transition hover:-translate-y-1 hover:border-pink-200">
      {image ? (
        <div className="relative h-56 overflow-hidden">
          <img src={image} alt={title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500">
            {subtitle}
          </span>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-4 p-8">
        <header className="space-y-2">
          <h3 className="font-serif text-2xl text-slate-900">{title}</h3>
          <p className="text-sm leading-relaxed text-slate-600">{description}</p>
        </header>
        <dl className="mt-auto grid grid-cols-2 gap-3 text-sm text-slate-600">
          {price ? (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-pink-400">Investment</dt>
              <dd className="mt-1 font-serif text-xl text-slate-900">{price}</dd>
            </div>
          ) : null}
          {duration ? (
            <div>
              <dt className="text-xs uppercase tracking-[0.2em] text-pink-400">Duration</dt>
              <dd className="mt-1 font-serif text-xl text-slate-900">{duration}</dd>
            </div>
          ) : null}
        </dl>
        <div className="pt-2">
          <a
            href={href}
            className="inline-flex items-center gap-2 text-sm font-semibold text-pink-500 transition hover:text-pink-600"
          >
            {ctaLabel}
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
