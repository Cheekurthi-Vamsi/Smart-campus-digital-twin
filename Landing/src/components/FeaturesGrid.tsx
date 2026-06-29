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
    tag: 'BIOMETRIC',
    color: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20',
    glowColor: 'rgba(0, 229, 255, 0.15)'
  },
  {
    icon: LayoutGrid,
    title: 'Classroom Occupancy Heatmaps',
    description: 'Real-time room utilization statistics, lighting levels, and seating load telemetry.',
    tag: 'LIVE DATA',
    color: 'text-[#7B61FF] bg-[#7B61FF]/10 border-[#7B61FF]/20',
    glowColor: 'rgba(123, 97, 255, 0.15)'
  },
  {
    icon: Shield,
    title: 'Zero-Trust Security Monitors',
    description: 'Layer-7 firewalls, TLS handshake trackers, and real-time network anomaly logs.',
    tag: 'SECURE',
    color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
  {
    icon: Wrench,
    title: 'Maintenance Ticket Queues',
    description: 'Predictive heating checks, HVAC triggers, and automated facility alerts.',
    tag: 'PREDICTIVE',
    color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
    glowColor: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: Brain,
    title: 'AI Prediction Sandboxes',
    description: 'Resource consumption predictions, crowd pattern models, and autonomous operation tests.',
    tag: 'AI/ML',
    color: 'text-[#7B61FF] bg-[#7B61FF]/10 border-[#7B61FF]/20',
    glowColor: 'rgba(123, 97, 255, 0.15)'
  },
  {
    icon: Megaphone,
    title: 'Live Alerts & Announcements',
    description: 'Broadcast department advisories, exam updates, and server notifications.',
    tag: 'REAL-TIME',
    color: 'text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/20',
    glowColor: 'rgba(0, 229, 255, 0.15)'
  },
  {
    icon: FileText,
    title: 'Smart Assignments System',
    description: 'Drag-and-drop document upload boxes, grade sync timelines, and feedback lists.',
    tag: 'ACADEMIC',
    color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20',
    glowColor: 'rgba(16, 185, 129, 0.15)'
  },
  {
    icon: FolderOpen,
    title: 'Professor Reference Docs',
    description: 'Lecture logs, reference books, and learning paths certified by college boards.',
    tag: 'KNOWLEDGE',
    color: 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/20',
    glowColor: 'rgba(245, 158, 11, 0.15)'
  },
  {
    icon: ClipboardCheck,
    title: 'Adaptive Mock Test Systems',
    description: 'Custom quizzes that scale difficulty in real-time to analyze revision voids.',
    tag: 'ADAPTIVE AI',
    color: 'text-[#7B61FF] bg-[#7B61FF]/10 border-[#7B61FF]/20',
    glowColor: 'rgba(123, 97, 255, 0.15)'
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation: Max ±8 degrees
    const rotateX = -(mouseY / (height / 2)) * 8;
    const rotateY = (mouseX / (width / 2)) * 8;

    setTilt({ x: rotateY, y: rotateX });
    setIsHovered(true);

    // Set cursor position variables for hover glow card
    cardRef.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(600px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transformStyle: 'preserve-3d',
        transition: isHovered ? 'none' : 'transform 0.4s ease',
      }}
      className="relative glow-card-interactive rounded-[20px] bg-white dark:bg-white/[0.02] p-8 flex flex-col justify-between h-[240px] text-left select-none group"
    >
      <div className="relative z-10 flex flex-col gap-4">
        {/* Header line with Tag */}
        <div className="flex items-center justify-between">
          {/* Icon Container 44x44 */}
          <div className="w-11 h-11 rounded-xl bg-slate-900/10 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-center justify-center text-slate-800 dark:text-white transition-all duration-300">
            <feature.icon className="w-5 h-5" style={{ color: isHovered ? undefined : 'currentColor' }} />
          </div>

          {/* Category Tag */}
          <span className={`px-2 py-0.5 text-[9px] font-mono font-bold tracking-wider rounded border uppercase ${feature.color}`}>
            {feature.tag}
          </span>
        </div>

        {/* Feature title (15px Sora) */}
        <div>
          <h3 className="text-[15px] font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            {feature.title}
          </h3>
          {/* Feature description (13px text-muted 2-3 lines) */}
          <p className="text-[13px] text-slate-500 dark:text-gray-400 mt-2 leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="features" ref={containerRef} className="relative py-28 overflow-hidden bg-neutral-50 dark:bg-dark-900 transition-colors duration-300 rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#00E5FF]/5 dark:bg-[#00E5FF]/3 rounded-full blur-[150px] mesh-drift" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#7B61FF]/5 dark:bg-[#7B61FF]/3 rounded-full blur-[150px] mesh-drift" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/60 border border-black/10 dark:border-white/5 mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">System Capabilities</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            Complete Platform <span className="gradient-text">Matrix</span>
          </h2>
          <p className="text-slate-500 dark:text-gray-400 mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A comprehensive matrix of advanced tools designed to coordinate smart campus telemetry and academic tasks.
          </p>
        </div>

        {/* 3x3 Grid with hairline dividers, border 1px on container, rounded-20px, overflow hidden */}
        <div className="border border-black/10 dark:border-white/[0.06] bg-slate-200 dark:bg-neutral-800/60 gap-[1px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 rounded-[20px] overflow-hidden shadow-2xl">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
