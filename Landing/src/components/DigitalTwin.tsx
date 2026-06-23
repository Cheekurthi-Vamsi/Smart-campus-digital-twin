import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import { Building2, Home, FlaskConical, BookOpen, Trophy, Car, Users, Activity, AlertTriangle, TrendingUp } from 'lucide-react';


const buildings = [
  { id: 'main', name: 'Main Building', icon: Building2, x: 50, y: 40, occupancy: 78, color: '#00E5FF' },
  { id: 'hostel-a', name: 'Hostel A', icon: Home, x: 25, y: 30, occupancy: 92, color: '#7B61FF' },
  { id: 'hostel-b', name: 'Hostel B', icon: Home, x: 75, y: 25, occupancy: 85, color: '#7B61FF' },
  { id: 'lab', name: 'Research Lab', icon: FlaskConical, x: 35, y: 65, occupancy: 45, color: '#00FFD1' },
  { id: 'library', name: 'Library', icon: BookOpen, x: 65, y: 55, occupancy: 67, color: '#FF00E5' },
  { id: 'sports', name: 'Sports Complex', icon: Trophy, x: 80, y: 70, occupancy: 34, color: '#F59E0B' },
  { id: 'parking', name: 'Parking Zone', icon: Car, x: 20, y: 75, occupancy: 56, color: '#10B981' },
];

function BuildingMarker({ building }: { building: typeof buildings[0] }) {
  const [isHovered, setIsHovered] = useState(false);

  const markerVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{ left: `${building.x}%`, top: `${building.y}%` }}
      variants={markerVariants}
      whileHover={{ scale: 1.25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative -translate-x-1/2 -translate-y-1/2"
        style={{ filter: `drop-shadow(0 0 10px ${building.color})` }}
      >
        <div
          className="w-12 h-12 rounded-xl glass flex items-center justify-center border"
          style={{ borderColor: building.color + '40', background: `linear-gradient(135deg, ${building.color}20, transparent)` }}
        >
          <building.icon className="w-6 h-6" style={{ color: building.color }} />
        </div>

        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ border: `1px solid ${building.color}` }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 glass-card p-3 rounded-lg min-w-40 z-10"
        >
          <div className="font-semibold text-white text-sm">{building.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <Users className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-400">Occupancy</span>
            <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: building.color }}
                initial={{ width: 0 }}
                animate={{ width: `${building.occupancy}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="text-xs text-white font-medium">{building.occupancy}%</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function DataOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${50 + Math.random() * 100}px`,
            background: `linear-gradient(90deg, transparent, ${Math.random() > 0.5 ? '#00E5FF' : '#7B61FF'}40, transparent)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {buildings.map((building, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute w-px h-20"
          style={{
            left: `${building.x}%`,
            top: `${building.y - 10}%`,
            background: `linear-gradient(180deg, ${building.color}40, transparent)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change: string;
  color: string;
}) {
  const statVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={statVariants}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: `0 12px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${color}20`,
      }}
      className="glass-card rounded-xl p-4 flex items-center gap-4 cursor-pointer"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
      >
        <span style={{ color }}><Icon className="w-5 h-5" /></span>
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-400">{label}</div>
        <div className="text-xl font-bold text-white">{value}</div>
      </div>
      <div className="text-xs text-green-400 flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />
        {change}
      </div>
    </motion.div>
  );
}

export default function DigitalTwin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <>
      <section id="platform" className="relative py-32 overflow-hidden bg-dark-800 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">

        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-300">Real-Time Visualization</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
              <span className="text-white">Campus</span>{' '}
              <span className="gradient-text">Digital Twin</span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience your entire campus as a living digital replica with real-time data streams and AI-powered insights.
            </p>
          </motion.div>

          {/* Flat view stats */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <StatCard
              icon={Users}
              label="Active Students"
              value="12,847"
              change="+2.5%"
              color="#00E5FF"
            />
            <StatCard
              icon={Activity}
              label="Movement Events"
              value="34,291"
              change="+15%"
              color="#7B61FF"
            />
            <StatCard
              icon={AlertTriangle}
              label="Security Events"
              value="0"
              change="Normal"
              color="#10B981"
            />
            <StatCard
              icon={Building2}
              label="Avg Occupancy"
              value="68%"
              change="+5%"
              color="#FF00E5"
            />
          </motion.div>
        </div>
      </section>

      {/* Container Scroll Section for the Interactive Map */}
      <section className="relative py-24 overflow-hidden bg-dark-800 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col overflow-hidden w-full">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-4xl font-semibold text-white mb-2">
                  Real-time Virtualization
                  <br />
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none gradient-text">
                    Holographic Map
                  </span>
                </h2>
              </>
            }
          >
            <div className="relative h-full w-full rounded-2xl overflow-hidden bg-dark-900/95">
              <svg className="absolute inset-0 w-full h-full opacity-10">
                <defs>
                  <pattern id="grid-dark-scroll" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-dark-scroll)" />
              </svg>

              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-3/4 h-3/4 rounded-full border border-dashed border-primary/30" />
                <div className="absolute w-1/2 h-1/2 rounded-full border border-dashed border-secondary/30" />
                <div className="absolute w-1/4 h-1/4 rounded-full border border-primary/50" />
              </div>

              <DataOverlay />

              {buildings.map((building) => (
                <BuildingMarker key={building.id} building={building} />
              ))}

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="glass rounded-lg p-3 flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-gray-300">Live</span>
                  </div>
                  <div className="h-4 w-px bg-white/20" />
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> 7 Buildings
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> 12,847 People
                    </span>
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-yellow-400" /> 0 Alerts
                    </span>
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
