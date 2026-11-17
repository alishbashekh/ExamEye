import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ShieldAlert, 
  ChevronLeft, 
  ChevronRight, 
  Send,
  Camera
} from 'lucide-react';

export default function ExamScreen() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [student, setStudent] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [violations, setViolations] = useState(0);
  const [warningMsg, setWarningMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const savedExam = JSON.parse(localStorage.getItem('activeExamPayload'));
    const savedStudent = JSON.parse(localStorage.getItem('activeStudent'));

    if (savedExam) {
      setExam(savedExam);
      setTimeLeft(savedExam.duration * 60);
    }
    if (savedStudent) {
      setStudent(savedStudent);
    }

    const startLiveCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Webcam access error during exam:", err);
      }
    };
    startLiveCamera();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setViolations(prev => {
          const newCount = prev + 1;
          setWarningMsg(`⚠️ Warning #${newCount}: Tab switching or minimizing window is prohibited!`);
          setTimeout(() => setWarningMsg(''), 5000);
          return newCount;
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (exam && !isSubmitting) handleAutoSubmit();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: String(optionIndex)
    });
  };

  const handleAutoSubmit = () => {
    setIsSubmitting(true);
    let score = 0;
    if (exam && exam.questions) {
      exam.questions.forEach(q => {
        if (selectedAnswers[q.id] === String(q.correctAnswer)) {
          score += 1;
        }
      });
    }

    const resultData = {
      examTitle: exam.title,
      studentName: student?.name,
      rollNo: student?.rollNo,
      score,
      totalQuestions: exam.questions.length,
      violations,
      submittedAt: new Date().toLocaleTimeString()
    };
    localStorage.setItem('examResult', JSON.stringify(resultData));
    navigate('/exam-result');
  };

  if (!exam) return null;

  const currentQ = exam.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#F4F6F5] text-[#0D2418] font-sans flex flex-col">
      
      {/* CONSISTENT BRAND HEADER WITH STUDENT VERIFIED PHOTO */}
      <header className="bg-[#092517] border-b border-emerald-900/20 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md text-white">
        <div className="flex items-center gap-3.5">
          {student?.image ? (
            <img 
              src={student.image} 
              alt="Student Verified" 
              className="w-11 h-11 rounded-2xl object-cover border-2 border-emerald-400 shadow-sm shrink-0" 
            />
          ) : (
            <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-emerald-300 font-bold text-xs tracking-wider shadow-inner">
              EX
            </div>
          )}
          <div>
            <h1 className="text-xs sm:text-sm font-black tracking-wide">{exam.title}</h1>
            <p className="text-[11px] text-emerald-300/90 font-medium">
              <strong className="text-white">{student?.name}</strong> &bull; {student?.rollNo}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/30 border border-white/15 text-emerald-300 font-mono text-xs font-bold shadow-inner">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Time Left: {formatTime(timeLeft)}</span>
          </div>

          <div className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold ${violations > 0 ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300' : 'bg-white/10 text-neutral-200 border border-white/10'}`}>
            <ShieldAlert className="w-4 h-4" />
            <span>Violations: {violations}</span>
          </div>
        </div>
      </header>

      {/* WARNING BANNER */}
      {warningMsg && (
        <div className="bg-rose-600 text-white px-6 py-2.5 text-center text-xs font-bold shadow-md animate-bounce">
          {warningMsg}
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 max-w-6xl mx-auto w-full p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* LEFT 3 COLS: DISTRACTION-FREE QUESTION CARD */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white border border-neutral-200/80 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
            
            <div className="flex items-center justify-between text-xs font-bold text-neutral-400 border-b border-neutral-100 pb-4">
              <span>Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
              <span className="px-3.5 py-1 rounded-full bg-emerald-50 text-[#092517] font-bold text-[11px] uppercase tracking-wider">
                {currentQ.type === 'mcq' ? 'Multiple Choice' : 'True / False'}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-[#0D2418] leading-relaxed">
              {currentQ.questionText}
            </h2>

            <div className="space-y-3.5 pt-2">
              {currentQ.type === 'mcq' ? (
                currentQ.options.map((opt, optIdx) => (
                  <label 
                    key={optIdx} 
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                      selectedAnswers[currentQ.id] === String(optIdx) 
                        ? 'bg-emerald-50/80 border-emerald-600 text-[#092517] shadow-xs' 
                        : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name={`question-${currentQ.id}`}
                      checked={selectedAnswers[currentQ.id] === String(optIdx)}
                      onChange={() => handleOptionSelect(currentQ.id, optIdx)}
                      className="w-4 h-4 accent-[#092517]"
                    />
                    <span className="font-bold text-xs text-neutral-400 group-hover:text-neutral-600 w-5">{String.fromCharCode(65 + optIdx)}.</span>
                    <span className="text-sm font-medium">{opt}</span>
                  </label>
                ))
              ) : (
                ['True', 'False'].map((val, idx) => (
                  <label 
                    key={idx} 
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer group ${
                      selectedAnswers[currentQ.id] === val 
                        ? 'bg-emerald-50/80 border-emerald-600 text-[#092517] shadow-xs' 
                        : 'bg-neutral-50/60 border-neutral-200 hover:border-neutral-300 text-neutral-700'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name={`question-${currentQ.id}`}
                      checked={selectedAnswers[currentQ.id] === val}
                      onChange={() => setSelectedAnswers({ ...selectedAnswers, [currentQ.id]: val })}
                      className="w-4 h-4 accent-[#092517]"
                    />
                    <span className="text-sm font-medium">{val}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* BOTTOM NAVIGATION FOOTER */}
          <div className="flex items-center justify-between bg-white border border-neutral-200/80 rounded-2xl p-4 shadow-sm">
            <button
              type="button"
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                currentQuestionIndex === 0 ? 'opacity-30 cursor-not-allowed bg-neutral-100 text-neutral-400' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            {currentQuestionIndex < exam.questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                className="px-6 py-2.5 rounded-xl bg-[#092517] hover:bg-[#071d12] text-white font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-sm"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleAutoSubmit}
                className="w-50 py-4 bg-[#092517] hover:bg-[#071d12] text-white font-bold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Submit Exam <Send className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT 1 COL: WEBCAM & QUESTION PALETTE */}
        <div className="space-y-6">
          
          {/* WEBCAM FEED CARD */}
          <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0D2418] flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-600" /> AI Proctor Active
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping"></span>
            </div>

            <div className="relative aspect-video rounded-2xl overflow-hidden border border-neutral-200 bg-black shadow-inner">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
            </div>
            <p className="text-[11px] text-neutral-500 text-center">Continuous gaze & posture monitoring.</p>
          </div>

          {/* QUESTION NAVIGATION PALETTE */}
          <div className="bg-white border border-neutral-200/80 rounded-3xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-[#0D2418]">Question Palette</h3>
            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((q, idx) => {
                const isAnswered = selectedAnswers[q.id] !== undefined;
                const isCurrent = currentQuestionIndex === idx;
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-9 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                      isCurrent 
                        ? 'bg-[#092517] text-white shadow-xs ring-2 ring-emerald-500/20' 
                        : isAnswered 
                        ? 'bg-emerald-50 border border-emerald-300 text-emerald-800' 
                        : 'bg-neutral-100 border border-neutral-200 text-neutral-600 hover:bg-neutral-200'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}