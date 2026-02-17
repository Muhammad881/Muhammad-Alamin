
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star, 
  Clock, 
  MapPin, 
  Award, 
  Heart, 
  ChefHat,
  ChevronRight,
  Utensils,
  Phone,
  MessageCircle
} from 'lucide-react';
import { storageService } from '../services/storage';

const Home = () => {
  const { settings } = storageService.getData();
  const whatsappUrl = `https://wa.me/${localStorage.getItem('whatsappNumber') || '919998524392'}`;

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80" 
            alt="Hero background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-2xl space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight font-serif">
              Where Every Platter <br />
              <span className="text-orange-500">Tells a Story</span>
            </h1>
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              Experience the perfect blend of local ingredients and modern culinary innovation. 
              {settings.tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/reservations" 
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/20"
              >
                Book a Table <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a 
                href={whatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white rounded-full font-bold text-lg hover:bg-green-600 transition-all shadow-xl hover:shadow-green-500/20"
              >
                <MessageCircle className="mr-2 w-5 h-5" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60">
            <div className="flex items-center gap-2">
              <Award className="w-8 h-8" />
              <span className="font-bold text-lg uppercase tracking-wider">Best Casual Dining 2023</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8" />
              <span className="font-bold text-lg uppercase tracking-wider">4.8 Rating on Google</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8" />
              <span className="font-bold text-lg uppercase tracking-wider">Farm to Table Local</span>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80" 
                alt="Restaurant Interior" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-100 rounded-3xl -z-0"></div>
              <div className="absolute top-10 left-10 bg-white p-8 rounded-2xl shadow-xl z-20 hidden md:block">
                <ChefHat className="w-10 h-10 text-orange-500 mb-4" />
                <h4 className="font-bold text-xl mb-1">Authentic Kitchen</h4>
                <p className="text-sm text-slate-500">100% Traditional Techniques</p>
              </div>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold font-serif leading-tight">
                A Dining Experience That <span className="text-orange-500">Feels Like Home</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                At {settings.brandName}, we believe food is the ultimate connector. Our atmosphere is designed 
                to encourage conversation, laughter, and a shared appreciation for culinary craftsmanship.
              </p>
              
              <ul className="space-y-4">
                {[
                  { icon: <Clock />, title: 'Fresh Daily', desc: 'Ingredients sourced from local markets every morning.' },
                  { icon: <MapPin />, title: 'Heart of the City', desc: 'Conveniently located for local families and visitors.' },
                  { icon: <Utensils />, title: 'Custom Menus', desc: 'Dietary-friendly options for vegans and gluten-free diets.' }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4">
                    <div className="bg-orange-100 p-3 rounded-xl text-orange-500 h-fit">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <Link 
                to="/about" 
                className="inline-block bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all shadow-lg"
              >
                Learn Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Utensils size={400} />
          </div>
          
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif mb-4">Guest Experiences</h2>
            <div className="flex justify-center gap-1 text-orange-500">
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
              <Star fill="currentColor" size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Jenkins", role: "Local Foodie", text: "The best Wagyu burger I've had in years. The atmosphere is just perfect for a Friday night out." },
              { name: "David Miller", role: "Regular Customer", text: "Service is impeccable. They remembered my gluten allergy without me even mentioning it on my second visit!" },
              { name: "Emma Watson", role: "Critical Diner", text: "The farm-to-table freshness really shows. Every dish was seasoned to perfection." }
            ].map((t, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                <p className="italic text-lg text-slate-300 mb-6">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{t.name}</h4>
                    <p className="text-sm text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Information Hub / Map Placeholder */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-bold font-serif mb-8">Where to Find Us</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="text-orange-500 shrink-0" />
                <p className="text-lg">{settings.address}</p>
              </div>
              <div className="flex gap-4">
                <Clock className="text-orange-500 shrink-0" />
                <div>
                  <p className="font-bold mb-1">Opening Hours</p>
                  <p className="text-slate-600">Mon - Fri: {settings.openingHours.weekday}</p>
                  <p className="text-slate-600">Sat - Sun: {settings.openingHours.weekend}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <MessageCircle className="text-green-500 shrink-0" />
                <div className="flex flex-col">
                  <p className="font-bold mb-1">Emergency / Quick Chat</p>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold hover:underline">WhatsApp Us Now</a>
                </div>
              </div>
              <div className="flex gap-4">
                <Phone className="text-orange-500 shrink-0" />
                <p className="text-lg">{settings.phone}</p>
              </div>
            </div>
            
            <div className="mt-12 bg-slate-50 p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 font-serif uppercase tracking-wider">Plan an Event</h3>
              <p className="text-slate-600 mb-6">Looking to host a private party or corporate lunch? We offer tailored packages and exclusive use of our VIP lounge.</p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="text-orange-500 font-bold flex items-center gap-2">
                  Inquire via Form <ChevronRight size={18} />
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold flex items-center gap-2">
                  Chat via WhatsApp <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-200 rounded-3xl min-h-[400px] flex items-center justify-center relative overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80" 
              className="absolute inset-0 w-full h-full object-cover opacity-80"
              alt="Map Placeholder"
            />
            <div className="relative z-10 bg-white/90 p-6 rounded-2xl shadow-xl flex items-center gap-3">
              <MapPin className="text-orange-500" />
              <span className="font-bold">Get Directions</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
