import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Building2,
  Users,
  AlertTriangle,
  ArrowRight,
  Shield,
  Lock,
  Eye,
  Bell,
  Cpu,
  Network,
  CheckCircle2,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  Trophy,
  Home,
  FlaskConical,
  Car,
  Activity,
  Zap,
  MessageCircle,
  Award,
  Send
} from 'lucide-react';

// --- Buildings Data ---
const buildingsData = [
  { id: 'main', name: 'Main Block', icon: Building2, x: 50, y: 35, occupancy: 78, color: '#00E5FF', desc: 'Administrative & Lectures' },
  { id: 'lab', name: 'Research Lab', icon: FlaskConical, x: 25, y: 65, occupancy: 45, color: '#00FFD1', desc: 'AI & Robotics Hub' },
  { id: 'library', name: 'Central Library', icon: BookOpenIcon, x: 75, y: 55, occupancy: 87, color: '#FF00E5', desc: 'Study Spaces & Archives' },
  { id: 'sports', name: 'Sports Arena', icon: Trophy, x: 80, y: 25, occupancy: 34, color: '#F59E0B', desc: 'Indoor Athletics' },
  { id: 'parking', name: 'Smart Parking', icon: Car, x: 20, y: 30, occupancy: 56, color: '#10B981', desc: 'EV Charging & Spaces' },
];

function BookOpenIcon(props: any) {
  return <GraduationCap {...props} />;
}

export default function BentoGrid() {
  // --- State for Operations Control ---
  const [activeModules, setActiveModules] = useState({
    attendance: true,
    occupancy: true,
    security: true,
    predictions: true,
    tests: false,
  });

  const [healthLogs, setHealthLogs] = useState<string[]>([
    '[OK] Telemetry engine running',
    '[OK] Secure gateway handshake completed',
    '[INFO] Map telemetry sync established',
  ]);

  const toggleModule = (id: keyof typeof activeModules, label: string) => {
    const newVal = !activeModules[id];
    setActiveModules(prev => ({ ...prev, [id]: newVal }));
    setHealthLogs(prev => [
      `[${newVal ? 'OK' : 'WARN'}] ${label} ${newVal ? 'initialized' : 'shutdown'}`,
      ...prev.slice(0, 4)
    ]);
  };

  // --- State for Security Logs ---
  const [secLogs, setSecLogs] = useState([
    { msg: 'AES-256 handshake success: Core Node #12', status: 'secure', time: 'Just now' },
    { msg: 'Intrusion Detection: Zero anomalies in node traffic', status: 'secure', time: '12s ago' },
    { msg: 'Blocked unauthorized SSH check from 192.168.1.104', status: 'blocked', time: '1m ago' },
    { msg: 'Automated TLS Certificate rotation completed', status: 'secure', time: '5m ago' },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      const logs = [
        { msg: 'AES-256 handshake success: Library node #4', status: 'secure', time: 'Just now' },
        { msg: 'Zero-trust status: Checked 248 client sessions', status: 'secure', time: 'Just now' },
        { msg: 'Shield telemetry: DDoS filter active & stable', status: 'secure', time: 'Just now' },
        { msg: 'Blocked unauthorized REST attempt on API/V2', status: 'blocked', time: 'Just now' },
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setSecLogs(prev => [randomLog, ...prev.slice(0, 3)]);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // --- State for Mobile App Feed Toggling ---
  const [activeMobileTab, setActiveMobileTab] = useState<'student' | 'faculty'>('student');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [studentAlerts, setStudentAlerts] = useState([
    { id: 'st-1', category: 'Placements', text: 'Nvidia interview slot confirmed.', time: '10m ago', color: '#10B981' },
    { id: 'st-2', category: 'Academics', text: 'Mid-term exams schedule published.', time: '1h ago', color: '#00E5FF' },
    { id: 'st-3', category: 'Events', text: 'Hackathon registrations open till Fri.', time: '3h ago', color: '#8B5CF6' },
  ]);

  const [facultyAlerts, setFacultyAlerts] = useState([
    { id: 'fc-1', category: 'Dean Memo', text: 'R&D Review Board Meeting at 3 PM today.', time: '5m ago', color: '#EC4899' },
    { id: 'fc-2', category: 'Grading', text: '14 NLP-302 papers pending evaluation.', time: '45m ago', color: '#F59E0B' },
    { id: 'fc-3', category: 'Resources', text: 'Lab A equipment maintenance update.', time: '2h ago', color: '#8B5CF6' },
  ]);

  const showMobileToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const triggerBroadcastAlert = () => {
    if (activeMobileTab === 'student') {
      const studentBroadcasts = [
        { category: 'Placements', text: 'Google drive registrations open now!', color: '#10B981' },
        { category: 'Events', text: 'Smart Campus Fest details announced.', color: '#8B5CF6' },
        { category: 'Academics', text: 'Holiday announced for upcoming festival.', color: '#00E5FF' },
        { category: 'Dining', text: 'New health-menu revised at Central Mess.', color: '#EC4899' },
      ];
      const randomAlert = studentBroadcasts[Math.floor(Math.random() * studentBroadcasts.length)];
      const newAlert = {
        id: `st-broadcast-${Date.now()}`,
        category: randomAlert.category,
        text: randomAlert.text,
        time: 'Just now',
        color: randomAlert.color,
      };
      setStudentAlerts(prev => [newAlert, ...prev]);
      showMobileToast(`New Student Alert: ${randomAlert.text}`);
    } else {
      const facultyBroadcasts = [
        { category: 'Admin', text: 'Syllabus revision documents due Friday.', color: '#EC4899' },
        { category: 'Dean Memo', text: 'Research grants application window open.', color: '#F59E0B' },
        { category: 'HR', text: 'Faculty health checkup camp tomorrow.', color: '#10B981' },
        { category: 'Resources', text: 'Smart Podium setup training at Room 102.', color: '#00E5FF' },
      ];
      const randomAlert = facultyBroadcasts[Math.floor(Math.random() * facultyBroadcasts.length)];
      const newAlert = {
        id: `fc-broadcast-${Date.now()}`,
        category: randomAlert.category,
        text: randomAlert.text,
        time: 'Just now',
        color: randomAlert.color,
      };
      setFacultyAlerts(prev => [newAlert, ...prev]);
      showMobileToast(`New Faculty Memo: ${randomAlert.text}`);
    }
  };

  // --- State for AI prompt box ---
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('Ask the campus core AI for predictions, reports, or scheduling tasks.');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const aiSuggestions = [
    { tag: 'Library Peak', query: 'Forecast library occupancy peak', response: 'AI Forecast: Library load peaks at 92% occupancy around 4:00 PM. Action recommendation: Pre-cool Block B study space & route study groups to Science Lab seminar room.' },
    { tag: 'HVAC Save', query: 'Optimize HVAC power grids', response: 'AI Grid Optimization: Sports Arena is vacant till 6:00 PM. Scaling down HVAC zone 4 & 5. Saving: 4.8 kW/h ($12.50/hr). Grid loading normal.' },
    { tag: 'Security Score', query: 'Zero-trust network status report', response: 'AI Security Report: Zero-trust health score 98/100. Blocked 14 unauthorized port scanners in past hour. Active TLS sessions verified stable.' },
    { tag: 'Room Allocation', query: 'Reallocate room for CS-301', response: 'AI Scheduler: CS-301 class has high temperature readings in Room 302. Recommendation: Move to Main Block Room 401 (currently empty, pre-cooled).' }
  ];

  const handleAiSuggestionClick = (s: typeof aiSuggestions[0]) => {
    setAiPrompt(s.query);
    setIsAiLoading(true);
    setAiResponse('Querying predictive neural brain...');
    setTimeout(() => {
      setAiResponse(s.response);
      setIsAiLoading(false);
    }, 900);
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    setAiResponse('Analyzing campus parameters...');
    setTimeout(() => {
      const q = aiPrompt.toLowerCase();
      const match = aiSuggestions.find(s => 
        q.includes(s.tag.toLowerCase()) || 
        q.includes(s.query.toLowerCase()) ||
        s.tag.toLowerCase().split(' ').some(word => q.includes(word))
      );
      if (match) {
        setAiResponse(match.response);
      } else {
        const defaultResponses = [
          `AI Analysis for "${aiPrompt}": Systems operating in healthy parameters. Telemetry load stable. No action required.`,
          `AI Report for "${aiPrompt}": Campus grid consumption reduced by 4.2% due to smart scheduling recommendations.`,
          `AI Prediction: Dynamic route patterns forecast normal traffic flow at campus main gate over next 2 hours.`,
        ];
        setAiResponse(defaultResponses[Math.floor(Math.random() * defaultResponses.length)]);
      }
      setIsAiLoading(false);
    }, 1000);
  };

  // --- State for Map Building Hover ---
  const [hoveredBuilding, setHoveredBuilding] = useState<typeof buildingsData[0] | null>(null);

  // --- Animated counters ---
  const activeCount = Object.values(activeModules).filter(Boolean).length;

  return (
    <section id="ecosystem" className="relative py-28 overflow-hidden bg-neutral-50 dark:bg-dark-900 transition-colors duration-300">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/5 blur-[120px] dark:blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 dark:bg-secondary/5 blur-[120px] dark:blur-[150px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-black/10 dark:border-white/10 mb-4"
          >
            <Activity className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">Unified Telemetry Control</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-slate-900 dark:text-white"
          >
            <span
              className="italic font-light block"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Interactive Campus
            </span>
            <span
              className="font-extrabold block mt-1"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Ecosystem <span className="gradient-text">Dashboard</span>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-500 dark:text-gray-400 max-w-2xl mx-auto mt-4"
          >
            Monitor real-time operations, configure zero-trust network modules, inspect live locations, and query the predictive AI brain.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-flow-row-dense gap-6 auto-rows-[260px]">
          
          {/* 1. DIGITAL TWIN HOLOGRAPHIC MAP (Col Span 2, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden flex flex-col p-6 cursor-default"
          >
            <div className="flex items-center justify-between mb-4 z-10">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  Digital Twin Holographic Map
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">Live 2D floor plans & building occupant rates</p>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                TELEMETRY ON
              </div>
            </div>

            {/* Simulated holographic grid canvas */}
            <div className="flex-grow rounded-2xl bg-slate-900 relative overflow-hidden flex items-center justify-center border border-white/5 shadow-inner">
              <svg className="absolute inset-0 w-full h-full opacity-10">
                <defs>
                  <pattern id="bento-grid-pattern" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#bento-grid-pattern)" />
              </svg>

              {/* Circles */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-3/4 h-3/4 rounded-full border border-dashed border-primary" />
                <div className="absolute w-1/2 h-1/2 rounded-full border border-dashed border-secondary" />
              </div>

              {/* Laser stream */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {buildingsData.map((b, i) => (
                  <motion.div
                    key={`line-${b.id}`}
                    className="absolute w-px h-16"
                    style={{
                      left: `${b.x}%`,
                      top: `${b.y - 8}%`,
                      background: `linear-gradient(180deg, ${b.color}50, transparent)`,
                    }}
                    animate={{
                      opacity: [0.2, 0.7, 0.2],
                      y: [0, -15, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </div>

              {/* Building markers */}
              {buildingsData.map((b) => {
                const isHovered = hoveredBuilding?.id === b.id;
                return (
                  <div
                    key={b.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                    style={{ left: `${b.x}%`, top: `${b.y}%` }}
                    onMouseEnter={() => setHoveredBuilding(b)}
                    onMouseLeave={() => setHoveredBuilding(null)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.25 }}
                      className="relative"
                      style={{ filter: `drop-shadow(0 0 8px ${b.color})` }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center border text-white"
                        style={{
                          borderColor: b.color + '40',
                          background: `linear-gradient(135deg, ${b.color}25, transparent)`,
                        }}
                      >
                        <b.icon className="w-5 h-5" style={{ color: b.color }} />
                      </div>
                      <motion.div
                        className="absolute inset-0 rounded-lg"
                        style={{ border: `1px solid ${b.color}` }}
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2.2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
                );
              })}

              {/* Detail Tooltip Overlay inside Map */}
              <AnimatePresence>
                {hoveredBuilding && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 z-20 flex justify-between items-center"
                  >
                    <div>
                      <div className="text-xs text-primary font-bold tracking-wider uppercase">{hoveredBuilding.name}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">{hoveredBuilding.desc}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-xs text-gray-500 font-medium">Occupancy</div>
                        <div className="text-sm text-white font-mono font-bold">{hoveredBuilding.occupancy}%</div>
                      </div>
                      <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full" style={{ width: `${hoveredBuilding.occupancy}%`, backgroundColor: hoveredBuilding.color }} />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 dark:text-gray-400">
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-primary" /> 5 Smart Zones Connected</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-green-400" /> 12,847 Active Occupants</span>
            </div>
          </motion.div>

          {/* 2. OPERATIONS ECOSYSTEM HUB (Col Span 1, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="md:col-span-1 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-secondary" />
                  Ecosystem Modules
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-gray-400">Toggle live telemetry modules</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-secondary font-mono">{activeCount}</span>
                <span className="text-[8px] text-gray-400 font-semibold block">/ 5 ON</span>
              </div>
            </div>

            <div className="flex-grow my-4 space-y-2.5 max-h-[220px] overflow-y-auto scrollbar-none pr-0.5">
              {[
                { id: 'attendance', label: 'Attendance', color: '#00E5FF', desc: 'RFID beacon check-in' },
                { id: 'occupancy', label: 'Occupancy', color: '#7B61FF', desc: 'Live building headcounts' },
                { id: 'security', label: 'Security', color: '#10B981', desc: 'Active zero-trust shield' },
                { id: 'predictions', label: 'AI Predict', color: '#FF00E5', desc: 'HVAC load model engine' },
                { id: 'tests', label: 'Mock Tests', color: '#F59E0B', desc: 'Interactive Sandbox IDE' },
              ].map((m) => {
                const isActive = activeModules[m.id as keyof typeof activeModules];
                return (
                  <button
                    key={m.id}
                    onClick={() => toggleModule(m.id as keyof typeof activeModules, m.label)}
                    className={`w-full flex items-center justify-between p-2 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-slate-900/85 text-white border-transparent shadow-lg'
                        : 'bg-white/40 dark:bg-slate-900/10 border-black/5 dark:border-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <div
                        className="w-2 h-2 rounded-full shrink-0 animate-pulse"
                        style={{ backgroundColor: isActive ? m.color : '#64748b' }}
                      />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[10px] font-bold leading-tight truncate">{m.label}</span>
                        <span className="text-[7px] text-gray-500 dark:text-gray-400 font-medium truncate max-w-[90px]">{m.desc}</span>
                      </div>
                    </div>
                    {/* Switcher Indicator toggle bar */}
                    <div className={`w-5.5 h-3 rounded-full p-0.5 transition-colors shrink-0 ${isActive ? 'bg-secondary' : 'bg-slate-300 dark:bg-slate-800'}`}>
                      <div className={`w-2 h-2 rounded-full bg-white transition-transform ${isActive ? 'translate-x-2.5' : 'translate-x-0'}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Health Logs */}
            <div className="h-10 bg-slate-950/5 dark:bg-black/20 rounded-xl px-3 py-1.5 flex items-center justify-between border border-black/5 dark:border-white/5 overflow-hidden">
              <span className="text-[8px] text-slate-400 font-mono tracking-wider shrink-0">LOGS:</span>
              <div className="flex-grow pl-2.5 text-[8.5px] font-mono text-emerald-500 dark:text-emerald-400 truncate">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={healthLogs[0]}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {healthLogs[0]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* 3. VISUAL ANALYTICS INTELLIGENCE (Col Span 2, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-accent-cyan" />
                  Visual Intelligence & Analytics
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">Weekly utilization metrics and active student loads</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-400">WEEKLY STATS</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-2 rounded-xl bg-slate-950/5 dark:bg-black/20 p-4 border border-black/5 dark:border-white/5 flex flex-col justify-between h-[150px]">
                <span className="text-[10px] text-slate-500 dark:text-gray-400 font-semibold block">Attendance Distribution</span>
                {/* SVG Graph */}
                <div className="flex items-end justify-between h-20 gap-1.5 pt-4">
                  {[78, 85, 69, 90, 84, 93, 76, 88].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.05 }}
                        className="w-full rounded-t bg-gradient-to-t from-primary/80 to-secondary/80 relative group"
                      >
                        {/* Hover Tooltip */}
                        <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-[9px] text-white px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-md">
                          {val}%
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-medium">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* Utilization Ring */}
              <div className="col-span-1 rounded-xl bg-slate-950/5 dark:bg-black/20 p-4 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] text-slate-500 dark:text-gray-400 font-semibold mb-2 block uppercase">Space Load</span>
                <div className="relative w-18 h-18">
                  <svg className="transform -rotate-90" width="72" height="72">
                    <circle
                      className="text-black/5 dark:text-white/10"
                      stroke="currentColor"
                      strokeWidth="5"
                      fill="transparent"
                      r="28"
                      cx="36"
                      cy="36"
                    />
                    <motion.circle
                      stroke="#00E5FF"
                      strokeWidth="5"
                      fill="transparent"
                      r="28"
                      cx="36"
                      cy="36"
                      initial={{ strokeDashoffset: 175.9 }}
                      whileInView={{ strokeDashoffset: 175.9 - (78 / 100) * 175.9 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      style={{
                        strokeDasharray: '175.9',
                        filter: 'drop-shadow(0 0 5px #00E5FF30)',
                      }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-black text-slate-800 dark:text-white font-mono">78%</span>
                  </div>
                </div>
                <span className="text-[9px] text-emerald-500 font-semibold mt-2">Optimal range</span>
              </div>
            </div>

            {/* Metrics cards bar */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: 'Active Students', value: '12,847', change: '+2.5%' },
                { label: 'Energy Saved', value: '34.2%', change: '+5.8%' },
                { label: 'Avg CGPA', value: '8.4', change: '+0.3' },
              ].map((met) => (
                <div key={met.label} className="p-2 rounded-xl bg-slate-900/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="text-[9px] text-slate-500 dark:text-gray-400 uppercase font-medium">{met.label}</div>
                  <div className="text-sm font-black text-slate-800 dark:text-white mt-0.5 font-mono">{met.value}</div>
                  <div className="text-[9px] text-emerald-500 mt-0.5">{met.change}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 4. STUDENT COMPANION PORTAL (Col Span 2, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Student Companion Hub
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">Class schedule, alerts & academic trackers</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 shadow-md">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-[9px] font-bold text-white">
                    JD
                  </div>
                </div>
                <span className="text-xs font-semibold text-slate-800 dark:text-white hidden sm:inline">John Doe</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-2">
              {/* Daily Schedule */}
              <div className="rounded-xl bg-slate-950/5 dark:bg-black/20 p-3.5 border border-black/5 dark:border-white/5 flex flex-col justify-between h-[135px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 dark:text-gray-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-primary" />
                    Today's Classes
                  </span>
                </div>
                <div className="space-y-2 mt-2 flex-grow overflow-y-auto">
                  {[
                    { title: 'Machine Learning', time: '09:00 AM', room: 'Room 401' },
                    { title: 'Data Structures', time: '11:30 AM', room: 'Lab B' },
                  ].map((c) => (
                    <div key={c.title} className="p-1.5 rounded bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col">
                      <span className="text-[11px] font-bold text-slate-800 dark:text-white leading-tight">{c.title}</span>
                      <span className="text-[9px] text-slate-500 dark:text-gray-400 mt-0.5">{c.time} • {c.room}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Assignment Tracker */}
              <div className="rounded-xl bg-slate-950/5 dark:bg-black/20 p-3.5 border border-black/5 dark:border-white/5 flex flex-col justify-between h-[135px]">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 dark:text-gray-400 font-semibold flex items-center gap-1">
                    <FileText className="w-3 h-3 text-secondary" />
                    Active Tasks
                  </span>
                </div>
                <div className="space-y-3 mt-3 flex-grow overflow-y-auto">
                  {[
                    { label: 'ML Phase 2', progress: 65, due: '2 days' },
                    { label: 'Algo Analysis', progress: 15, due: '5 days' },
                  ].map((a) => (
                    <div key={a.label} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-semibold text-slate-700 dark:text-gray-300">
                        <span className="truncate">{a.label}</span>
                        <span className="text-secondary">{a.due}</span>
                      </div>
                      <div className="h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" style={{ width: `${a.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'CGPA', val: '8.7', color: 'text-primary' },
                { label: 'Attendance', val: '94%', color: 'text-green-400' },
                { label: 'Rank', val: '#12', color: 'text-secondary' },
                { label: 'Credits', val: '15', color: 'text-accent-pink' },
              ].map((s) => (
                <div key={s.label} className="p-2 rounded-xl bg-slate-950/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center">
                  <div className={`text-sm font-black ${s.color} font-mono`}>{s.val}</div>
                  <div className="text-[9px] text-slate-500 dark:text-gray-400 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. ZERO-TRUST SECURITY CONSOLE (Col Span 1, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  Zero-Trust Operations
                </h3>
              </div>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="flex-grow my-3 bg-slate-950 rounded-xl p-3 flex flex-col justify-between font-mono text-[9px] border border-white/5 shadow-inner select-none h-[280px]">
              <div>
                <div className="flex items-center justify-between text-gray-500 border-b border-white/5 pb-1 mb-2">
                  <span>SEC_CONSOLE</span>
                  <span>FW: ENABLED</span>
                </div>
                <div className="space-y-2 overflow-y-auto max-h-[140px] pr-1 scrollbar-none">
                  {secLogs.map((log, index) => (
                    <div key={index} className="flex flex-col border-b border-white/5 pb-1.5 last:border-b-0">
                      <div className="flex justify-between items-center text-gray-500 mb-0.5">
                        <span className={`text-[8px] px-1 rounded uppercase font-bold ${
                          log.status === 'blocked' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                        }`}>
                          {log.status}
                        </span>
                        <span>{log.time}</span>
                      </div>
                      <span className="text-gray-300 leading-tight break-all font-mono">{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-2 mt-2 space-y-1.5 text-gray-400">
                <div className="flex justify-between">
                  <span>Protocol:</span>
                  <span className="text-white">AES-256 / TLS 1.3</span>
                </div>
                <div className="flex justify-between">
                  <span>Threat Asses:</span>
                  <span className="text-emerald-400 font-bold">ZERO THREATS</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden mt-1">
                  <div className="bg-emerald-400 h-full w-full animate-pulse" />
                </div>
              </div>
            </div>

            <span className="text-[10px] text-slate-500 dark:text-gray-400 flex items-center gap-1 justify-center">
              <Lock className="w-3.5 h-3.5 text-emerald-500" /> Active Layer-7 Firewall Protect
            </span>
          </motion.div>

          {/* 6. FACULTY TELEMETRY HUB (Col Span 2, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35 }}
            className="md:col-span-2 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-secondary" />
                  Faculty Management & Tracking
                </h3>
                <p className="text-xs text-slate-500 dark:text-gray-400">Active student location monitoring & live telemetry check-ins</p>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                LIVE TRACKING
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 flex-grow mb-4">
              {/* Telemetry map mockup */}
              <div className="rounded-xl bg-slate-950/5 dark:bg-black/20 p-3 border border-black/5 dark:border-white/5 relative overflow-hidden flex flex-col justify-between h-[140px]">
                <div className="text-[10px] text-slate-500 dark:text-gray-400 font-semibold">Active Locations Map</div>
                
                <div className="flex-grow flex items-center justify-center relative bg-slate-900/30 dark:bg-slate-900/80 rounded-lg mt-2 overflow-hidden">
                  <svg className="absolute inset-0 w-full h-full opacity-5">
                    <pattern id="radar-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <rect width="20" height="20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#radar-grid)" />
                  </svg>
                  
                  {/* Pulsing locator nodes */}
                  <div className="absolute top-1/4 left-1/3">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary relative" />
                  </div>
                  <div className="absolute bottom-1/3 right-1/4">
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping absolute" style={{ animationDelay: '0.4s' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-secondary relative" />
                  </div>
                  <div className="absolute top-1/2 right-1/3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping absolute" style={{ animationDelay: '0.8s' }} />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 relative" />
                  </div>
                  
                  <span className="absolute bottom-1.5 right-1.5 text-[8px] font-mono text-gray-500">12,847 tracked</span>
                </div>
              </div>

              {/* Active Students Mini List */}
              <div className="rounded-xl bg-slate-950/5 dark:bg-black/20 p-3.5 border border-black/5 dark:border-white/5 flex flex-col justify-between h-[140px]">
                <div className="text-[10px] text-slate-500 dark:text-gray-400 font-semibold mb-2">Live Student Check-ins</div>
                <div className="space-y-1.5 flex-grow overflow-y-auto pr-1">
                  {[
                    { name: 'Sarah Chen', loc: 'Library', col: '#FF00E5' },
                    { name: 'Alex Rivera', loc: 'Research Lab', col: '#00FFD1' },
                    { name: 'Taylor Smith', loc: 'Main Block', col: '#00E5FF' },
                  ].map((st) => (
                    <div key={st.name} className="flex items-center justify-between text-[10px] p-1 rounded bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <span className="font-bold text-slate-700 dark:text-white truncate">{st.name}</span>
                      <span className="text-slate-500 dark:text-gray-400 text-[9px] flex items-center gap-1 font-mono">
                        <span className="w-1 h-1 rounded-full" style={{ backgroundColor: st.col }} />
                        {st.loc}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Schedule Class', icon: Calendar },
                { label: 'Approve Attendance', icon: CheckCircle2 },
                { label: 'Generate Reports', icon: FileText },
                { label: 'View Trends', icon: TrendingUp },
              ].map((act) => (
                <button key={act.label} className="p-2 rounded-xl bg-slate-950/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-center flex flex-col items-center justify-center text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white transition-colors">
                  <act.icon className="w-4 h-4 text-primary mb-1" />
                  <span className="text-[9px] font-semibold leading-tight">{act.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* 7. POCKET APP SHOWCASE (Col Span 1, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="md:col-span-1 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                  <SmartphoneIcon className="w-4 h-4 text-primary" />
                  Pocket Mobile Companion
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-gray-400">Student & Faculty announcement channels</p>
              </div>
            </div>
            
            {/* Miniature Phone screen mockup */}
            <div className="flex-grow my-3 flex flex-col items-center justify-center">
              <div className="w-[160px] h-[280px] rounded-3xl bg-slate-950 border-[4px] border-slate-800 relative overflow-hidden flex flex-col justify-between p-2.5 shadow-2xl select-none">
                {/* Speaker top bar */}
                <div className="w-12 h-1 bg-slate-800 absolute top-1 left-1/2 -translate-x-1/2 rounded-full z-20" />
                
                {/* System Status Bar */}
                <div className="flex justify-between items-center text-[7px] text-gray-500 font-mono px-1 mt-1 z-10">
                  <span>09:41</span>
                  <div className="flex items-center gap-1">
                    <Network className="w-2.5 h-2.5" />
                    <div className="w-3.5 h-1.5 border border-gray-600 rounded-sm p-0.5 flex items-center">
                      <div className="w-full h-full bg-emerald-500 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Role Switcher Tabs */}
                <div className="grid grid-cols-2 gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-white/5 my-1.5 z-10">
                  <button
                    onClick={() => setActiveMobileTab('student')}
                    className={`py-0.5 text-[7px] font-bold rounded transition-all ${
                      activeMobileTab === 'student'
                        ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Student
                  </button>
                  <button
                    onClick={() => setActiveMobileTab('faculty')}
                    className={`py-0.5 text-[7px] font-bold rounded transition-all ${
                      activeMobileTab === 'faculty'
                        ? 'bg-gradient-to-r from-secondary to-primary text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Faculty
                  </button>
                </div>

                {/* Profile Header */}
                <div className="flex items-center gap-1 border-b border-white/5 pb-1.5 mt-0.5">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-primary to-secondary p-0.5">
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-[7px] font-bold text-white">
                      {activeMobileTab === 'student' ? 'JD' : 'DA'}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[7px] text-white font-bold leading-tight">
                      {activeMobileTab === 'student' ? 'John Doe' : 'Dr. Aris'}
                    </span>
                    <span className="text-[5px] text-gray-500 font-mono">
                      {activeMobileTab === 'student' ? 'CS Major • Active' : 'CS Dept Head • Active'}
                    </span>
                  </div>
                </div>

                {/* Scrollable News Feed */}
                <div className="flex-grow flex flex-col overflow-y-auto scrollbar-none py-1.5 space-y-1.5 max-h-[150px]">
                  <AnimatePresence initial={false} mode="popLayout">
                    {(activeMobileTab === 'student' ? studentAlerts : facultyAlerts).map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -10, y: -5 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-[7px] text-gray-200 leading-snug flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span
                            className="px-1 rounded-sm text-[5px] font-extrabold uppercase text-white"
                            style={{ backgroundColor: alert.color + '40', color: alert.color }}
                          >
                            {alert.category}
                          </span>
                          <span className="text-[5px] text-gray-500 font-mono">{alert.time}</span>
                        </div>
                        <p className="text-gray-300 font-medium">{alert.text}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Animated Broadcast Alert Notification inside Phone */}
                <AnimatePresence>
                  {toastMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: -45, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -45, scale: 0.9 }}
                      className="absolute top-7 left-1.5 right-1.5 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-lg border border-primary/30 shadow-xl z-30 flex items-start gap-1"
                    >
                      <Bell className="w-2.5 h-2.5 text-primary mt-0.5 flex-shrink-0 animate-bounce" />
                      <div className="flex flex-col">
                        <span className="text-[6px] text-primary font-bold">PUSH ALERT</span>
                        <span className="text-[6px] text-white leading-tight font-medium break-words">{toastMessage}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Home Indicator */}
                <div className="w-12 h-0.5 rounded-full bg-white/20 self-center mt-1 z-10" />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                onClick={triggerBroadcastAlert}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-slate-800 dark:text-white text-[10px] font-bold border border-primary/30 dark:border-white/10 transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-primary animate-pulse" />
                Broadcast Quick Alert
              </button>
              <span className="text-[9px] text-slate-500 dark:text-gray-400 text-center font-medium block">
                IOS & Android Telemetry App Ready
              </span>
            </div>
          </motion.div>

          {/* 8. FUTURE VISION & AI FORECAST PROMPT (Col Span 1, Row Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.45 }}
            className="md:col-span-1 md:row-span-2 group relative rounded-3xl glass-card border border-black/10 dark:border-white/10 overflow-hidden p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-accent-pink animate-pulse" />
                AI Foresight Sandbox
              </h3>
            </div>

            {/* Simulated Interactive Prompt Box */}
            <div className="flex-grow flex flex-col justify-between bg-slate-950/5 dark:bg-black/25 rounded-2xl p-3 border border-black/5 dark:border-white/5 h-[230px]">
              <div className="overflow-y-auto max-h-[140px] pr-1 scrollbar-none flex-grow">
                <div className="text-[8px] uppercase tracking-wider text-slate-400 font-semibold mb-1">Campus Core AI Output:</div>
                <div className="text-[10px] text-slate-600 dark:text-gray-300 leading-relaxed font-mono">
                  {aiResponse}
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleAiSubmit} className="mt-3 flex items-center gap-1 relative border-t border-black/5 dark:border-white/5 pt-2">
                <input
                  type="text"
                  placeholder="Ask campus AI..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  disabled={isAiLoading}
                  className="w-full pl-2 pr-7 py-1.5 rounded-lg bg-white dark:bg-slate-900 text-xs border border-black/10 dark:border-white/10 text-slate-800 dark:text-white focus:outline-none focus:border-primary/50 placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={isAiLoading}
                  className="absolute right-1.5 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            <div className="mt-3 flex flex-wrap gap-1 items-center justify-center">
              {aiSuggestions.map((s) => (
                <button
                  key={s.tag}
                  type="button"
                  onClick={() => handleAiSuggestionClick(s)}
                  disabled={isAiLoading}
                  className="text-[8px] font-mono px-2 py-0.5 rounded bg-slate-900/5 dark:bg-white/5 text-slate-500 hover:text-primary dark:text-gray-400 dark:hover:text-white hover:bg-primary/10 dark:hover:bg-primary/20 border border-black/5 dark:border-white/5 transition-all"
                >
                  {s.tag}
                </button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function SmartphoneIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
