import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Building2,
  Users,
  Shield,
  Cpu,
  Bell,
  Car,
  Trophy,
  GraduationCap,
  Terminal as TerminalIcon,
  Zap,
  Send,
  Wifi,
  Battery,
  Radio
} from 'lucide-react';

// --- Buildings Coordinates & Data ---
const initialBuildings = [
  { id: 'main', name: 'Main Block', icon: Building2, cx: 200, cy: 120, occupancy: 78, color: '#00E5FF', desc: 'Admin & Lecture Rooms' },
  { id: 'lab', name: 'Research Lab', icon: Cpu, cx: 380, cy: 220, occupancy: 45, color: '#7B61FF', desc: 'Robotics & AI Center' },
  { id: 'library', name: 'Central Library', icon: GraduationCap, cx: 520, cy: 130, occupancy: 87, color: '#F59E0B', desc: 'Study Spaces & Archives' },
  { id: 'sports', name: 'Sports Arena', icon: Trophy, cx: 120, cy: 240, occupancy: 34, color: '#10B981', desc: 'Indoor Athletic Center' },
  { id: 'parking', name: 'Smart Parking', icon: Car, cx: 480, cy: 280, occupancy: 56, color: '#FF00E5', desc: 'EV Chargers & Level 1-3' }
];

export default function BentoGrid() {
  // --- Glow Card mouse tracking handler ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  // --- Core Control states ---
  const [activeModules, setActiveModules] = useState({
    attendance: true,
    occupancy: true,
    security: true,
    predict: true
  });

  const [termLogs, setTermLogs] = useState<string[]>([
    `[18:25:00] [OK] Telemetry engine running`,
    `[18:25:12] [OK] Secure gateway handshake completed`,
    `[18:25:24] [INFO] Map telemetry sync established`
  ]);
  const terminalContainerRef = useRef<HTMLDivElement>(null);

  const appendTermLog = (status: 'OK' | 'WARN' | 'OFF' | 'INFO', message: string) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const logPrefix = `[${time}] [${status}]`;
    setTermLogs(prev => [...prev, `${logPrefix} ${message}`]);
  };

  // Auto-scroll logs terminal locally
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [termLogs]);

  // Toggle handlers
  const toggleModule = (key: keyof typeof activeModules, label: string) => {
    setActiveModules(prev => {
      const nextVal = !prev[key];
      const status = nextVal ? 'OK' : 'OFF';
      const msg = nextVal ? `${label} module online` : `${label} module deactivated`;
      appendTermLog(status, msg);
      return { ...prev, [key]: nextVal };
    });
  };

  // Terminal Auto-Update Pool
  useEffect(() => {
    const logPool = [
      { status: 'OK', msg: 'Heartbeat signal broadcasted to Main Block' },
      { status: 'OK', msg: 'Occupancy index updated: Research Lab - Stable' },
      { status: 'INFO', msg: 'Automated HVAC load model optimized: saved 4.2 kW/h' },
      { status: 'OK', msg: 'Biometric beacons verification handshake complete' },
      { status: 'WARN', msg: 'HVAC load near peak capacity in Sports Arena' },
      { status: 'OK', msg: 'Zero-trust node rotation scheduled' }
    ];

    const interval = setInterval(() => {
      if (activeModules.predict) {
        const randomEntry = logPool[Math.floor(Math.random() * logPool.length)];
        appendTermLog(randomEntry.status as any, randomEntry.msg);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [activeModules.predict]);

  // --- Map Building Click State ---
  const [selectedBuilding, setSelectedBuilding] = useState<typeof initialBuildings[0] | null>(null);

  const handleBuildingClick = (building: typeof initialBuildings[0]) => {
    const isSelected = selectedBuilding?.id === building.id;
    if (!isSelected) {
      setSelectedBuilding(building);
      appendTermLog('INFO', `Map Telemetry: Inspected ${building.name} (Occupancy: ${building.occupancy}%)`);
    } else {
      setSelectedBuilding(null);
    }
  };

  // --- Security Audit Log states ---
  const [secLogs, setSecLogs] = useState<Array<{ id: number; msg: string; status: 'PASS' | 'WARN' | 'DENY'; time: string }>>([
    { id: 1, msg: 'AES-256 handshake success: Core Node #12', status: 'PASS', time: '18:25:30' },
    { id: 2, msg: 'Zero-trust status: Checked 248 client sessions', status: 'PASS', time: '18:25:24' },
    { id: 3, msg: 'Intrusion Detection: Zero anomalies in node traffic', status: 'PASS', time: '18:25:10' },
    { id: 4, msg: 'Automated TLS Certificate rotation completed', status: 'PASS', time: '18:24:45' }
  ]);

  useEffect(() => {
    const secPool = [
      { msg: 'AES-256 handshake success: Library node #4', status: 'PASS' },
      { msg: 'Shield telemetry: DDoS filter active & stable', status: 'PASS' },
      { msg: 'Blocked unauthorized REST attempt on API/V2', status: 'DENY' },
      { msg: 'Blocked unauthorized SSH check from 192.168.1.104', status: 'DENY' },
      { msg: 'Security verification trigger: Node #09', status: 'WARN' },
      { msg: 'API gateway token rotation completed: proxy-node-8', status: 'PASS' }
    ];

    const interval = setInterval(() => {
      if (activeModules.security) {
        const rawLog = secPool[Math.floor(Math.random() * secPool.length)];
        const time = new Date().toLocaleTimeString('en-US', { hour12: false });
        const newEntry = {
          id: Date.now(),
          msg: rawLog.msg,
          status: rawLog.status as any,
          time
        };
        setSecLogs(prev => [newEntry, ...prev.slice(0, 11)]); // Max 12 entries
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [activeModules.security]);

  // --- Broadcast Console states ---
  const [broadcastTab, setBroadcastTab] = useState<'students' | 'faculty'>('students');

  const [studentAnnouncements, setStudentAnnouncements] = useState([
    { category: 'Placements', title: 'Nvidia interview slot confirmed.', desc: 'Check your calendar node for interview prep files.', time: '10m ago', level: 'info' },
    { category: 'Academics', title: 'Mid-term exams schedule published.', desc: 'Roster synced to student nodes.', time: '1h ago', level: 'warn' },
    { category: 'Events', title: 'Hackathon registrations open till Fri.', desc: 'Form team groups in Sandbox Panel.', time: '3h ago', level: 'info' },
    { category: 'Syllabus', title: 'Deep Learning CS-301 updates released.', desc: 'Class notes uploaded by Sarah Chen.', time: '5h ago', level: 'info' }
  ]);

  const [facultyAnnouncements] = useState([
    { category: 'Dean Memo', title: 'R&D Review Board Meeting today.', desc: '3:00 PM in Research Lab Conf Room A.', time: '5m ago', level: 'urgent' },
    { category: 'Grading', title: '14 NLP-302 papers pending evaluation.', desc: 'Due date: Friday 23:59.', time: '45m ago', level: 'warn' },
    { category: 'Resources', title: 'Lab A equipment maintenance update.', desc: 'Beacons sync will offline from 18:00.', time: '2h ago', level: 'info' },
    { category: 'Faculty HR', title: 'Annual medical wellness campaign scheduled.', desc: 'Registrations portal opens tomorrow.', time: '4h ago', level: 'info' }
  ]);

  // --- Mobile Preview Toggles & States ---
  const [mobileTab, setMobileTab] = useState<'student' | 'faculty'>('student');
  const [mobileCheckInState, setMobileCheckInState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [broadcastMessageInput, setBroadcastMessageInput] = useState('Syllabus documents due Friday.');
  const [activeAlertFlash, setActiveAlertFlash] = useState<string | null>(null);
  const [islandExpanded, setIslandExpanded] = useState(false);

  // Student Notification stack
  const [studentNotifications, setStudentNotifications] = useState([
    { id: 1, text: 'Placement: Nvidia slot verified.', category: 'Placement Node', color: '#00E5FF' },
    { id: 2, text: 'Academic: CS-301 Mock Roster Live.', category: 'Academics Node', color: '#7B61FF' },
    { id: 3, text: 'Announce: Hackathon opening.', category: 'Events Hub', color: '#FF00E5' }
  ]);

  // Simulate mobile biometric scan
  const triggerMobileCheckIn = () => {
    if (mobileCheckInState !== 'idle') return;
    setMobileCheckInState('scanning');
    appendTermLog('INFO', 'Mobile Node: Initiated geofenced check-in for student Alex Carter');

    setTimeout(() => {
      setMobileCheckInState('success');
      appendTermLog('OK', 'Mobile Node: Fingerprint check-in verification successful — Room 302');
    }, 1200);
  };

  // Reset check-in
  const resetMobileCheckIn = () => {
    setMobileCheckInState('idle');
  };

  // Broadcast Alert from mobile view
  const handleMobileBroadcast = () => {
    if (!broadcastMessageInput.trim()) return;

    // Flash alert banner
    setActiveAlertFlash(broadcastMessageInput);
    appendTermLog('OK', `Faculty Broadcast: Dr. Chen dispatched alert: "${broadcastMessageInput}"`);

    // Ingest into student alerts
    const newAlert = {
      category: 'Faculty Alert',
      title: broadcastMessageInput,
      desc: 'Dispatched live from Faculty Mobile Node.',
      time: 'Just now',
      level: 'urgent'
    };
    setStudentAnnouncements(prev => [newAlert, ...prev.slice(0, 3)]);
    
    // Ingest into student mobile notifications stack
    const newNotification = {
      id: Date.now(),
      text: `Alert: ${broadcastMessageInput}`,
      category: 'Faculty Broadcaster',
      color: '#FF00E5'
    };
    setStudentNotifications(prev => [newNotification, ...prev]);

    // Prepend to security console logs
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const newSecLog = {
      id: Date.now(),
      msg: `Broadcast payload check: "${broadcastMessageInput}" signed`,
      status: 'PASS' as any,
      time
    };
    setSecLogs(prev => [newSecLog, ...prev.slice(0, 11)]);

    // Clear alert banner after 2.5 seconds
    setTimeout(() => {
      setActiveAlertFlash(null);
    }, 2500);
  };

  const removeStudentNotification = (id: number) => {
    setStudentNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Face ID scan simulation in Dynamic Island
  const handleIslandClick = () => {
    setIslandExpanded(true);
    setTimeout(() => {
      setIslandExpanded(false);
    }, 2200);
  };

  return (
    <section id="ecosystem" className="relative py-28 overflow-hidden bg-neutral-50 dark:bg-dark-900 transition-colors duration-300 rounded-[2rem] md:rounded-[3rem] border border-black/5 dark:border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">
      {/* Background drifting mesh gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 dark:bg-primary/5 blur-[150px] mesh-drift" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 dark:bg-secondary/5 blur-[150px] mesh-drift" />
      </div>

      {/* SVG grid overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-100">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="bento-grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" className="stroke-slate-400/25 dark:stroke-white/[0.06]" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#bento-grid-bg)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 select-none">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-black/10 dark:border-white/5 mb-4"
          >
            <Radio className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">Unified Telemetry Control</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight"
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
            className="text-sm sm:text-base text-slate-500 dark:text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Monitor real-time operations, configure zero-trust network modules, inspect live locations, and query the predictive AI brain.
          </motion.p>
        </div>

        {/* Freely positioned card layout */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 auto-rows-max items-start">

          {/* ==================== ROW 1 ==================== */}

          {/* 1. CONTROL PANEL (col-span-12 lg:col-span-4) */}
          <div
            onMouseMove={handleMouseMove}
            className="col-span-12 lg:col-span-4 glow-card-interactive rounded-[1.9rem] bg-white/20 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-8 flex flex-col justify-between backdrop-blur-md min-h-[420px] shadow-[0_20px_55px_rgba(15,23,42,0.12)] select-none lg:translate-y-3"
          >
            <div className="relative z-10 flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <Cpu className="w-4 h-4 text-[#7B61FF]" />
                  Control Panel
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-gray-400">Toggle live telemetry nodes</p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-black text-[#7B61FF] font-mono">
                  {Object.values(activeModules).filter(Boolean).length} / 4
                </span>
                <span className="text-[8px] text-gray-500 block uppercase font-bold">ONLINE</span>
              </div>
            </div>

            {/* Toggle Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4 mb-5">
              {[
                { id: 'attendance', label: 'Attendance', color: '#00E5FF' },
                { id: 'occupancy', label: 'Occupancy', color: '#7B61FF' },
                { id: 'security', label: 'Security', color: '#10B981' },
                { id: 'predict', label: 'AI Predict', color: '#FF00E5' }
              ].map((mod) => {
                const active = activeModules[mod.id as keyof typeof activeModules];
                return (
                  <button
                    key={mod.id}
                    onClick={() => toggleModule(mod.id as keyof typeof activeModules, mod.label)}
                    className={`flex flex-col justify-between p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-neutral-900/90 dark:bg-black/40 text-white border-white/10 shadow-md'
                        : 'bg-white/40 dark:bg-white/[0.01] border-black/5 dark:border-white/5 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: active ? mod.color : '#4b5563' }}
                      />
                      <div className={`w-5 h-3 rounded-full p-0.5 transition-colors ${active ? 'bg-[#7B61FF]' : 'bg-slate-300 dark:bg-slate-800'}`}>
                        <div className={`w-2 h-2 rounded-full bg-white transition-transform ${active ? 'translate-x-2' : 'translate-x-0'}`} />
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-tight">{mod.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Live Terminal Console */}
            <div className="relative z-10 flex-grow bg-slate-950/90 dark:bg-black/60 border border-black/10 dark:border-white/5 rounded-xl p-3.5 flex flex-col justify-between overflow-hidden h-[150px]">
              <div className="flex items-center gap-1.5 text-[8px] text-[#00E5FF] font-mono border-b border-white/5 pb-1.5 shrink-0">
                <TerminalIcon className="w-3.5 h-3.5" />
                <span>TERMINAL_OUTPUT_ENGINE // LIVE LOGS</span>
              </div>
              <div ref={terminalContainerRef} className="flex-grow overflow-y-auto font-mono text-[9px] leading-tight space-y-1.5 mt-2 scrollbar-none">
                {termLogs.map((log, idx) => {
                  let colorClass = 'text-gray-400';
                  if (log.includes('[OK]')) colorClass = 'text-[#10B981]';
                  if (log.includes('[WARN]')) colorClass = 'text-[#F59E0B]';
                  if (log.includes('[OFF]')) colorClass = 'text-[#EF4444]';
                  if (log.includes('[INFO]')) colorClass = 'text-[#00E5FF]';
                  return (
                    <div key={idx} className={colorClass}>
                      {log}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 2. CAMPUS MAP (col-span-12 lg:col-span-8) */}
          <div
            onMouseMove={handleMouseMove}
            className="col-span-12 lg:col-span-8 glow-card-interactive rounded-[1.9rem] bg-white/20 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-8 flex flex-col justify-between backdrop-blur-md min-h-[420px] shadow-[0_20px_55px_rgba(15,23,42,0.12)] lg:-translate-y-2"
          >
            <div className="relative z-10 flex items-center justify-between mb-4 select-none">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <MapPin className="w-4 h-4 text-[#00E5FF]" />
                  Campus Telemetry Map
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-gray-400">Click buildings to expand real-time occupancy status</p>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] text-[9px] font-mono font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                MAP TELEMETRY ACTIVE
              </div>
            </div>

            {/* Dark SVG Blueprint Area */}
            <div className="relative z-10 flex-grow rounded-2xl bg-neutral-950 border border-white/5 relative overflow-hidden flex items-center justify-center min-h-[220px]">
              {/* grid overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                <defs>
                  <pattern id="map-blueprint-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-blueprint-grid)" />
              </svg>

              {/* Dashed Connection Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 120 240 L 200 120 L 520 130 L 480 280 L 380 220 L 120 240" fill="none" stroke="#fff" strokeWidth="0.75" strokeDasharray="4 4" className="opacity-25" />
              </svg>

              {/* Building Node Points */}
              {initialBuildings.map((b) => {
                const active = selectedBuilding?.id === b.id;
                return (
                  <div
                    key={b.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                    style={{ left: `${(b.cx / 700) * 100}%`, top: `${(b.cy / 360) * 100}%` }}
                    onClick={() => handleBuildingClick(b)}
                  >
                    <div className="relative">
                      {/* Circle */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center border text-white transition-all duration-300 relative z-10"
                        style={{
                          borderColor: b.color + '40',
                          background: active ? b.color + '25' : 'rgba(10,10,10,0.85)',
                          boxShadow: active ? `0 0 20px ${b.color}` : 'none'
                        }}
                      >
                        <b.icon className="w-4.5 h-4.5" style={{ color: b.color }} />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Tooltip detail card */}
              <AnimatePresence>
                {selectedBuilding && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute bottom-4 left-4 right-4 bg-slate-950/95 backdrop-blur-md p-4 rounded-xl border border-white/10 z-30 flex justify-between items-center text-left"
                  >
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: selectedBuilding.color }}>
                        {selectedBuilding.name}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5 leading-snug">{selectedBuilding.desc}</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-[9px] text-gray-500 uppercase tracking-widest font-semibold">Occupants Load</div>
                        {activeModules.occupancy ? (
                          <div className="text-base text-white font-mono font-black mt-0.5">{selectedBuilding.occupancy}%</div>
                        ) : (
                          <div className="text-xs text-red-400 font-mono font-bold mt-1 uppercase">[Telemetry Muted]</div>
                        )}
                      </div>
                      {activeModules.occupancy && (
                        <div className="w-14 h-1 bg-white/10 rounded-full overflow-hidden shrink-0">
                          <div className="h-full" style={{ width: `${selectedBuilding.occupancy}%`, backgroundColor: selectedBuilding.color }} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 dark:text-gray-400 select-none">
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-[#00E5FF]" /> 5 Active Zones Map Nodes</span>
              <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5 text-[#10B981]" /> 12,847 Total Users Verified</span>
            </div>
          </div>

          {/* ==================== ROW 2 ==================== */}

          {/* 3. SECURITY MONITOR (col-span-12 md:col-span-6 lg:col-span-5) */}
          <div
            onMouseMove={handleMouseMove}
            className="col-span-12 md:col-span-6 lg:col-span-5 glow-card-interactive rounded-[1.9rem] bg-white/20 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-7 flex flex-col justify-between backdrop-blur-md min-h-[720px] shadow-[0_20px_55px_rgba(15,23,42,0.12)] select-none lg:translate-y-3"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                    <Shield className="w-4 h-4 text-[#10B981]" />
                    Security Monitor
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-gray-400">Zero-trust network audit streams</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-semibold border ${
                  activeModules.security
                    ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20'
                    : 'bg-red-500/10 text-red-500 border-red-500/20'
                }`}>
                  {activeModules.security ? 'SECURE' : 'OFFLINE'}
                </div>
              </div>

              {/* List Console */}
              <div className="flex-grow font-mono text-[10px] space-y-2.5 overflow-y-auto scrollbar-none pr-1 mt-2">
                {activeModules.security ? (
                  <AnimatePresence initial={false}>
                    {secLogs.map((log) => {
                      let badgeBg = 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30';
                      if (log.status === 'WARN') badgeBg = 'bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/30';
                      if (log.status === 'DENY') badgeBg = 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30';

                      return (
                        <motion.div
                          key={log.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-neutral-900/10 dark:bg-white/[0.01] border border-black/[0.03] dark:border-white/[0.02]"
                        >
                          <span className="text-gray-500 shrink-0 font-medium">{log.time}</span>
                          <span className={`px-1.5 py-0.2 text-[8px] font-bold rounded-lg border uppercase shrink-0 ${badgeBg}`}>
                            {log.status}
                          </span>
                          <span className="text-slate-700 dark:text-gray-300 truncate flex-grow leading-tight">{log.msg}</span>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-2 text-slate-500">
                    <Shield className="w-10 h-10 text-red-500/40" />
                    <div className="text-sm font-bold text-red-400">Zero-Trust Shield Deactivated</div>
                    <p className="text-[10px] max-w-[240px] leading-relaxed">Turn on Security module in the Control Panel to restore audit logs.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 4. BROADCAST CONSOLE (col-span-12 md:col-span-6 lg:col-span-4) */}
          <div
            onMouseMove={handleMouseMove}
            className="col-span-12 md:col-span-6 lg:col-span-4 glow-card-interactive rounded-[1.9rem] bg-white/20 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-7 flex flex-col justify-between backdrop-blur-md min-h-[720px] shadow-[0_20px_55px_rgba(15,23,42,0.12)] select-none lg:-translate-y-2"
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                      <Bell className="w-4 h-4 text-[#FF00E5]" />
                      Broadcast Console
                    </h3>
                    <p className="text-[10px] text-slate-500 dark:text-gray-400">Live announcements feeds</p>
                  </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex border-b border-black/5 dark:border-white/5">
                  <button
                    onClick={() => setBroadcastTab('students')}
                    className={`flex-1 pb-2 text-[11px] font-bold uppercase transition-all tracking-wider cursor-pointer ${
                      broadcastTab === 'students'
                        ? 'border-b-2 border-[#7B61FF] text-slate-900 dark:text-white'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-gray-300'
                    }`}
                  >
                    Students
                  </button>
                  <button
                    onClick={() => setBroadcastTab('faculty')}
                    className={`flex-1 pb-2 text-[11px] font-bold uppercase transition-all tracking-wider cursor-pointer ${
                      broadcastTab === 'faculty'
                        ? 'border-b-2 border-[#7B61FF] text-slate-900 dark:text-white'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-gray-300'
                  }`}
                  >
                    Faculty
                  </button>
                </div>
              </div>

              {/* Announcement Rows */}
              <div className="flex-grow my-4 space-y-3.5 overflow-y-auto scrollbar-none pr-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={broadcastTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-3"
                  >
                    {(broadcastTab === 'students' ? studentAnnouncements : facultyAnnouncements).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-neutral-900/10 dark:bg-white/[0.01] border-l-[3px] border-[#7B61FF] rounded-r-xl border border-black/[0.03] dark:border-white/[0.02] space-y-0.5 text-left"
                      >
                        <div className="flex items-center justify-between text-[8px] font-mono uppercase">
                          <span className="text-gray-500 font-bold">{item.category}</span>
                          <span className="text-gray-500">{item.time}</span>
                        </div>
                        <div className="text-[10px] font-extrabold text-slate-800 dark:text-white leading-tight">{item.title}</div>
                        <div className="text-[9.5px] text-slate-500 dark:text-gray-400 leading-snug">{item.desc}</div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 5. MOBILE VIEW PREVIEW (col-span-12 lg:col-span-3) */}
          <div
            onMouseMove={handleMouseMove}
            className="col-span-12 md:col-span-12 lg:col-span-3 glow-card-interactive rounded-[1.9rem] bg-white/20 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 p-7 flex flex-col justify-between backdrop-blur-md min-h-[720px] shadow-[0_20px_55px_rgba(15,23,42,0.12)] items-center lg:translate-y-2"
          >
            <div className="relative z-10 w-full text-left mb-3 select-none flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-1.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                  <Zap className="w-4 h-4 text-[#FF00E5]" />
                  Mobile Client
                </h3>
                <p className="text-[10px] text-slate-500 dark:text-gray-400 font-medium">Apple 17 Pro Max Simulator</p>
              </div>
            </div>

            {/* Apple 17 Pro Max Hardware Mockup Frame (270px x 550px, 19.5:9 display size) */}
            <div className="relative flex-grow flex items-center justify-center w-full">
              <div className="relative">
                {/* Left Side Buttons (Action & Vol Keys) */}
                <div className="absolute left-[-2px] top-[80px] w-[2px] h-5 bg-neutral-600 dark:bg-neutral-800 rounded-l z-0" />
                <div className="absolute left-[-2px] top-[115px] w-[2px] h-8 bg-neutral-600 dark:bg-neutral-800 rounded-l z-0" />
                <div className="absolute left-[-2px] top-[155px] w-[2px] h-8 bg-neutral-600 dark:bg-neutral-800 rounded-l z-0" />

                {/* Right Side Buttons (Power key) */}
                <div className="absolute right-[-2px] top-[110px] w-[2px] h-12 bg-neutral-600 dark:bg-neutral-800 rounded-r z-0" />

                {/* iPhone 17 Pro Max Screen */}
                <div className="relative z-10 w-[265px] h-[545px] rounded-[48px] border-[7px] border-neutral-900 bg-neutral-950 p-3 shadow-2xl flex flex-col justify-between overflow-hidden ring-1 ring-white/10">
                  
                  {/* Dynamic Island - rumored smaller interactive pill for iPhone 17 */}
                  <motion.div
                    onClick={handleIslandClick}
                    animate={{
                      width: islandExpanded ? 220 : 80,
                      height: islandExpanded ? 38 : 20,
                      borderRadius: islandExpanded ? 20 : 9999
                    }}
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                    className="absolute top-[8px] left-1/2 -translate-x-1/2 bg-black z-40 flex items-center justify-center border border-white/15 shadow-inner cursor-pointer select-none"
                  >
                    {islandExpanded ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[9px] font-bold text-white flex items-center gap-1.5 font-mono px-3 leading-none w-full justify-between"
                      >
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3 text-[#10B981] shrink-0" />
                          <span>Node: Face ID Secure</span>
                        </span>
                        <span className="text-[#10B981] shrink-0">✓ VERIFIED</span>
                      </motion.div>
                    ) : (
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 absolute right-2.5" />
                    )}
                  </motion.div>

                  {/* Status Bar */}
                  <div className="relative z-20 flex items-center justify-between text-[8px] text-gray-500 font-mono font-bold pt-1 px-2.5 bg-transparent select-none shrink-0">
                    <span>09:41</span>
                    <div className="flex items-center gap-1.5">
                      <span>5G</span>
                      <Wifi className="w-2.5 h-2.5 text-gray-500" />
                      <div className="flex items-center gap-0.5">
                        <span className="text-[7px]">98%</span>
                        <Battery className="w-3 h-3 text-gray-500" />
                      </div>
                    </div>
                  </div>

                  {/* Alert Flash Banner overlay */}
                  <AnimatePresence>
                    {activeAlertFlash && (
                      <motion.div
                        initial={{ y: -70, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -70, opacity: 0 }}
                        className="absolute top-[38px] left-2.5 right-2.5 bg-gradient-to-r from-[#FF00E5]/90 to-[#7B61FF]/90 backdrop-blur-md p-2.5 rounded-xl text-white text-[9.5px] leading-snug font-bold z-30 border border-white/10 shadow-lg text-left"
                      >
                        <div className="text-[7.5px] text-white/70 font-mono uppercase tracking-wider font-bold">Urgently Broadcasted</div>
                        <div className="mt-0.5">{activeAlertFlash}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Header Navigator inside phone */}
                  <div className="flex bg-slate-900/60 rounded-lg p-0.5 border border-white/5 mt-3.5 shrink-0 select-none">
                    <button
                      onClick={() => setMobileTab('student')}
                      className={`flex-1 text-[8.5px] font-bold py-1 rounded transition-colors cursor-pointer ${
                        mobileTab === 'student'
                          ? 'bg-neutral-800 text-[#00E5FF]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Student View
                    </button>
                    <button
                      onClick={() => setMobileTab('faculty')}
                      className={`flex-1 text-[8.5px] font-bold py-1 rounded transition-colors cursor-pointer ${
                        mobileTab === 'faculty'
                          ? 'bg-neutral-800 text-[#FF00E5]'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Faculty View
                    </button>
                  </div>

                  {/* Scrollable phone content area */}
                  <div className="flex-grow overflow-y-auto mt-3 pr-0.5 scrollbar-none flex flex-col justify-start text-left select-text">
                    {mobileTab === 'student' ? (
                      /* --- STUDENT DETAILED VIEW --- */
                      <div className="space-y-3.5 flex flex-col flex-grow">
                        {/* User profile row */}
                        <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/40 border border-white/5 shrink-0">
                          <div className="w-8 h-8 rounded-full bg-[#00E5FF]/20 flex items-center justify-center text-xs font-bold border border-[#00E5FF]/30 select-none">
                            AC
                          </div>
                          <div className="leading-tight">
                            <div className="text-[10.5px] font-extrabold text-white leading-none">Alex Carter</div>
                            <div className="text-[8px] text-gray-500 font-mono mt-0.5">Roll: CS-204 (CS Dept)</div>
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-2 text-center shrink-0">
                          <div className="bg-slate-900/30 border border-white/5 rounded-xl p-1.5">
                            <div className="text-[7px] text-gray-500 uppercase tracking-widest font-semibold">Grades</div>
                            <div className="text-[13px] font-black text-white font-mono mt-0.5">9.2 CGPA</div>
                          </div>
                          <div className="bg-slate-900/30 border border-white/5 rounded-xl p-1.5">
                            <div className="text-[7px] text-gray-500 uppercase tracking-widest font-semibold">Attd Rate</div>
                            <div className="text-[13px] font-black text-white font-mono mt-0.5">94%</div>
                          </div>
                        </div>

                        {/* Check-In Action Button */}
                        <div className="bg-slate-900/40 border border-white/5 rounded-xl p-2.5 flex flex-col gap-1.5 shrink-0">
                          {mobileCheckInState === 'idle' && (
                            <button
                              onClick={triggerMobileCheckIn}
                              className="w-full py-2.5 bg-[#00E5FF] hover:bg-[#00cce3] text-black rounded-xl text-[9px] font-extrabold tracking-wider transition-colors cursor-pointer text-center leading-none"
                            >
                              📍 Geofence Check-In
                            </button>
                          )}
                          {mobileCheckInState === 'scanning' && (
                            <div className="w-full py-2.5 bg-slate-800 text-yellow-400 rounded-lg text-[8.5px] font-bold font-mono text-center flex items-center justify-center gap-1.5 leading-none select-none">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                              SYNCING BEACONS...
                            </div>
                          )}
                          {mobileCheckInState === 'success' && (
                            <div className="flex flex-col gap-1.5">
                              <div className="w-full py-2 bg-[#10B981]/25 border border-[#10B981]/40 text-[#10B981] rounded-lg text-[8.5px] font-black font-mono text-center leading-none select-none">
                                ✓ ATTENDANCE SYNCED
                              </div>
                              <button
                                onClick={resetMobileCheckIn}
                                className="text-[7.5px] text-gray-500 hover:text-white underline text-center"
                              >
                                Reset scan simulation
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Student Notifications stack list */}
                        <div className="space-y-1.5 flex-grow">
                          <div className="text-[7px] text-gray-500 font-bold uppercase tracking-widest select-none">Notifications ({studentNotifications.length})</div>
                          <div className="space-y-1.5">
                            <AnimatePresence initial={false}>
                              {studentNotifications.map((note) => (
                                <motion.div
                                  key={note.id}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: 10 }}
                                  className="p-2 rounded-xl bg-slate-900 border border-white/5 text-left flex justify-between items-start gap-1"
                                  style={{ borderLeft: `2.5px solid ${note.color}` }}
                                >
                                  <div className="leading-tight">
                                    <span className="text-[6.5px] text-gray-500 font-bold uppercase block tracking-wider">
                                      {note.category}
                                    </span>
                                    <span className="text-[8.5px] text-white font-medium block mt-0.5">
                                      {note.text}
                                    </span>
                                  </div>
                                  <button
                                    onClick={() => removeStudentNotification(note.id)}
                                    className="text-[8px] text-gray-600 hover:text-white leading-none font-bold cursor-pointer shrink-0"
                                  >
                                    ×
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* --- FACULTY DETAILED VIEW --- */
                  <div className="space-y-3.5 flex flex-col flex-grow">
                    {/* User profile row */}
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/40 border border-white/5 shrink-0">
                      <div className="w-8 h-8 rounded-full bg-[#FF00E5]/20 flex items-center justify-center text-xs font-bold border border-[#FF00E5]/30 select-none">
                        SC
                      </div>
                      <div className="leading-tight">
                        <div className="text-[10.5px] font-extrabold text-white leading-none">Dr. Sarah Chen</div>
                        <div className="text-[8px] text-gray-500 font-mono mt-0.5">R&D Chair (AI Dept)</div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2 text-center shrink-0">
                      <div className="bg-slate-900/30 border border-white/5 rounded-xl p-1.5">
                        <div className="text-[7px] text-gray-500 uppercase tracking-widest font-semibold">Active Grants</div>
                        <div className="text-[12px] font-black text-white font-mono mt-0.5">$120,000</div>
                      </div>
                      <div className="bg-slate-900/30 border border-white/5 rounded-xl p-1.5">
                        <div className="text-[7px] text-gray-500 uppercase tracking-widest font-semibold">Papers Pending</div>
                        <div className="text-[12px] font-black text-[#FF00E5] font-mono mt-0.5">14 Evaluation</div>
                      </div>
                    </div>

                    {/* Broadcast Input Creator */}
                    <div className="bg-slate-900/40 border border-white/5 rounded-xl p-2.5 flex flex-col gap-2 flex-grow justify-between">
                      <div className="space-y-2">
                        <div className="text-[7.5px] text-gray-400 font-bold uppercase tracking-wider select-none">Live Department Broadcast</div>
                        
                        <div className="space-y-1">
                          <textarea
                            rows={3}
                            value={broadcastMessageInput}
                            onChange={(e) => setBroadcastMessageInput(e.target.value)}
                            placeholder="Type memo content..."
                            className="w-full bg-[#000]/30 border border-white/10 rounded-lg p-2 font-mono text-[9px] text-white focus:outline-none focus:border-[#FF00E5] resize-none"
                          />
                        </div>

                        {/* Quick preset chips */}
                        <div className="flex flex-wrap gap-1 select-none">
                          {[
                            'R&D Meeting at 3pm.',
                            'Syllabus revisions due.',
                            'HVAC energy save active.'
                          ].map((preset) => (
                            <button
                              key={preset}
                              onClick={() => setBroadcastMessageInput(preset)}
                              className="text-[7px] bg-slate-900 hover:bg-slate-800 border border-white/5 text-gray-400 hover:text-white px-1.5 py-0.5 rounded-lg cursor-pointer transition-colors"
                            >
                              {preset.length > 15 ? preset.slice(0, 15) + '...' : preset}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={handleMobileBroadcast}
                        className="w-full py-2 bg-[#FF00E5] hover:bg-[#d600be] text-white rounded-xl text-[9px] font-extrabold tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Send className="w-2.5 h-2.5 fill-white" />
                        Send Broadcast
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Swipe Indicator */}
              <div className="w-14 h-0.5 bg-white/20 rounded-full self-center shrink-0 mb-0.5 select-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </section>
);
}
