import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import {
  Bell,
  FileText,
  Calendar,
  ClipboardCheck,
  BookOpen,
  MessageCircle,
  MapPin,
  Users,
  ChevronRight,
  Clock,
  Award,
  TrendingUp,
} from 'lucide-react';


const announcements = [
  { id: 1, title: 'Final Exam Schedule Released', time: '2h ago', type: 'exam' },
  { id: 2, title: 'Guest Lecture on AI', time: '5h ago', type: 'event' },
  { id: 3, title: 'Library Extended Hours', time: '1d ago', type: 'info' },
];

const upcomingClasses = [
  { id: 1, name: 'Machine Learning', time: '09:00 AM', room: 'Room 401', professor: 'Dr. Smith' },
  { id: 2, name: 'Data Structures', time: '11:30 AM', room: 'Lab B', professor: 'Prof. Johnson' },
  { id: 3, name: 'Web Development', time: '02:00 PM', room: 'Room 205', professor: 'Dr. Chen' },
];

const assignments = [
  { id: 1, title: 'ML Project Phase 2', due: '2 days', status: 'in-progress', progress: 65 },
  { id: 2, title: 'Algorithm Analysis', due: '5 days', status: 'pending', progress: 0 },
  { id: 3, title: 'Database Design', due: '1 week', status: 'completed', progress: 100 },
];

function StudentDashboard() {
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
        <span className="ml-4 text-xs text-gray-500">Student Portal</span>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5">
            <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center text-lg font-bold">
              JD
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">John Doe</h3>
            <p className="text-xs text-gray-400">Computer Science - Batch 2025</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: Bell, label: 'Announcements', count: 12 },
            { icon: FileText, label: 'Assignments', count: 5 },
            { icon: Calendar, label: 'Attendance', count: '94%' },
            { icon: ClipboardCheck, label: 'Mock Tests', count: 3 },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileHover={{
                scale: 1.06,
                y: -3,
                backgroundColor: 'rgba(0, 229, 255, 0.08)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95 }}
              className="glass rounded-xl p-3 text-center transition-all cursor-pointer"
            >
              <item.icon className="w-5 h-5 text-primary mx-auto mb-1" />
              <div className="text-xs text-gray-400">{item.label}</div>
              <div className="text-sm font-bold text-white">{item.count}</div>
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-xl glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium text-white">Recent Announcements</span>
              </div>
              <div className="space-y-2">
                {announcements.map((ann) => (
                  <div
                    key={ann.id}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div
                      className={`w-1 h-8 rounded-full ${
                        ann.type === 'exam'
                          ? 'bg-red-400'
                          : ann.type === 'event'
                          ? 'bg-primary'
                          : 'bg-gray-400'
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{ann.title}</div>
                      <div className="text-xs text-gray-500">{ann.time}</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-white">Active Assignments</span>
              </div>
              <div className="space-y-3">
                {assignments.map((assign) => (
                  <div key={assign.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{assign.title}</span>
                      <span
                        className={`text-xs ${
                          assign.status === 'completed'
                            ? 'text-green-400'
                            : assign.status === 'in-progress'
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      >
                        {assign.due}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          assign.status === 'completed'
                            ? 'bg-green-400'
                            : 'bg-gradient-to-r from-primary to-secondary'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${assign.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-white">Today's Classes</span>
              </div>
              <div className="space-y-2">
                {upcomingClasses.map((cls, i) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{cls.name}</span>
                      <span className="text-xs text-primary">{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      <span>{cls.room}</span>
                      <span>-</span>
                      <span>{cls.professor}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl glass p-4">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">Quick Stats</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold gradient-text">8.7</div>
                  <div className="text-xs text-gray-400">CGPA</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-green-400">94%</div>
                  <div className="text-xs text-gray-400">Attendance</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-primary">#12</div>
                  <div className="text-xs text-gray-400">Rank</div>
                </div>
                <div className="text-center p-2 rounded-lg bg-white/5">
                  <div className="text-2xl font-bold text-secondary">15</div>
                  <div className="text-xs text-gray-400">Credits</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { icon: BookOpen, label: 'Materials' },
            { icon: MessageCircle, label: 'Faculty Chat' },
            { icon: MapPin, label: 'Navigation' },
            { icon: Users, label: 'Events' },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(0, 229, 255, 0.12)' }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <item.icon className="w-4 h-4" />
              <span className="text-xs">{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function FeatureList() {
  const features = [
    { icon: Bell, title: 'Real-time Announcements', desc: 'Stay updated with instant notifications' },
    { icon: FileText, title: 'Assignment Tracker', desc: 'Never miss a deadline with smart reminders' },
    { icon: Calendar, title: 'Attendance Overview', desc: 'Track your attendance in real-time' },
    { icon: ClipboardCheck, title: 'AI Mock Tests', desc: 'Practice with adaptive assessments' },
  ];

  return (
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
      className="space-y-4"
    >
      {features.map((feature) => {
        const itemVariants = {
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.4 } }
        };
        return (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            whileHover={{ x: 6, scale: 1.01, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
            className="flex items-start gap-4 p-4 rounded-xl glass-card cursor-pointer transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function StudentPortal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <>
      <section id="students" className="relative py-32 overflow-hidden bg-dark-800 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">

        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[150px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6" ref={containerRef}>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column: Header, description, and Button */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm text-gray-300">Student Portal</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-6">
                  <span
                    className="text-white italic font-light block"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
                  >
                    Your Campus,
                  </span>
                  <span
                    className="text-white font-extrabold block mt-1"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Your <span className="gradient-text">Control</span>
                  </span>
                </h2>

                <p className="text-xl text-gray-400 mb-8">
                  Everything students need in one place—announcements, assignments, attendance, and more.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary flex items-center gap-2"
                >
                  <TrendingUp className="w-5 h-5" />
                  Explore Student Features
                </motion.button>
              </motion.div>
            </div>

            {/* Right Column: FeatureList */}
            <div>
              <FeatureList />
            </div>
          </div>
        </div>
      </section>

      {/* Container Scroll Section for Student Dashboard Mockup */}
      <section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[150px]" />
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
                    Student Companion
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Intuitive Workspace
                  </span>
                </h2>
              </>
            }
          >
            <StudentDashboard />
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}
