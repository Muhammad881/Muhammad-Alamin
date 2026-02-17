
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Settings, 
  LogOut,
  TrendingUp,
  Check,
  X,
  Sparkles,
  Mail,
  Smartphone,
  MapPin,
  Clock,
  Globe,
  ExternalLink,
  MessageCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  Trash2,
  BookOpen,
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { storageService } from './services/storage';
import { dbService } from './services/db';
import { Reservation, ReservationStatus, Inquiry, RestaurantSettings } from './types';
import { geminiService } from './services/gemini';

const AdminLayout = ({ children }: { children?: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (sessionStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    }
  }, []);

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
    { icon: <CalendarCheck size={20} />, label: 'Reservations', path: '/admin/reservations' },
    { icon: <BookOpen size={20} />, label: 'Edit Our Story', path: '/admin/story' },
    { icon: <Mail size={20} />, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: <Settings size={20} />, label: 'Site Settings', path: '/admin/settings' },
    { icon: <ShieldCheck size={20} />, label: 'Security', path: '/admin/security' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <aside className="w-64 bg-slate-900 text-white fixed h-full z-30 shadow-2xl flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold font-serif flex items-center gap-2 mb-4">
            <Settings className="text-orange-500" /> Admin CMS
          </h2>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors group"
          >
            <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            View Public Site
          </Link>
        </div>
        
        <nav className="mt-6 px-4 space-y-1 flex-grow overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium text-sm">Sign Out & Exit</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const StoryManager = () => {
  const [settings, setSettings] = useState<RestaurantSettings>(storageService.getData().settings);
  const [isSaved, setIsSaved] = useState(false);
  const [imagePreview, setImagePreview] = useState(settings.storyImage);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setSettings({ ...settings, storyImage: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    storageService.updateSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Edit Our Story</h1>
          <p className="text-slate-500">Update the image and narrative that represents your heritage</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
        >
          {isSaved ? <Check size={20} /> : <Upload size={20} />}
          {isSaved ? 'Story Saved!' : 'Save Story'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Story Content */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4">
            <BookOpen size={20} className="text-orange-500" /> Narrative Text
          </h3>
          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">The Story</label>
            <textarea 
              rows={12}
              className="w-full bg-slate-50 border-none rounded-2xl p-6 outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none text-slate-700 leading-relaxed" 
              placeholder="Write our story here... (use double Enter for new paragraphs)"
              value={settings.storyText}
              onChange={e => setSettings({...settings, storyText: e.target.value})}
            />
            <p className="text-xs text-slate-400 italic">Tip: Use blank lines between paragraphs to format them correctly on the public page.</p>
          </div>
        </div>

        {/* Story Image */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4">
            <ImageIcon size={20} className="text-orange-500" /> Story Image
          </h3>
          <div className="space-y-6">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 border-2 border-dashed border-slate-200 group">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <ImageIcon size={48} className="mb-2 opacity-20" />
                  <p className="text-sm">No image selected</p>
                </div>
              )}
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white font-bold gap-2">
                <Upload size={24} />
                Change Image
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-2xl flex items-start gap-4">
              <Sparkles className="text-orange-500 shrink-0 mt-1" size={20} />
              <div>
                <h4 className="font-bold text-orange-900 text-sm">Visual Tip</h4>
                <p className="text-orange-800 text-xs leading-relaxed">
                  Use a vertical (portrait) image of your kitchen, founder, or signature atmosphere for the best presentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const settings = storageService.getData().settings;

  useEffect(() => {
    const fetchData = async () => {
      const res = await dbService.getAllReservations();
      const inq = await dbService.getAllInquiries();
      setReservations(res);
      setInquiries(inq);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500">Here is what is happening at {settings.brandName} today.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Reservations', value: reservations.length, color: 'text-blue-600' },
          { label: 'Total Inquiries', value: inquiries.length, color: 'text-purple-600' },
          { label: 'Pending Bookings', value: reservations.filter(r => r.status === ReservationStatus.PENDING).length, color: 'text-yellow-600' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
            <div className={`text-4xl font-black ${stat.color}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center gap-2"><CalendarCheck className="text-orange-500" /> Recent Bookings</h3>
            <Link to="/admin/reservations" className="text-orange-500 text-xs font-bold hover:underline">Manage All</Link>
          </div>
          <div className="space-y-4">
            {reservations.slice(0, 4).map(res => (
              <div key={res.id} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div>
                  <div className="font-bold text-slate-800">{res.name}</div>
                  <div className="text-xs text-slate-500">{res.date} • {res.time}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400">{res.guests} Guests</span>
                  <div className={`w-2 h-2 rounded-full ${res.status === ReservationStatus.CONFIRMED ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
                </div>
              </div>
            ))}
            {reservations.length === 0 && <p className="text-center text-slate-400 text-sm italic">No bookings yet.</p>}
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col justify-between">
          <Globe className="absolute -top-10 -right-10 text-orange-500 opacity-20" size={200} />
          <div>
            <h3 className="text-2xl font-bold mb-4 font-serif">Quick Site Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-2xl">
                <div className="text-xs text-slate-400 uppercase font-bold mb-1">SEO Health</div>
                <div className="text-xl font-bold text-green-400">98%</div>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl">
                <div className="text-xs text-slate-400 uppercase font-bold mb-1">Page Speed</div>
                <div className="text-xl font-bold text-orange-400">A+</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-slate-400 mt-8">
            Your website is optimized for local search results. Make sure to keep your details updated for better ranking.
          </p>
        </div>
      </div>
    </div>
  );
};

const InquiryManager = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dbService.getAllInquiries();
      setInquiries(data);
    };
    fetchData();
  }, []);

  const handleGenerateResponse = async (inquiry: Inquiry) => {
    setIsGenerating(true);
    const response = await geminiService.generateReviewResponse(inquiry.name, inquiry.message);
    setAiResponse(response);
    setIsGenerating(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      await dbService.deleteInquiry(id);
      setInquiries(prev => prev.filter(i => i.id !== id));
      if (selectedInquiry?.id === id) setSelectedInquiry(null);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Inquiries</h1>
        <p className="text-slate-500">Respond to customer messages and feedback</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto pr-2">
          {inquiries.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center text-slate-400 font-medium">No inquiries yet.</div>
          ) : (
            inquiries.map(iq => (
              <div key={iq.id} className="relative group">
                <button 
                  onClick={() => { setSelectedInquiry(iq); setAiResponse(''); }}
                  className={`w-full text-left p-6 rounded-2xl transition-all border ${
                    selectedInquiry?.id === iq.id ? 'bg-orange-500 border-orange-500 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-800 hover:border-orange-200'
                  }`}
                >
                  <div className="font-bold truncate pr-6">{iq.subject}</div>
                  <div className={`text-xs ${selectedInquiry?.id === iq.id ? 'text-white/80' : 'text-slate-400'}`}>From: {iq.name}</div>
                  <div className={`text-[10px] mt-1 ${selectedInquiry?.id === iq.id ? 'text-white/60' : 'text-slate-400'}`}>{new Date(iq.date).toLocaleString()}</div>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDelete(iq.id); }}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-2">
          {selectedInquiry ? (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="border-b pb-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-1">{selectedInquiry.subject}</h3>
                  <p className="text-slate-500 text-sm">Sent by <span className="font-bold text-slate-800">{selectedInquiry.name}</span> ({selectedInquiry.email})</p>
                </div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{new Date(selectedInquiry.date).toLocaleDateString()}</div>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl text-slate-700 leading-relaxed italic">
                "{selectedInquiry.message}"
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800">Compose Response</h4>
                  <button 
                    onClick={() => handleGenerateResponse(selectedInquiry)}
                    disabled={isGenerating}
                    className="text-orange-500 text-xs font-bold flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    <Sparkles size={14} /> {isGenerating ? 'Generating...' : 'AI Suggestions'}
                  </button>
                </div>
                <textarea 
                  rows={6}
                  value={aiResponse}
                  onChange={e => setAiResponse(e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-2xl p-6 outline-none focus:ring-2 focus:ring-orange-500 transition-all resize-none text-slate-700"
                  placeholder="Type your response here..."
                ></textarea>
                <div className="flex justify-end gap-3">
                   <button onClick={() => setSelectedInquiry(null)} className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Dismiss</button>
                   <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
                     <Mail size={18} /> Send Response
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium min-h-[400px]">
              Select an inquiry to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SettingsManager = () => {
  const [settings, setSettings] = useState<RestaurantSettings>(storageService.getData().settings);
  const [isSaved, setIsSaved] = useState(false);
  const [whatsappInput, setWhatsappInput] = useState(localStorage.getItem('whatsappNumber') || '919998524392');
  const [waError, setWaError] = useState('');
  const [waSuccess, setWaSuccess] = useState('');

  const handleSave = () => {
    storageService.updateSettings(settings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleSaveWhatsapp = () => {
    if (/^\d{8,15}$/.test(whatsappInput)) {
      localStorage.setItem('whatsappNumber', whatsappInput);
      setWaSuccess('WhatsApp number updated');
      setWaError('');
      setTimeout(() => setWaSuccess(''), 3000);
    } else {
      setWaError('Please enter a valid phone number (digits only, 8–15 characters)');
      setWaSuccess('');
    }
  };

  return (
    <div className="space-y-8 pb-24">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Site Settings</h1>
          <p className="text-slate-500">Configure your brand identity and global info</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-orange-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
        >
          {isSaved ? 'Settings Saved!' : 'Save Changes'}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4"><Globe size={20} className="text-orange-500" /> Branding</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Restaurant Name</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500" 
                value={settings.brandName}
                onChange={e => setSettings({...settings, brandName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tagline</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500" 
                value={settings.tagline}
                onChange={e => setSettings({...settings, tagline: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6 flex flex-col">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4"><Mail size={20} className="text-orange-500" /> Contact & Location</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Smartphone size={12} /> Phone</label>
                <input 
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500" 
                  value={settings.phone}
                  onChange={e => setSettings({...settings, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><Mail size={12} /> Email</label>
                <input 
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500" 
                  value={settings.email}
                  onChange={e => setSettings({...settings, email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1"><MapPin size={12} /> Address</label>
              <textarea 
                rows={2}
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 resize-none" 
                value={settings.address}
                onChange={e => setSettings({...settings, address: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h4 className="text-sm font-bold flex items-center gap-2 mb-4"><MessageCircle size={18} className="text-green-500" /> Edit WhatsApp Number</h4>
            <div className="space-y-4">
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-green-500" 
                placeholder="International number (e.g. 919998524392)"
                value={whatsappInput}
                onChange={e => setWhatsappInput(e.target.value)}
              />
              <button 
                onClick={handleSaveWhatsapp}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md"
              >
                Save WhatsApp
              </button>
              {waSuccess && <p className="text-xs text-green-600 font-medium">{waSuccess}</p>}
              {waError && <p className="text-xs text-red-500 font-medium">{waError}</p>}
            </div>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4"><Clock size={20} className="text-orange-500" /> Hours</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekdays (Mon-Fri)</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500" 
                value={settings.openingHours.weekday}
                onChange={e => setSettings({...settings, openingHours: {...settings.openingHours, weekday: e.target.value}})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekends (Sat-Sun)</label>
              <input 
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500" 
                value={settings.openingHours.weekend}
                onChange={e => setSettings({...settings, openingHours: {...settings.openingHours, weekend: e.target.value}})}
              />
            </div>
          </div>
        </div>
        
        {/* SEO Settings */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 relative overflow-hidden">
          <TrendingUp className="absolute -bottom-10 -right-10 text-orange-500 opacity-20" size={150} />
          <h3 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-4"><TrendingUp size={20} className="text-orange-500" /> SEO Settings</h3>
          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Meta Description</label>
              <textarea 
                rows={3}
                className="w-full bg-white/10 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none resize-none text-sm"
                defaultValue="Modern casual dining experience offering farm-to-table freshness and locally inspired masterpieces in the heart of the city."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReservationManager = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await dbService.getAllReservations();
      setReservations(data);
    };
    fetchData();
  }, []);

  const updateStatus = async (res: Reservation, status: ReservationStatus) => {
    const updated = { ...res, status };
    await dbService.updateReservation(updated);
    setReservations(prev => prev.map(r => r.id === res.id ? updated : r));
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Reservations</h1>
        <p className="text-slate-500">Manage table bookings and guest requests</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-4">Guest</th>
                <th className="px-6 py-4">Booking</th>
                <th className="px-6 py-4">Guests</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reservations.map(res => (
                <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold">{res.name}</div>
                    <div className="text-xs text-slate-400">{res.email}</div>
                    <div className="text-xs text-slate-400">{res.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium">{res.date}</div>
                    <div className="text-sm text-slate-500">{res.time}</div>
                  </td>
                  <td className="px-6 py-4 font-bold">{res.guests}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                      res.status === ReservationStatus.CONFIRMED ? 'bg-green-100 text-green-600' : 
                      res.status === ReservationStatus.CANCELLED ? 'bg-red-100 text-red-600' : 
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {res.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {res.status === ReservationStatus.PENDING && (
                        <>
                          <button 
                            onClick={() => updateStatus(res, ReservationStatus.CONFIRMED)}
                            className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 shadow-sm"
                          >
                            <Check size={16} />
                          </button>
                          <button 
                            onClick={() => updateStatus(res, ReservationStatus.CANCELLED)}
                            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow-sm"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {reservations.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">No reservations found in the database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const SecurityManager = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters long');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';
    if (currentPassword !== storedPassword) {
      setError('Incorrect current password');
      return;
    }

    localStorage.setItem('adminPassword', newPassword);
    setSuccess('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Security Settings</h1>
        <p className="text-slate-500">Manage your administrative access credentials</p>
      </header>

      <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <form onSubmit={handleUpdatePassword} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Current Password</label>
            <div className="relative">
              <input 
                type={showPasswords.current ? 'text' : 'password'}
                className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" 
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
              />
              <button type="button" onClick={() => setShowPasswords({...showPasswords, current: !showPasswords.current})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Password</label>
              <div className="relative">
                <input 
                  type={showPasswords.new ? 'text' : 'password'}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPasswords({...showPasswords, new: !showPasswords.new})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm New</label>
              <div className="relative">
                <input 
                  type={showPasswords.confirm ? 'text' : 'password'}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button type="button" onClick={() => setShowPasswords({...showPasswords, confirm: !showPasswords.confirm})} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>
          {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
          {success && <p className="text-xs text-green-600 font-bold">{success}</p>}
          <button type="submit" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all">
            <ShieldCheck size={18} /> Update Security
          </button>
        </form>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/reservations" element={<ReservationManager />} />
        <Route path="/story" element={<StoryManager />} />
        <Route path="/inquiries" element={<InquiryManager />} />
        <Route path="/settings" element={<SettingsManager />} />
        <Route path="/security" element={<SecurityManager />} />
      </Routes>
    </AdminLayout>
  );
}
