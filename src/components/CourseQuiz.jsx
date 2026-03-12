import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

const CourseQuiz = ({ questions, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = index;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const score = answers.reduce((acc, curr, idx) => {
        return curr === questions[idx].correct ? acc + 1 : acc;
      }, 0);
      setIsFinished(true);
      onComplete((score / questions.length) * 100);
    }
  };

  if (isFinished) return null;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10 shadow-2xl">
      <div className="flex justify-between items-center mb-8">
        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Question {currentStep + 1} / {questions.length}</span>
        <div className="h-1.5 w-32 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 transition-all" style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}></div>
        </div>
      </div>

      <h3 className="text-xl font-black text-white mb-8 italic uppercase tracking-tight">
        {questions[currentStep].q}
      </h3>

      <div className="space-y-4 mb-10">
        {questions[currentStep].options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            className={`w-full p-6 rounded-[24px] text-left font-bold transition-all border-2 ${
              answers[currentStep] === i ? 'border-blue-500 bg-blue-500/10 text-white' : 'border-slate-800 bg-slate-800/50 text-slate-400 hover:border-slate-700'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        onClick={nextStep}
        disabled={answers[currentStep] === undefined}
        className="w-full bg-blue-600 text-white py-5 rounded-[24px] font-black uppercase tracking-widest hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {currentStep === questions.length - 1 ? 'Terminer le Test' : 'Question Suivante'} <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default CourseQuiz;