import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import { Brain, Cpu, Building2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';


const visions = [
  {
    icon: Brain,
    title: 'AI Predictions',
    description: 'Anticipate campus needs with machine learning models that predict everything from crowd patterns to maintenance requirements.',
    gradient: 'from-primary to-cyan-400',
  },
  {
    icon: Cpu,
    title: 'Autonomous Operations',
    description: 'Self-managing systems that optimize energy, security, and resources in real-time without human intervention.',
    gradient: 'from-secondary to-purple-400',
  },
  {
    icon: Building2,
    title: 'Digital Twin Simulation',
    description: 'Run what-if scenarios on a complete campus simulation before implementing changes in the real world.',
    gradient: 'from-accent-cyan to-teal-400',
  },
  {
    icon: TrendingUp,
    title: 'Predictive Planning',
    description: 'Plan infrastructure investments with AI-forecasted future demands and growth patterns.',
    gradient: 'from-pink-500 to-rose-400',
  },
];

function VisionCard({ vision, index }: { vision: typeof visions[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-2xl glass-card p-6 h-full border border-white/5 hover:border-white/10 transition-all duration-500">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${vision.gradient} flex items-center justify-center mb-6`}
          style={{
            boxShadow: `0 10px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${vision.gradient.includes('primary') ? 'rgba(0, 229, 255, 0.3)' : 'rgba(123, 97, 255, 0.3)'}`,
          }}
        >
          <vision.icon className="w-7 h-7 text-white" />
        </div>

        <h3 className="text-xl font-semibold text-white mb-3">{vision.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{vision.description}</p>

        <div className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4" />
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${vision.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
        />
      </div>
    </motion.div>
  );
}

function CinematicBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-dark-900" />

      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(123, 97, 255, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255, 0, 229, 0.05) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      <svg className="absolute inset-0 w-full h-full opacity-5">
        <defs>
          <radialGradient id="grid-gradient">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
            <polygon
              points="24.8,22 37.3,29.2 37.3,43.7 24.8,50.9 12.3,43.7 12.3,29.2"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              transform="translate(-12.3, -21)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-dark-900/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-transparent to-dark-900" />
    </div>
  );
}

export default function FutureVision() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <>
      <section ref={containerRef} className="relative py-32 overflow-hidden bg-dark-900 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl flex items-center">

        <CinematicBackground />

        <motion.div style={{ y }} className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-sm text-gray-300">Coming Soon</span>
            </motion.div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl leading-[1.15] tracking-tight mb-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white italic font-light block"
                style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
              >
                The Future of
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="gradient-text font-extrabold block mt-1"
                style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
              >
                Smart Universities
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              We are building the next generation of campus intelligence-where AI anticipates needs,
              systems operate autonomously, and every decision is backed by predictive insights.
            </motion.p>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-900 to-transparent" />
      </section>

      {/* Container Scroll Section for Future Vision Cards */}
      <section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0 bg-dark-900">
          <CinematicBackground />
        </div>
        
        {/* Experimental type poster background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center pointer-events-none z-0 opacity-5 overflow-hidden">
          <h1 className="text-[12vw] font-black text-black whitespace-nowrap uppercase tracking-tighter mix-blend-overlay">
            University and students
          </h1>
        </div>
        <div className="relative z-10 flex flex-col overflow-hidden w-full">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-4xl md:text-5xl leading-tight tracking-tight text-black mb-2 relative z-10">
                  <span
                    className="italic font-light block"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
                  >
                    Visionary Future
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Autonomic Campus
                  </span>
                </h2>
              </>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 h-full bg-dark-900/95 items-center justify-center">
              {visions.map((vision, i) => (
                <div key={vision.title} className="scale-90 origin-center h-full">
                  <VisionCard vision={vision} index={i} />
                </div>
              ))}
            </div>
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}
