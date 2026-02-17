
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Calendar, 
  LayoutDashboard, 
  ChevronRight,
  UtensilsCrossed,
  ChefHat,
  Image as ImageIcon,
  MessageCircle
} from 'lucide-react';

import Home from './pages/Home';
import Reservations from './pages/Reservations';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Legal from './pages/Legal';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { storageService } from './services/storage';
import { AppState } from './types';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Reservations', path: '/reservations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Our Story', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2">
            <UtensilsCrossed className="w-8 h-8 text-orange-500" />
            <span className="text-2xl font-bold tracking-tight text-slate-800 font-serif">Good Platters</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-orange-500' : 'text-slate-600 hover:text-orange-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reservations"
              className="bg-orange-500 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Book a Table
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-orange-500 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-3 py-2 text-slate-600 hover:text-orange-500 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/reservations"
              className="block px-3 py-3 text-center bg-orange-500 text-white rounded-md font-semibold mt-4"
              onClick={() => setIsOpen(false)}
            >
              Book a Table
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const [settings, setSettings] = useState(storageService.getData().settings);
  const whatsappUrl = `https://wa.me/${localStorage.getItem('whatsappNumber') || '919998524392'}`;

  if (isAdmin) return null;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-white">
            <UtensilsCrossed className="w-6 h-6 text-orange-500" />
            <span className="text-xl font-bold font-serif">{settings.brandName}</span>
          </div>
          <p className="text-sm leading-relaxed">
            {settings.tagline}
          </p>
          <div className="flex space-x-4 pt-2">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" title="WhatsApp Us"><MessageCircle size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/reservations" className="hover:text-white transition-colors">Book a Table</Link></li>
            <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Opening Hours</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between">
              <span>Mon - Fri</span>
              <span>{settings.openingHours.weekday}</span>
            </li>
            <li className="flex justify-between">
              <span>Sat - Sun</span>
              <span>{settings.openingHours.weekend}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-orange-500 shrink-0" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle size={18} className="text-green-500 shrink-0" />
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Chat</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500 shrink-0" />
              <span>{settings.phone}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-500 shrink-0" />
              <span>{settings.email}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Good Platters. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/legal" className="hover:text-white">Privacy Policy</Link>
            <Link to="/legal" className="hover:text-white">Terms of Service</Link>
            <Link to="/login" className="hover:text-white flex items-center gap-1 opacity-50 hover:opacity-100">
              <ChefHat size={12} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
