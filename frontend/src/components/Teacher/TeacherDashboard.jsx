import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ShieldAlert, 
  FileCheck, 
  Users, 
  Clock, 
  Bell, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  Copy, 
  Check,
  Trash2,
  Eye,
  BookOpen
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CreateExam from './CreateExam';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [teacherName, setTeacherName] = useState('Teacher');
  const [exams, setExams] = useState([]);
  const [copiedCode, setCopiedCode] = useState(null);

  // State for Exam Preview Modal when teacher clicks on an exam
  const [selectedExamForPreview, setSelectedExamForPreview] = useState(null);
  const [copiedLinkInModal, setCopiedLinkInModal] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.name || userData.fullName) {
          setTeacherName(userData.name || userData.fullName);
        }
      } catch (err) {
        console.error("Error parsing user data", err);
      }
    }

    const savedExams = JSON.parse(localStorage.getItem('teacherExams') || '[]');
    setExams(savedExams);
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleDeleteExam = (id, e) => {
    if (e) e.stopPropagation();
    const updatedExams = exams.filter(ex => ex.id !== id);
    setExams(updatedExams);
    localStorage.setItem('teacherExams', JSON.stringify(updatedExams));
  };

  const handleCopyModalLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLinkInModal(true);
    setTimeout(() => setCopiedLinkInModal(false), 2000);
  };

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'create-exam', label: 'Create New Exam', icon: PlusCircle },
    { id: 'live-monitor', label: 'Live Proctoring', icon: ShieldAlert },
    { id: 'reports', label: 'Integrity Reports', icon: FileCheck },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-sans text-[#0D2418]">
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#092517] text-white transform transition-transform duration-300 flex flex-col justify-between ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          <div className="h-20 flex items-center justify-between px-6 border-b border-[#143d27]">
             <Link to="/" className="inline-flex items-center gap-3">
                                      <img
                                        src="/images/exameye-logo.png"
                                        alt="ExamEye Logo"
                                        className="h-8 w-8 object-contain sm:h-5 sm:w-5 lg:h-12 lg:w-12"
                                      />
                                      <div className="flex flex-col text-left">
                                        <span className="text-2px font-black tracking-tight text-white sm:text-1xl lg:text-2xl">
                                          ExamEye
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#75F6B6] ">
                                          AI PROCTOR
                                        </span>
                                      </div>
                                    </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-neutral-300 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="p-4 space-y-1.5 mt-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive ? 'bg-white/15 text-white shadow-sm ring-1 ring-white/20' : 'text-neutral-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-[#143d27]">
          <div className="bg-[#071d12] rounded-xl p-3.5 flex items-center justify-between border border-[#143d27]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm">
                {teacherName.charAt(0).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{teacherName}</p>
                <p className="text-xs text-neutral-400">Teacher Portal</p>
              </div>
            </div>
            <button onClick={handleLogout} title="Logout" className="text-neutral-400 hover:text-rose-400 transition-colors p-1.5 cursor-pointer">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-neutral-200 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 cursor-pointer">
              <Menu className="w-6 h-6" />
            </button>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0D2418] capitalize">
                {navItems.find(i => i.id === activeTab)?.label}
              </h2>
              <p className="text-xs text-[#526058] hidden sm:block">AI-Powered Proctoring & Exam Control Center</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2.5 rounded-xl bg-neutral-100 text-neutral-600 hover:bg-neutral-200 transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('create-exam')}
              className="flex items-center gap-2 bg-[#092517] hover:bg-[#071d12] text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Create Exam</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          {activeTab === 'overview' && (
            <>
              <div className="relative overflow-hidden rounded-3xl bg-[#092517] p-6 sm:p-8 text-white shadow-xl">
                <div className="relative z-10 max-w-2xl space-y-3">
                
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Welcome, {teacherName}!</h3>
                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                    {exams.length === 0 
                      ? "You have not created any exams yet. Start by scheduling your first exam." 
                      : `You currently have ${exams.length} active exam(s) ready for student monitoring.`}
                  </p>
                  <div className="pt-2">
                    <button 
                      onClick={() => setActiveTab('create-exam')}
                      className="px-5 py-3 bg-white text-[#092517] hover:bg-emerald-50 font-bold text-sm rounded-xl transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" /> Create New Exam
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Active Exams</p>
                    <p className="text-3xl font-black text-[#0D2418] mt-1">{exams.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#092517] flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Students Monitored</p>
                    <p className="text-3xl font-black text-[#0D2418] mt-1">0</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#092517] flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-neutral-500">Integrity Reports</p>
                    <p className="text-3xl font-black text-[#0D2418] mt-1">0</p>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#092517] flex items-center justify-center">
                    <FileCheck className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {exams.length > 0 && (
                <div className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden">
                  <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-lg">Your Created Exams</h4>
                      <p className="text-xs text-neutral-500">Click on any exam row to view full questions, answer keys, and shareable link.</p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-[#092517]">
                      {exams.length} Total
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-neutral-50 text-neutral-500 text-xs uppercase tracking-wider border-b border-neutral-100">
                          <th className="py-3.5 px-6 font-semibold">Title</th>
                          <th className="py-3.5 px-4 font-semibold">Access Code</th>
                          <th className="py-3.5 px-4 font-semibold">Duration</th>
                          <th className="py-3.5 px-4 font-semibold">AI Sensitivity</th>
                          <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100 text-sm">
                        {exams.map((ex) => (
                          <tr 
                            key={ex.id} 
                            onClick={() => setSelectedExamForPreview(ex)}
                            className="hover:bg-emerald-50/40 transition-colors cursor-pointer"
                            title="Click to view exam questions & details"
                          >
                            <td className="py-4 px-6 font-semibold text-neutral-800 flex items-center gap-2">
                              
                              <span>{ex.title}</span>
                            </td>
                            <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={() => handleCopy(ex.code)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-emerald-50 hover:text-[#092517] font-mono text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
                              >
                                {ex.code}
                                {copiedCode === ex.code ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-neutral-400" />}
                              </button>
                            </td>
                            <td className="py-4 px-4 text-neutral-600">{ex.duration} mins</td>
                            <td className="py-4 px-4">
                              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-[#092517]">
                                {ex.sensitivity}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                              <button 
                                onClick={(e) => handleDeleteExam(ex.id, e)}
                                title="Delete Exam"
                                className="p-2 rounded-lg text-neutral-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === 'create-exam' && (
            <CreateExam onExamCreated={() => setActiveTab('overview')} />
          )}

          {activeTab === 'live-monitor' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#092517] flex items-center justify-center mx-auto">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#0D2418]">Live Proctoring & Telemetry</h3>
              <p className="text-sm text-neutral-500 max-w-md mx-auto">
                No active exams running right now. Once students join via exam code, live AI violation feeds will appear here.
              </p>
              <button onClick={() => setActiveTab('overview')} className="px-6 py-2.5 bg-[#092517] text-white text-sm font-semibold rounded-xl hover:bg-[#071d12] transition cursor-pointer">
                Back to Overview
              </button>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-white rounded-2xl border border-neutral-200 p-8 sm:p-12 text-center space-y-4 shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#092517] flex items-center justify-center mx-auto">
                <FileCheck className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#0D2418]">Integrity Reports</h3>
              <p className="text-sm text-neutral-500 max-w-md mx-auto">
                Completed exam reports and automated trust score evaluations will be listed here.
              </p>
              <button onClick={() => setActiveTab('overview')} className="px-6 py-2.5 bg-[#092517] text-white text-sm font-semibold rounded-xl hover:bg-[#071d12] transition cursor-pointer">
                Back to Overview
              </button>
            </div>
          )}
        </main>
      </div>

      {/* EXAM PREVIEW MODAL WHEN TEACHER CLICKS ON ANY EXAM */}
      {selectedExamForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-neutral-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6 relative">
            <button 
              onClick={() => setSelectedExamForPreview(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 border-b border-neutral-100 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#092517] text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Exam Details & Answer Key Preview</span>
              </div>
              <h3 className="text-2xl font-black text-[#0D2418]">{selectedExamForPreview.title}</h3>
              <div className="flex flex-wrap gap-4 text-xs text-neutral-500 pt-1">
                <span><strong>Duration:</strong> {selectedExamForPreview.duration} Minutes</span>
                <span><strong>AI Sensitivity:</strong> {selectedExamForPreview.sensitivity}</span>
                <span><strong>Access Code:</strong> <span className="font-mono font-bold text-[#092517]">{selectedExamForPreview.code}</span></span>
              </div>
            </div>

            {/* Shareable Link Box in Modal */}
            <div className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <div className="overflow-hidden mr-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Student Shareable Link</span>
                <span className="font-mono text-xs font-semibold text-blue-600 truncate block">{selectedExamForPreview.link}</span>
              </div>
              <button 
                onClick={() => handleCopyModalLink(selectedExamForPreview.link)}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-emerald-50 hover:text-[#092517] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                {copiedLinkInModal ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                <span>{copiedLinkInModal ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>

            {/* Questions & Correct Answers List */}
            <div className="space-y-4">
              <h4 className="font-bold text-base text-[#0D2418]">Questions & Hidden Answer Keys ({selectedExamForPreview.questions?.length || 0})</h4>
              
              {selectedExamForPreview.questions?.map((q, idx) => (
                <div key={q.id || idx} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 space-y-3 text-xs">
                  <div className="flex items-center justify-between font-bold text-neutral-700">
                    <span>Q{idx + 1}. {q.questionText}</span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold uppercase">
                      {q.type}
                    </span>
                  </div>

                  {q.type === 'mcq' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = String(q.correctAnswer) === String(optIdx);
                        return (
                          <div 
                            key={optIdx} 
                            className={`p-2 rounded-lg border flex items-center justify-between ${
                              isCorrect ? 'bg-emerald-50 border-emerald-300 font-bold text-emerald-900' : 'bg-white border-neutral-200 text-neutral-600'
                            }`}
                          >
                            <span>{String.fromCharCode(65 + optIdx)}. {opt}</span>
                            {isCorrect && <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">Correct</span>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex gap-4 pt-1">
                      <div className={`px-4 py-2 rounded-lg border font-semibold ${q.correctAnswer === 'True' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-neutral-200 text-neutral-600'}`}>
                        True {q.correctAnswer === 'True' && ' (Correct)'}
                      </div>
                      <div className={`px-4 py-2 rounded-lg border font-semibold ${q.correctAnswer === 'False' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-neutral-200 text-neutral-600'}`}>
                        False {q.correctAnswer === 'False' && ' (Correct)'}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setSelectedExamForPreview(null)}
              className="w-full py-3 bg-[#092517] hover:bg-[#071d12] text-white font-bold text-sm rounded-xl transition cursor-pointer"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </div>
  );
}