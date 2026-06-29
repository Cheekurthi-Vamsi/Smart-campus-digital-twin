import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, GraduationCap, Download, Check, Eye, Search, AlertCircle, Bookmark } from 'lucide-react';

const docData = [
  { id: 'doc1', title: 'Neural Networks & Deep Learning', author: 'Dr. Sarah Chen', type: 'PDF', size: '4.2 MB', course: 'CS-301' },
  { id: 'doc2', title: 'Data Structures Compendium', author: 'Prof. J. Rivera', type: 'EPUB', size: '8.7 MB', course: 'CS-102' },
  { id: 'doc3', title: 'Zero-Trust Architecture Spec', author: 'Dr. Liam H.', type: 'PDF', size: '2.1 MB', course: 'CYB-404' },
  { id: 'doc4', title: 'Linear Algebra Cheat Sheet', author: 'Prof. A. Miller', type: 'PDF', size: '1.5 MB', course: 'MTH-201' },
];

export default function ResourcesSection() {
  const [downloads, setDownloads] = useState<Record<string, number>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const triggerDownload = (id: string) => {
    if (downloads[id]) return;
    
    // Simulate loading progress
    setDownloads(prev => ({ ...prev, [id]: 1 }));
    let progress = 1;
    const interval = setInterval(() => {
      progress += 5;
      if (progress >= 100) {
        clearInterval(interval);
        setDownloads(prev => ({ ...prev, [id]: 100 }));
      } else {
        setDownloads(prev => ({ ...prev, [id]: progress }));
      }
    }, 70);
  };

  return (
    <section id="resources" ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-tr from-neutral-50 via-white to-neutral-50 dark:from-dark-900 dark:via-dark-900 dark:to-dark-900 rounded-[2rem] md:rounded-[3rem] border border-black/5 dark:border-white/5 transition-colors duration-300 mx-4 md:mx-8 my-12 shadow-2xl">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-accent-pink/10 dark:bg-accent-pink/5 blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copywriting */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-black/5 dark:border-white/5">
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">Reference Materials</span>
              </div>

              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                Study Guides & <span className="gradient-text text-amber-500">Professor Docs</span>
              </h2>

              <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                Unlock peer-reviewed study files and verified class logs. Academic files, reference syllabus keys, and learning roadmap documents are signed off and uploaded directly by course professors.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'Professor Vetted Files', desc: 'Read course slides, reference handouts, and documents directly certified by lecturing faculty.' },
                  { title: 'Learning Roadmaps', desc: 'Visual step-by-step pathways to conquer semester topics, algorithms, and projects.' },
                  { title: 'Offline Libraries', desc: 'Secure local device caches to download, study, and revise guides offline.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 dark:text-white">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-gray-400 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Document Cabinet */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden flex flex-col justify-between text-left select-none"
            >
              {/* Cabinet Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  <span className="text-sm font-bold text-white">Vetted Resource Library</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Search className="w-3.5 h-3.5" />
                  <span>FILTER: ALL DOCUMENTS</span>
                </div>
              </div>

              {/* Document Lists */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-none">
                {docData.map((doc) => {
                  const progress = downloads[doc.id] || 0;
                  const isFinished = progress === 100;
                  return (
                    <div key={doc.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between gap-4">
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-lg bg-amber-500/10 text-amber-500">
                            {doc.course}
                          </span>
                          <span className="text-xs font-bold text-white truncate leading-none">{doc.title}</span>
                        </div>
                        <div className="text-[9px] text-gray-500 mt-1 flex items-center gap-2">
                          <span>{doc.author}</span>
                          <span>•</span>
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => triggerDownload(doc.id)}
                        style={{
                          background: progress > 0 && !isFinished
                            ? `linear-gradient(to right, rgba(245, 158, 11, 0.25) ${progress}%, transparent ${progress}%)`
                            : undefined
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 flex-shrink-0 ${
                          isFinished
                            ? 'bg-amber-500/20 border border-amber-500 text-amber-400'
                            : progress > 0
                            ? 'border border-amber-500/30 text-amber-500'
                            : 'bg-white hover:bg-slate-100 text-slate-900'
                        }`}
                      >
                        {progress > 0 && !isFinished ? (
                          <span className="font-mono">⏳ {progress}%</span>
                        ) : isFinished ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#10B981]" /> Vetted
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" /> Download
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Compliance note */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-[10px] text-gray-500">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span>All documents comply with FERPA requirements. Intellectual properties are signed and watermarked.</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
