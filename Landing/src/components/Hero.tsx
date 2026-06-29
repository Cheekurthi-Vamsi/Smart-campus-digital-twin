import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Sparkles, Database } from 'lucide-react';
import { ContainerScroll } from './ui/container-scroll-animation';



export default function Hero({ onGetStarted }: { onGetStarted?: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <section
        id="home"
        ref={containerRef}
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 mt-24 md:mt-28 mb-12 shadow-2xl bg-dark-900"
      >
        {/* Dithering noise texture overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <filter id="hero-noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#hero-noise)" />
          </svg>
        </div>

        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.04) 0%, transparent 70%)' }} />
        </div>

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-20 md:py-32 max-w-4xl mx-auto w-full"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center w-full gap-8"
          >
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-400 tracking-wide"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              AI-Powered Campus Management
            </motion.div>

            {/* Main heading with split-word stagger animation */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight flex flex-col items-center"
            >
              <span
                className="text-white italic font-light block"
                style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
              >
                {["Smart", "Campus,"].map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className="inline-block mr-3"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              <span
                className="text-white font-extrabold block mt-1"
                style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
              >
                {["reimagined", "digitally."].map((word, idx) => (
                  <motion.span
                    key={idx}
                    variants={wordVariants}
                    className={idx === 1 ? "gradient-text inline-block" : "inline-block mr-3"}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </motion.h1>

            {/* Subheading with typewriter reveal effect */}
            <motion.p
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
              className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-xl mx-auto"
            >
              Join 150+ universities using the only digital twin platform that transforms
              campuses into intelligent, connected ecosystems. Real-time. Predictive. Autonomous.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-2"
            >
              <motion.button
                onClick={onGetStarted}
                className="btn-primary flex items-center justify-center gap-2 h-14 px-12 text-base cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <Play className="w-4 h-4" />
                Get Started
              </motion.button>
              <motion.button
                className="btn-secondary flex items-center justify-center gap-2 h-14 px-12 text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <Database className="w-4 h-4" />
                Explore Platform
              </motion.button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col items-center gap-6 w-full"
            >
              <div className="w-32 h-px bg-white/10" />
              <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center items-center">
                {[
                  { label: 'Universities', value: '150+' },
                  { label: 'Students', value: '2M+' },
                  { label: 'Countries', value: '45' },
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span>2,847 active users right now</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary" />
          </div>
        </motion.div>
      </section>

      {/* Experience the Future of Campus Intelligence Section */}
      <section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="relative z-10 flex flex-col overflow-hidden w-full">
          <ContainerScroll
            titleComponent={
              <div className="flex flex-col items-center">
                {/* Floating Live users online pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-white/10 text-xs text-white mb-6 shadow-lg z-20">
                  <span className="relative flex h-2 w-2">
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="font-semibold tracking-wider font-mono text-[10px]">LIVE — 2,847 USERS ONLINE</span>
                </div>
                <h2 className="text-4xl md:text-5xl leading-tight tracking-tight text-black mb-2 relative z-10">
                  <span
                    className="italic font-light block"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
                  >
                    Experience the Future of
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Campus Intelligence
                  </span>
                </h2>
              </div>
            }
          >
            {/* Dashboard mockup inside the scroll container */}
            <div className="h-full w-full bg-dark-900 rounded-2xl overflow-hidden relative">
              {/* Dashboard header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="text-sm text-gray-400 font-mono">campustwin.ai/dashboard</div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-xs text-green-400">Live</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 grid grid-cols-4 gap-4 h-[calc(100%-60px)]">
                {/* Left sidebar */}
                <div className="col-span-1 space-y-4">
                  {['Overview', 'Analytics', 'Buildings', 'Energy', 'Security', 'Students'].map(
                    (item, i) => (
                      <div
                        key={item}
                        className={`px-4 py-3 rounded-xl text-sm transition-all ${i === 0
                          ? 'bg-gradient-to-r from-primary/20 to-secondary/10 text-primary border border-primary/20'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                          }`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </div>

                {/* Main content area */}
                <div className="col-span-3 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: 'Active Users', value: '2,847', change: '+12%', color: 'text-primary' },
                      { label: 'Energy Saved', value: '34.2%', change: '+5.8%', color: 'text-green-400' },
                      { label: 'AI Alerts', value: '12', change: '-23%', color: 'text-amber-400' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="glass-card rounded-2xl p-4 border border-white/5"
                      >
                        <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="glass-card rounded-2xl p-6 border border-white/5 flex-1">
                    <div className="text-sm text-gray-400 mb-4">Campus Activity — Last 24 Hours</div>
                    <div className="flex items-end gap-2 h-32">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-lg"
                          style={{
                            height: `${25 + Math.sin(i * 0.8) * 20 + (i % 3) * 15}%`,
                            background: `linear-gradient(to top, rgba(0,229,255,0.65), rgba(123,97,255,0.35))`,
                            opacity: 0.5 + (i % 4) * 0.12,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card rounded-2xl p-4 border border-white/5">
                      <div className="text-xs text-gray-500 mb-2">Building Status</div>
                      <div className="space-y-2">
                        {['Engineering Block', 'Library', 'Admin Block'].map((b) => (
                          <div key={b} className="flex items-center justify-between">
                            <span className="text-xs text-gray-300">{b}</span>
                            <div className="flex items-center gap-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              <span className="text-xs text-green-400">Optimal</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="glass-card rounded-2xl p-4 border border-white/5">
                      <div className="text-xs text-gray-500 mb-2">Recent Events</div>
                      <div className="space-y-2">
                        {[
                          'HVAC adjusted — Bldg A',
                          'Anomaly detected — Lot C',
                          'Lecture hall released',
                        ].map((e) => (
                          <div key={e} className="text-xs text-gray-400 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-primary" />
                            {e}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}
