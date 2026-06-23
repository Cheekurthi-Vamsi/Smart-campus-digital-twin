import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Features from './components/Features';
import DigitalTwin from './components/DigitalTwin';
import FacultyPortal from './components/FacultyPortal';
import StudentPortal from './components/StudentPortal';
import MobileShowcase from './components/MobileShowcase';
import Analytics from './components/Analytics';
import FutureVision from './components/FutureVision';
import Footer from './components/Footer';
import { BeamsBackground } from './components/ui/beams-background';
import { ContainerScroll } from './components/ui/container-scroll-animation';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Bell, Cpu, Network } from 'lucide-react';



function SecurityConsoleMockup() {
  return (
    <div className="h-full w-full bg-dark-900 text-white flex flex-col select-none">
      {/* Header bar */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-dark-950">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-green-400">Zero-Trust Network Operations</span>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">FW_STATUS: PROTECTION_ACTIVE</div>
      </div>
      {/* Workspace */}
      <div className="flex-grow grid grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* Logs list (Left column) */}
        <div className="col-span-2 space-y-2 overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Live Security Logs</div>
          {[
            { msg: 'Blocked unauthorized SSH attempt from IP 198.51.100.42', status: 'blocked', time: '1s ago' },
            { msg: 'AES-256 handshake success: Library node #4', status: 'secure', time: '8s ago' },
            { msg: 'Intrusion Detection: Zero anomalies detected in host traffic', status: 'secure', time: '14s ago' },
            { msg: 'DDoS filter status: Normal (0.01% load threshold)', status: 'secure', time: '22s ago' },
            { msg: 'Automated TLS Certificate rotation completed', status: 'secure', time: '1m ago' },
          ].map((log, i) => (
            <div key={i} className="flex items-start justify-between p-2 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-start gap-2">
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold mt-0.5 ${log.status === 'blocked' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {log.status.toUpperCase()}
                </span>
                <span className="text-[10px] text-gray-300 font-mono leading-tight">{log.msg}</span>
              </div>
              <span className="text-[9px] text-gray-500 font-mono whitespace-nowrap ml-2">{log.time}</span>
            </div>
          ))}
        </div>
        {/* System info (Right column) */}
        <div className="col-span-1 flex flex-col gap-3">
          <div className="rounded-xl bg-white/5 border border-white/5 p-3">
            <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Encryption Protocol</div>
            <div className="text-sm font-bold text-white font-mono">AES-256 / TLS 1.3</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/5 p-3">
            <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Threat Assessment</div>
            <div className="text-sm font-bold text-green-400">ZERO THREATS</div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/5 p-3 flex-grow flex flex-col justify-between">
            <div>
              <div className="text-[10px] text-gray-400 uppercase font-semibold mb-1">Network Shield</div>
              <div className="text-xs text-gray-300 font-mono">DDoS Protection Active</div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden mt-2">
              <div className="bg-green-400 h-full w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySection() {
  const features = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All data is encrypted at rest and in transit using AES-256 encryption.',
    },
    {
      icon: Eye,
      title: 'Real-time Monitoring',
      description: '24/7 security operations center with threat detection and incident response.',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Immediate notifications for security incidents, emergencies, and anomalies.',
    },
    {
      icon: Cpu,
      title: 'AI Threat Detection',
      description: 'Machine learning models identify and neutralize threats before they impact operations.',
    },
    {
      icon: Network,
      title: 'Secure Network',
      description: 'Isolated infrastructure with multi-layered network security and DDoS protection.',
    },
    {
      icon: Shield,
      title: 'Compliance Ready',
      description: 'SOC 2 Type II, GDPR, FERPA, and ISO 27001 certified for educational institutions.',
    },
  ];

  return (
    <>
      <section id="security" className="relative py-32 overflow-hidden bg-dark-900 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
          <div className="absolute inset-0 mesh-bg opacity-30" />
        </div>


        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 border-green-500/20">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">Enterprise Security</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-6">
              <span
                className="text-white italic font-light block"
                style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
              >
                Security You Can
              </span>
              <span
                className="text-white font-extrabold block mt-1"
                style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
              >
                <span className="text-green-400">Trust</span>
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Built with security as the foundation. Your campus data is protected by industry-leading security measures and compliance standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass-card rounded-xl p-6 hover:border-green-500/20 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-shadow">
                  <feature.icon className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-12 glass-card rounded-xl p-8 text-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
              {['SOC 2', 'GDPR', 'FERPA', 'ISO 27001', 'HIPAA'].map((cert) => (
                <div key={cert} className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">{cert}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-400">
              Our platform undergoes annual third-party security audits and penetration testing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Container Scroll Section for Zero-Trust Security Console */}
      <section className="relative py-24 overflow-hidden bg-white rounded-[2rem] md:rounded-[3rem] border border-black/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
          <div className="absolute inset-0 mesh-bg opacity-30" />
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
                    Shielded Infrastructure
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Zero-Trust Console
                  </span>
                </h2>
              </>
            }
          >
            <SecurityConsoleMockup />
          </ContainerScroll>
        </div>
      </section>
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-x-hidden transition-colors duration-300 relative">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" className="stroke-neutral-800/30 dark:stroke-white/[0.15]" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)" />
        </svg>
        {/* Radial fade so grid doesn't feel too uniform */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/0 via-neutral-50/50 to-neutral-50/80 dark:from-neutral-950/0 dark:via-neutral-950/50 dark:to-neutral-950/80" />
      </div>

      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />

          <Features />
          <DigitalTwin />
          <FacultyPortal />
          <StudentPortal />
          <MobileShowcase />
          <SecuritySection />
          <Analytics />
          <FutureVision />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

