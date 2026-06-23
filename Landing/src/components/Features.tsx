import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import {
  UserCheck,
  LayoutGrid,
  Shield,
  Wrench,
  Brain,
  Megaphone,
  FileText,
  FolderOpen,
  ClipboardCheck,
} from 'lucide-react';


const features = [
  {
    icon: UserCheck,
    title: 'Smart Attendance',
    description: 'Real-time attendance monitoring with biometric integration and AI-powered prediction system.',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(0, 229, 255, 0.3)',
  },
  {
    icon: LayoutGrid,
    title: 'Classroom Occupancy',
    description: 'Live room utilization with heatmaps and smart space optimization algorithms.',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(123, 97, 255, 0.3)',
  },
  {
    icon: Shield,
    title: 'Security Monitoring',
    description: 'Incident tracking, threat detection, and emergency alert systems.',
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(0, 255, 209, 0.3)',
  },
  {
    icon: Wrench,
    title: 'Maintenance Requests',
    description: 'Facility issue management with ticket tracking and predictive maintenance.',
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'rgba(255, 165, 0, 0.3)',
  },
  {
    icon: Brain,
    title: 'AI Predictions',
    description: 'Resource utilization forecasting, energy consumption prediction, and infrastructure planning.',
    gradient: 'from-indigo-500 to-purple-500',
    glowColor: 'rgba(99, 102, 241, 0.3)',
  },
  {
    icon: Megaphone,
    title: 'Announcements',
    description: 'University-wide notifications, department updates, and event alerts.',
    gradient: 'from-yellow-500 to-orange-500',
    glowColor: 'rgba(234, 179, 8, 0.3)',
  },
  {
    icon: FileText,
    title: 'Assignments',
    description: 'Assignment management with submission tracking and performance analytics.',
    gradient: 'from-teal-500 to-cyan-500',
    glowColor: 'rgba(20, 184, 166, 0.3)',
  },
  {
    icon: FolderOpen,
    title: 'File Sharing',
    description: 'Secure document collaboration with cloud synchronization.',
    gradient: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: ClipboardCheck,
    title: 'Mock Tests',
    description: 'AI-powered assessments with performance insights and learning recommendations.',
    gradient: 'from-violet-500 to-indigo-500',
    glowColor: 'rgba(139, 92, 246, 0.3)',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = -(e.clientY - rect.top - rect.height / 2) / 20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 400, damping: 15 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transformStyle: 'preserve-3d',
      }}
      className="group relative"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl rounded-2xl"
        style={{ background: feature.glowColor }}
      />

      <div
        className={`relative h-full rounded-2xl p-6 transition-all duration-300 ${
          isHovered ? 'bg-dark-800/80' : 'glass-card'
        }`}
        style={{
          boxShadow: isHovered
            ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${feature.glowColor}`
            : '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 transition-transform duration-300`}
          style={{
            transform: 'translateZ(30px)',
            boxShadow: `0 10px 30px ${feature.glowColor}`,
          }}
        >
          <feature.icon className="w-7 h-7 text-white" />
        </div>

        <h3
          className="text-xl font-semibold text-white mb-3 transition-all duration-300"
          style={{ transform: 'translateZ(20px)' }}
        >
          {feature.title}
        </h3>

        <p
          className="text-gray-400 text-sm leading-relaxed transition-all duration-300"
          style={{ transform: 'translateZ(10px)' }}
        >
          {feature.description}
        </p>

        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-b-2xl`}
        />
      </div>
    </motion.div>
  );
}

function FeaturesDashboardMockup() {
  const [activeModules, setActiveModules] = useState({
    attendance: true,
    occupancy: true,
    security: true,
    maintenance: false,
    predictions: true,
    announcements: true,
    assignments: true,
    files: false,
    tests: true,
  });

  return (
    <div className="h-full w-full bg-dark-900 text-white flex flex-col select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-dark-950">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">System Operations Control</span>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">NODE_STATUS: OPTIMAL</div>
      </div>
      {/* Workspace */}
      <div className="flex-grow grid grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* Toggle list (Left column) */}
        <div className="col-span-2 space-y-2 overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Module Status & Config</div>
          {[
            { id: 'attendance', label: 'Smart Attendance', desc: 'Biometric & predict sync' },
            { id: 'occupancy', label: 'Classroom Occupancy', desc: 'Room utilization heatmap' },
            { id: 'security', label: 'Security Monitoring', desc: 'Threat detection & alerts' },
            { id: 'predictions', label: 'AI Predictions Engine', desc: 'Resource load forecasting' },
            { id: 'tests', label: 'Adaptive Mock Tests', desc: 'Personalized study paths' },
          ].map((mod) => (
            <div key={mod.id} className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 hover:border-primary/20 transition-all">
              <div>
                <div className="text-xs font-medium text-white">{mod.label}</div>
                <div className="text-[10px] text-gray-400">{mod.desc}</div>
              </div>
              <button
                onClick={() => setActiveModules(prev => ({ ...prev, [mod.id]: !prev[mod.id as keyof typeof prev] }))}
                className={`w-10 h-5 rounded-full relative transition-colors ${activeModules[mod.id as keyof typeof activeModules] ? 'bg-primary' : 'bg-gray-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${activeModules[mod.id as keyof typeof activeModules] ? 'right-0.5' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
        {/* System info (Right column) */}
        <div className="col-span-1 flex flex-col gap-3">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3">
            <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Active Core Modules</div>
            <div className="text-2xl font-bold text-primary">
              {Object.values(activeModules).filter(Boolean).length} <span className="text-xs text-gray-500">/ 9</span>
            </div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 flex-1 flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-gray-400 uppercase font-semibold mb-2">System Health Log</div>
              <div className="text-[9px] font-mono text-gray-400 space-y-1.5">
                <div className="text-green-400">[OK] AI prediction node synced</div>
                <div className="text-green-400">[OK] Secure gateway handshake</div>
                <div className="text-green-400">[OK] Attendance batch 2025 loaded</div>
                <div className="text-yellow-400">[WARN] Maintenance queues idle</div>
                <div className="text-primary">[INFO] Sync telemetry initialized</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  return (
    <>
      <section id="features" className="relative py-32 overflow-hidden bg-dark-900 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">

        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute inset-0 mesh-bg opacity-50" />
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-gray-300">Powerful Features</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-6">
              <span
                className="text-white italic font-light block"
                style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
              >
                Everything Your Campus
              </span>
              <span
                className="text-white font-extrabold block mt-1"
                style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
              >
                Needs in One <span className="gradient-text">Platform</span>
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive suite of tools designed to transform campus operations through AI and real-time analytics.
            </p>
          </motion.div>

          <motion.div
            ref={containerRef}
            variants={gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* Container Scroll Section in its own curved card slide */}
      <section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute inset-0 mesh-bg opacity-30" />
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
                    Modular Campus Operations
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Ecosystem Hub
                  </span>
                </h2>
              </>
            }
          >
            <FeaturesDashboardMockup />
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}
