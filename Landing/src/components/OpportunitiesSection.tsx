import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, MapPin, Check, Building, GraduationCap, Clock, Award, Star } from 'lucide-react';

const jobs = [
  { id: 'job4', title: 'Research Engineering Intern', company: 'Anthropic Labs', term: '6 Months', location: 'Remote', stipend: '$60/hr', mode: 'Remote', domain: 'AI Safety', icon: '🤖' },
  { id: 'job3', title: 'Security Intern', company: 'Cloudflare', term: '3 Months', location: 'Austin, TX', stipend: '$50/hr', mode: 'Hybrid', domain: 'Edge Network', icon: '☁️' },
  { id: 'job2', title: 'Backend Intern', company: 'Stripe Co.', term: '4 Months', location: 'San Francisco', stipend: '$55/hr', mode: 'On-site', domain: 'Payments Infra', icon: '💳' },
  { id: 'job1', title: 'ML Research Intern', company: 'Google Labs', term: '6 Months', location: 'London, UK', stipend: '$65/hr', mode: 'Remote', domain: 'DeepMind', icon: '🧠' }
];

export default function OpportunitiesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // --- Apply Button States ---
  // Tracks 'idle' | 'applying' | 'applied' per job
  const [applyStates, setApplyStates] = useState<Record<string, 'idle' | 'applying' | 'applied'>>({});

  const handleApply = (id: string) => {
    if (applyStates[id] && applyStates[id] !== 'idle') return;
    
    // Switch to applying
    setApplyStates(prev => ({ ...prev, [id]: 'applying' }));
    
    // Resolve to applied after 1.2 seconds
    setTimeout(() => {
      setApplyStates(prev => ({ ...prev, [id]: 'applied' }));
    }, 1200);
  };

  return (
    <section id="opportunities" ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-slate-50/50 to-white dark:from-dark-900 dark:via-dark-900 dark:to-dark-900 rounded-[2rem] md:rounded-[3rem] border border-black/5 dark:border-white/5 transition-colors duration-300 mx-4 md:mx-8 my-12 shadow-2xl">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 dark:bg-secondary/3 blur-[150px] mesh-drift" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-emerald-500/5 dark:bg-emerald-500/3 blur-[150px] mesh-drift" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Job listings mockup (col-span-7) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl bg-slate-950 border border-slate-900 p-6 shadow-2xl overflow-hidden flex flex-col justify-between text-left select-none"
            >
              {/* Telemetry Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm font-bold text-white">Live Placement Telemetry</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  🟢 4 new listings in the last 24h
                </div>
              </div>

              {/* Jobs List */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 scrollbar-none">
                {jobs.map((job) => {
                  const state = applyStates[job.id] || 'idle';
                  
                  // Apply button styles mapping
                  let btnText = 'Apply Now';
                  let btnClass = 'border-[#00E5FF] text-[#00E5FF] bg-[#00E5FF]/8 hover:bg-[#00E5FF]/15';
                  
                  if (state === 'applying') {
                    btnText = '⏳ Applying…';
                    btnClass = 'border-slate-700 text-slate-500 bg-slate-900 cursor-not-allowed';
                  } else if (state === 'applied') {
                    btnText = '✓ Applied';
                    btnClass = 'border-[#10B981] text-[#10B981] bg-[#10B981]/15 cursor-default';
                  }

                  return (
                    <div
                      key={job.id}
                      className="p-4 rounded-2xl bg-white/[0.01] border border-white/5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 transition-all duration-300 hover:bg-slate-100/5 dark:hover:bg-white/[0.03] hover:border-white/10"
                    >
                      {/* Logo and Job Metadata */}
                      <div className="flex items-center gap-4">
                        {/* Company logo 44x44 */}
                        <div className="w-11 h-11 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-lg shadow-md shrink-0">
                          {job.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-bold text-white">{job.company}</span>
                            <span className="text-[9px] font-semibold text-gray-500 font-mono border border-white/5 px-1.5 py-0.2 rounded-lg uppercase">
                              {job.domain}
                            </span>
                          </div>
                          <div className="text-[12px] text-gray-400 font-medium">{job.title}</div>
                          <div className="flex flex-wrap items-center gap-x-2 text-[10px] text-gray-500 font-mono">
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.term}</span>
                            <span>•</span>
                            <span>{job.mode}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stipend & Apply CTA */}
                      <div className="flex sm:flex-col items-end justify-between sm:justify-center gap-2 shrink-0">
                        <div className="text-[15px] font-bold text-white font-mono">{job.stipend}</div>
                        <button
                          onClick={() => handleApply(job.id)}
                          disabled={state !== 'idle'}
                          className={`px-4 py-1.5 rounded-xl text-xs font-extrabold border transition-all duration-300 ${btnClass}`}
                        >
                          {btnText}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Stats Footer row */}
              <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center text-gray-400 text-[10px] select-none">
                <div>
                  <div className="text-white font-bold font-mono">150+ Partnered Firms</div>
                  <div className="mt-0.5 text-gray-500">Corporate connections</div>
                </div>
                <div>
                  <div className="text-white font-bold font-mono">96% Placement rate</div>
                  <div className="mt-0.5 text-gray-500">Graduating cohort</div>
                </div>
                <div>
                  <div className="text-white font-bold font-mono">$4,500 Avg stipend</div>
                  <div className="mt-0.5 text-gray-500">Internship placement</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Copywriting content (col-span-5) */}
          <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-5"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/60 border border-black/10 dark:border-white/5">
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
                  <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white/40 dark:bg-white/[0.01] border border-black/5 dark:border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{item.title}</h4>
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
