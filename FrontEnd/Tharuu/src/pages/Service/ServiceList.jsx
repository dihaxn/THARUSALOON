import React, { useMemo, useState } from 'react';
import Navbar from '../../components/layout/Navbar.jsx';
import Footer from '../../components/layout/Footer.jsx';
import ServiceCard from '../../components/common/ServiceCard.jsx';

const bridalServices = [
  {
    title: 'Kandyan Bridal Dressing',
    subtitle: 'Traditional Bridal',
    description:
      'Signature Kandyan bridal look with Osariya draping, traditional jewellery setting, and detailed hair styling. Includes bridal dressing and full-day assistance for the ceremony and reception.',
    price: 'LKR 55,000',
    duration: 'Full day support',
  image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Western Bridal Makeup & Styling',
    subtitle: 'Makeup & Hair',
    description:
      'HD or Airbrush makeup with luxury lashes, soft glam finish, and elegant updo or curls. Perfect for Western or destination weddings in Colombo, Galle, or Kandy.',
    price: 'LKR 42,000',
    duration: '3 hours',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Hindu Bridal Glam Package',
    subtitle: 'Cultural Bridal',
    description:
      'Traditional Hindu wedding styling with saree draping, temple jewellery placement, and floral hair artistry. Includes assistance during the “Muhurtham” ceremony.',
    price: 'LKR 49,000',
    duration: 'Full day support',
  image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Muslim Bridal Elegance',
    subtitle: 'Cultural Bridal',
    description:
      'Elegant bridal styling with soft matte makeup, modest hijab styling, and embellishment setup for Nikah or Walima ceremonies.',
    price: 'LKR 38,000',
    duration: '3.5 hours',
  image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Bridal Party Glam Squad',
    subtitle: 'Attendants',
    description:
      'Coordinated makeup and hair for bridesmaids, mothers, and flower girls. Ensures color harmony and theme consistency for your full bridal party.',
    price: 'LKR 10,500 / person',
    duration: '1.5 hours each',
  image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Groom’s Royal Dressing Package',
    subtitle: 'Groom Styling',
    description:
      'Complete groom dressing with national or Western attire, skincare prep, and hair styling. Includes jewellery, belt, and sword coordination for Kandyan or modern looks.',
    price: 'LKR 17,000',
    duration: '2 hours',
  image: 'https://images.unsplash.com/photo-1512757776216-dae2681a1480?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Destination Bridal Experience',
    subtitle: 'On-location',
    description:
      'Travel-ready stylist team for destination weddings in Kandy, Nuwara Eliya, Galle, or Bentota. Includes touch-ups and full-day companionship.',
    price: 'LKR 160,000',
    duration: '2 days travel',
    image: 'https://images.unsplash.com/photo-1602419740956-dc9fef09a1f0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Luxury Pre-Bridal Rituals',
    subtitle: 'Spa & Wellness',
    description:
      'Three-day spa package with herbal scrub, brightening facial, and relaxing head massage using Sri Lankan herbal blends to give you a natural glow.',
    price: 'LKR 48,000',
    duration: '3 days',
    image: 'https://images.unsplash.com/photo-1588287809331-3a68388c6b8b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Celebrity Makeup Artist Package',
    subtitle: 'Signature Artist',
    description:
      'Book Sri Lanka’s renowned bridal makeup artists (inspired by Hasini Gunasekera or Chandani Bandara) for luxury looks, advanced skin prep, and on-site touch-ups.',
    price: 'LKR 25,000',
    duration: 'Day-of artistry',
    image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=1200&q=80'
  }
];

const hairServices = [
  {
    title: 'Ladies Cut & Blow Dry',
    subtitle: 'Hair',
    description:
      'Precision haircut with professional blow dry and finishing for silky, frizz-controlled hair suited to Sri Lankan climate.',
    price: 'LKR 3,500',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Keratin Smoothing Treatment',
    subtitle: 'Hair',
    description:
      'Humidity-resistant keratin treatment to reduce frizz and soften curls while maintaining healthy movement and shine.',
    price: 'LKR 18,000',
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1490111718993-d98654ce6cf7?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Global Hair Colour',
    subtitle: 'Hair',
    description:
      'Ammonia-safe global colouring with tone consultation tailored for warm and neutral Sri Lankan skin tones.',
    price: 'LKR 9,500',
    duration: '2.5 hours',
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Root Touch-up & Gloss',
    subtitle: 'Hair',
    description:
      'Covers new growth and adds a glossy refresh to mid-lengths and ends for salon-styled vibrancy.',
    price: 'LKR 6,500',
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80'
  }
];

const nailsServices = [
  {
    title: 'Classic Manicure',
    subtitle: 'Nails',
    description:
      'Cuticle care, nail shaping, relaxing massage and polish in signature neutral or bright Sri Lankan shades.',
    price: 'LKR 2,200',
    duration: '45 minutes',
    image: 'https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Gel Polish Manicure',
    subtitle: 'Nails',
    description:
      'Long-wear gel finish with LED cure. Includes dry cuticle tidy and hydrating oil seal.',
    price: 'LKR 3,800',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1556228453-efd1e3f0b4f4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Spa Pedicure',
    subtitle: 'Nails',
    description:
      'Soothing foot soak, exfoliation, callus softening, massage and polish—perfect for tropical sandal season.',
    price: 'LKR 3,200',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1519014959394-6f2a9b8c9a3b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Acrylic Extensions (Short)',
    subtitle: 'Nails',
    description:
      'Natural-looking acrylic tips with gentle apex and gel topcoat for durable everyday wear.',
    price: 'LKR 7,500',
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1617137968427-85924c800a3a?auto=format&fit=crop&w=1200&q=80'
  }
];

const skinServices = [
  {
    title: 'Brightening Herbal Facial',
    subtitle: 'Skin',
    description:
      'Herbal-infused treatment to even tone and add radiance—gentle actives suited for Sri Lankan skin.',
    price: 'LKR 5,500',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1553547270-d5b3f66bafe9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Deep Cleansing Facial',
    subtitle: 'Skin',
    description:
      'Purifying cleanse, steam and extraction followed by soothing mask to calm humidity-induced congestion.',
    price: 'LKR 6,500',
    duration: '1 hour 15 minutes',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'HydraGlow Boost',
    subtitle: 'Skin',
    description:
      'Hydration-boosting therapy with hyaluronic layers and cooling globe massage for instant plumpness.',
    price: 'LKR 7,200',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Bridal Pre-Event Facial',
    subtitle: 'Skin',
    description:
      'Gentle enzyme polish with brightening mask and lymphatic massage to prep for photography.',
    price: 'LKR 8,500',
    duration: '1 hour 15 minutes',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
  }
];

const waxingServices = [
  {
    title: 'Full Arms Wax',
    subtitle: 'Waxing',
    description:
      'Warm wax hair removal with soothing post-care—quick, hygienic and gentle on skin.',
    price: 'LKR 2,800',
    duration: '30 minutes',
    image: 'https://images.unsplash.com/photo-1616394584738-c8b2f9d24d82?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Half Legs Wax',
    subtitle: 'Waxing',
    description:
      'Lower legs waxing using flexible strip wax for smooth, even finish.',
    price: 'LKR 2,400',
    duration: '25 minutes',
    image: 'https://images.unsplash.com/photo-1616394584706-4a2a7ef55d59?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Underarms Wax',
    subtitle: 'Waxing',
    description:
      'Quick underarm cleanup with gentle formula and talc-free finish.',
    price: 'LKR 1,200',
    duration: '10 minutes',
    image: 'https://images.unsplash.com/photo-1616394584712-0f7b2fe7e5e1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Full Body Wax (Women)',
    subtitle: 'Waxing',
    description:
      'Comprehensive session including arms, legs, underarms and back as requested.',
    price: 'LKR 9,800',
    duration: '1.5 - 2 hours',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9b7d79?auto=format&fit=crop&w=1200&q=80'
  }
];

const bodyServices = [
  {
    title: 'Aromatherapy Body Massage',
    subtitle: 'Body',
    description:
      'Relaxing full-body massage with Ceylon essential oils to melt stress and improve sleep.',
    price: 'LKR 6,000',
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Herbal Body Scrub & Polish',
    subtitle: 'Body',
    description:
      'Coconut and rice-bran exfoliation with herbal infusion for bright, smooth skin.',
    price: 'LKR 5,200',
    duration: '45 minutes',
    image: 'https://images.unsplash.com/photo-1540555700478-4c3b1c2c7a2d?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Back Detox Ritual',
    subtitle: 'Body',
    description:
      'Purifying back cleanse with steam, exfoliation and clay mask ideal for humid weather.',
    price: 'LKR 4,800',
    duration: '45 minutes',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70c1f27ab?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Head, Neck & Shoulder Massage',
    subtitle: 'Body',
    description:
      'Targeted tension relief for office fatigue and bridal prep days.',
    price: 'LKR 3,000',
    duration: '30 minutes',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=80'
  }
];

const kidsServices = [
  {
    title: 'Kids Haircut (Under 10)',
    subtitle: 'Kids',
    description:
      'Friendly stylists and gentle tools for stress-free, neat haircuts for little ones.',
    price: 'LKR 1,500',
    duration: '30 minutes',
    image: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Flower Girl Styling',
    subtitle: 'Kids',
    description:
      'Simple curls or braid with light accessory placement for weddings and events.',
    price: 'LKR 3,500',
    duration: '45 minutes',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Kids Mini Mani',
    subtitle: 'Kids',
    description:
      'Non-toxic polish with cute colours; quick tidy and moisture seal.',
    price: 'LKR 1,200',
    duration: '20 minutes',
    image: 'https://images.unsplash.com/photo-1518131678677-a06ff964c6e0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    title: 'Party Hair Braiding',
    subtitle: 'Kids',
    description:
      'Fun braids with ribbons or beads for birthdays and school events.',
    price: 'LKR 2,000',
    duration: '30 minutes',
    image: 'https://images.unsplash.com/photo-1596464716121-5b5a8b7a1b7e?auto=format&fit=crop&w=1200&q=80'
  }
];

// price and duration helpers removed; category-only filtering
const ServiceList = () => {
  // Show nothing initially; reveal services only after category selection
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Only these categories are available as filters
  const categories = useMemo(
    () => ['Hair', 'Nails', 'Skin', 'Bridal', 'waxing', 'body', 'kids'],
    []
  );

  // Map categories to their services; currently only Bridal has detailed items
  const servicesByCategory = useMemo(
    () => ({
      Hair: hairServices,
      Nails: nailsServices,
      Skin: skinServices,
      Bridal: bridalServices,
      waxing: waxingServices,
      body: bodyServices,
      kids: kidsServices
    }),
    []
  );

  const currentServices = useMemo(() => {
    if (!selectedCategory) return [];
    return servicesByCategory[selectedCategory] ?? [];
  }, [selectedCategory, servicesByCategory]);

  return (
    <div className="min-h-screen bg-[#FFF9F9] text-slate-800">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-24">
        <section className="mt-16 rounded-3xl bg-white/80 p-10 shadow-2xl shadow-pink-100">
          <div className="space-y-4 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-pink-500">Service catalogue</span>
            <h1 className="font-serif text-4xl text-slate-900">Curated bridal experiences</h1>
            <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-600">
              Select from our signature experiences or combine them for a bespoke celebration. All services include a pre-event consultation and personalised lookbook delivered by our concierge team.
            </p>
          </div>

          <section className="mt-10 space-y-6 rounded-2xl border border-pink-100 bg-white/70 p-6 backdrop-blur">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-pink-400">Browse by category</h2>
                <p className="mt-1 text-sm text-slate-500">Click a category to view available services.</p>
              </div>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="self-start rounded-full border border-pink-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-pink-500 transition hover:border-pink-300 hover:text-pink-600"
                >
                  Clear selection
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">Categories</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selectedCategory === category
                          ? 'border-pink-400 bg-pink-50 font-semibold text-pink-600 shadow-sm'
                          : 'border-pink-100 bg-white/80 text-slate-600 hover:border-pink-200 hover:text-pink-500'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {selectedCategory && (
            <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {currentServices.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-pink-200 bg-white/70 p-12 text-center text-slate-500 md:col-span-2 xl:col-span-3">
                  <p className="text-lg font-semibold text-slate-600">No services available in this category yet.</p>
                </div>
              ) : (
                currentServices.map((service) => (
                  <ServiceCard key={service.title} {...service} href="/bookings/new" ctaLabel="Plan with stylist" />
                ))
              )}
            </div>
          )}
          
        </section>

        <section className="mt-20 rounded-3xl border border-pink-100 bg-gradient-to-r from-pink-50 via-white to-purple-50 p-10 text-center shadow-xl shadow-pink-100">
          <h2 className="font-serif text-3xl text-slate-900">Need a custom package?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Our creative directors craft tailored experiences for Sri Lankan, Western, Hindu, and fusion ceremonies. Share your venue, size, and vision — we will design a styling journey aligned to your traditions.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a href="/bookings/new" className="inline-flex items-center rounded-full bg-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-600">
              Book discovery call
            </a>
            <a href="mailto:hello@tharubridals.lk" className="inline-flex items-center rounded-full border border-pink-200 px-6 py-3 text-sm font-semibold text-pink-600 transition hover:border-pink-400 hover:text-pink-700">
              Email concierge team
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ServiceList;
