import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ManageCourses from '../ManageCourses';
import { 
  LayoutDashboard, BookOpen, Settings, LogOut, 
  Users, Award, Search, Bell, UserCircle, ChevronRight,
  Stethoscope, MessageSquare
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState([]);

  // Njibou el data mta3 el courses mel localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tunisimed_courses') || '[]');
    setCourses(saved);
  }, [activeTab]);

  // Fonction de déconnexion
  const handleLogout = () => {
    // Ken t-heb tfasakh ay session, zid'ha houni
    // localStorage.removeItem('isLoggedIn');
    navigate('/'); 
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans">
      
      {/* --- SIDEBAR ZARQA PROFESSIONAL (FIXE) --- */}
      <aside className="w-80 bg-[#0f172a] text-white flex flex-col fixed h-screen z-50 shadow-2xl">
        
        {/* --- LOGO --- */}
        <div className="p-8 mb-4">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-300">
              <Stethoscope size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">
                Tunisi<span className="text-blue-500">Med</span>
              </h1>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mt-1">Admin Panel</p>
            </div>
          </div>
        </div>
        
        {/* --- NAVIGATION --- */}
        <nav className="p-6 space-y-2 flex-1">
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ml-4">Main Menu</p>
          
          <SidebarItem 
            icon={<LayoutDashboard size={20}/>} 
            label="Dashboard" 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
          />

          <SidebarItem 
            icon={<Settings size={20}/>} 
            label="Gestion de Cours" 
            active={activeTab === 'manage'} 
            onClick={() => setActiveTab('manage')} 
          />

          <SidebarItem 
            icon={<Users size={20}/>} 
            label="Liste Médecins" 
            active={activeTab === 'doctors'} 
            onClick={() => setActiveTab('doctors')} 
          />

          <SidebarItem 
            icon={<Award size={20}/>} 
            label="Certificats" 
            active={activeTab === 'certificates'} 
            onClick={() => setActiveTab('certificates')} 
          />
        </nav>

        {/* --- PROFILE & LOGOUT --- */}
        <div className="p-6 border-t border-slate-800/50 bg-slate-900/20">
          <div className="flex items-center gap-3 p-3 bg-slate-800/40 rounded-2xl mb-4 border border-slate-700/30">
             <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 font-bold">A</div>
             <div className="flex-1 overflow-hidden">
                <p className="text-xs font-black truncate uppercase italic">Dr. Ahmed</p>
                <p className="text-[9px] text-slate-500 font-bold truncate tracking-tighter">admin@tunisimed.com</p>
             </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-4 text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-2xl transition-all font-bold text-sm w-full group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> 
            Déconnexion
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 ml-80 overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-slate-100 px-6 py-2.5 rounded-2xl w-96 border border-slate-200">
            <Search size={18} className="text-slate-400" />
            <input type="text" placeholder="Rechercher..." className="bg-transparent border-none outline-none text-sm w-full font-medium" />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative p-2.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-400 cursor-pointer hover:text-blue-600 transition-all">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            
            <div className="flex items-center gap-4 pl-6 border-l border-slate-200">
              <div className="text-right">
                <p className="text-sm font-black text-slate-900 leading-none uppercase italic">Dr. Ahmed Ali</p>
                <p className="text-[10px] font-black text-blue-600 uppercase mt-1 tracking-widest">Super Admin</p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-2xl border-2 border-white shadow-sm flex items-center justify-center">
                 <UserCircle size={35} className="text-slate-300" />
              </div>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC CONTENT --- */}
        <div className="p-10 lg:p-14">
          <div className="animate-in fade-in duration-500">
            {activeTab === 'dashboard' && <DashboardHome coursesCount={courses.length} />}
            {activeTab === 'manage' && <ManageCourses />}
            {activeTab === 'doctors' && <DoctorsList />}
            {activeTab === 'certificates' && <CertificatesView />}
          </div>
        </div>
      </main>
    </div>
  );
};

/* --- MINI COMPONENTS (Bech el code yebda m-riguil) --- */

const SidebarItem = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-sm transition-all group ${
      active 
      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <div className="flex items-center gap-4">{icon} <span className="tracking-tight">{label}</span></div>
    {active && <ChevronRight size={14} className="opacity-50" />}
  </button>
);

const DashboardHome = ({ coursesCount }) => (
  <div className="space-y-10">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatCard label="Formations" count={coursesCount} icon={<BookOpen size={28}/>} color="blue" />
      <StatCard label="Médecins Inscrits" count="1,240" icon={<Users size={28}/>} color="emerald" />
      <StatCard label="Certificats Emis" count="856" icon={<Award size={28}/>} color="orange" />
    </div>
    
    <div className="bg-white p-10 rounded-[45px] shadow-sm border border-slate-200/60">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-50">
        <h3 className="text-xl font-black italic uppercase tracking-tighter">Activités Récentes</h3>
        <button className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-4 py-2 rounded-xl">Voir Tout</button>
      </div>
      <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Aucune nouvelle activité</p>
      </div>
    </div>
  </div>
);

const StatCard = ({ label, count, icon, color }) => {
  const colors = { blue: "bg-blue-50 text-blue-600", emerald: "bg-emerald-50 text-emerald-600", orange: "bg-orange-50 text-orange-600" };
  return (
    <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-200/60 flex items-center gap-6 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`w-16 h-16 ${colors[color]} rounded-[22px] flex items-center justify-center group-hover:scale-110 transition-transform`}>{icon}</div>
      <div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
        <h4 className="text-3xl font-black italic mt-1 tracking-tighter">{count}</h4>
      </div>
    </div>
  );
};

const DoctorsList = () => (
  <div className="bg-white p-12 rounded-[50px] border border-slate-200/60 shadow-sm animate-in slide-in-from-bottom-5">
    <h2 className="text-3xl font-black italic uppercase mb-10 tracking-tighter">Annuaire des Médecins</h2>
    <div className="p-20 text-center bg-slate-50 rounded-[35px] border-2 border-dashed border-slate-100">
       <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Base de données vide</p>
    </div>
  </div>
);

const CertificatesView = () => (
  <div className="bg-white p-12 rounded-[50px] border border-slate-200/60 shadow-sm animate-in slide-in-from-bottom-5">
    <h2 className="text-3xl font-black italic uppercase mb-10 tracking-tighter">Certifications</h2>
    <div className="p-20 text-center bg-slate-50 rounded-[35px] border-2 border-dashed border-slate-100">
       <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Aucun certificat émis</p>
    </div>
  </div>
);

export default Dashboard;