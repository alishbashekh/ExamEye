import React, { useState, useEffect, useRef } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Camera, 
  AlertTriangle, 
  ArrowRight,
  Lock,
  RefreshCw,
  Sun,
  UserCheck,
  Eye,
  Sparkles,
  Check
} from 'lucide-react';

export default function StudentExamEntry() {
  const { examId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [exam, setExam] = useState(null);
  const [studentInfo, setStudentInfo] = useState({ name: '', rollNo: '' });
  const [isFaceVerified, setIsFaceVerified] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [error, setError] = useState('');

  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {
    const payload = searchParams.get('payload');
    if (payload) {
      try {
        let parsedExam = null;
        try {
          const decodedJson = decodeURIComponent(atob(payload));
          parsedExam = JSON.parse(decodedJson);
        } catch (base64Err) {
          parsedExam = JSON.parse(payload);
        }
        if (parsedExam) {
          setExam(parsedExam);
          return;
        }
      } catch (err) {
        console.error("Failed to parse exam payload safely", err);
      }
    }

    const savedExams = JSON.parse(localStorage.getItem('teacherExams') || '[]');
    const foundExam = savedExams.find(ex => ex.id === examId || ex.code === examId);
    
    if (foundExam) {
      setExam(foundExam);
    } else {
      setExam({
        id: examId || 'EXAM-9999',
        title: 'Sample AI Proctored Examination',
        duration: 30,
        sensitivity: 'Medium',
        questions: [
          { id: 1, type: 'mcq', questionText: 'Sample Question: What is React?', options: ['Library', 'Database', 'OS', 'Browser'], correctAnswer: '0' }
        ]
      });
    }
  }, [searchParams, examId]);

  const startCamera = async () => {
    setError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' } 
      });
      setCameraActive(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 150);
    } catch (err) {
      setError('Unable to access webcam. Please allow camera permissions in your browser settings.');
      setCameraActive(false);
    }
  };

  const captureFace = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);

    setCapturedImage(dataUrl);
    setIsFaceVerified(true);
    setCameraActive(false);

    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setIsFaceVerified(false);
    startCamera();
  };

  const handleStartExam = (e) => {
    e.preventDefault();
    if (!studentInfo.name.trim() || !studentInfo.rollNo.trim()) {
      setError('Please enter your Full Name and Roll Number.');
      return;
    }
    if (!isFaceVerified) {
      setError('Face biometric verification is mandatory before starting the exam.');
      return;
    }

    localStorage.setItem('activeExamPayload', JSON.stringify(exam));
    localStorage.setItem('activeStudent', JSON.stringify({
      name: studentInfo.name,
      rollNo: studentInfo.rollNo,
      image: capturedImage,
      examId: exam.id
    }));

    navigate(`/live-exam/${exam.id}`);
  };

  if (!exam) return null;

  return (
    <div className="min-h-screen bg-[#F4F6F5] py-10 px-4 sm:px-6 font-sans text-[#0D2418]">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* HEADER CARD */}
        <div className="bg-gradient-to-br from-[#092517] to-[#123824] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-300 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>ExamEye AI Proctoring Suite</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">{exam.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 pt-1">
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-emerald-400" />
              <span>Duration: <strong className="text-white">{exam.duration} Minutes</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-xl border border-white/10">
              <ShieldAlert className="w-4 h-4 text-emerald-400" />
              <span>Proctoring Sensitivity: <strong className="text-white">{exam.sensitivity}</strong></span>
            </div>
          </div>
        </div>

        {/* GUIDELINES CARD */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#0D2418]">Essential Examination Guidelines</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <p className="font-bold text-[#0D2418] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> AI Gaze & Focus
              </p>
              <p className="text-neutral-500 text-[11px] sm:text-xs">Your eye movements and screen focus are continuously monitored to ensure fairness.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <p className="font-bold text-[#0D2418] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Zero Tab Switching
              </p>
              <p className="text-neutral-500 text-[11px] sm:text-xs">Switching apps, minimizing browser, or opening new tabs logs an immediate violation.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <p className="font-bold text-[#0D2418] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Automated Submission
              </p>
              <p className="text-neutral-500 text-[11px] sm:text-xs">The system will auto-submit your paper safely the moment your countdown timer expires.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/60 space-y-1">
              <p className="font-bold text-[#0D2418] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> Biometric Check
              </p>
              <p className="text-neutral-500 text-[11px] sm:text-xs">Valid webcam face capture is compulsory prior to unlocking your questionnaire.</p>
            </div>
          </div>
        </div>

        {/* STUDENT INFO & WEBCAM VERIFICATION FORM */}
        <form onSubmit={handleStartExam} className="bg-white rounded-3xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h3 className="text-lg font-bold text-[#0D2418]">Candidate Identification & Biometrics</h3>
            <p className="text-xs text-neutral-500 mt-0.5">Please provide your credentials and complete webcam verification.</p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold animate-shake">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">Full Name</label>
              <input 
                type="text"
                required
                placeholder="e.g. Ali Ahmed"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:bg-white focus:border-[#092517] outline-none transition shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">Roll Number / Registration ID</label>
              <input 
                type="text"
                required
                placeholder="e.g. 2026-BS-IT-01"
                value={studentInfo.rollNo}
                onChange={(e) => setStudentInfo({ ...studentInfo, rollNo: e.target.value })}
                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-sm focus:bg-white focus:border-[#092517] outline-none transition shadow-2xs"
              />
            </div>
          </div>

          {/* WEBCAM INSTRUCTIONS & BOX */}
          <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/70 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="font-bold text-sm text-[#0D2418] flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#092517]" />
                  Webcam Face Biometric Verification
                </h4>
                <p className="text-xs text-neutral-500">Position your face clearly within the frame before proceeding.</p>
              </div>
              {isFaceVerified && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shadow-2xs animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Biometrically Verified
                </span>
              )}
            </div>

            {/* DETAILED WEBCAM INSTRUCTION PILLS */}
            {!cameraActive && !capturedImage && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#092517] font-bold">
                    <Sun className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Adequate Lighting</span>
                  </div>
                  <p className="text-neutral-500 text-[11px]">Ensure your face is well-lit with no heavy shadows.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#092517] font-bold">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Face Straight</span>
                  </div>
                  <p className="text-neutral-500 text-[11px]">Look directly straight into the camera lens.</p>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-neutral-200 shadow-2xs space-y-1">
                  <div className="flex items-center gap-1.5 text-[#092517] font-bold">
                    <Eye className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Clear Background</span>
                  </div>
                  <p className="text-neutral-500 text-[11px]">Avoid crowded or dark environments.</p>
                </div>
              </div>
            )}

            {/* ACTIVE CAMERA FEED */}
            {cameraActive && (
              <div className="space-y-4 text-center">
                <div className="relative aspect-video max-w-md mx-auto overflow-hidden rounded-2xl border-4 border-[#092517] bg-black shadow-xl">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
                  <div className="absolute inset-0 border-2 border-dashed border-emerald-400/50 rounded-2xl pointer-events-none m-4 flex items-center justify-center">
                    <span className="bg-black/60 text-emerald-300 text-[10px] px-2 py-1 rounded-md backdrop-blur-xs">Align Face Within Frame</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={captureFace}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg transition cursor-pointer inline-flex items-center gap-2 transform active:scale-95"
                >
                  <Camera className="w-4 h-4" /> Capture Biometric Photo Now
                </button>
              </div>
            )}

            {/* INITIAL START CAMERA BUTTON */}
            {!cameraActive && !capturedImage && (
              <button
                type="button"
                onClick={startCamera}
                className="w-full py-3.5 bg-[#092517] hover:bg-[#071d12] text-white font-semibold text-xs rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
              >
                <Camera className="w-4 h-4 text-emerald-400" /> Start Camera for Biometric Check
              </button>
            )}

            {/* CAPTURED SUCCESS PREVIEW */}
            {capturedImage && !cameraActive && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-emerald-200 shadow-xs">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img src={capturedImage} alt="Verified Face" className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm" />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px] shadow-xs">
                      <Check className="w-3 h-3" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-black text-emerald-800">Biometric Identity Confirmed</p>
                    <p className="text-[11px] text-neutral-500">Your snapshot is successfully linked to this exam session.</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={retakePhoto} 
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Photo
                </button>
              </div>
            )}
          </div>

          {/* FINAL SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={!isFaceVerified}
            className={`w-full py-4 font-bold text-sm rounded-2xl shadow-lg transition flex items-center justify-center gap-2 ${
              isFaceVerified 
                ? 'bg-[#092517] hover:bg-[#071d12] text-white cursor-pointer shadow-emerald-900/10 transform hover:-translate-y-0.5' 
                : 'bg-neutral-200 text-neutral-400 cursor-not-allowed shadow-none'
            }`}
          >
            <Lock className={`w-4 h-4 ${isFaceVerified ? 'text-emerald-400' : 'text-neutral-400'}`} />
            <span>Proceed to Start Exam Session</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}