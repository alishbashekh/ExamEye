import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  BookOpen, 
  ArrowRight,
  CheckCircle2,
  X,
  MessageCircle
} from 'lucide-react';

export default function CreateExam({ onExamCreated }) {
  const [examData, setExamData] = useState({
    title: '',
    duration: '',
    sensitivity: 'Medium',
  });

  const [questions, setQuestions] = useState([
    { 
      id: 1, 
      questionText: '', 
      type: 'mcq', 
      options: ['', '', '', ''], 
      correctAnswer: '0' 
    }
  ]);

  const [generatedExam, setGeneratedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [error, setError] = useState('');

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { 
        id: questions.length + 1, 
        questionText: '', 
        type: 'mcq', 
        options: ['', '', '', ''], 
        correctAnswer: '0' 
      }
    ]);
  };

  const handleDeleteQuestion = (id) => {
    if (questions.length === 1) {
      setError('An exam must have at least one question.');
      return;
    }
    setQuestions(questions.filter(q => q.id !== id));
    setError('');
  };

  const handleQuestionChange = (id, field, value) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        if (field === 'type') {
          return {
            ...q,
            type: value,
            options: value === 'true-false' ? ['True', 'False'] : ['', '', '', ''],
            correctAnswer: value === 'true-false' ? 'True' : '0'
          };
        }
        return { ...q, [field]: value };
      }
      return q;
    }));
  };

  const handleOptionChange = (qId, optionIndex, value) => {
    setQuestions(questions.map(q => {
      if (q.id === qId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleGenerateExam = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setError('');

    if (!examData.title.trim() || !examData.duration) {
      setError('Please provide an Exam Title and Time Limit.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].questionText.trim()) {
        setError(`Question #${i + 1} statement cannot be empty.`);
        return;
      }
    }

    const randomCode = Math.floor(100000 + Math.random() * 900000);
    const formattedCode = `${String(randomCode).slice(0, 3)}-${String(randomCode).slice(3)}`;
    const examId = `EXAM-${Math.floor(1000 + Math.random() * 9000)}`;

    const examObject = {
      id: examId,
      title: examData.title,
      duration: Number(examData.duration),
      sensitivity: examData.sensitivity,
      code: formattedCode,
      questions: questions,
      createdAt: new Date().toLocaleTimeString(),
    };

    // Base64 Payload encoding so exam questions & answers travel inside the link
    const jsonString = JSON.stringify(examObject);
    const base64Payload = btoa(encodeURIComponent(jsonString));
    
    // Link directly pointing to the StudentExamEntry route/file path
    const examEntryLink = `${window.location.origin}/StudentExamEntry?payload=${base64Payload}`;

    const finalExamRecord = {
      ...examObject,
      link: examEntryLink
    };

    // Save locally for Teacher Dashboard overview
    const existingExams = JSON.parse(localStorage.getItem('teacherExams') || '[]');
    localStorage.setItem('teacherExams', JSON.stringify([finalExamRecord, ...existingExams]));

    setGeneratedExam(finalExamRecord);
    setShowModal(true);
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleWhatsAppShare = (exam) => {
    const text = `*ExamEye - Secure Proctored Examination*\n\n📌 *Exam:* ${exam.title}\n⏱️ *Duration:* ${exam.duration} Minutes\n🔑 *Access Code:* ${exam.code}\n\n🔗 *Open Exam Entry Link:*\n${exam.link}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      <form onSubmit={handleGenerateExam} className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-10 shadow-sm space-y-8">
        <div>
          
          <h3 className="text-2xl font-black text-[#0D2418]">Create New Examination</h3>
          <p className="text-xs sm:text-sm text-neutral-500 mt-1">
            Build MCQs or True/False questions, set correct answers for automated evaluation, and generate the StudentExamEntry link.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Exam Title</label>
            <input 
              type="text"
              required
              placeholder="e.g. Software Engineering Midterm"
              value={examData.title}
              onChange={(e) => setExamData({ ...examData, title: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:bg-white focus:border-[#092517] outline-none transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1.5">Time Limit (Minutes)</label>
            <input 
              type="number"
              required
              placeholder="e.g. 45"
              value={examData.duration}
              onChange={(e) => setExamData({ ...examData, duration: e.target.value })}
              className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:bg-white focus:border-[#092517] outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1.5">AI Proctoring Sensitivity</label>
          <select 
            value={examData.sensitivity}
            onChange={(e) => setExamData({ ...examData, sensitivity: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:bg-white focus:border-[#092517] outline-none transition"
          >
            <option value="Low">Low (Gaze tracking only)</option>
            <option value="Medium">Medium (Gaze + Tab Switch detection)</option>
            <option value="High">High (Gaze + Tab Switch + Mobile/Extra Face Detection via COCO-SSD)</option>
          </select>
        </div>

        <hr className="border-neutral-100" />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-lg text-[#0D2418] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#092517]" />
              Exam Questions & Answer Key ({questions.length})
            </h4>
            <button 
              type="button"
              onClick={handleAddQuestion}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-[#092517] hover:bg-emerald-100 text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </div>

          {questions.map((q, index) => (
            <div key={q.id} className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50/50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">Question #{index + 1}</span>
                <div className="flex items-center gap-3">
                  <select 
                    value={q.type}
                    onChange={(e) => handleQuestionChange(q.id, 'type', e.target.value)}
                    className="px-3 py-1 bg-white border border-neutral-200 rounded-lg text-xs font-semibold text-neutral-700 outline-none"
                  >
                    <option value="mcq">Multiple Choice (MCQ)</option>
                    <option value="true-false">True / False</option>
                  </select>
                  <button 
                    type="button"
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="text-neutral-400 hover:text-rose-600 transition p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <input 
                type="text"
                placeholder="Enter question statement..."
                value={q.questionText}
                onChange={(e) => handleQuestionChange(q.id, 'questionText', e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm focus:border-[#092517] outline-none transition"
              />

              {q.type === 'mcq' ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => (
                      <div key={optIdx} className="flex items-center gap-2">
                        <span className="text-xs font-bold text-neutral-400 w-5">{String.fromCharCode(65 + optIdx)}.</span>
                        <input 
                          type="text"
                          placeholder={`Option ${optIdx + 1}`}
                          value={opt}
                          onChange={(e) => handleOptionChange(q.id, optIdx, e.target.value)}
                          className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs focus:border-[#092517] outline-none transition"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-3 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    <span className="text-xs font-bold text-[#092517]">Correct Answer:</span>
                    <select
                      value={q.correctAnswer}
                      onChange={(e) => handleQuestionChange(q.id, 'correctAnswer', e.target.value)}
                      className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-[#092517] outline-none"
                    >
                      <option value="0">Option A</option>
                      <option value="1">Option B</option>
                      <option value="2">Option C</option>
                      <option value="3">Option D</option>
                    </select>
                    <span className="text-[11px] text-neutral-500 italic">(Hidden from students)</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs font-medium text-neutral-500">
                    Options for students will automatically be: <strong className="text-neutral-800">True</strong> & <strong className="text-neutral-800">False</strong>
                  </div>

                  <div className="pt-2 flex items-center gap-3 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100">
                    <span className="text-xs font-bold text-[#092517]">Correct Answer:</span>
                    <select
                      value={q.correctAnswer}
                      onChange={(e) => handleQuestionChange(q.id, 'correctAnswer', e.target.value)}
                      className="px-3 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs font-bold text-[#092517] outline-none"
                    >
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                    <span className="text-[11px] text-neutral-500 italic">(Hidden from students)</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-[#092517] hover:bg-[#071d12] text-white font-bold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Generate Exam Code & Link</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* ANIMATED OVERLAY MODAL */}
      {showModal && generatedExam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 relative">
            <button 
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-[#0D2418]">Exam Created Successfully!</h3>
              <p className="text-xs text-neutral-500">
                Share this access code or direct StudentExamEntry link with your students.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">6-Digit Code</span>
                  <span className="font-mono text-lg font-black text-[#092517]">{generatedExam.code}</span>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopyCode(generatedExam.code)}
                  className="px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-emerald-50 hover:text-[#092517] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                  <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                </button>
              </div>

              <div className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                <div className="overflow-hidden mr-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">StudentExamEntry Link</span>
                  <span className="font-mono text-xs font-semibold text-blue-600 truncate block">{generatedExam.link}</span>
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button"
                    onClick={() => handleCopyLink(generatedExam.link)}
                    className="shrink-0 px-3 py-2 rounded-xl bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-emerald-50 hover:text-[#092517] transition flex items-center gap-1.5 shadow-xs cursor-pointer"
                    title="Copy Link"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleWhatsAppShare(generatedExam)}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white transition flex items-center gap-1.5 shadow-xs text-xs font-semibold cursor-pointer"
                    title="Share directly via WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={() => {
                setShowModal(false);
                if (onExamCreated) onExamCreated();
              }}
              className="w-full py-3.5 bg-[#092517] hover:bg-[#071d12] text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
            >
              Done & Return to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}