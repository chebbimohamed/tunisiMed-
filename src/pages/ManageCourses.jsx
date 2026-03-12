import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, X, FileText, Video, 
  Music, Layout, CheckCircle2, ChevronRight, UploadCloud, AlertCircle 
} from 'lucide-react';

const ManageCourses = () => {
  // --- 1. STATE & STORAGE ---
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('tunisimed_courses');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [editingId, setEditingId] = useState(null); // Pour savoir si on modifie ou on crée

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Cardiologie',
    videoUrl: '',
    pdfUrl: '',
    audioUrl: '',
    h5pUrl: '',
    questions: [{ id: Date.now(), q: '', options: ['', '', ''], correct: 0 }]
  });

  useEffect(() => {
    localStorage.setItem('tunisimed_courses', JSON.stringify(courses));
  }, [courses]);

  // --- 2. LOGIC FUNCTIONS ---
  
  // Ouvrir le modal pour la modification
  const handleEdit = (course) => {
    setEditingId(course.id);
    setFormData(course); // On remplit le formulaire avec les données existantes
    setIsModalOpen(true);
    setActiveStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Veuillez saisir un titre !");
    
    if (editingId) {
      // Logique Update
      setCourses(courses.map(c => c.id === editingId ? { ...formData, id: editingId } : c));
    } else {
      // Logique Create
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }
    
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveStep(1);
    setEditingId(null);
    setFormData({
      title: '', description: '', category: 'Cardiologie',
      videoUrl: '', pdfUrl: '', audioUrl: '', h5pUrl: '',
      questions: [{ id: Date.now(), q: '', options: ['', '', ''], correct: 0 }]
    });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { id: Date.now(), q: '', options: ['', '', ''], correct: 0 }]
    });
  };

  const removeQuestion = (id) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== id)
    });
  };

  return (
    <div className="animate-in fade-in duration-500">
      {/* --- HEADER --- */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">Gestion des Modules</h2>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">Plateforme de Formation Continue</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-slate-900 transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2"
        >
          <Plus size={18} strokeWidth={3} /> Créer un nouveau cours
        </button>
      </div>

      {/* --- TABLEAU DES COURS --- */}
      <div className="bg-white rounded-[40px] border border-slate-200/60 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
              <th className="px-10 py-7">Module</th>
              <th className="px-10 py-7">Media</th>
              <th className="px-10 py-7">Quiz</th>
              <th className="px-10 py-7 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {courses.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-20 text-center text-slate-300 font-bold uppercase text-[10px] tracking-widest">Aucun cours disponible</td>
              </tr>
            ) : (
              courses.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <p className="font-black text-slate-800 uppercase italic text-sm">{c.title}</p>
                    <p className="text-[9px] text-blue-500 font-bold uppercase tracking-widest">{c.category}</p>
                  </td>
                  <td className="px-10 py-6 flex gap-2">
                    {c.videoUrl && <Video size={14} className="text-blue-500"/>}
                    {c.pdfUrl && <FileText size={14} className="text-emerald-500"/>}
                    {c.audioUrl && <Music size={14} className="text-orange-500"/>}
                  </td>
                  <td className="px-10 py-6">
                    <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black">{c.questions?.length} Qs</span>
                  </td>
                  <td className="px-10 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => handleEdit(c)}
                        className="text-blue-500 hover:bg-blue-50 p-3 rounded-xl transition-all"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => setCourses(courses.filter(i => i.id !== c.id))} 
                        className="text-red-400 hover:bg-red-50 p-3 rounded-xl transition-all"
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* --- MODAL BUILDER --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[50px] w-full max-w-6xl h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95">
            
            <div className="flex flex-1 overflow-hidden">
              {/* SIDEBAR MODAL */}
              <div className="w-80 bg-[#f8fafc] border-r border-slate-100 p-12 flex flex-col gap-8">
                <h3 className="text-2xl font-black uppercase italic mb-8 tracking-tighter">
                  {editingId ? "Modifier Cours" : "Nouveau Cours"}
                </h3>
                <StepIndicator num={1} label="Informations" active={activeStep === 1} completed={activeStep > 1} />
                <StepIndicator num={2} label="Upload Media" active={activeStep === 2} completed={activeStep > 2} />
                <StepIndicator num={3} label="Quiz & Test" active={activeStep === 3} completed={activeStep > 3} />
              </div>

              {/* MAIN FORM AREA */}
              <div className="flex-1 flex flex-col bg-white overflow-hidden">
                <div className="p-14 flex-1 overflow-y-auto">
                  
                  {/* STEP 1: INFOS */}
                  {activeStep === 1 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                       <h4 className="text-3xl font-black italic uppercase mb-10 tracking-tighter decoration-blue-500 underline underline-offset-8">Général</h4>
                       <InputGroup label="Titre du Cours" placeholder="..." value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                       <InputGroup label="Catégorie" placeholder="..." value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                       <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">Description</label>
                          <textarea className="bg-slate-50 border border-slate-200 rounded-[30px] p-8 font-bold outline-none h-40 focus:border-blue-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                       </div>
                    </div>
                  )}

                  {/* STEP 2: MEDIA */}
                  {activeStep === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                       <h4 className="text-3xl font-black italic uppercase mb-10 tracking-tighter">Support Media</h4>
                       <div className="grid grid-cols-2 gap-8">
                          <MediaInput icon={<Video/>} label="Vidéo (URL)" value={formData.videoUrl} onChange={e => setFormData({...formData, videoUrl: e.target.value})} />
                          <MediaInput icon={<FileText/>} label="PDF (URL)" value={formData.pdfUrl} onChange={e => setFormData({...formData, pdfUrl: e.target.value})} />
                          <MediaInput icon={<Music/>} label="Audio (URL)" value={formData.audioUrl} onChange={e => setFormData({...formData, audioUrl: e.target.value})} />
                          <MediaInput icon={<Layout/>} label="H5P (URL)" value={formData.h5pUrl} onChange={e => setFormData({...formData, h5pUrl: e.target.value})} />
                       </div>
                    </div>
                  )}

                  {/* STEP 3: QUIZ */}
                  {activeStep === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500 pb-10">
                       <div className="flex justify-between items-center mb-10">
                         <h4 className="text-3xl font-black italic uppercase tracking-tighter underline decoration-blue-500 underline-offset-8">Test Final</h4>
                         <button onClick={addQuestion} className="bg-slate-900 text-white font-black text-[10px] uppercase px-6 py-3 rounded-xl hover:bg-blue-600 transition-all">+ Ajouter Question</button>
                       </div>

                       {formData.questions.map((q, idx) => (
                         <div key={q.id} className="bg-slate-50 p-10 rounded-[45px] border border-slate-100 relative mb-8">
                           <button onClick={() => removeQuestion(q.id)} className="absolute top-8 right-8 text-slate-300 hover:text-red-500"><X size={20}/></button>
                           <span className="absolute -top-4 left-10 bg-blue-600 text-white text-[10px] font-black px-6 py-2 rounded-full uppercase">QUESTION {idx + 1}</span>
                           
                           <input 
                             className="w-full bg-transparent border-b-2 border-slate-200 py-4 font-black italic text-xl outline-none focus:border-blue-500 mb-8" 
                             placeholder="La question ?" 
                             value={q.q} 
                             onChange={e => {
                               const newQs = [...formData.questions];
                               newQs[idx].q = e.target.value;
                               setFormData({...formData, questions: newQs});
                             }} 
                           />

                           <div className="space-y-4">
                              {q.options.map((opt, oIdx) => (
                                <div key={oIdx} className="flex items-center gap-3">
                                  <div className="relative flex-1">
                                    <input 
                                      className={`w-full p-4 rounded-2xl text-sm font-bold outline-none transition-all pr-12 ${q.correct === oIdx ? 'bg-emerald-50 border-2 border-emerald-500' : 'bg-white border border-slate-200'}`} 
                                      placeholder={`Option ${oIdx + 1}`}
                                      value={opt}
                                      onChange={e => {
                                        const newQs = [...formData.questions];
                                        newQs[idx].options[oIdx] = e.target.value;
                                        setFormData({...formData, questions: newQs});
                                      }}
                                    />
                                    <button 
                                      onClick={() => {
                                        const newQs = [...formData.questions];
                                        newQs[idx].correct = oIdx;
                                        setFormData({...formData, questions: newQs});
                                      }}
                                      className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${q.correct === oIdx ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'}`}
                                    >
                                      <CheckCircle2 size={14} />
                                    </button>
                                  </div>
                                  {q.options.length > 2 && (
                                    <button onClick={() => {
                                      const newQs = [...formData.questions];
                                      newQs[idx].options = newQs[idx].options.filter((_, i) => i !== oIdx);
                                      setFormData({...formData, questions: newQs});
                                    }} className="text-slate-300 hover:text-red-500 p-2"><Trash2 size={16}/></button>
                                  )}
                                </div>
                              ))}
                              <button 
                                onClick={() => {
                                  const newQs = [...formData.questions];
                                  newQs[idx].options.push('');
                                  setFormData({...formData, questions: newQs});
                                }}
                                className="text-blue-600 font-black text-[9px] uppercase tracking-widest px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100"
                              >+ Option</button>
                           </div>
                         </div>
                       ))}
                    </div>
                  )}
                </div>

                {/* FOOTER FIXE */}
                <div className="p-10 border-t border-slate-100 flex justify-between items-center bg-white sticky bottom-0">
                   <button onClick={closeModal} className="text-slate-400 font-black text-[11px] uppercase tracking-widest ml-4 hover:text-red-500 transition-colors">Annuler</button>
                   <div className="flex gap-4">
                      {activeStep > 1 && <button onClick={() => setActiveStep(activeStep - 1)} className="px-10 py-4 rounded-2xl border-2 border-slate-100 font-black text-[11px] uppercase">Précédent</button>}
                      {activeStep < 3 ? (
                        <button onClick={() => setActiveStep(activeStep + 1)} className="bg-slate-900 text-white px-12 py-4 rounded-2xl font-black text-[11px] uppercase flex items-center gap-2">Suivant <ChevronRight size={18}/></button>
                      ) : (
                        <button onClick={handleSubmit} className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-[11px] uppercase shadow-xl shadow-blue-600/20">
                          {editingId ? "Enregistrer" : "Publier"}
                        </button>
                      )}
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- MINI COMPONENTS --- */
const StepIndicator = ({ num, label, active, completed }) => (
  <div className={`flex items-center gap-5 transition-all ${active || completed ? 'opacity-100' : 'opacity-30'}`}>
    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm ${completed ? 'bg-emerald-500 text-white' : active ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-200 text-slate-500'}`}>
      {completed ? <CheckCircle2 size={20}/> : num}
    </div>
    <span className={`text-[11px] font-black uppercase tracking-widest ${active ? 'text-blue-600' : 'text-slate-500'}`}>{label}</span>
  </div>
);

const InputGroup = ({ label, placeholder, value, onChange }) => (
  <div className="flex flex-col gap-3">
    <label className="text-[10px] font-black uppercase text-slate-400 ml-5 tracking-widest">{label}</label>
    <input className="w-full bg-slate-50 border border-slate-200 rounded-[25px] px-8 py-5 font-bold outline-none focus:border-blue-500 focus:bg-white transition-all shadow-sm" placeholder={placeholder} value={value} onChange={onChange} />
  </div>
);

const MediaInput = ({ icon, label, value, onChange }) => (
  <div className="flex flex-col gap-4 p-8 bg-slate-50 rounded-[40px] border border-slate-100 group hover:border-blue-200 transition-all">
    <div className="flex items-center gap-3 text-slate-400 group-hover:text-blue-500">
       <div className="p-3 bg-white rounded-xl shadow-sm">{icon}</div> 
       <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <input className="bg-transparent border-b border-slate-200 px-2 py-3 text-xs font-bold outline-none focus:border-blue-500" placeholder="https://..." value={value} onChange={onChange} />
  </div>
);

export default ManageCourses;