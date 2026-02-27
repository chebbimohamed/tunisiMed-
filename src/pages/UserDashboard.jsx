import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 
import { 
  BookOpen, Award, LogOut, PlayCircle, 
  Clock, CheckCircle, ChevronRight, Download 
} from 'lucide-react';

const UserDashboard = () => {
  const { logout, user } = useAuth();
  const { navigate } = useNavigate(); // Beget el navigation
  const [courses, setCourses] = useState([]);

  // 1. Njibu el data mel LocalStorage w n-thabtu f-el progress
  useEffect(() => {
    const fetchCourses = () => {
      const savedCourses = localStorage.getItem('tunisimed_courses');
      if (savedCourses) {
        const parsed = JSON.parse(savedCourses);
        // N-faradhly instructor barka lel toba l-kol
        const formatted = parsed.map(c => ({
          ...c,
          progress: c.progress || 0, // Dima 0% ken el admin mazel ma-badalch
          status: c.progress >= 100 ? "Terminé" : "En cours",
          instructor: "Expert TunisiMed"
        }));
        setCourses(formatted);
      }
    };

    fetchCourses();
    // Refresh el data kol ma el user yarja3 lel page
    window.addEventListener('focus', fetchCourses);
    return () => window.removeEventListener('focus', fetchCourses);
  }, []);

  const goToCourse = (id) => {
    window.location.href = `/course/${id}`; // Tariqa direct walla testa3mel navigate(`/course/${id}`)
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200 px-8 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4 group">
          <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md transition-all duration-300">
            <img src={logo} alt="TunisiMed Academy" className="h-10 w-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-800 tracking-tight leading-none uppercase italic">
              TunisiMed <span className="text-blue-600">Academy</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Espace Médical Professionnel</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col text-right border-r pr-6 border-slate-200">
            <p className="text-sm font-black text-slate-700 leading-none italic">Dr. {user?.name || 'Docteur'}</p>
            <p className="text-[10px] text-green-600 font-bold uppercase mt-1 flex items-center gap-1 justify-end">Compte Vérifié <CheckCircle size={10}/></p>
          </div>
          <button onClick={logout} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all rounded-2xl border border-transparent hover:border-red-100">
            <LogOut size={22} />
          </button>
        </div>
      </nav>

      {/* --- HERO --- */}
      <div className="bg-[#0f172a] text-white px-8 py-12 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="animate-in slide-in-from-left duration-700">
              <h1 className="text-4xl font-black mb-3 uppercase italic tracking-tighter">
                Heureux de vous revoir,<br/> <span className="text-blue-500">Dr. {user?.name?.split(' ')[0]}!</span>
              </h1>
              <p className="text-slate-400 max-w-md font-medium">Continuez votre spécialisation et obtenez vos certifications internationales.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-2xl rounded-[40px] p-7 border border-white/10 flex items-center gap-6 shadow-2xl">
              <div className="bg-gradient-to-tr from-blue-600 to-blue-400 p-4 rounded-[24px] shadow-lg shadow-blue-500/20">
                <Award className="text-white" size={32} />
              </div>
              <div>
                <p className="text-[10px] text-blue-400 font-black tracking-[0.2em] uppercase mb-1">Total Formations</p>
                <p className="text-3xl font-black italic">{courses.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -top-20 -right-20 opacity-10 rotate-12"><BookOpen size={400} className="text-blue-500" /></div>
      </div>

      {/* --- CATALOGUE --- */}
      <main className="max-w-6xl mx-auto w-full p-8 -mt-10 flex-1 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Courses List */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-tight italic">
                <span className="w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                  <BookOpen size={20}/>
                </span>
                Mes Formations en cours
              </h2>
            </div>
            
            <div className="grid gap-6">
              {courses.length > 0 ? courses.map(course => (
                <div key={course.id} className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-2">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100 italic">
                        {course.category}
                      </span>
                      <h3 className="font-black text-2xl text-slate-800 group-hover:text-blue-600 transition-colors uppercase italic leading-tight tracking-tighter">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-2">
                        <Clock size={12}/> {course.lessons} Modules • {course.instructor}
                      </p>
                    </div>
                    <div className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      course.progress === 100 ? 'bg-green-100 text-green-700' : 'bg-orange-50 text-orange-600'
                    }`}>
                      {course.status}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Progression Académique</span>
                      <span className="text-sm font-black text-slate-900">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden p-1 shadow-inner border border-slate-50">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${
                          course.progress === 100 ? 'bg-gradient-to-r from-green-500 to-green-400' : 'bg-gradient-to-r from-blue-700 to-blue-500'
                        }`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-50">
                    <button 
                      onClick={() => goToCourse(course.id)}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 text-[11px] font-black bg-slate-900 text-white px-8 py-4 rounded-[20px] hover:bg-blue-600 transition-all uppercase tracking-widest shadow-xl shadow-slate-200 active:scale-95"
                    >
                      <PlayCircle size={18} /> 
                      {course.progress === 100 ? 'Revoir le module' : 'Reprendre le cours'}
                    </button>

                    {course.progress === 100 && (
                      <a 
                        href={course.pdfUrl || "#"} 
                        target="_blank" 
                        rel="noopener noreferrer"
                       className="w-full sm:w-auto flex items-center justify-center gap-2 text-[11px] font-black text-white bg-green-600 px-8 py-4 rounded-[20px] hover:bg-green-700 transition-all uppercase tracking-widest shadow-lg shadow-green-200 animate-in zoom-in duration-500"
                      >
                          <Download size={18} /> Télécharger l'Attestation
                      </a>
                    )}
                  </div>
                </div>
              )) : (
                <div className="bg-white rounded-[40px] p-24 text-center border-4 border-dashed border-slate-100">
                   <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BookOpen className="text-slate-300" size={40} />
                   </div>
                   <h4 className="text-slate-800 font-black uppercase italic mb-2">Aucun cours disponible</h4>
                   <p className="text-slate-400 text-sm font-medium">L'administration n'a pas encore publié de formations pour votre profil.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight italic">Tableau de bord</h2>
            
            {/* Stats Card */}
            <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[40px] p-8 text-white shadow-2xl relative overflow-hidden group border-b-8 border-blue-950">
               <Award size={120} className="absolute -right-5 -bottom-5 text-white/10 group-hover:scale-110 transition-transform duration-700" />
               <div className="relative z-10">
                 <h3 className="font-black text-lg mb-4 uppercase italic tracking-tight text-blue-200">Certifications</h3>
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                       <CheckCircle className="text-blue-300" size={20} />
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Modules Complétés</p>
                          <p className="text-xl font-black">{courses.filter(c => c.progress === 100).length}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 opacity-50">
                       <Download className="text-blue-300" size={20} />
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest italic">Attestations Prêtes</p>
                          <p className="text-sm font-bold">Bientôt disponible</p>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

            {/* Help Card */}
            <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 text-center">
               <h3 className="font-black text-slate-800 mb-4 uppercase italic text-sm">Aide & Support</h3>
               <p className="text-[10px] text-slate-500 font-bold uppercase mb-6 leading-relaxed">
                 Un problème technique avec une vidéo ?<br/>Contactez nous immédiatement.
               </p>
               <button className="w-full py-4 bg-slate-50 text-slate-800 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">
                  Ouvrir un ticket
               </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default UserDashboard;