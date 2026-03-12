import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  ChevronRight, 
  Trophy, 
  Layout, 
  Search,
  Activity,
  LogOut,
  Star,
  CheckCircle2,
  GraduationCap
} from 'lucide-react';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Njibou el user mel session
  const user = JSON.parse(localStorage.getItem('user')) || { email: 'Docteur', role: 'USER' };

  useEffect(() => {
    // Simulation de chargement
    setTimeout(() => {
      const savedCourses = JSON.parse(localStorage.getItem('tunisimed_courses') || '[]');
      setCourses(savedCourses);
      setLoading(false);
    }, 800);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      
      {/* --- SIDEBAR MÉDECIN --- */}
      <aside className="hidden lg:flex w-80 bg-[#0f172a] text-white flex-col p-8 fixed h-full z-50">
        <div className="flex items-center gap-3 text-blue-500 mb-16 px-2">
          <div className="p-2 bg-blue-500/10 rounded-xl">
            <Activity size={28} strokeWidth={3} />
          </div>
          <span className="font-black italic text-xl tracking-tighter text-white uppercase">TunisiMed</span>
        </div>

        <nav className="flex-1 space-y-3">
          <p className="px-4 text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Navigation</p>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/30">
            <Layout size={18} /> Mes Formations
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-white/5 font-black text-[10px] uppercase tracking-widest transition-all group">
            <Trophy size={18} className="group-hover:text-yellow-500 transition-colors" /> Mes Certificats
          </button>
          <button className="w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:bg-white/5 font-black text-[10px] uppercase tracking-widest transition-all">
            <Star size={18} /> Favoris
          </button>
        </nav>

        <div className="pt-8 border-t border-slate-800/50">
          <div className="flex items-center gap-4 mb-8 bg-white/5 p-4 rounded-3xl border border-white/5">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg">
              {user.email[0].toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black uppercase tracking-tighter truncate leading-none mb-1">{user.email.split('@')[0]}</p>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">En ligne</p>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-400 hover:bg-red-400/10 font-black text-[10px] uppercase tracking-widest transition-all"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-80 p-6 md:p-12">
        
        {/* TOP HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-slate-900 leading-[0.9]">
              Bonjour, <br /> 
              <span className="text-blue-600 text-5xl md:text-7xl">Dr. {user.email.split('@')[0]}</span>
            </h1>
            <div className="flex items-center gap-3 mt-6">
              <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1">
                <CheckCircle2 size={12} /> Compte Vérifié
              </span>
              <p className="text-slate-400 font-bold uppercase text-[9px] tracking-[0.2em]">Faculté de Médecine de Tunis</p>
            </div>
          </motion.div>

          <div className="relative group w-full md:w-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Rechercher une formation..."
              className="bg-white border-none rounded-[25px] py-5 pl-16 pr-8 w-full md:w-96 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] font-bold text-sm outline-none focus:ring-4 focus:ring-blue-500/5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {/* STATISTICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { label: 'Cours Disponibles', val: courses.length, icon: <BookOpen />, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Formations En Cours', val: '0', icon: <Clock />, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Certificats Prêts', val: '0', icon: <GraduationCap />, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all cursor-default"
            >
              <div>
                <p className="text-slate-400 font-black text-[9px] uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                <h3 className="text-4xl font-black italic tracking-tighter">{stat.val}</h3>
              </div>
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
            </motion.div>
          ))}
        </div>

        {/* COURSES SECTION */}
        <div className="flex items-center justify-between mb-10 px-2">
          <h2 className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">Bibliothèque Scientifique</h2>
          <div className="h-px flex-1 bg-slate-100 mx-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
          <AnimatePresence>
            {loading ? (
              [1,2,3].map(n => (
                <div key={n} className="h-[450px] bg-slate-200 animate-pulse rounded-[50px]"></div>
              ))
            ) : filteredCourses.length > 0 ? (
              filteredCourses.map((course, idx) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={course.id} 
                  className="bg-white rounded-[50px] p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)] border border-slate-50 group hover:-translate-y-3 transition-all duration-500 flex flex-col justify-between min-h-[480px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div>
                    <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center mb-10 group-hover:bg-blue-600 transition-all duration-500 shadow-xl shadow-slate-900/10 group-hover:shadow-blue-600/30">
                      <BookOpen size={28} />
                    </div>
                    <span className="bg-slate-100 text-slate-500 px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-6 inline-block">
                      {course.category}
                    </span>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900 leading-[1.1] mb-6 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                  </div>

                  <div className="space-y-8">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Clock size={16} className="text-blue-500" /> 45 min
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Star size={16} className="text-yellow-500" /> 4.9
                      </div>
                    </div>

                    <button 
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="w-full bg-slate-900 text-white py-6 rounded-[25px] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-4 group-hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/20 active:scale-95"
                    >
                      Démarrer le module <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center bg-white rounded-[50px] border-2 border-dashed border-slate-100">
                 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search size={30} className="text-slate-300" />
                 </div>
                 <p className="font-black uppercase text-slate-400 tracking-[0.3em] text-xs">Aucun résultat pour cette recherche</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;