
import React from 'react';
import { storageService } from '../services/storage';

const About = () => {
  const { settings } = storageService.getData();

  return (
    <div className="bg-slate-50">
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={settings.storyImage} 
                alt="Our Culinary Story" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-white p-12 rounded-3xl shadow-2xl hidden md:block border border-slate-100">
              <h4 className="text-4xl font-serif font-bold text-orange-500 mb-1">15+</h4>
              <p className="text-slate-500 font-medium">Years of culinary <br />excellence</p>
            </div>
          </div>
          
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold font-serif leading-tight">
              Crafted with Passion, <br /><span className="text-orange-500">Served with Soul</span>
            </h1>
            <div className="prose prose-slate prose-lg max-w-none">
              {settings.storyText.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-lg text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="pt-8 grid grid-cols-2 gap-8 border-t border-slate-200">
              <div>
                <h4 className="font-bold text-xl mb-2">Our Vision</h4>
                <p className="text-slate-500 text-sm">To redefine casual dining as a premium yet accessible experience for all.</p>
              </div>
              <div>
                <h4 className="font-bold text-xl mb-2">Our Ethics</h4>
                <p className="text-slate-500 text-sm">Zero-waste kitchen practices and direct-from-farmer supply chain.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold font-serif mb-16">The Hands Behind the Flavors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: 'Marcus Sterling', role: 'Executive Chef', img: 'https://images.unsplash.com/photo-1583394238712-92d44993b3a4?auto=format&fit=crop&w=600&q=80' },
              { name: 'Elena Rossi', role: 'Head Pastry Chef', img: 'https://images.unsplash.com/photo-1595273670150-db0a3d39074f?auto=format&fit=crop&w=600&q=80' },
              { name: 'Sam Chen', role: 'Beverage Director', img: 'https://images.unsplash.com/photo-1556157382-9791f8d52f02?auto=format&fit=crop&w=600&q=80' }
            ].map(member => (
              <div key={member.name} className="space-y-4">
                <div className="aspect-square rounded-full overflow-hidden border-8 border-slate-50 shadow-xl mx-auto max-w-[280px]">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold">{member.name}</h4>
                  <p className="text-orange-500 font-bold uppercase tracking-widest text-xs">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
