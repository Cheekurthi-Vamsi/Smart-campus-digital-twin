import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import { Smartphone, Bell, Calendar, FileText, MapPin, Users, CheckCircle2, Clock } from 'lucide-react';


function PhoneMockup({ type, features }: { type: 'student' | 'faculty'; features: { icon: React.ComponentType<{ className?: string }>; label: string }[] }) {
  const isStudent = type === 'student';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative"
      style={{ perspective: '1000px' }}
    >
      <div className="relative mx-auto w-[280px] h-[580px]">
        <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-b from-gray-700 to-gray-900 shadow-2xl" />
        <div className="absolute inset-1 rounded-[2.85rem] bg-dark-900" />

        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black" />

        <div className="absolute inset-3 rounded-[2.5rem] overflow-hidden bg-dark-800">
          <div className="h-full flex flex-col">
            <div className="p-4 bg-gradient-to-b from-dark-700 to-dark-800">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${isStudent ? 'from-primary to-secondary' : 'from-secondary to-accent-pink'}`} />
                <div className="flex-1">
                  <div className="text-white text-sm font-semibold">
                    {isStudent ? 'Student App' : 'Faculty App'}
                  </div>
                  <div className="text-xs text-gray-400">Welcome back!</div>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500"
                  readOnly
                />
              </div>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-hidden">
              <div className="grid grid-cols-2 gap-2">
                {features.slice(0, 4).map((feature, i) => (
                  <motion.div
                    key={feature.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5"
                  >
                    <feature.icon className="w-6 h-6 text-primary mb-2" />
                    <div className="text-xs text-white">{feature.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-xs text-white font-medium">
                    {isStudent ? 'Next Class' : 'Next Session'}
                  </span>
                </div>
                <div className="text-sm text-white font-semibold">
                  {isStudent ? 'Machine Learning' : 'CS - 301'}
                </div>
                <div className="text-xs text-gray-400">Room 401 - 09:00 AM</div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <div className={`w-2 h-2 rounded-full ${isStudent ? 'bg-green-400' : 'bg-blue-400'}`} />
                  <span className="text-xs text-white flex-1">
                    {isStudent ? 'Assignment due tomorrow' : '3 pending approvals'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <div className={`w-2 h-2 rounded-full ${isStudent ? 'bg-yellow-400' : 'bg-purple-400'}`} />
                  <span className="text-xs text-white flex-1">
                    {isStudent ? 'Library reservation confirmed' : 'Meeting in 30 mins'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-white/20" />
      </div>

      <div
        className="absolute -inset-20 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: isStudent
            ? 'radial-gradient(circle, #00E5FF, transparent)'
            : 'radial-gradient(circle, #7B61FF, transparent)',
        }}
      />
    </motion.div>
  );
}

export default function MobileShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const studentFeatures = [
    { icon: Calendar, label: 'Attendance' },
    { icon: Bell, label: 'Notifications' },
    { icon: FileText, label: 'Assignments' },
    { icon: MapPin, label: 'Navigation' },
  ];

  const facultyFeatures = [
    { icon: Users, label: 'Students' },
    { icon: CheckCircle2, label: 'Approvals' },
    { icon: FileText, label: 'Review' },
    { icon: MapPin, label: 'Monitor' },
  ];

  return (
    <>
      <section className="relative py-32 overflow-hidden bg-dark-900 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">

        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute inset-0 mesh-bg opacity-30" />
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[200px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-300">Mobile Apps</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-6">
              <span
                className="text-white italic font-light block"
                style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
              >
                Campus in Your
              </span>
              <span
                className="text-white font-extrabold block mt-1"
                style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
              >
                <span className="gradient-text">Pocket</span>
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Native mobile apps for students and faculty with real-time notifications, location tracking, and instant access to all campus features.
            </p>
          </motion.div>

          {/* Flat view stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { value: '4.9', label: 'App Store Rating' },
              { value: '100K+', label: 'Downloads' },
              { value: '<1s', label: 'Response Time' },
              { value: '24/7', label: 'Support' },
            ].map((stat, i) => (
              <div
                key={i}
                className="text-center p-6 rounded-xl glass-card border border-white/5"
              >
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Container Scroll Section for Phone Mockups */}
      <section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0 bg-dark-900">
          <div className="absolute inset-0 mesh-bg opacity-30" />
          <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-[200px]" />
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
                    Pocket Mobility
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    On-the-go Access
                  </span>
                </h2>
              </>
            }
          >
            <div className="flex justify-center items-center gap-8 md:gap-16 h-full py-4 bg-dark-900/95">
              <div className="text-center">
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                  Student App
                </span>
                <div className="scale-75 md:scale-90 origin-top">
                  <PhoneMockup type="student" features={studentFeatures} />
                </div>
              </div>

              <div className="text-center">
                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-medium">
                  Faculty App
                </span>
                <div className="scale-75 md:scale-90 origin-top">
                  <PhoneMockup type="faculty" features={facultyFeatures} />
                </div>
              </div>
            </div>
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}
