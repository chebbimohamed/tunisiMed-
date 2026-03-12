import { useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  
  // Njibou el user mel localStorage
  const user = JSON.parse(localStorage.getItem('user')) || { email: 'Doctor', role: 'USER' };

  const handleLogout = () => {
    localStorage.removeItem('user'); // Nfaskhou el session
    navigate('/login'); // Narj3ou lel login
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 bg-[#0f172a] text-white">
      <div>
        {/* Logo & Links... (Code qdim mte3ek) */}
      </div>

      {/* --- USER SECTION (BOTTOM) --- */}
      <div className="border-t border-slate-800 pt-6 mt-auto">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-black truncate uppercase italic tracking-tighter">{user.email.split('@')[0]}</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{user.role}</p>
          </div>
        </div>
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-4 rounded-2xl text-red-400 hover:bg-red-500/10 transition-all font-black text-[10px] uppercase tracking-widest group"
        >
          <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
          Déconnexion
        </button>
      </div>
    </div>
  );
};