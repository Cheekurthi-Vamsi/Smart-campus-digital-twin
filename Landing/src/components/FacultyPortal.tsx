import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import {
  Users,
  MapPin,
  Calendar,
  BarChart3,
  ChevronRight,
  GraduationCap,
  CheckCircle2,
  LogOut,
  Bell,
  Sparkles,
  Plus,
} from 'lucide-react';


const batches = ['2023', '2024', '2025', '2026'];

const students = [
  { id: 1, name: 'Sarah Chen', avatar: 'SC', batch: '2025', location: 'Library', status: 'active', attendance: 96 },
  { id: 2, name: 'Alex Rivera', avatar: 'AR', batch: '2024', location: 'Lab B', status: 'active', attendance: 92 },
  { id: 3, name: 'Jordan Kim', avatar: 'JK', batch: '2025', location: 'Hostel A', status: 'inactive', attendance: 89 },
  { id: 4, name: 'Taylor Smith', avatar: 'TS', batch: '2026', location: 'Main Building', status: 'active', attendance: 95 },
  { id: 5, name: 'Morgan Lee', avatar: 'ML', batch: '2023', location: 'Sports Complex', status: 'active', attendance: 88 },
];

function StudentCard({ student }: { student: typeof students[0] }) {
  const cardVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{
        x: 4,
        scale: 1.01,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
      }}
      className="glass-card rounded-lg p-3 flex items-center gap-3 group cursor-pointer transition-all"
    >
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold">
        {student.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white text-sm truncate">{student.name}</div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <MapPin className="w-3 h-3" />
          <span>{student.location}</span>
        </div>
      </div>
      <div className="text-right">
        <div className={`w-2 h-2 rounded-full ${student.status === 'active' ? 'bg-green-400' : 'bg-gray-400'}`} />
        <div className="text-xs text-gray-400 mt-1">{student.attendance}%</div>
      </div>
      <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-primary transition-colors" />
    </motion.div>
  );
}

export function FacultyDashboard({
  user,
  onLogout,
  isFullPage = false,
}: {
  user?: { name: string; email: string; department?: string };
  onLogout?: () => void;
  isFullPage?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);
  const [currentStudents] = useState(students);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [announcementText, setAnnouncementText] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const profName = user?.name || 'Dr. Sarah Smith';
  const profEmail = user?.email || 'professor@campustwin.edu';
  const profDept = user?.department || 'Computer Science';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleStudentTrack = (studentName: string, location: string) => {
    showToast(`Live Telemetry: Tracking ${studentName} inside ${location}`);
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;

    setIsPosting(true);
    setTimeout(() => {
      showToast('Announcement broadcasted to all students!');
      setAnnouncementText('');
      setIsPosting(false);
    }, 800);
  };

  const filteredStudents = currentStudents.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch ? student.batch === selectedBatch : true;
    return matchesSearch && matchesBatch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: isFullPage ? 20 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`relative rounded-2xl overflow-hidden glass-card border border-white/10 ${
        isFullPage ? 'max-w-5xl w-full mx-auto my-8 shadow-2xl' : ''
      }`}
    >
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 12, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className="absolute top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 text-white rounded-full text-xs font-semibold border border-secondary/30 shadow-lg flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terminal Title Bar */}
      <div className="h-10 bg-gradient-to-r from-dark-700 to-dark-800 border-b border-white/5 flex items-center px-4 justify-between">
        <div className="flex items-center gap-2">
          {['red', 'yellow', 'green'].map((color) => (
            <div key={color} className={`w-3 h-3 rounded-full bg-${color}-500/60`} />
          ))}
          <span className="ml-2 text-xs text-gray-500 font-mono">faculty_control_hub.sh</span>
        </div>
        {onLogout && (
          <button
            onClick={onLogout}
            className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-white/5"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        )}
      </div>

      <div className="p-6 space-y-5">
        {/* Profile Card Header */}
        {isFullPage && (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-white/5">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent p-0.5 flex-shrink-0 shadow-lg">
              <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center text-xl font-bold text-white font-mono">
                {profName.split(' ').filter(n => !n.includes('.')).map(n => n[0]).join('').toUpperCase() || 'FC'}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2.5">
                <h3 className="text-white font-bold text-xl">{profName}</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold border border-secondary/20 uppercase tracking-wider">
                  Faculty
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{profEmail} • Department of {profDept}</p>
            </div>
          </div>
        )}

        {/* Controls: Search and Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="w-full sm:flex-1 relative">
            <input
              type="text"
              placeholder="Search students or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setSelectedBatch(null)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                selectedBatch === null
                  ? 'bg-secondary/10 border-secondary/30 text-secondary'
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All Batches
            </button>
            {batches.map((batch) => (
              <button
                key={batch}
                onClick={() => setSelectedBatch(batch)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  selectedBatch === batch
                    ? 'bg-secondary/10 border-secondary/30 text-secondary'
                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                Batch {batch}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid: Student Tracking & Broadcast */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Left Column (2-span): Student Tracking List */}
          <div className="lg:col-span-2 rounded-xl glass p-4 space-y-4 border border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-white">Live Student Telemetry</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
                Active Tracker
              </div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    onClick={() => handleStudentTrack(student.name, student.location)}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-sm font-bold text-white">
                      {student.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{student.name}</div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <MapPin className="w-3 h-3 text-secondary" />
                        <span>{student.location}</span>
                        <span>•</span>
                        <span>Batch {student.batch}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`w-2 h-2 rounded-full ml-auto ${student.status === 'active' ? 'bg-green-400 shadow-[0_0_6px_rgba(74,222,128,0.5)]' : 'bg-gray-500'}`} />
                      <div className="text-xs text-gray-400 mt-1 font-mono">{student.attendance}% Att.</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-secondary group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No students found matching filters.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Broadcast Notice & Live Mini Map */}
          <div className="space-y-4">
            {/* Create Announcement */}
            <div className="rounded-xl glass p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-semibold text-white">Broadcast Announcement</span>
              </div>
              <form onSubmit={handlePostAnnouncement} className="space-y-3">
                <textarea
                  required
                  placeholder="Type updates or alert notifications here..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full p-3 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all resize-none h-20"
                />
                <button
                  type="submit"
                  disabled={isPosting}
                  className="w-full py-2 bg-gradient-to-r from-secondary to-accent hover:shadow-secondary/15 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  {isPosting ? 'Broadcasting...' : 'Broadcast Announcement'}
                </button>
              </form>
            </div>

            {/* Live Campus Map Telemetry */}
            <div className="rounded-xl glass p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-accent-cyan" />
                <span className="text-sm font-semibold text-white">Campus Twin Map</span>
              </div>
              <div className="aspect-video rounded-xl bg-dark-700 relative overflow-hidden border border-white/5">
                {/* Simulated dots */}
                <div className="absolute inset-0 opacity-40 bg-noise pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-ping" />
                <div className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
                <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: '0.8s' }} />
                <span className="absolute bottom-2 left-2 text-[9px] font-mono text-gray-500">Live coordinates active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Trend & Analytics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl glass p-4 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-white">Weekly Attendance Trends</span>
              </div>
            </div>
            <div className="space-y-2">
              {[
                { day: 'Mon', percent: 92 },
                { day: 'Tue', percent: 88 },
                { day: 'Wed', percent: 94 },
                { day: 'Thu', percent: 90 },
                { day: 'Fri', percent: 85 },
              ].map((day) => (
                <div key={day.day} className="flex items-center gap-2">
                  <span className="w-8 text-xs text-gray-500 font-mono">{day.day}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-secondary to-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${day.percent}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <span className="w-8 text-xs text-gray-400 font-mono text-right">{day.percent}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl glass p-4 border border-white/5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">Academic Performance Overview</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-white">847</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-0.5">Students</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-green-400">91.4%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-0.5">Avg Att.</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                <div className="text-xl font-bold text-primary">82.3%</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-0.5">Pass Rate</div>
              </div>
            </div>
            <div className="text-xs text-gray-500 font-mono mt-3 leading-relaxed">
              All stats recalculate dynamically based on active batch schedules. Last sync: 30s ago.
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function DashboardPreview() {
  return <FacultyDashboard isFullPage={false} />;
}

export default function FacultyPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <>
      <section id="faculty" className="relative py-32 overflow-hidden bg-dark-900 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">

        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6" ref={containerRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left side: Header, text, checkmarks */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-300">Faculty Workspace</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-6">
                  <span
                    className="text-white italic font-light block"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
                  >
                    Complete
                  </span>
                  <span
                    className="text-white font-extrabold block mt-1"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Faculty <span className="gradient-text">Control</span>
                  </span>
                </h2>

                <p className="text-xl text-gray-400 mb-8">
                  Manage students, track attendance, analyze performance, and access powerful analytics—all from one unified dashboard.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: CheckCircle2, text: 'Real-time student location tracking' },
                    { icon: CheckCircle2, text: 'Batch-wise student management' },
                    { icon: CheckCircle2, text: 'Attendance approval workflow' },
                    { icon: CheckCircle2, text: 'Performance analytics and reports' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <item.icon className="w-5 h-5 text-primary" />
                      <span className="text-gray-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right side: Active student list */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Users className="w-4 h-4" />
                  <span>Active Students (Live Telemetry)</span>
                </div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.08,
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-2"
                >
                  {students.map((student) => (
                    <StudentCard key={student.id} student={student} />
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Container Scroll Section for Faculty Dashboard Mockup */}
      <section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-[100px]" />
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
                    Faculty Workspace
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Unified Controls
                  </span>
                </h2>
              </>
            }
          >
            <DashboardPreview />
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}
