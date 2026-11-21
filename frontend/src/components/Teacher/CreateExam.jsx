import React, { useState, useRef } from 'react';
import { 
  Plus, Trash2, Copy, Check, Sparkles, BookOpen, ArrowRight,
  CheckCircle2, X, MessageCircle, Upload, Download
} from 'lucide-react';

export default function CreateExam({ onExamCreated }) {
  const [examData, setExamData] = useState({
    title: '',
    duration: '',
     description: '',
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
  const fileRef = useRef(null);
const [preview, setPreview] = useState(null); // { questions, errors }
const [importing, setImporting] = useState(false);
const [saving, setSaving] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { 
        id: Date.now(), 
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

  const mapImportedQuestion = (q, index) => {
  const id = Date.now() + index;

  if (q.questionType === 'true_false') {
    return {
      id,
      questionText: q.questionText,
      type: 'true-false',
      options: ['True', 'False'],
      correctAnswer: q.correctAnswer, // "True" or "False"
    };
  }

  const options = [0, 1, 2, 3].map((i) => (q.options || [])[i] || '');
  const idx = options.indexOf(q.correctAnswer);
  return {
    id,
    questionText: q.questionText,
    type: 'mcq',
    options,
    correctAnswer: String(idx >= 0 ? idx : 0), // index string, like your dropdown
  };
};

const handleImport = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file); // key must be "file"

  try {
    setImporting(true);
    setError('');
    const res = await fetch('http://localhost:5000/api/exams/import-questions', {
      method: 'POST',
      body: formData, // don't set Content-Type yourself
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Import failed.');
      return;
    }
    setPreview(data);
  } catch (err) {
    setError('Could not reach the server. Is the backend running?');
  } finally {
    setImporting(false);
    e.target.value = ''; // lets the same file be picked again
  }
};

const confirmImport = () => {
  const imported = preview.questions.map(mapImportedQuestion);
  // if the form only has the empty starter question, replace it
  const onlyBlank = questions.length === 1 && !questions[0].questionText.trim();
  setQuestions(onlyBlank ? imported : [...questions, ...imported]);
  setPreview(null);
  setError('');
};

const handleDownloadTemplate = () => {
  const csv =
    'question,type,optionA,optionB,optionC,optionD,correct,marks\n' +
    'What does HTTP stand for?,mcq,HyperText Transfer Protocol,High Transfer Text Protocol,Hyper Terminal Protocol,None of these,A,1\n' +
    'The sky is blue.,true_false,,,,,True,1\n';
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'questions_template.csv';
  a.click();
  URL.revokeObjectURL(url);
};

  const handleGenerateExam = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  setError('');

  if (!examData.title.trim() || !examData.duration.trim() ) {
    setError('Please provide an Exam Title and Time Limit.');
    return;
  }

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!q.questionText.trim()) {
      setError(`Question #${i + 1} statement cannot be empty.`);
      return;
    }
    if (q.type === 'mcq') {
      const filled = q.options.filter((o) => o.trim()).length;
      if (filled < 2) {
        setError(`Question #${i + 1} needs at least 2 options.`);
        return;
      }
      if (!q.options[Number(q.correctAnswer)]?.trim()) {
        setError(`Question #${i + 1}: the correct answer points to an empty option.`);
        return;
      }
    }
  }

  // convert cards to the Question model shape (same format the import uses)
  const payloadQuestions = questions.map((q) => ({
    questionText: q.questionText.trim(),
    questionType: q.type === 'true-false' ? 'true_false' : 'mcq',
    options:
      q.type === 'true-false'
        ? ['True', 'False']
        : q.options.map((o) => o.trim()).filter(Boolean),
    correctAnswer:
      q.type === 'true-false'
        ? q.correctAnswer
        : q.options[Number(q.correctAnswer)].trim(),
    marks: 1,
  }));

  const totalMarks = payloadQuestions.reduce((sum, q) => sum + q.marks, 0);

  // CHECK: replace with however your login stores the teacher's numeric id
  const teacherId = JSON.parse(localStorage.getItem('user') || '{}')?.id;
  if (!teacherId) {
    setError('Could not find the logged-in teacher. Please log in again.');
    return;
  }

  // the form has no start/end pickers yet: open now, close in 24 hours
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + 24 * 60 * 60 * 1000);

  try {
    setSaving(true);
    const res = await fetch('http://localhost:5000/api/exams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: examData.title.trim(),
        description: examData.description.trim(),
        durationMinutes: Number(examData.duration),
        startTime,
        endTime,
        totalMarks,
        passingMarks: Math.ceil(totalMarks / 2),
        teacherId,
        sensitivity: examData.sensitivity,
        questions: payloadQuestions,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message || 'Could not create the exam.');
      return;
    }

    const exam = data.exam;
    setGeneratedExam({
      ...exam,
      code: `${exam.code.slice(0, 3)}-${exam.code.slice(3)}`, // shown as 123-456
      link: `${window.location.origin}/StudentExamEntry?code=${exam.code}`,
    });
    setShowModal(true);
  } catch (err) {
    setError('Could not reach the server. Is the backend running?');
  } finally {
    setSaving(false);
  }
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
    const text = `*ExamEye - Secure Proctored Examination*\n\n📌 *Exam:* ${exam.title}\n⏱️ *Duration:* ${exam.durationMinutes} Minutes\n🔑 *Access Code:* ${exam.code}\n\n🔗 *Open Exam Entry Link:*\n${exam.link}`;
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
  <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
    Description <span className="text-neutral-400 font-normal">(optional)</span>
  </label>
  <textarea
    rows={3}
    maxLength={500}
    placeholder="e.g. Chapters 1 to 4. Closed book. Calculators not allowed."
    value={examData.description}
    onChange={(e) => setExamData({ ...examData, description: e.target.value })}
    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:bg-white focus:border-[#092517] outline-none transition resize-none"
  />
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
           <div className="flex items-center gap-2">
  <input
    type="file"
    accept=".csv,.xlsx"
    ref={fileRef}
    onChange={handleImport}
    hidden
  />
  <button
    type="button"
    onClick={handleDownloadTemplate}
    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-neutral-500 hover:text-[#092517] text-xs font-semibold transition cursor-pointer"
  >
    <Download className="w-4 h-4" /> Template
  </button>
  <button
    type="button"
    onClick={() => fileRef.current.click()}
    disabled={importing}
    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-emerald-200 text-[#092517] hover:bg-emerald-50 text-xs font-bold transition cursor-pointer disabled:opacity-50"
  >
    <Upload className="w-4 h-4" /> {importing ? 'Reading file...' : 'Import Questions'}
  </button>
  <button
    type="button"
    onClick={handleAddQuestion}
    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-[#092517] hover:bg-emerald-100 text-xs font-bold transition cursor-pointer"
  >
    <Plus className="w-4 h-4" /> Add Question
  </button>
</div>
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
  disabled={saving}
  className="w-full py-4 bg-[#092517] hover:bg-[#071d12] text-white font-bold text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
>
  <span>{saving ? 'Creating exam...' : 'Generate Exam Code & Link'}</span>
  <ArrowRight className="w-4 h-4" />
</button>
      </form>
      {preview && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
    <div className="bg-white rounded-3xl border border-neutral-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-black text-[#0D2418]">Import Preview</h3>
          <p className="text-xs text-neutral-500 mt-1">
            {preview.questions.length} valid, {preview.errors.length} with problems
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPreview(null)}
          className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-y-auto space-y-3 pr-1">
        {preview.errors.length > 0 && (
          <ul className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs space-y-1">
            {preview.errors.map((er, i) => (
              <li key={i}>Row {er.row}: {er.message}</li>
            ))}
          </ul>
        )}

        <ol className="list-decimal pl-5 text-sm text-neutral-700 space-y-1">
          {preview.questions.map((q, i) => (
            <li key={i}>{q.questionText}</li>
          ))}
        </ol>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => setPreview(null)}
          className="flex-1 py-3 rounded-xl border border-neutral-200 text-sm font-semibold text-neutral-600 hover:bg-neutral-50 transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={confirmImport}
          disabled={preview.questions.length === 0}
          className="flex-1 py-3 rounded-xl bg-[#092517] hover:bg-[#071d12] text-white text-sm font-bold transition cursor-pointer disabled:opacity-40"
        >
          Add {preview.questions.length} questions
        </button>
      </div>
    </div>
  </div>
)}

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