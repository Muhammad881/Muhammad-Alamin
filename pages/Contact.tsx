
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { dbService } from '../services/db';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const whatsappUrl = `https://wa.me/${localStorage.getItem('whatsappNumber') || '919998524392'}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const newInquiry = { 
        ...formData, 
        id: Date.now().toString(), 
        date: new Date().toISOString() 
      };
      
      await dbService.addInquiry(newInquiry);
      setIsSending(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error("Failed to save inquiry:", error);
      setIsSending(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h1 className="text-5xl font-bold font-serif mb-6">Get in Touch</h1>
          <p className="text-lg text-slate-600">Have a question or looking to host an event? We'd love to hear from you. Reach out via the form below or our direct channels.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-8">Contact Info</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-500 rounded-xl flex items-center justify-center shrink-0">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp Us</p>
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-green-600 hover:underline">Chat Now</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Call Us</p>
                    <p className="font-bold">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Us</p>
                    <p className="font-bold">hello@goodplatters.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visit Us</p>
                    <p className="font-bold">123 Culinary Ave, Foodie City, FC 54321</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 text-white p-8 rounded-3xl">
              <h4 className="font-bold mb-4">Newsletter</h4>
              <p className="text-sm text-slate-400 mb-6">Subscribe to get seasonal updates and special event invitations.</p>
              <div className="flex gap-2">
                <input className="bg-white/10 border-none rounded-lg px-4 py-2 text-sm grow outline-none focus:ring-2 focus:ring-orange-500" placeholder="Email" />
                <button className="bg-orange-500 p-2 rounded-lg"><Send size={18} /></button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
            {isSent ? (
              <div className="text-center py-20 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                  <Send size={40} />
                </div>
                <h3 className="text-3xl font-bold">Message Sent!</h3>
                <p className="text-slate-500">We appreciate you reaching out. Our team will get back to you within 24 hours.</p>
                <div className="flex flex-col gap-4">
                  <button onClick={() => setIsSent(false)} className="text-orange-500 font-bold">Send another message</button>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold flex items-center justify-center gap-2">
                    <MessageCircle size={18} /> Need an immediate reply? WhatsApp us.
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Name</label>
                    <input 
                      required
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input 
                      type="email" 
                      required
                      className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Subject</label>
                  <input 
                    required
                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
                    value={formData.subject}
                    onChange={e => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Message</label>
                  <textarea 
                    rows={6}
                    required
                    className="w-full bg-slate-50 border-none rounded-xl py-4 px-4 outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none" 
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  disabled={isSending}
                  className="w-full py-5 bg-orange-500 text-white rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 disabled:opacity-50"
                >
                  {isSending ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
