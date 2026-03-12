import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { Lock, Mail, Eye, EyeOff, ArrowRight, Activity, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
  // 🔑 IMPORTANT: Role 'USER' houwa el Médecin, 'ADMIN' houwa l'Admin
  const [role, setRole] = useState('USER'); 
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    
    console.log("Tentative de connexion...");
    console.log("Rôle sélectionné:", role);
    console.log("Email:", credentials.email);

    // 1. Khazen el session f-el localStorage
    const userData = { 
      email: credentials.email, 
      role: role, 
      token: 'fake-jwt-123' 
    };
    localStorage.setItem('user', JSON.stringify(userData));

    // 2. Redirection s7i7a 100%
    if (role === 'ADMIN') {
      console.log("Direction -> Interface Admin");
      navigate('/admin'); // Thabbet f-App.js ennou l'admin path houwa /admin
    } else {
      console.log("Direction -> Interface Doctor");
      navigate('/dashboard'); // Path mta3 el DoctorDashboard
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-sans overflow-hidden relative">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[1050px] bg-white rounded-[45px] shadow-2xl flex overflow-hidden min-h-[600px] relative z-10 border border-white/10"
      >
        
        {/* LEFT SIDE (Branding) */}
        <div className="hidden lg:flex w-1/2 bg-[#0f172a] p-16 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-blue-500 mb-12">
               <Activity size={32} strokeWidth={3} />
               <span className="font-black italic text-xl tracking-tighter text-white uppercase">TunisiMed</span>
            </div>
            <h1 className="text-5xl font-black text-white italic uppercase tracking-tighter leading-tight mb-6">
              L'excellence <br /> <span className="text-blue-500">Médicale</span> <br /> à portée de clic.
            </h1>
          </div>
          
          <div className="relative z-10 bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md">
             <div className="flex items-center gap-3 mb-2">
                <ShieldCheck className="text-blue-500" size={20} />
                <p className="text-white font-black italic text-xs uppercase">Espace Sécurisé</p>
             </div>
             <p className="text-slate-500 font-bold text-[9px] uppercase tracking-[0.2em]">Accès réservé aux professionnels de santé</p>
          </div>
          <Activity size={400} className="absolute right-[-20%] bottom-[-10%] opacity-5 pointer-events-none" />
        </div>

        {/* RIGHT SIDE (Form) */}
        <div className="w-full lg:w-1/2 p-12 lg:p-20 bg-white flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Connexion</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Bienvenue sur votre portail de formation</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* ROLE SWITCHER - ⚠️ HEDHA MOUHEM BARCHA */}
            <div className="flex bg-slate-100 p-1.5 rounded-[22px] mb-8 relative">
              <button 
                type="button" 
                onClick={() => setRole('USER')}
                className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all z-10 ${role === 'USER' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}
              >
                Médecin
              </button>
              <button 
                type="button" 
                onClick={() => setRole('ADMIN')}
                className={`flex-1 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all z-10 ${role === 'ADMIN' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-400'}`}
              >
                Administrateur
              </button>
            </div>

            <div className="space-y-4">
               <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-all" size={20} />
                  <input 
                    type="email" required
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[22px] py-5 pl-16 pr-6 font-bold text-sm outline-none focus:border-blue-500/20 focus:bg-white transition-all"
                    placeholder="Email professionnel"
                    value={credentials.email}
                    onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  />
               </div>

               <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-all" size={20} />
                  <input 
                    type={showPassword ? "text" : "password"} required
                    className="w-full bg-slate-50 border-2 border-transparent rounded-[22px] py-5 pl-16 pr-14 font-bold text-sm outline-none focus:border-blue-500/20 focus:bg-white transition-all"
                    placeholder="Mot de passe"
                    value={credentials.password}
                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  />
                  <button 
                    type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-blue-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
               </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-slate-900 text-white py-6 rounded-[22px] font-black uppercase text-xs tracking-[0.3em] shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4 mt-8"
            >
              Se Connecter <ArrowRight size={20} strokeWidth={3} />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;