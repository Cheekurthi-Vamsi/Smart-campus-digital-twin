import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
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
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: UserCheck,
    title: 'Smart Attendance Check-ins',
    description: 'Biometric fingerprint sync and automated location checks to confirm student attendance.',
    gradient: 'from-cyan-500 to-blue-500',
    glowColor: 'rgba(0, 229, 255, 0.3)',
  },
  {
    icon: LayoutGrid,
    title: 'Classroom Occupancy heatmaps',
    description: 'Real-time room utilization statistics, lighting levels, and seating load telemetry.',
    gradient: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(123, 97, 255, 0.3)',
  },
  {
    icon: Shield,
    title: 'Zero-Trust Security Monitors',
    description: 'Layer-7 firewalls, TLS handshake trackers, and real-time network anomaly logs.',
    gradient: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(0, 255, 209, 0.3)',
  },
  {
    icon: Wrench,
    title: 'Maintenance ticket queues',
    description: 'Predictive heating checks, HVAC triggers, and automated facility alerts.',
    gradient: 'from-orange-500 to-red-500',
    glowColor: 'rgba(255, 165, 0, 0.3)',
  },
  {
    icon: Brain,
    title: 'AI Prediction sandboxes',
    description: 'Resource consumption predictions, crowd pattern models, and autonomous operation tests.',
    gradient: 'from-indigo-500 to-purple-500',
    glowColor: 'rgba(99, 102, 241, 0.3)',
  },
  {
    icon: Megaphone,
    title: 'Live Alerts & Announcements',
    description: 'Broadcast department advisories, exam updates, and server notifications.',
    gradient: 'from-yellow-500 to-orange-500',
    glowColor: 'rgba(234, 179, 8, 0.3)',
  },
  {
    icon: FileText,
    title: 'Smart Assignments System',
    description: 'Drag-and-drop document upload boxes, grade sync timelines, and feedback lists.',
    gradient: 'from-teal-500 to-cyan-500',
    glowColor: 'rgba(20, 184, 166, 0.3)',
  },
  {
    icon: FolderOpen,
    title: 'Professor reference docs',
    description: 'Lecture logs, reference books, and learning paths certified by college boards.',
    gradient: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.3)',
  },
  {
    icon: ClipboardCheck,
    title: 'Adaptive mock test systems',
    description: 'Custom quizzes that scale difficulty in real-time to analyze revision voids.',
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

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{
        y: -6,
        scale: 1.02,
        transition: { type: 'spring', stiffness: 350, damping: 15 }
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
          isHovered ? 'bg-white dark:bg-dark-800' : 'glass-card'
        } border border-black/5 dark:border-white/10`}
        style={{
          boxShadow: isHovered
            ? `0 20px 40px rgba(0, 0, 0, 0.15), 0 0 30px ${feature.glowColor}`
            : '0 4px 20px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 transition-transform duration-300`}
          style={{
            transform: 'translateZ(30px)',
            boxShadow: `0 8px 24px ${feature.glowColor}`,
          }}
        >
          <feature.icon className="w-6 h-6 text-white" />
        </div>

        <h3
          className="text-base font-bold text-slate-800 dark:text-white mb-2 transition-all"
          style={{ transform: 'translateZ(20px)' }}
        >
          {feature.title}
        </h3>

        <p
          className="text-slate-500 dark:text-gray-400 text-xs leading-relaxed transition-all"
          style={{ transform: 'translateZ(10px)' }}
        >
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={containerRef} className="relative py-28 overflow-hidden bg-gradient-to-tr from-slate-50 via-white to-slate-50 dark:from-dark-900 dark:via-dark-900 dark:to-dark-900 border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/60 border border-black/5 dark:border-white/5 mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">System Capabilities</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            Complete Platform <span className="gradient-text">Matrix</span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            A comprehensive matrix of advanced tools designed to coordinate smart campus telemetry and academic tasks.
          </p>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
