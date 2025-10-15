import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';

const galleryImages = [
  {
    title: 'Golden Dusk Bridal',
    description: 'Subtle glam with warm gold hues and soft waves.',
  src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
    category: 'Bridal'
  },
  {
    title: 'Classic Kandyan Elegance',
    description: 'Traditional Kandyan draping elevated with modern highlights.',
  src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80',
    category: 'Cultural'
  },
  {
    title: 'Chic Reception Glow',
    description: 'Statement reception look with luminous skin and peach tones.',
  src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80',
    category: 'Reception'
  },
  {
    title: 'Minimal Mehndi Grace',
    description: 'Effortless minimalism with soft smokey eyes and nude lips.',
  src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80',
    category: 'Mehndi'
  },
  {
    title: 'Garden Ceremony Bloom',
    description: 'Romantic updo with fresh florals for an outdoor ceremony.',
  src: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80',
    category: 'Outdoor'
  },
  {
    title: 'Editorial Couture',
    description: 'Bold, editorial glam for high-fashion bridal portraits.',
  src: 'https://images.unsplash.com/photo-1512757776216-dae2681a1480?auto=format&fit=crop&w=900&q=80',
    category: 'Editorial'
  }
];

const categories = ['All', 'Bridal', 'Reception', 'Cultural', 'Mehndi', 'Outdoor', 'Editorial'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') {
      return galleryImages;
    }
    return galleryImages.filter((image) => image.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-slate-900">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <section className="mt-16 space-y-12">
          <header className="space-y-3 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Gallery</span>
            <h1 className="font-serif text-4xl">A peek into our artistry</h1>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600">
              Curated moments from our bridal, reception, and editorial styling sessions. Once the media library API lands, these tiles will update automatically from your content hub.
            </p>
          </header>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const isActive = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${
                    isActive
                      ? 'border-pink-400 bg-pink-500 text-white shadow-md shadow-pink-200'
                      : 'border-pink-200 bg-white/70 text-slate-500 hover:border-pink-300 hover:text-pink-500'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image) => (
              <figure
                key={image.title}
                className="group relative overflow-hidden rounded-3xl border border-pink-100 bg-white/90 shadow-lg shadow-pink-100"
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <figcaption className="space-y-2 px-6 py-5">
                  <h3 className="font-serif text-xl text-slate-900">{image.title}</h3>
                  <p className="text-xs uppercase tracking-[0.3em] text-pink-400">{image.category}</p>
                  <p className="text-sm leading-relaxed text-slate-600">{image.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="flex flex-col items-center gap-4 rounded-3xl border border-pink-100 bg-white/90 px-8 py-10 text-center shadow-lg shadow-pink-100">
            <p className="text-xs uppercase tracking-[0.3em] text-pink-400">More looks incoming</p>
            <h2 className="font-serif text-2xl text-slate-900">Want to see the full album?</h2>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
              Tell us your ceremony palette and styling inspiration. Our concierge will curate a private gallery—complete with before & afters and artist notes—tailored to your brief.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-pink-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-pink-400"
            >
              Request personalised gallery
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Gallery;
