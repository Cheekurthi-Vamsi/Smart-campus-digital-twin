import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, Sparkles, Brain, Database } from 'lucide-react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { BeamsBackground } from './ui/beams-background';


function ParticleField() {
  const [particles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 5,
      delay: Math.random() * 5,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, ${Math.random() > 0.5 ? '#00E5FF' : '#7B61FF'
              } 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

function HolographicModel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-[600px] h-[600px] perspective-1000">
      <motion.div
        className="absolute inset-0 transform-style-3d"
        animate={{
          rotateY: mousePosition.x,
          rotateX: -mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl" />
        </div>

        <motion.div
          className="absolute inset-20 rounded-3xl glass border border-primary/30 overflow-hidden"
          animate={{ rotateY: [0, 360] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{
            background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(123, 97, 255, 0.05))',
          }}
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-20" />

          <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-primary animate-pulse" />
          <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-accent-cyan animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-accent-pink animate-pulse" style={{ animationDelay: '1.5s' }} />

          <div className="absolute inset-8 rounded-2xl border border-white/10" />
          <div className="absolute inset-16 rounded-xl border border-white/5" />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <motion.div
              className="w-32 h-32 rounded-2xl glass"
              animate={{
                boxShadow: [
                  '0 0 30px rgba(0, 229, 255, 0.3)',
                  '0 0 60px rgba(123, 97, 255, 0.3)',
                  '0 0 30px rgba(0, 229, 255, 0.3)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <Brain className="w-16 h-16 text-primary" />
              </div>
            </motion.div>
          </div>

          {[-1, 0, 1].map((offset, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
              style={{ top: `${30 + offset * 20}%` }}
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div
              className="flex items-center gap-2 px-3 py-1 rounded-full glass text-xs"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400">LIVE</span>
              <span className="text-gray-400">| 2,847 active users</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="absolute -inset-4 rounded-full border border-primary/20"
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${deg}deg) translateX(250px) translateY(-50%)`,
              }}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </motion.div>

        <motion.div
          className="absolute -inset-20 rounded-full border border-dashed border-secondary/10"
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-8 bg-gradient-to-b from-primary to-transparent"
            style={{
              top: '50%',
              left: '50%',
              transformOrigin: 'center center',
            }}
            animate={{
              rotate: [i * 45, i * 45 + 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + i,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function DataStreamLine({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute h-32 w-px bg-gradient-to-b from-transparent via-primary to-transparent"
      animate={{
        y: [-100, 700],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

export default function Hero() {
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

  return (
    <>
      <BeamsBackground
        ref={containerRef}
        className="relative min-h-screen overflow-hidden flex flex-col items-center justify-start rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 mt-24 md:mt-28 mb-12 shadow-2xl bg-dark-900"
        intensity="strong"
      >

        <motion.div
          style={{ y, opacity }}
          className="relative z-10 container mx-auto px-6 pt-16 md:pt-20 pb-20 w-full"
        >
          <div className="flex flex-col items-center justify-center gap-12 min-h-[calc(100vh-8rem)] max-w-3xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center text-center w-full"
            >
              {/* Badge */}
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-8"
                style={{
                  background: 'rgba(0, 229, 255, 0.06)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <motion.span
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-sm font-medium text-primary/90 tracking-wide">AI-Powered Campus Management</span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6"
              >
                <span className="text-white">Smart Campus</span>
                <br />
                <span className="gradient-text">Digital Twin</span>
                <br />
                <span className="text-white">Ecosystem</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto"
              >
                Transforming universities into intelligent, connected and predictive digital campuses — powered by real-time AI.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  className="btn-primary flex items-center justify-center gap-2 group relative overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: '0 20px 40px rgba(0, 229, 255, 0.3)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Play className="w-4 h-4" />
                  Request Demo
                  {/* Glow halo */}
                  <span className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'radial-gradient(ellipse, rgba(0,229,255,0.2) 0%, transparent 70%)' }}
                  />
                </motion.button>
                <motion.button
                  className="btn-secondary flex items-center justify-center gap-2"
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    boxShadow: '0 20px 40px rgba(123, 97, 255, 0.15)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Database className="w-4 h-4" />
                  Explore Platform
                </motion.button>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={itemVariants}
                className="mt-14 flex flex-col items-center gap-6 w-full"
              >
                <div className="flex flex-wrap gap-x-12 gap-y-4 justify-center items-center">
                  {[
                    { label: 'Universities', value: '150+' },
                    { label: 'Students', value: '2M+' },
                    { label: 'Countries', value: '45' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold gradient-text" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="w-48 h-px bg-white/10" />
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>2,847 active users right now</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gray-600">Scroll</span>
          <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-2 rounded-full bg-primary"
            />
          </div>
        </motion.div>

        {/* Container Scroll Animation directly inside BeamsBackground */}
        <div className="relative z-10 flex flex-col overflow-hidden w-full -mt-20">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-4xl font-semibold text-white mb-2">
                  Experience the Future of
                  <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none gradient-text">
                    Campus Intelligence
                  </span>
                </h2>
              </>
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
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
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
                        className="glass-card rounded-xl p-4 border border-white/5"
                      >
                        <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                        <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                      </div>
                    ))}
                  </div>

                  {/* Chart placeholder */}
                  <div className="glass-card rounded-xl p-6 border border-white/5 flex-1">
                    <div className="text-sm text-gray-400 mb-4">Campus Activity — Last 24 Hours</div>
                    <div className="flex items-end gap-2 h-32">
                      {Array.from({ length: 24 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${20 + Math.sin(i * 0.5) * 30 + Math.random() * 50}%`,
                            background: `linear-gradient(to top, rgba(0,229,255,0.6), rgba(123,97,255,0.3))`,
                            opacity: 0.4 + Math.random() * 0.6,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Bottom row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card rounded-xl p-4 border border-white/5">
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
                    <div className="glass-card rounded-xl p-4 border border-white/5">
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
      </BeamsBackground>
    </>
  );
}
