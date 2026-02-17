
import React, { useState } from 'react';
import { storageService } from '../services/storage';

const FullMenu = () => {
  const { menu } = storageService.getData();
  const categories = Array.from(new Set(menu.map(item => item.category)));
  const [activeCategory, setActiveCategory] = useState<string | 'All'>('All');

  const filteredMenu = activeCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === activeCategory);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1920&q=80" alt="Menu bg" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6">Our Culinary Canvas</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            From farm-to-table freshness to globally inspired masterpieces, every dish is a celebration of flavor.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              activeCategory === 'All' 
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
              : 'bg-white text-slate-600 hover:bg-orange-100'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeCategory === cat 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' 
                : 'bg-white text-slate-600 hover:bg-orange-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16">
          {filteredMenu.map((item) => (
            <div key={item.id} className="flex gap-6 group">
              <div className="w-32 h-32 shrink-0 overflow-hidden rounded-2xl shadow-lg border-4 border-white">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex-grow pt-2 border-b border-slate-200 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-slate-800">{item.name}</h3>
                      {item.isChefSpecial && (
                        <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded border border-orange-200 uppercase">Chef's Choice</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {item.dietaryTags.map(tag => (
                        <span key={tag} className="text-[10px] bg-slate-200 text-slate-600 font-bold px-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <span className="text-xl font-serif text-orange-600 font-bold">${item.price.toFixed(2)}</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white rounded-3xl text-center shadow-xl border border-slate-100">
          <h2 className="text-2xl font-bold font-serif mb-4 uppercase tracking-widest">Dietary Legend</h2>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-500 font-medium">
            <span className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-200 rounded"></span> GF: Gluten-Free</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-200 rounded"></span> V: Vegetarian</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-200 rounded"></span> VG: Vegan</span>
            <span className="flex items-center gap-2"><span className="w-4 h-4 bg-slate-200 rounded"></span> DF: Dairy-Free</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullMenu;
