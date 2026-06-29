import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  Trophy,
  Briefcase,
  BookOpen,
  ArrowRight,
  Upload,
  Check,
  Play,
  Terminal,
  Bookmark,
  Download,
  Search,
  Eye,
  GraduationCap
} from 'lucide-react';

const tabs = [
  { id: 'assignments', name: 'Assignments', icon: FileText, color: '#00E5FF', subtitle: 'Task Submission Platform' },
  { id: 'mcqs', name: 'MCQs', icon: CheckCircle2, color: '#7B61FF', subtitle: 'AI Practice Assessments' },
  { id: 'coding', name: 'Coding compiler', icon: Trophy, color: '#FF00E5', subtitle: 'IDE & Code Evaluation' },
  { id: 'internships', name: 'Internships', icon: Briefcase, color: '#10B981', subtitle: 'Placements & Job Updates' },
  { id: 'guides', name: 'Study Resources', icon: BookOpen, color: '#F59E0B', subtitle: 'Professor Docs & Notes' },
];

export default function FeaturesShowcase() {
  const [activeTab, setActiveTab] = useState('assignments');
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // --- Assignments Mock State ---
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [fileName, setFileName] = useState('');

  const triggerUpload = () => {
    setIsUploading(true);
    setUploadSuccess(false);
    setFileName('NeuralNetwork_Lab3.ipynb');
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1500);
  };

  // --- MCQs Mock State ---
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const mcqQuestion = {
    q: 'Which activation function is most commonly used in the hidden layers of a Deep Neural Network?',
    options: ['Sigmoid', 'Tanh', 'ReLU', 'Softmax'],
    correct: 2, // ReLU
  };

  // --- Coding IDE Mock State ---
  const [selectedLang, setSelectedLang] = useState('python');
  const [codeOutput, setCodeOutput] = useState<string[]>(['Click "Run Code" to compile...']);
  const [isCompiling, setIsCompiling] = useState(false);
  const codingSamples: Record<string, string> = {
    python: 'def predict_occupancy(temp, hours):\n    return temp * 0.8 + hours * 1.2\n\nprint("Simulation load:", predict_occupancy(24.5, 3))',
    javascript: 'function getSystemHealth() {\n    return { status: "OPTIMAL", load: 0.42 };\n}\nconsole.log(JSON.stringify(getSystemHealth()));',
  };

  const runCodeSample = () => {
    setIsCompiling(true);
    setCodeOutput(['Initializing compiler...', 'Syncing memory caches...']);
    setTimeout(() => {
      if (selectedLang === 'python') {
        setCodeOutput(['Initializing compiler...', 'Syncing memory caches...', 'Output:', 'Simulation load: 23.2', 'Execution successful (exit code 0)']);
      } else {
        setCodeOutput(['Initializing compiler...', 'Syncing memory caches...', 'Output:', '{"status":"OPTIMAL","load":0.42}', 'Execution successful (exit code 0)']);
      }
      setIsCompiling(false);
    }, 1200);
  };

  // --- Internship Mock State ---
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);
  const jobsList = [
    { id: '1', title: 'Data Scientist Intern', company: 'Google Labs', term: '6 Months', location: 'Remote' },
    { id: '2', title: 'Software Engineer Intern', company: 'Stripe Co.', term: '3 Months', location: 'San Francisco' },
    { id: '3', title: 'Security Dev Intern', company: 'Cloudflare', term: '6 Months', location: 'Austin, TX' },
  ];

  const applyJob = (id: string) => {
    if (appliedJobs.includes(id)) return;
    setAppliedJobs(prev => [...prev, id]);
  };

  // --- Guides Mock State ---
  const [downloadProgress, setDownloadProgress] = useState<Record<string, number>>({});
  const docsList = [
    { id: 'doc1', title: 'CS-301: Advanced ML Notes', author: 'Dr. Sarah Chen', type: 'PDF', size: '4.2 MB' },
    { id: 'doc2', title: 'DSA Comprehensive Guide', author: 'Prof. J. Rivera', type: 'EPUB', size: '8.7 MB' },
    { id: 'doc3', title: 'Zero-Trust Architecture Doc', author: 'Dr. Liam H.', type: 'PDF', size: '2.1 MB' },
  ];

  const downloadDoc = (id: string) => {
    if (downloadProgress[id]) return;
    setDownloadProgress(prev => ({ ...prev, [id]: 10 }));
    let progress = 10;
    const interval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(interval);
        setDownloadProgress(prev => ({ ...prev, [id]: 100 }));
      } else {
        setDownloadProgress(prev => ({ ...prev, [id]: progress }));
      }
    }, 200);
  };

  return (
    <section ref={containerRef} id="modules-showcase" className="relative py-28 overflow-hidden bg-white dark:bg-dark-950 transition-colors duration-300 rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-0 opacity-[0.03] dark:opacity-[0.05] overflow-hidden">
          <h2 className="text-[14vw] font-black text-black dark:text-white whitespace-nowrap uppercase tracking-tighter">
            Academics & Careers
          </h2>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Capabilities <span className="gradient-text">In-Detail</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-slate-500 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto"
          >
            A closer look at the actual platforms and custom tools built directly into our virtual campus hub.
          </motion.p>
        </div>

        {/* Tab Sliders Navigation bar */}
        <div className="flex justify-start md:justify-center overflow-x-auto pb-4 mb-12 scrollbar-none gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-black/5 dark:border-white/5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-slate-950 text-white dark:bg-slate-800 dark:text-white shadow'
                      : 'text-slate-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className="w-4 h-4" style={{ color: isActive ? tab.color : undefined }} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Showcase Panel with Slide Animation */}
        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              
              {/* Left Column: Detailed Copy */}
              <div className="lg:col-span-5 space-y-6">
                {activeTab === 'assignments' && (
                  <>
                    <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 text-[#00E5FF] text-[11px] font-bold uppercase font-mono">
                      Academics Module — 01
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Secure Assignment Deliveries
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                      Say goodbye to fragmented document delivery. Our assignments node features automated plagiarism scanning, drag-and-drop workspace integration, and grading sync capabilities.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400" />
                        <span>Instant validation checks for archive file formats.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400" />
                        <span>Direct synchronization with student cloud files.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-cyan-400" />
                        <span>AI-assisted grade recommendations for teachers.</span>
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === 'mcqs' && (
                  <>
                    <div className="inline-block px-3 py-1 rounded-full bg-purple-500/10 text-[#7B61FF] text-[11px] font-bold uppercase font-mono">
                      Adaptive Tests — 02
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                      AI-Driven MCQ Evaluator
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                      Challenge students with smart adaptive test algorithms. Questions modify their difficulty on-the-fly depending on previous responses, targeting learning voids immediately.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        <span>Time-limited examinations with automated anti-cheat focus logs.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        <span>Personalized performance reports loaded with revision metrics.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-purple-400" />
                        <span>Automated question generator powered by syllabus texts.</span>
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === 'coding' && (
                  <>
                    <div className="inline-block px-3 py-1 rounded-full bg-pink-500/10 text-[#FF00E5] text-[11px] font-bold uppercase font-mono">
                      Developer Sandbox — 03
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Integrated Sandbox IDE
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                      A complete sandbox environment supporting interactive runtime compilers. College professors can attach automated test scripts to instantly verify students' answers.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink-400" />
                        <span>Instant multi-language support (Python & Javascript).</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink-400" />
                        <span>Dynamic code evaluation and timing analysis.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-pink-400" />
                        <span>Direct terminal logger with execution error captures.</span>
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === 'internships' && (
                  <>
                    <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-[#10B981] text-[11px] font-bold uppercase font-mono">
                      Careers Portal — 04
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Internships & Placements
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                      Access a verified stream of recruitment drives and internships directly supported by our university partnership network. Apply with a single click and monitor submission queues.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Verified listing credentials direct from vetted corporate partners.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Real-time status trackers (Vetting, Review, Interview, Hired).</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Syncs with personal student achievements & GPA.</span>
                      </li>
                    </ul>
                  </>
                )}

                {activeTab === 'guides' && (
                  <>
                    <div className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 text-[#F59E0B] text-[11px] font-bold uppercase font-mono">
                      Reference Vault — 05
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Professor Document Library
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                      A central file repository storing study roadmaps, detailed guide documents, and resources uploaded directly by the university board and course professors.
                    </p>
                    <ul className="space-y-3.5 text-xs text-slate-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-yellow-400" />
                        <span>Curated learning roadmaps with syllabus alignments.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-yellow-400" />
                        <span>Download reference documents for offline learning.</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-yellow-400" />
                        <span>Authenticated materials signed by college professors.</span>
                      </li>
                    </ul>
                  </>
                )}

                <button className="btn-secondary text-xs flex items-center gap-2 mt-4">
                  Explore Capabilities Details
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Right Column: Interactive Mockup Panel */}
              <div className="lg:col-span-7">
                <div className="relative rounded-3xl bg-slate-900 border border-slate-800 p-5 shadow-2xl h-[340px] flex flex-col justify-between select-none text-left overflow-hidden">
                  
                  {/* Web Header decoration */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    </div>
                    <span className="text-[10px] font-mono text-gray-500">campustwin.ai/sandbox-module</span>
                    <div className="w-8" />
                  </div>

                  {/* ── 1. ASSIGNMENTS INTERACTIVE PANEL ── */}
                  {activeTab === 'assignments' && (
                    <div className="flex-grow flex flex-col justify-center gap-4 py-4 px-2">
                      <div className="text-center p-6 border-2 border-dashed border-white/10 rounded-2xl bg-white/5 hover:border-cyan-400/50 transition-colors">
                        {uploadSuccess ? (
                          <div className="flex flex-col items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-[#00E5FF] flex items-center justify-center">
                              <Check className="w-5 h-5" />
                            </div>
                            <div className="text-xs text-white font-semibold">Upload Completed successfully!</div>
                            <div className="text-[10px] text-gray-500">{fileName} (45.2 KB)</div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <Upload className="w-7 h-7 text-gray-400 animate-bounce" />
                            <div className="text-xs text-gray-300">Drag & Drop assignment documents (.pdf, .ipynb)</div>
                            <button
                              onClick={triggerUpload}
                              disabled={isUploading}
                              className="px-4 py-2 rounded-xl text-[10px] font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors"
                            >
                              {isUploading ? 'Uploading file...' : 'Choose Lab File'}
                            </button>
                          </div>
                        )}
                      </div>
                      {isUploading && (
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1.5 }}
                            className="bg-cyan-400 h-full"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── 2. MCQS INTERACTIVE PANEL ── */}
                  {activeTab === 'mcqs' && (
                    <div className="flex-grow flex flex-col justify-between py-4">
                      <div>
                        <div className="text-xs text-white font-bold leading-relaxed mb-4">{mcqQuestion.q}</div>
                        <div className="grid grid-cols-2 gap-2">
                          {mcqQuestion.options.map((opt, idx) => {
                            const isSelected = selectedMcqOption === idx;
                            let btnStyle = 'bg-white/5 border-white/5 text-gray-300';
                            if (isSelected) {
                              if (isAnswerChecked) {
                                btnStyle = idx === mcqQuestion.correct 
                                  ? 'bg-green-500/20 border-green-500 text-green-400' 
                                  : 'bg-red-500/20 border-red-500 text-red-400';
                              } else {
                                btnStyle = 'bg-purple-500/20 border-purple-500 text-purple-400';
                              }
                            }
                            return (
                              <button
                                key={opt}
                                onClick={() => {
                                  if (!isAnswerChecked) {
                                    setSelectedMcqOption(idx);
                                  }
                                }}
                                className={`p-2.5 rounded-xl border text-[11px] font-semibold text-left transition-all ${btnStyle}`}
                              >
                                {idx + 1}. {opt}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex justify-between items-center border-t border-white/5 pt-3 mt-2">
                        <span className="text-[10px] text-gray-500 font-mono">Time Limit: 10m 00s</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setSelectedMcqOption(null);
                              setIsAnswerChecked(false);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-[10px] font-semibold"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => {
                              if (selectedMcqOption !== null) {
                                setIsAnswerChecked(true);
                              }
                            }}
                            disabled={selectedMcqOption === null}
                            className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-[10px] font-bold"
                          >
                            Check Answer
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── 3. CODING COMPILER PANEL ── */}
                  {activeTab === 'coding' && (
                    <div className="flex-grow flex flex-col justify-between py-3 h-full">
                      {/* Code panel grid */}
                      <div className="grid grid-cols-2 gap-3 flex-grow overflow-hidden">
                        {/* Left Code Editor */}
                        <div className="rounded-xl border border-white/5 bg-slate-950/80 p-2.5 flex flex-col justify-between h-[180px]">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[9px] font-mono text-gray-500">editor.py</span>
                            <div className="flex gap-1.5">
                              {['python', 'javascript'].map((l) => (
                                <button
                                  key={l}
                                  onClick={() => setSelectedLang(l)}
                                  className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                    selectedLang === l ? 'bg-pink-500/20 text-pink-400 font-bold' : 'text-gray-500'
                                  }`}
                                >
                                  {l}
                                </button>
                              ))}
                            </div>
                          </div>
                          <textarea
                            className="flex-grow bg-transparent text-[9px] font-mono text-emerald-400 border-none outline-none resize-none h-full"
                            value={codingSamples[selectedLang]}
                            readOnly
                          />
                        </div>

                        {/* Right Terminal Output */}
                        <div className="rounded-xl border border-white/5 bg-slate-950/90 p-2.5 flex flex-col justify-between h-[180px]">
                          <span className="text-[9px] font-mono text-gray-500 flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-pink-500" /> Terminal
                          </span>
                          <div className="flex-grow font-mono text-[8px] text-gray-300 space-y-1 overflow-y-auto mt-2 pr-1">
                            {codeOutput.map((out, idx) => (
                              <div key={idx} className={out.startsWith('Output:') ? 'text-pink-400 font-bold' : out.startsWith('Sim') ? 'text-white' : ''}>
                                {out}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Compiler triggers */}
                      <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2">
                        <span className="text-[9px] font-mono text-gray-500">STATUS: READY</span>
                        <button
                          onClick={runCodeSample}
                          disabled={isCompiling}
                          className="px-3.5 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white text-[10px] font-bold flex items-center gap-1.5"
                        >
                          <Play className="w-3 h-3" />
                          {isCompiling ? 'Running...' : 'Run Code'}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ── 4. INTERNSHIPS BOARD PANEL ── */}
                  {activeTab === 'internships' && (
                    <div className="flex-grow flex flex-col justify-between py-4">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2.5">Available Offers</div>
                      <div className="space-y-2 flex-grow overflow-y-auto max-h-[140px] pr-1">
                        {jobsList.map((job) => {
                          const isApplied = appliedJobs.includes(job.id);
                          return (
                            <div key={job.id} className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                              <div>
                                <div className="text-xs font-bold text-white leading-tight">{job.title}</div>
                                <div className="text-[9px] text-gray-500 mt-0.5">{job.company} • {job.term} • {job.location}</div>
                              </div>
                              <button
                                onClick={() => applyJob(job.id)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold flex items-center gap-1 transition-all ${
                                  isApplied
                                    ? 'bg-emerald-500/25 border border-emerald-500 text-emerald-400'
                                    : 'bg-white hover:bg-slate-100 text-slate-900'
                                }`}
                              >
                                {isApplied ? (
                                  <>
                                    <Check className="w-3 h-3" /> Applied
                                  </>
                                ) : (
                                  'Apply Now'
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* ── 5. STUDY GUIDES & DOCUMENTS PANEL ── */}
                  {activeTab === 'guides' && (
                    <div className="flex-grow flex flex-col justify-between py-4">
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2.5">Vetted Class Documents</div>
                      <div className="space-y-2 flex-grow overflow-y-auto max-h-[140px] pr-1">
                        {docsList.map((doc) => {
                          const progress = downloadProgress[doc.id] || 0;
                          const isFinished = progress === 100;
                          return (
                            <div key={doc.id} className="flex justify-between items-center p-2.5 rounded-xl bg-white/5 border border-white/5">
                              <div className="flex-1 min-w-0 pr-4">
                                <div className="text-xs font-bold text-white truncate leading-tight">{doc.title}</div>
                                <div className="text-[9px] text-gray-500 mt-0.5">{doc.author} • {doc.type} • {doc.size}</div>
                              </div>
                              <button
                                onClick={() => downloadDoc(doc.id)}
                                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold flex items-center gap-1 flex-shrink-0 transition-all ${
                                  isFinished
                                    ? 'bg-yellow-500/20 border border-yellow-500 text-yellow-400'
                                    : 'bg-white hover:bg-slate-100 text-slate-900'
                                }`}
                              >
                                {progress > 0 && !isFinished ? (
                                  <span className="font-mono">{progress}%</span>
                                ) : isFinished ? (
                                  <>
                                    <Eye className="w-3 h-3" /> View Note
                                  </>
                                ) : (
                                  <>
                                    <Download className="w-3 h-3" /> Get Doc
                                  </>
                                )}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
