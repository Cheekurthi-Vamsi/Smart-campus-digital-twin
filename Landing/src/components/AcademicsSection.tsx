import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  Trophy,
  Upload,
  Check,
  Play,
  Terminal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserCheck,
  Bell,
  MapPin,
  Send
} from 'lucide-react';

const slides = [
  {
    id: 'assignments',
    title: 'Smart Assignments Deliveries',
    label: 'Academics Module 01',
    color: '#00E5FF',
    desc: 'Automated validation, grading structures, and progress logs synchronized directly to the course timeline.',
    features: [
      'Automatic archive & notebook validation.',
      'Grade recommendation metrics for instructors.',
      'Plagiarism checks and file-change sync history.',
    ]
  },
  {
    id: 'mcqs',
    title: 'AI-Powered Adaptive Mock Tests',
    label: 'Academics Module 02',
    color: '#7B61FF',
    desc: 'Dynamic questionnaires that modify difficulty in real-time to analyze student learning voids.',
    features: [
      'Anti-cheat screen tracking and timers.',
      'Syllabus-aligned question generators.',
      'Visual study path recommendations.',
    ]
  },
  {
    id: 'coding',
    title: 'Interactive Compiler Sandbox',
    label: 'Academics Module 03',
    color: '#FF00E5',
    desc: 'Vetted code sandbox environment supporting immediate multi-language compilation and testing logs.',
    features: [
      'Sandboxed Python & Javascript compilers.',
      'Automated check case script validation.',
      'Timing and memory allocation analysis.',
    ]
  },
  {
    id: 'attendance',
    title: 'Biometric Attendance Telemetry',
    label: 'Academics Module 04',
    color: '#10B981',
    desc: 'Live student attendance checks synced with location beacons and automated warning checkers.',
    features: [
      'Fingerprint and face biometric check-in sync.',
      'Smart absent notification alerts to advisors.',
      'Telemetry metrics for student activity heatmap.',
    ]
  },
  {
    id: 'notifications',
    title: 'Live Campus Announcements Hub',
    label: 'Academics Module 05',
    color: '#F59E0B',
    desc: 'Immediate news, department advisories, and emergency alerts pushed directly to user nodes.',
    features: [
      'Vetted department announcements feed.',
      'Urgent SMS and email broadcast triggers.',
      'Real-time calendar updates for exam rosters.',
    ]
  }
];

export default function AcademicsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // --- Assignments Mock States ---
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleUpload = () => {
    setIsUploading(true);
    setUploadSuccess(false);
    setFileName('DeepLearning_Project1.ipynb');
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1200);
  };

  // --- MCQ Mock States ---
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const question = {
    q: 'Which database design normal form deals with removing multi-valued dependencies?',
    options: ['1NF', '2NF', '3NF', '4NF'],
    correct: 3, // 4NF
  };

  // --- Compiler Sandbox States ---
  const [lang, setLang] = useState('python');
  const [ideLogs, setIdeLogs] = useState<string[]>(['Click "Run Code" to compile...']);
  const [compiling, setCompiling] = useState(false);
  const codes: Record<string, string> = {
    python: 'def calculate_cgpa(grades):\n    return sum(grades) / len(grades)\n\nprint("Average Grade:", calculate_cgpa([9.0, 8.5, 9.5]))',
    javascript: 'const grades = [9.0, 8.5, 9.5];\nconst avg = grades.reduce((a,b)=>a+b, 0) / grades.length;\nconsole.log("Average Grade:", avg);',
  };

  const executeCode = () => {
    setCompiling(true);
    setIdeLogs(['Initializing kernel...', 'Evaluating code syntax...']);
    setTimeout(() => {
      setIdeLogs([
        'Initializing kernel...',
        'Evaluating code syntax...',
        'Output:',
        'Average Grade: 9.0',
        'Execution finished successfully (0ms).'
      ]);
      setCompiling(false);
    }, 1000);
  };

  // --- Attendance Mock States ---
  const [attendanceState, setAttendanceState] = useState<'OFFLINE' | 'SYNCING' | 'PRESENT'>('OFFLINE');
  const triggerCheckIn = () => {
    setAttendanceState('SYNCING');
    setTimeout(() => {
      setAttendanceState('PRESENT');
    }, 1500);
  };

  // --- Announcements Mock States ---
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Final exam schedule has been officially published.', level: 'info', time: '10m ago' },
    { id: 2, title: 'Central database cluster undergoing node rotation.', level: 'warning', time: '1h ago' }
  ]);
  const [newAlertText, setNewAlertText] = useState('');

  const broadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlertText.trim()) return;
    setAlerts(prev => [
      { id: Date.now(), title: newAlertText, level: 'urgent', time: 'Just now' },
      ...prev
    ]);
    setNewAlertText('');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section id="academics" ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-tr from-neutral-50 via-slate-50 to-neutral-50 dark:from-dark-900 dark:via-dark-900 dark:to-dark-900 border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 dark:bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 dark:bg-secondary/5 blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-black/10 dark:border-white/10 mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">Core Academics Hub</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            Academic Operations <span className="gradient-text">Slides</span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Explore 5 detailed interactive slide interfaces detailing syllabus tasks, grading analytics and real-time alerts.
          </p>
        </div>

        {/* Carousel Slider Panel */}
        <div className="relative glass-card border border-black/10 dark:border-white/10 rounded-3xl p-6 md:p-10 min-h-[520px] flex flex-col justify-between overflow-hidden shadow-2xl">
          
          {/* Slide Navigator Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-grow pt-10"
            >
              
              {/* Slide Detail Copy */}
              <div className="lg:col-span-5 space-y-5 text-left">
                <span className="text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded bg-black/5 dark:bg-white/5 uppercase" style={{ color: active.color }}>
                  {active.label}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                  {active.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                  {active.desc}
                </p>
                <ul className="space-y-3.5 text-xs text-slate-700 dark:text-gray-300">
                  {active.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-4 h-4" style={{ color: active.color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Mockup Container */}
              <div className="lg:col-span-7">
                <div className="relative rounded-3xl bg-slate-950/95 border border-slate-900 p-5 shadow-2xl h-[330px] flex flex-col justify-between text-left overflow-hidden">
                  
                  {/* Chrome mock bar */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[9px] font-mono text-gray-500">campustwin.ai/academics/{active.id}</span>
                    <div className="w-8" />
                  </div>

                  {/* Mock content: ASSIGNMENTS */}
                  {active.id === 'assignments' && (
                    <div className="flex-grow flex flex-col justify-center gap-4 py-4">
                      <div className="text-center p-6 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:border-cyan-400/50 transition-colors">
                        {uploadSuccess ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-cyan-500/20 text-[#00E5FF] flex items-center justify-center">
                              <Check className="w-5 h-5" />
                            </div>
                            <div className="text-xs text-white font-semibold">Upload completed!</div>
                            <div className="text-[9px] text-gray-500">{fileName} submitted.</div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <Upload className="w-6 h-6 text-gray-400 animate-bounce" />
                            <div className="text-xs text-gray-300">Drag & drop files to submit homework</div>
                            <button
                              onClick={handleUpload}
                              disabled={isUploading}
                              className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors"
                            >
                              {isUploading ? 'Uploading file...' : 'Select File'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mock content: MCQS */}
                  {active.id === 'mcqs' && (
                    <div className="flex-grow flex flex-col justify-between py-4">
                      <div>
                        <div className="text-xs text-white font-semibold leading-relaxed mb-3">{question.q}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {question.options.map((opt, idx) => {
                            const isSel = selectedOpt === idx;
                            let style = 'bg-white/5 border-white/5 text-gray-300';
                            if (isSel) {
                              if (isAnswerChecked) {
                                style = idx === question.correct 
                                  ? 'bg-green-500/20 border-green-500 text-green-400' 
                                  : 'bg-red-500/20 border-red-500 text-red-400';
                              } else {
                                style = 'bg-purple-500/20 border-purple-500 text-purple-400';
                              }
                            }
                            return (
                              <button
                                key={opt}
                                onClick={() => { if (!isAnswerChecked) setSelectedOpt(idx); }}
                                className={`p-2 rounded-xl border text-[10px] font-semibold text-left transition-all ${style}`}
                              >
                                {idx + 1}. {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-2 mt-2">
                        <span className="text-[9px] text-gray-500 font-mono">Exam telemetries active</span>
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => { setSelectedOpt(null); setIsAnswerChecked(false); }}
                            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[9px] font-semibold"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => { if (selectedOpt !== null) setIsAnswerChecked(true); }}
                            disabled={selectedOpt === null}
                            className="px-2.5 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-[9px] font-bold"
                          >
                            Check answer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mock content: CODING */}
                  {active.id === 'coding' && (
                    <div className="flex-grow flex flex-col justify-between py-3">
                      <div className="grid grid-cols-2 gap-3 flex-grow overflow-hidden">
                        <div className="rounded-xl border border-white/5 bg-slate-950 p-2.5 flex flex-col justify-between h-[160px]">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[8px] font-mono text-gray-500">compiler.py</span>
                            <div className="flex gap-1">
                              {['python', 'javascript'].map((l) => (
                                <button
                                  key={l}
                                  onClick={() => setLang(l)}
                                  className={`text-[8px] font-mono uppercase px-1 rounded ${
                                    lang === l ? 'bg-pink-500/20 text-pink-400 font-bold' : 'text-gray-500'
                                  }`}
                                >
                                  {l}
                                </button>
                              ))}
                            </div>
                          </div>
                          <textarea
                            className="flex-grow bg-transparent text-[8px] font-mono text-emerald-400 border-none outline-none resize-none h-full"
                            value={codes[lang]}
                            readOnly
                          />
                        </div>

                        <div className="rounded-xl border border-white/5 bg-slate-950 p-2.5 flex flex-col justify-between h-[160px]">
                          <span className="text-[8px] font-mono text-gray-500 flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-pink-500" /> Output
                          </span>
                          <div className="flex-grow font-mono text-[7.5px] text-gray-300 space-y-1 overflow-y-auto mt-1.5">
                            {ideLogs.map((log, i) => (
                              <div key={i}>{log}</div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                        <span className="text-[8px] font-mono text-gray-500">READY</span>
                        <button
                          onClick={executeCode}
                          disabled={compiling}
                          className="px-3 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white text-[9px] font-bold flex items-center gap-1"
                        >
                          <Play className="w-3.5 h-3.5" />
                          {compiling ? 'Compiling...' : 'Run Code'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Mock content: ATTENDANCE */}
                  {active.id === 'attendance' && (
                    <div className="flex-grow flex flex-col justify-center py-4 px-2">
                      <div className="rounded-2xl bg-white/5 border border-white/5 p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            attendanceState === 'PRESENT' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'
                          }`}>
                            <UserCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white">Daily Attendance Sync</div>
                            <div className="text-[9px] text-gray-500 mt-0.5">Biometric beacon: Engineering Gate B</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                            attendanceState === 'PRESENT' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {attendanceState}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col items-center gap-2">
                        {attendanceState === 'PRESENT' ? (
                          <div className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Location check-in verified. Enjoy your class!
                          </div>
                        ) : (
                          <button
                            onClick={triggerCheckIn}
                            disabled={attendanceState === 'SYNCING'}
                            className="px-6 py-2 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 disabled:opacity-50 transition-all flex items-center gap-1"
                          >
                            <MapPin className="w-3.5 h-3.5 text-primary" />
                            {attendanceState === 'SYNCING' ? 'Syncing Telemetry...' : 'Mock Check-in'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mock content: NOTIFICATIONS */}
                  {active.id === 'notifications' && (
                    <div className="flex-grow flex flex-col justify-between py-3">
                      <div className="space-y-2 overflow-y-auto max-h-[140px] pr-1 scrollbar-none">
                        {alerts.map((alert) => (
                          <div key={alert.id} className="p-2 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                            <Bell className={`w-3.5 h-3.5 mt-0.5 ${alert.level === 'urgent' ? 'text-red-400 animate-pulse' : 'text-primary'}`} />
                            <div className="flex-grow min-w-0">
                              <div className="text-[10px] font-bold text-white truncate leading-tight">{alert.title}</div>
                              <div className="text-[8px] text-gray-500 mt-0.5">{alert.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mock alert sender */}
                      <form onSubmit={broadcastAlert} className="flex gap-1.5 border-t border-white/5 pt-2 mt-2">
                        <input
                          type="text"
                          placeholder="Send mock university alert..."
                          value={newAlertText}
                          onChange={(e) => setNewAlertText(e.target.value)}
                          className="flex-grow px-2 py-1 bg-white/5 text-[10px] text-white border border-white/10 rounded-lg outline-none focus:border-primary/50"
                        />
                        <button
                          type="submit"
                          className="p-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors flex items-center justify-center"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Dots Indicator */}
          <div className="flex justify-center items-center gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === i ? 'w-6 bg-slate-900 dark:bg-white' : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
