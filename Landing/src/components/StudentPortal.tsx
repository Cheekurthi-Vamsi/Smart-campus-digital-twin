import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
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
  LogOut,
  Sparkles,
} from 'lucide-react';

export function StudentDashboard({
  user,
  onLogout,
  isFullPage = false,
}: {
  user?: { name: string; email: string; batch?: string };
  onLogout?: () => void;
  isFullPage?: boolean;
}) {
  const [activeAssignments, setActiveAssignments] = useState([
    { id: 1, title: 'ML Project Phase 2', due: '2 days', status: 'in-progress', progress: 65 },
    { id: 2, title: 'Algorithm Analysis', due: '5 days', status: 'pending', progress: 0 },
    { id: 3, title: 'Database Design', due: 'Completed', status: 'completed', progress: 100 },
  ]);
  const [readAnnouncements, setReadAnnouncements] = useState<number[]>([]);
  const [notificationCount, setNotificationCount] = useState(3);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const studentName = user?.name || 'John Doe';
  const studentEmail = user?.email || 'student@campustwin.edu';
  const studentBatch = user?.batch || '2025';
  const initials = studentName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleAssignmentClick = (id: number) => {
    setActiveAssignments((prev) =>
      prev.map((assign) => {
        if (assign.id === id) {
          if (assign.status === 'pending') {
            showToast('Assignment started! Status: In-Progress');
            return { ...assign, status: 'in-progress', progress: 50 };
          } else if (assign.status === 'in-progress') {
            showToast('Assignment completed! Great job!');
            return { ...assign, status: 'completed', progress: 100, due: 'Completed' };
          } else {
            showToast('Assignment reset to pending.');
            return { ...assign, status: 'pending', progress: 0, due: '3 days' };
          }
        }
        return assign;
      })
    );
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleAnnouncementRead = (id: number) => {
    if (readAnnouncements.includes(id)) {
      setReadAnnouncements((prev) => prev.filter((item) => item !== id));
    } else {
      setReadAnnouncements((prev) => [...prev, id]);
      showToast('Announcement marked as read');
    }
  };

  const clearNotifications = () => {
    setNotificationCount(0);
    showToast('Notifications cleared');
  };

  const handleQuickAction = (action: string) => {
    showToast(`Opening ${action} module...`);
  };

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
            className="absolute top-12 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900/90 text-white rounded-full text-xs font-semibold border border-primary/30 shadow-lg flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
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
          <span className="ml-2 text-xs text-gray-500 font-mono">student_twin_shell.sh</span>
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

      <div className="p-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 pb-6 border-b border-white/5">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 flex-shrink-0 shadow-lg shadow-primary/15">
            <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center text-xl font-bold text-white">
              {initials}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2.5">
              <h3 className="text-white font-bold text-xl">{studentName}</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20 uppercase tracking-wider">
                Student
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{studentEmail} • Computer Science - Batch {studentBatch}</p>
          </div>
          <div className="flex items-center gap-3 self-end sm:self-center">
            <button
              onClick={clearNotifications}
              className="relative p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: Bell, label: 'Announcements', count: 3 - readAnnouncements.length, color: 'text-yellow-400' },
            { icon: FileText, label: 'Assignments Due', count: activeAssignments.filter(a => a.status !== 'completed').length, color: 'text-primary' },
            { icon: Calendar, label: 'Attendance', count: '94%', color: 'text-green-400' },
            { icon: ClipboardCheck, label: 'Mock GPA', count: '3.82', color: 'text-secondary' },
          ].map((item) => (
            <motion.button
              key={item.label}
              whileHover={{
                scale: 1.03,
                y: -2,
                backgroundColor: 'rgba(0, 229, 255, 0.06)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              }}
              whileTap={{ scale: 0.98 }}
              className="glass rounded-xl p-3 text-center transition-all cursor-pointer border border-white/5"
            >
              <item.icon className={`w-5 h-5 ${item.color} mx-auto mb-1`} />
              <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">{item.label}</div>
              <div className="text-base font-bold text-white mt-0.5">{item.count}</div>
            </motion.button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Announcements & Assignments */}
          <div className="space-y-4">
            <div className="rounded-xl glass p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-semibold text-white">Recent Announcements</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">click to read</span>
              </div>
              <div className="space-y-2">
                {[
                  { id: 1, title: 'Final Exam Schedule Released', time: '2h ago', type: 'exam', desc: 'The schedule for the final examinations has been posted in the resources hub. Please check your subject details.' },
                  { id: 2, title: 'Guest Lecture on Generative AI', time: '5h ago', type: 'event', desc: 'Join us in Auditorium A at 2:00 PM for an inspiring talk by Google DeepMind researchers on Agentic coding.' },
                  { id: 3, title: 'Library Extended Hours', time: '1d ago', type: 'info', desc: 'The central library will remain open 24/7 during the exam preparation period starting this Friday.' },
                ].map((ann) => {
                  const isRead = readAnnouncements.includes(ann.id);
                  return (
                    <div
                      key={ann.id}
                      onClick={() => toggleAnnouncementRead(ann.id)}
                      className={`p-3 rounded-lg border transition-all cursor-pointer ${
                        isRead
                          ? 'bg-white/2 border-white/5 opacity-60 hover:opacity-85'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-1.5 h-8 rounded-full ${
                            ann.type === 'exam'
                              ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                              : ann.type === 'event'
                              ? 'bg-primary shadow-[0_0_8px_rgba(0,229,255,0.5)]'
                              : 'bg-gray-400'
                          }`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className={`text-sm font-medium text-white ${isRead ? 'line-through' : ''}`}>
                              {ann.title}
                            </div>
                            <span className="text-[10px] text-gray-500 font-mono">{ann.time}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-1 group-hover:line-clamp-none">
                            {ann.desc}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl glass p-4 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold text-white">Active Assignments</span>
                </div>
                <span className="text-[10px] text-gray-500 font-mono">click to progress status</span>
              </div>
              <div className="space-y-3">
                {activeAssignments.map((assign) => (
                  <div
                    key={assign.id}
                    onClick={() => handleAssignmentClick(assign.id)}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/8 transition-colors cursor-pointer border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-gray-200">{assign.title}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                          assign.status === 'completed'
                            ? 'bg-green-500/10 text-green-400'
                            : assign.status === 'in-progress'
                            ? 'bg-yellow-500/10 text-yellow-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}
                      >
                        {assign.due}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${
                            assign.status === 'completed'
                              ? 'bg-green-400'
                              : 'bg-gradient-to-r from-primary to-secondary'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${assign.progress}%` }}
                          transition={{ duration: 0.4 }}
                        />
                      </div>
                      <span className="text-xs text-gray-400 font-mono">{assign.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Today's Classes & Quick Stats */}
          <div className="space-y-4">
            <div className="rounded-xl glass p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-secondary" />
                <span className="text-sm font-semibold text-white">Today's Classes</span>
              </div>
              <div className="space-y-2">
                {[
                  { id: 1, name: 'Machine Learning', time: '09:00 AM', room: 'Room 401', professor: 'Dr. Smith' },
                  { id: 2, name: 'Data Structures', time: '11:30 AM', room: 'Lab B', professor: 'Prof. Johnson' },
                  { id: 3, name: 'Web Development', time: '02:00 PM', room: 'Room 205', professor: 'Dr. Chen' },
                ].map((cls, i) => (
                  <motion.div
                    key={cls.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/8 border border-white/5 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white">{cls.name}</span>
                      <span className="text-xs text-primary font-semibold">{cls.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{cls.room}</span>
                      </div>
                      <span>•</span>
                      <span>{cls.professor}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="rounded-xl glass p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <Award className="w-4 h-4 text-green-400" />
                <span className="text-sm font-semibold text-white">Academic Metrics</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-white/5 text-center border border-white/5">
                  <div className="text-3xl font-extrabold gradient-text">8.72</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">CGPA</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center border border-white/5">
                  <div className="text-3xl font-extrabold text-green-400">94.1%</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">Attendance</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center border border-white/5">
                  <div className="text-3xl font-extrabold text-primary">#12</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">Class Rank</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 text-center border border-white/5">
                  <div className="text-3xl font-extrabold text-secondary">15</div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mt-1">Credits Registered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Quick Action buttons */}
        <div className="mt-6 pt-6 border-t border-white/5 grid grid-cols-4 gap-2">
          {[
            { icon: BookOpen, label: 'Materials' },
            { icon: MessageCircle, label: 'Faculty Chat' },
            { icon: MapPin, label: 'Navigation' },
            { icon: Users, label: 'Events' },
          ].map((item) => (
            <motion.button
              key={item.label}
              onClick={() => handleQuickAction(item.label)}
              whileHover={{ scale: 1.03, y: -2, backgroundColor: 'rgba(0, 229, 255, 0.08)' }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 text-gray-400 hover:text-white transition-colors cursor-pointer border border-white/5"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-[10px] font-semibold tracking-wide">{item.label}</span>
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
