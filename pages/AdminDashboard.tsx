
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Utensils, 
  CalendarCheck, 
  MessageSquare, 
  Settings, 
  LogOut,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
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
  EyeOff
} from 'lucide-react';
import { storageService } from '../services/storage';
import { AppState, MenuItem, Reservation, ReservationStatus, Inquiry, RestaurantSettings } from '../types';
import { geminiService } from '../services/gemini';

// Making children optional to resolve TS prop validation errors in certain contexts
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
    { icon: <Utensils size={20} />, label: 'Menu Manager', path: '/admin/menu' },
    { icon: <CalendarCheck size={20} />, label: 'Reservations', path: '/admin/reservations' },
    { icon: <Mail size={20} />, label: 'Inquiries', path: '/admin/inquiries' },
    { icon: <Settings size={20} />, label: 'Site Settings', path: '/admin/settings' },
    { icon: <ShieldCheck size={20} />, label: 'Security', path: '/admin/security' },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
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

const DashboardOverview = () => {
  const [data, setData] = useState<AppState>(storageService.getData());

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
          <p className="text-slate-500">Here is what is happening at {data.settings.brandName} today.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-widest">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Reservations', value: data.reservations.length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Menu', value: data.menu.length, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Unread Messages', value: data.inquiries.length, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Pending Bookings', value: data.reservations.filter(r => r.status === ReservationStatus.PENDING).length, color: 'text-yellow-600', bg: 'bg-yellow-50' }
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
            {data.reservations.slice(0, 4).map(res => (
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
            Your website is optimized for local search results. Make sure to keep your menu and hours updated for better ranking.
          </p>
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

    // Validation
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

    // Auth logic
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';
    if (currentPassword !== storedPassword) {
      setError('Incorrect current password');
      return;
    }

    // Success
    localStorage.setItem('adminPassword', newPassword);
    setSuccess('Password updated successfully! Use your new password on next login.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const toggleShow = (key: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }));
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
              <button 
                type="button"
                onClick={() => toggleShow('current')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">New Password</label>
              <div className="relative">
                <input 
                  type={showPasswords.new ? 'text' : 'password'}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" 
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => toggleShow('new')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showPasswords.confirm ? 'text' : 'password'}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none" 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => toggleShow('confirm')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          </div>

          {error && <p className="text-sm font-bold text-red-500 bg-red-50 p-3 rounded-lg flex items-center gap-2"><X size={16} /> {error}</p>}
          {success && <p className="text-sm font-bold text-green-600 bg-green-50 p-3 rounded-lg flex items-center gap-2"><Check size={16} /> {success}</p>}

          <div className="pt-4">
            <button 
              type="submit"
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"
            >
              <ShieldCheck size={18} /> Update Password
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-2xl bg-slate-50 border-l-4 border-orange-500 p-6 rounded-r-2xl">
        <h4 className="font-bold text-slate-800 mb-2">Security Recommendation</h4>
        <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
          <li>Use a password with at least 8 characters including symbols.</li>
          <li>Do not share your admin credentials with anyone.</li>
          <li>Remember to sign out before leaving your computer.</li>
        </ul>
      </div>
    </div>
  );
};

const InquiryManager = () => {
  const [data, setData] = useState<AppState>(storageService.getData());
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateResponse = async (inquiry: Inquiry) => {
    setIsGenerating(true);
    const response = await geminiService.generateReviewResponse(inquiry.name, inquiry.message);
    setAiResponse(response);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Inquiries</h1>
        <p className="text-slate-500">Respond to customer messages and feedback</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-4">
          {data.inquiries.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center text-slate-400 font-medium">No inquiries yet.</div>
          ) : (
            data.inquiries.map(iq => (
              <button 
                key={iq.id}
                onClick={() => { setSelectedInquiry(iq); setAiResponse(''); }}
                className={`w-full text-left p-6 rounded-2xl transition-all border ${
                  selectedInquiry?.id === iq.id ? 'bg-orange-500 border-orange-500 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-800 hover:border-orange-200'
                }`}
              >
                <div className="font-bold truncate">{iq.subject}</div>
                <div className={`text-xs ${selectedInquiry?.id === iq.id ? 'text-white/80' : 'text-slate-400'}`}>From: {iq.name}</div>
              </button>
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
                   <button className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100">Dismiss</button>
                   <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg">
                     <Mail size={18} /> Send Response
                   </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-slate-100 rounded-3xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 font-medium">
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
        {/* Brand Info */}
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
            <div className="grid grid-cols-2 gap-4 pt-4">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Primary Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" className="w-10 h-10 rounded-lg cursor-pointer border-none" value={settings.primaryColor} onChange={e => setSettings({...settings, primaryColor: e.target.value})} />
                    <span className="text-sm font-mono text-slate-500">{settings.primaryColor}</span>
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Secondary Color</label>
                  <div className="flex gap-2 items-center">
                    <input type="color" className="w-10 h-10 rounded-lg cursor-pointer border-none" value={settings.secondaryColor} onChange={e => setSettings({...settings, secondaryColor: e.target.value})} />
                    <span className="text-sm font-mono text-slate-500">{settings.secondaryColor}</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6 flex flex-col">
          <h3 className="text-lg font-bold flex items-center gap-2 border-b pb-4"><Mail size={20} className="text-orange-500" /> Contact & Location</h3>
          <div className="space-y-4 flex-grow">
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
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">WhatsApp Phone Number</label>
                <input 
                  className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-green-500" 
                  placeholder="Enter full international number without + , 0, dashes (example: 919998524392)"
                  value={whatsappInput}
                  onChange={e => setWhatsappInput(e.target.value)}
                />
                <p className="text-[10px] text-slate-500">Use international format without + or 00. Example: 88017xxxxxxxx or 919998524392</p>
                {waError && <p className="text-xs text-red-500 font-medium">{waError}</p>}
                {waSuccess && <p className="text-xs text-green-600 font-medium">{waSuccess}</p>}
              </div>
              <button 
                onClick={handleSaveWhatsapp}
                className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-md"
              >
                Save WhatsApp Number
              </button>
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
          <h3 className="text-lg font-bold flex items-center gap-2 border-b border-white/10 pb-4"><TrendingUp size={20} className="text-orange-500" /> SEO & Social</h3>
          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Meta Description</label>
              <textarea 
                rows={3}
                className="w-full bg-white/10 border-none rounded-xl p-4 focus:ring-2 focus:ring-orange-500 outline-none resize-none text-sm"
                defaultValue="Modern casual dining experience offering farm-to-table freshness and locally inspired masterpieces in the heart of the city."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Facebook URL</label>
                <input className="w-full bg-white/10 border-none rounded-xl p-3 text-xs outline-none" defaultValue="facebook.com/goodplatters" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Instagram URL</label>
                <input className="w-full bg-white/10 border-none rounded-xl p-3 text-xs outline-none" defaultValue="instagram.com/goodplatters" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuManager = () => {
  const [menu, setMenu] = useState<MenuItem[]>(storageService.getData().menu);
  const [editingItem, setEditingItem] = useState<Partial<MenuItem> | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSave = () => {
    if (editingItem && editingItem.name) {
      const fullItem: MenuItem = {
        id: editingItem.id || Math.random().toString(36).substr(2, 9),
        name: editingItem.name,
        category: editingItem.category || 'Mains',
        price: editingItem.price || 0,
        description: editingItem.description || '',
        dietaryTags: editingItem.dietaryTags || [],
        image: editingItem.image || 'https://picsum.photos/400/300',
        isChefSpecial: editingItem.isChefSpecial || false
      };
      storageService.upsertMenuItem(fullItem);
      setMenu(storageService.getData().menu);
      setEditingItem(null);
    }
  };

  const handleAIDescription = async () => {
    if (!editingItem?.name || !editingItem?.category) return;
    setIsGenerating(true);
    const desc = await geminiService.generateMenuDescription(editingItem.name, editingItem.category);
    setEditingItem({...editingItem, description: desc});
    setIsGenerating(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Menu Manager</h1>
          <p className="text-slate-500">Create and edit your restaurant offerings</p>
        </div>
        <button 
          onClick={() => setEditingItem({})}
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus size={20} /> Add Item
        </button>
      </header>

      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">{editingItem.id ? 'Edit Item' : 'New Menu Item'}</h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>
            <div className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Name</label>
                  <input 
                    className="w-full bg-slate-50 border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500" 
                    value={editingItem.name || ''}
                    onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</label>
                  <select 
                    className="w-full bg-slate-50 border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500"
                    value={editingItem.category || ''}
                    onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                  >
                    <option value="Appetizers">Appetizers</option>
                    <option value="Mains">Mains</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</label>
                  <button 
                    onClick={handleAIDescription}
                    disabled={isGenerating || !editingItem.name}
                    className="text-xs font-bold text-orange-500 flex items-center gap-1 hover:underline disabled:opacity-50"
                  >
                    <Sparkles size={12} /> {isGenerating ? 'Generating...' : 'Generate with AI'}
                  </button>
                </div>
                <textarea 
                  rows={3}
                  className="w-full bg-slate-50 border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500 resize-none" 
                  value={editingItem.description || ''}
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Price ($)</label>
                  <input 
                    type="number"
                    className="w-full bg-slate-50 border-none rounded-xl p-3 outline-none focus:ring-2 focus:ring-orange-500" 
                    value={editingItem.price || 0}
                    onChange={e => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                  />
                </div>
                <div className="flex items-center pt-6 gap-2">
                  <input 
                    type="checkbox"
                    className="w-5 h-5 rounded text-orange-500 focus:ring-orange-500"
                    checked={editingItem.isChefSpecial || false}
                    onChange={e => setEditingItem({...editingItem, isChefSpecial: e.target.checked})}
                  />
                  <label className="text-sm font-medium">Chef's Special</label>
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setEditingItem(null)} className="px-6 py-2 rounded-lg font-bold text-slate-500 hover:bg-slate-200">Cancel</button>
              <button onClick={handleSave} className="px-8 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20">Save Item</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {menu.map(item => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} className="w-12 h-12 rounded-lg object-cover" />
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        {item.name}
                        {item.isChefSpecial && <Sparkles size={12} className="text-orange-500" />}
                      </div>
                      <div className="text-xs text-slate-400 truncate max-w-[200px]">{item.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{item.category}</span>
                </td>
                <td className="px-6 py-4 font-bold text-orange-600">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => setEditingItem(item)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-orange-500 transition-colors shadow-sm"><Edit size={16} /></button>
                    <button 
                      onClick={() => {
                        if(confirm('Delete item?')) {
                          storageService.deleteMenuItem(item.id);
                          setMenu(storageService.getData().menu);
                        }
                      }} 
                      className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition-colors shadow-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ReservationManager = () => {
  const [reservations, setReservations] = useState<Reservation[]>(storageService.getData().reservations);

  const updateStatus = (id: string, status: ReservationStatus) => {
    storageService.updateReservationStatus(id, status);
    setReservations(storageService.getData().reservations);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Reservations</h1>
        <p className="text-slate-500">Manage table bookings and guest requests</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
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
                          onClick={() => updateStatus(res.id, ReservationStatus.CONFIRMED)}
                          className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 shadow-sm"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => updateStatus(res.id, ReservationStatus.CANCELLED)}
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/menu" element={<MenuManager />} />
        <Route path="/reservations" element={<ReservationManager />} />
        <Route path="/inquiries" element={<InquiryManager />} />
        <Route path="/settings" element={<SettingsManager />} />
        <Route path="/security" element={<SecurityManager />} />
      </Routes>
    </AdminLayout>
  );
}
