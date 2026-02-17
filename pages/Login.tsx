
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat, Lock, User } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Check against custom password in localStorage or default fallback
    const storedPassword = localStorage.getItem('adminPassword') || 'admin123';
    
    if (password === storedPassword) {
      sessionStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      alert(`Invalid password! Hint: ${storedPassword === 'admin123' ? 'admin123' : 'Check your saved credentials'}`);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-slate-100">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ChefHat size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500">Enter your credentials to manage Good Platters</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Access Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input 
                type="password" 
                required
                autoFocus
                className="w-full bg-slate-50 border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/20"
          >
            Login to Dashboard
          </button>
        </form>
        
        <p className="text-center mt-8 text-xs text-slate-400">
          Tip: Demo password is <code className="bg-slate-100 px-1 py-0.5 rounded">admin123</code> unless changed in Security settings.
        </p>
      </div>
    </div>
  );
};

export default Login;
