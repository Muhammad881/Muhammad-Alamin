
import React from 'react';

const GALLERY_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', title: 'Elegant Dining Area', category: 'Interior' },
  { url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80', title: 'Cozy Booths', category: 'Interior' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80', title: 'Chef at Work', category: 'Action' },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', title: 'Signature Platter', category: 'Food' },
  { url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?auto=format&fit=crop&w=800&q=80', title: 'Fresh Seafood', category: 'Food' },
  { url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80', title: 'Artisan Burger', category: 'Food' },
  { url: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?auto=format&fit=crop&w=800&q=80', title: 'Farm-to-Table Veggies', category: 'Food' },
  { url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80', title: 'Dessert Selection', category: 'Food' },
  { url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80', title: 'Craft Cocktails', category: 'Drinks' },
];

const Gallery = () => {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1920&q=80" alt="Gallery bg" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">Visual Journey</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            A glimpse into our kitchen, our atmosphere, and the art of modern dining.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-3xl shadow-lg break-inside-avoid">
              <img 
                src={img.url} 
                alt={img.title} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">{img.category}</span>
                <h3 className="text-white text-xl font-bold font-serif">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
