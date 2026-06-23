import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import {
  Users,
  MapPin,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  ChevronRight,
  GraduationCap,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';


const batches = ['2023', '2024', '2025', '2026'];

const students = [
  { id: 1, name: 'Sarah Chen', avatar: 'SC', batch: '2025', location: 'Library', status: 'active', attendance: 96 },
  { id: 2, name: 'Alex Rivera', avatar: 'AR', batch: '2024', location: 'Lab B', status: 'active', attendance: 92 },
  { id: 3, name: 'Jordan Kim', avatar: 'JK', batch: '2025', location: 'Hostel A', status: 'inactive', attendance: 89 },
  { id: 4, name: 'Taylor Smith', avatar: 'TS', batch: '2026', location: 'Main Building', status: 'active', attendance: 95 },
  { id: 5, name: 'Morgan Lee', avatar: 'ML', batch: '2023', location: 'Sports Complex', status: 'active', attendance: 88 },
];

function MiniChart() {
  const bars = [40, 70, 50, 85, 60, 90, 75, 80, 55, 95, 65, 88];

  return (
    <div className="flex items-end gap-1 h-16">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-3 bg-gradient-to-t from-primary to-secondary rounded-sm"
          initial={{ height: 0 }}
          whileInView={{ height: `${height}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.05 }}
        />
      ))}
    </div>
  );
}

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

function DashboardPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative rounded-2xl overflow-hidden glass-card border border-white/10"
    >
      <div className="h-8 bg-gradient-to-r from-dark-700 to-dark-800 border-b border-white/5 flex items-center px-4 gap-2">
        {['red', 'yellow', 'green'].map((color) => (
          <div key={color} className={`w-3 h-3 rounded-full bg-${color}-500/60`} />
        ))}
        <span className="ml-4 text-xs text-gray-500">Faculty Portal Dashboard</span>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search students, courses..."
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary/50"
            />
          </div>
          <div className="flex gap-1">
            {['overview', 'reports'].map((tab) => (
              <button
                key={tab}
                className="px-3 py-2 rounded-lg text-xs font-medium transition-all text-gray-400 hover:bg-white/5"
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 rounded-xl glass p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">Student Activity</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Live
              </div>
            </div>
            <MiniChart />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-lg font-bold text-white">847</div>
                <div className="text-xs text-gray-400">Active Now</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-lg font-bold text-green-400">94%</div>
                <div className="text-xs text-gray-400">Attendance</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-white/5">
                <div className="text-lg font-bold text-primary">+12%</div>
                <div className="text-xs text-gray-400">Engagement</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-xl glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-white">Batches</span>
              </div>
              <div className="space-y-2">
                {batches.map((batch, i) => (
                  <div
                    key={batch}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="text-sm text-gray-300">Batch {batch}</span>
                    <span className="text-xs text-gray-500">
                      {[120, 150, 180, 200][i]} students
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl glass p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-accent-cyan" />
                <span className="text-sm font-medium text-white">Live Tracking</span>
              </div>
              <div className="aspect-square rounded-lg bg-dark-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-ping" />
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-secondary animate-ping" style={{ animationDelay: '0.5s' }} />
                  <div className="absolute top-3/4 left-3/4 w-2 h-2 rounded-full bg-accent-cyan animate-ping" style={{ animationDelay: '1s' }} />
                </div>
                <div className="absolute bottom-2 right-2 text-xs text-gray-500">12,847 tracked</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl glass p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">Quick Actions</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Calendar, label: 'Schedule' },
                { icon: FileText, label: 'Reports' },
                { icon: BarChart3, label: 'Analytics' },
                { icon: Clock, label: 'History' },
              ].map((action) => (
                <motion.button
                  key={action.label}
                  whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(0, 229, 255, 0.12)' }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-white/5 text-gray-300 text-xs transition-colors"
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="rounded-xl glass p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium text-white">Attendance Trend</span>
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
                  <span className="w-8 text-xs text-gray-500">{day.day}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${day.percent}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    />
                  </div>
                  <span className="w-8 text-xs text-gray-400">{day.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
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
