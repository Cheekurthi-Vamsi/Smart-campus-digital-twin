import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Briefcase, MapPin, Check, Building, GraduationCap, Clock, Award, Star } from 'lucide-react';

const initialJobs = [
  { id: 'job1', title: 'Data Scientist Intern', company: 'Google Labs', term: '6 Months', location: 'Remote', stipend: '$45/hr' },
  { id: 'job2', title: 'Software Engineer Intern', company: 'Stripe Co.', term: '3 Months', location: 'San Francisco', stipend: '$50/hr' },
  { id: 'job3', title: 'Security Dev Intern', company: 'Cloudflare', term: '6 Months', location: 'Austin, TX', stipend: '$40/hr' },
  { id: 'job4', title: 'AI Research Assistant', company: 'Anthropic Labs', term: '6 Months', location: 'Remote', stipend: '$55/hr' },
];

export default function OpportunitiesSection() {
  const [jobs, setJobs] = useState(initialJobs);
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const handleApply = (id: string) => {
    if (appliedJobIds.includes(id)) return;
    setAppliedJobIds(prev => [...prev, id]);
  };

  return (
    <section id="opportunities" ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-dark-900 dark:via-dark-900 dark:to-dark-900 border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/10 dark:bg-secondary/5 blur-[150px]" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/5 blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Job listings mockup */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl bg-slate-900 border border-slate-800 p-6 shadow-2xl overflow-hidden flex flex-col justify-between text-left select-none"
            >
              {/* Telemetry Indicator */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Live Placement Telemetry</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  4 ACTIVE POSTS
                </div>
              </div>

              {/* Jobs List */}
              <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-none">
                {jobs.map((job) => {
                  const isApplied = appliedJobIds.includes(job.id);
                  return (
                    <motion.div
                      key={job.id}
                      layoutId={job.id}
                      className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-white/10 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="text-sm font-bold text-white">{job.title}</div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-400">
                          <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" /> {job.company}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {job.term}</span>
                          <span className="text-emerald-400 font-semibold">{job.stipend}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleApply(job.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 flex-shrink-0 ${
                          isApplied
                            ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-400'
                            : 'bg-white hover:bg-slate-100 text-slate-900'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="w-4.5 h-4.5" /> Applied
                          </>
                        ) : (
                          'Apply now'
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mini career info stats */}
              <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-gray-400 text-[10px]">
                <div>
                  <div className="text-white font-bold">150+ Partnered Firms</div>
                  <div className="mt-0.5 text-gray-500">Corporate connections</div>
                </div>
                <div>
                  <div className="text-white font-bold">96% Placement rate</div>
                  <div className="mt-0.5 text-gray-500">Graduating cohort</div>
                </div>
                <div>
                  <div className="text-white font-bold">$4,500 Avg stipend</div>
                  <div className="mt-0.5 text-gray-500">Internship placement</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copywriting content */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-black/5 dark:border-white/5">
                <Star className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">Career Acceleration</span>
              </div>

              <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                Career Placements & <span className="gradient-text text-emerald-500">Opportunities</span>
              </h2>

              <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed">
                Connect seamlessly with hiring workflows. The Opportunities module aggregates certified internship opportunities, recruitment slots, and campus drives vetted directly by corporate partners.
              </p>

              <div className="space-y-4">
                {[
                  { title: 'One-Click Applications', desc: 'Sync your study history and GPA telemetry directly to corporate recruitment checkups.' },
                  { title: 'Placements Board', desc: 'Monitor review steps, screening marks, interview invites, and hiring contracts.' },
                  { title: 'Interview Roadmaps', desc: 'Practice with mock interview questions and path tutorials verified by recruiter logs.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-gray-400 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
