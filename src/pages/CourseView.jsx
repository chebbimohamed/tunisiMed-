import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import navigate
import { 
  PlayCircle, FileText, Music, CheckCircle, 
  ChevronLeft, ChevronRight, GraduationCap, 
  ArrowLeft, Trophy, Layout, ExternalLink, RefreshCw
} from 'lucide-react';

const CourseView = () => {
  const navigate = useNavigate(); // 2. Initialisation navigate
  
  const courseData = {
    title: "Cardiologie Fondamentale",
    progress: 45,
    modules: [
      { id: 1, title: "Introduction à l'anatomie", type: "video", content: "https://www.youtube.com/embed/dQw4w9WgXcQ", completed: true },
      { id: 2, title: "Activité Interactive H5P", type: "h5p", content: "https://h5p.org/h5p/embed/12345", completed: false },
      { id: 3, title: "Support de cours PDF", type: "pdf", content: "#", completed: false },
      { id: 4, title: "Test d'évaluation", type: "quiz", content: null, completed: false }
    ]
  };

  const [activeModule, setActiveModule] = useState(courseData.modules[0]);
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-96 bg-white border-r border-slate-200 flex flex-col shadow-xl z-20">
        <div className="p-8 bg-[#0f172a] text-white">
          {/* ISLAH: Button Retour tawa tekhdem */}
          <button 
            onClick={() => navigate('/dashboard')} 
            className="flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
            Retour au Dashboard
          </button>

          <h1 className="text-xl font-black italic uppercase tracking-tighter leading-tight mb-6">
            {courseData.title}
          </h1>
          <div className="space-y-2">
            <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.1em]">
              <span className="opacity-60">Progression</span>
              <span className="text-blue-400">{courseData.progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" 
                style={{ width: `${courseData.progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/30">
          <p className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Curriculum</p>
          {courseData.modules.map((m) => (
            <button
              key={m.id}
              onClick={() => {setActiveModule(m); setQuizStarted(false);}}
              className={`w-full flex items-center gap-4 p-5 rounded-[28px] transition-all group ${
                activeModule.id === m.id 
                ? 'bg-white border border-slate-200 shadow-xl shadow-slate-200/50 translate-x-2' 
                : 'hover:bg-white/60 border border-transparent'
              }`}
            >
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                m.completed ? 'bg-emerald-100 text-emerald-600' : 
                activeModule.id === m.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {m.completed ? <CheckCircle size={20} /> : getIcon(m.type)}
              </div>
              <div className="text-left flex-1">
                <p className={`text-xs font-black uppercase italic tracking-tight ${activeModule.id === m.id ? 'text-slate-900' : 'text-slate-500'}`}>
                  {m.title}
                </p>
                <span className="text-[9px] font-bold text-slate-400 uppercase opacity-60 tracking-tighter">
                  {m.type === 'h5p' ? 'Exercice Interactif' : m.type}
                </span>
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
        <header className="h-24 px-12 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                {getIcon(activeModule.type)}
             </div>
             <div>
                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.2em]">Module Actuel</span>
                <h2 className="font-black italic uppercase text-slate-800 text-lg tracking-tighter leading-none">{activeModule.title}</h2>
             </div>
          </div>
          <button className="bg-emerald-500 hover:bg-slate-900 text-white px-8 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-emerald-500/20 transition-all active:scale-95">
             Marquer comme terminé
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-12 bg-[#fcfcfc]">
          <div className="max-w-6xl mx-auto h-full">
            
            {/* VIDEO */}
            {activeModule.type === 'video' && (
              <div className="w-full aspect-video bg-slate-900 rounded-[45px] shadow-2xl overflow-hidden border-8 border-white">
                <iframe className="w-full h-full" src={activeModule.content} title="Video" allowFullScreen />
              </div>
            )}

            {/* H5P */}
            {activeModule.type === 'h5p' && (
              <div className="w-full h-full flex flex-col gap-6">
                <div className="bg-blue-50 border-2 border-blue-100 p-6 rounded-[30px] flex items-center justify-between">
                  <div className="flex items-center gap-4 text-blue-700 font-bold italic text-sm">
                    <RefreshCw size={20} className="animate-spin" /> Contenu interactif H5P...
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-[45px] shadow-2xl overflow-hidden border border-slate-100">
                  <iframe src={activeModule.content} className="w-full h-full min-h-[600px]" frameBorder="0" allowFullScreen title="H5P" />
                </div>
              </div>
            )}

            {/* PDF */}
            {activeModule.type === 'pdf' && (
              <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-[50px] border-2 border-dashed border-slate-200 p-20 text-center">
                 <div className="w-24 h-24 bg-white text-emerald-500 rounded-[30px] flex items-center justify-center mb-8 shadow-xl">
                    <FileText size={45} />
                 </div>
                 <h3 className="text-3xl font-black italic uppercase text-slate-900 tracking-tighter">Support PDF</h3>
                 <button className="mt-8 bg-slate-900 text-white px-12 py-5 rounded-[22px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-blue-600 transition-all flex items-center gap-3">
                    <ExternalLink size={18} /> Télécharger
                 </button>
              </div>
            )}

            {/* QUIZ */}
            {activeModule.type === 'quiz' && !quizStarted && (
              <div className="h-full flex flex-col items-center justify-center py-10 animate-in zoom-in-95">
                 <div className="w-32 h-32 bg-orange-50 text-orange-500 rounded-[40px] flex items-center justify-center mb-10 shadow-inner border border-orange-100">
                    <Trophy size={60} />
                 </div>
                 <h3 className="text-4xl font-black italic uppercase text-slate-900 tracking-tighter">Evaluation Finale</h3>
                 <button 
                   onClick={() => setQuizStarted(true)}
                   className="mt-10 bg-blue-600 text-white px-16 py-6 rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/40 hover:-translate-y-2 transition-all flex items-center gap-4"
                 >
                    Démarrer le Test <ChevronRight size={20} />
                 </button>
              </div>
            )}

            {activeModule.type === 'quiz' && quizStarted && (
               <div className="max-w-3xl mx-auto py-10 animate-in slide-in-from-bottom-10">
                  <div className="bg-white p-12 rounded-[50px] shadow-2xl border border-slate-100">
                    <h4 className="text-2xl font-black text-slate-800 italic mb-12">Quelle est la fréquence cardiaque normale ?</h4>
                    <div className="grid gap-4">
                      {["40-60 bpm", "60-100 bpm", "100-120 bpm"].map((opt, i) => (
                        <button key={i} className="w-full p-6 text-left rounded-[22px] border-2 border-slate-50 font-black italic text-sm hover:border-blue-500 hover:bg-blue-50/50 transition-all flex justify-between items-center group">
                          {opt}
                          <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-blue-500"></div>
                        </button>
                      ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-slate-50 flex justify-end gap-4">
                       <button onClick={() => setQuizStarted(false)} className="text-slate-400 font-black text-[10px] uppercase px-6">Quitter</button>
                       <button className="bg-slate-900 text-white px-10 py-4 rounded-[18px] font-black text-[10px] uppercase shadow-xl">Suivant</button>
                    </div>
                  </div>
               </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};

const getIcon = (type) => {
  switch (type) {
    case 'video': return <PlayCircle size={22} />;
    case 'pdf': return <FileText size={22} />;
    case 'h5p': return <Layout size={22} />;
    case 'quiz': return <GraduationCap size={22} />;
    default: return <FileText size={22} />;
  }
};

export default CourseView;