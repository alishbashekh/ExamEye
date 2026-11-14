import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Award, ShieldAlert, RotateCcw, Home } from 'lucide-react';

export default function ExamResult() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedResult = JSON.parse(localStorage.getItem('examResult'));
    if (savedResult) {
      setResult(savedResult);
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen bg-[#F4F6F5] flex items-center justify-center p-4 font-sans text-[#0D2418]">
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm text-center space-y-4 max-w-md w-full">
          <h2 className="text-xl font-black">No Exam Result Found</h2>
          <p className="text-xs text-neutral-500">It looks like you haven't completed an active exam session yet.</p>
          <button 
            onClick={() => navigate('/')} 
            className="w-full py-3 bg-[#092517] text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.totalQuestions) * 100);

  return (
    <div className="min-h-screen bg-[#F4F6F5] py-12 px-4 sm:px-6 font-sans text-[#0D2418] flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-3xl border border-neutral-200/80 p-8 shadow-xl space-y-6 text-center">
        
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner border border-emerald-100">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
            Examination Completed
          </span>
          <h1 className="text-2xl font-black tracking-tight text-[#0D2418] pt-2">{result.examTitle}</h1>
          <p className="text-xs text-neutral-500">Candidate: <strong className="text-neutral-800">{result.studentName}</strong> ({result.rollNo})</p>
        </div>

        <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Final Score</span>
            <div className="text-4xl font-black text-[#092517] pt-1">
              {result.score} <span className="text-lg text-neutral-400 font-medium">/ {result.totalQuestions}</span>
            </div>
            <p className="text-xs font-bold text-emerald-700 mt-1">{percentage}% Correct Answers</p>
          </div>

          <hr className="border-neutral-200" />

          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> AI Proctoring Violations:
            </span>
            <span className={`font-bold px-2.5 py-1 rounded-lg ${result.violations > 0 ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
              {result.violations} Detected
            </span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-neutral-500 font-medium">Submitted At:</span>
            <span className="font-bold text-neutral-800">{result.submittedAt}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full py-3.5 bg-[#092517] hover:bg-[#071d12] text-white font-bold text-xs rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <Home className="w-4 h-4" /> Exit to Dashboard
        </button>

      </div>
    </div>
  );
}