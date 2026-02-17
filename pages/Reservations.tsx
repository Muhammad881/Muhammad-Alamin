
import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { dbService } from '../services/db';
import { ReservationStatus } from '../types';

const Reservations = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newReservation = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        status: ReservationStatus.PENDING,
        createdAt: new Date().toISOString()
      };
      
      await dbService.addReservation(newReservation);
      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Failed to save reservation:", error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={40} />
          </div>
          <h1 className="text-4xl font-bold font-serif">Table Requested!</h1>
          <p className="text-slate-600">
            Thank you, {formData.name}. We have received your reservation request for {formData.date} at {formData.time}. 
            Our team will review your request shortly.
          </p>
          <button 
            onClick={() => window.location.hash = '#/'} 
            className="w-full py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <h1 className="text-5xl font-bold font-serif mb-8 leading-tight">Book Your <span className="text-orange-500">Perfect Evening</span></h1>
          <p className="text-lg text-slate-600 mb-12">
            Whether it's a quiet romantic dinner or a lively family gathering, we have the perfect spot waiting for you. 
            For groups larger than 8, please call us directly.
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
              <div className="bg-orange-100 p-3 rounded-xl text-orange-500 h-fit">
                <Clock size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Flexible Timings</h4>
                <p className="text-slate-500 text-sm">We offer lunch and dinner service every day of the week.</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
              <div className="bg-orange-100 p-3 rounded-xl text-orange-500 h-fit">
                <Info size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Special Occasions</h4>
                <p className="text-slate-500 text-sm">Celebrating? Let us know! We offer birthday surprises and custom cakes.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-8 border-l-4 border-orange-500 bg-orange-50 rounded-r-2xl">
            <h4 className="font-bold mb-2">Policy Note:</h4>
            <p className="text-sm text-slate-600">We hold tables for 15 minutes past your booking time. Please notify us if you are running late.</p>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <input 
                        type="date" 
                        required
                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                      <select 
                        required
                        className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none appearance-none"
                        value={formData.time}
                        onChange={e => setFormData({...formData, time: e.target.value})}
                      >
                        <option value="">Select Time</option>
                        {['11:00', '12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Number of Guests</label>
                  <div className="relative">
                    <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                    <input 
                      type="number" 
                      min="1" 
                      max="20" 
                      required
                      className="w-full bg-slate-50 border-none rounded-xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                      value={formData.guests}
                      onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})}
                    />
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!formData.date || !formData.time}
                  className="w-full py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Continue <ChevronRight size={20} />
                </button>
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Jane Doe"
                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="jane@example.com"
                      className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 block">Phone</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Special Requests (Optional)</label>
                  <textarea 
                    rows={3}
                    placeholder="Dietary restrictions, anniversary notes, etc."
                    className="w-full bg-slate-50 border-none rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none resize-none"
                    value={formData.specialRequests}
                    onChange={e => setFormData({...formData, specialRequests: e.target.value})}
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-full font-bold hover:bg-slate-200 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-4 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/20 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Processing...' : 'Request Booking'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
