import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, Loader2 } from 'lucide-react';
import logo from '../assets/logo.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const user = await login(email, password);
      // Logic el navigation
      if (user.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Email ou mot de passe incorrect. Réessayez.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        {/* Logo Section */}
<div className="text-center mb-10 pt-2">
  <div className="flex justify-center mb-4">
    {/* Na77ina el bg-white wel shadow bech el logo may-bannech "talsig" */}
    <div className="relative group">
      <img 
        src={logo} 
        alt="TunisiMed Logo" 
        className="h-32 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
      />
      {/* Effect khfif ta7t el logo bech i-raddou "Integrated" */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-blue-500/20 blur-xl rounded-full"></div>
    </div>
  </div>

  {/* Ken el logo fih ktaba, na77i el <h1> elli ta7tou bech ma t-jich m3awda */}
  <p className="text-slate-400 text-xs uppercase tracking-[0.3em] font-semibold mt-4">
    Digital Gateway
  </p>
</div>

        {/* Card Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
          <h2 className="text-xl font-bold text-slate-700 mb-6">Connexion</h2>

          {error && (
            <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm animate-shake">
              <AlertCircle size={18} />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2 ml-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none text-slate-700"
                  placeholder="nom@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-2 ml-1">Mot de passe</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all outline-none text-slate-700"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button type="button" className="text-sm font-medium text-blue-600 hover:underline">
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Se connecter
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-8">
            Besoin d'aide ? <a href="#" className="text-blue-600 font-semibold hover:underline">Contacter le support</a>
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-xs tracking-widest uppercase">© 2026 TunisiMed v2.0</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;