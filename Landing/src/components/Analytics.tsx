import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ContainerScroll } from './ui/container-scroll-animation';
import { BarChart3, TrendingUp, Users, Shield, Zap, GraduationCap, Activity, LineChart } from 'lucide-react';


function AnimatedCounter({ target, duration = 2, prefix = '', suffix = '' }: { target: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

function CircularProgress({ value, size = 120, strokeWidth = 8, color = '#00E5FF' }: { value: number; size?: number; strokeWidth?: number; color?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          className="text-white/10"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <motion.circle
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-white">{value}%</span>
      </div>
    </div>
  );
}

function BarChart() {
  const data = [75, 82, 68, 90, 85, 92, 78, 88, 95, 70, 83, 91];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="space-y-2">
      <div className="flex items-end gap-2 h-32">
        {data.map((value, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary/80 to-secondary/80 rounded-t relative group cursor-pointer"
            initial={{ height: 0 }}
            whileInView={{ height: `${value}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-white/10 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {value}%
            </div>
          </motion.div>
        ))}
      </div>
      <div className="flex gap-2 text-xs text-gray-500">
        {months.map((month, i) => (
          <div key={i} className="flex-1 text-center">{month}</div>
        ))}
      </div>
    </div>
  );
}

function DonutChart() {
  const segments = [
    { value: 35, color: '#00E5FF', label: 'Academic' },
    { value: 25, color: '#7B61FF', label: 'Sports' },
    { value: 20, color: '#00FFD1', label: 'Research' },
    { value: 20, color: '#FF00E5', label: 'Events' },
  ];

  const total = segments.reduce((sum, seg) => sum + seg.value, 0);

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {segments.reduce((acc, seg) => {
          const radius = 35;
          const circumference = 2 * Math.PI * radius;
          const dashArray = `${(seg.value / total) * circumference} ${circumference}`;
          const dashOffset = -acc.offset;
          acc.offset += (seg.value / total) * circumference;

          acc.elements.push(
            <motion.circle
              key={seg.label}
              cx={50}
              cy={50}
              r={radius}
              fill="transparent"
              stroke={seg.color}
              strokeWidth={12}
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              style={{ filter: `drop-shadow(0 0 5px ${seg.color})` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            />
          );

          return acc;
        }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-dark-800 flex items-center justify-center">
          <Activity className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, change, trend, color }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}) {
  const cardVariants = {
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
      variants={cardVariants}
      whileHover={{
        y: -4,
        scale: 1.02,
        boxShadow: `0 12px 30px rgba(0, 0, 0, 0.4), 0 0 15px ${color}20`,
        borderColor: `${color}40`,
      }}
      className="rounded-xl glass-card p-4 border border-white/5 cursor-pointer transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${color}20, transparent)` }}
        >
          <span style={{ color }}><Icon className="w-5 h-5" /></span>
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-400">{label}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
        <div
          className={`text-xs ${
            trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
          } flex items-center gap-1`}
        >
          {trend === 'up' && <TrendingUp className="w-3 h-3" />}
          {change}
        </div>
      </div>
    </motion.div>
  );
}

export default function Analytics() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <>
      <section id="analytics" className="relative py-32 overflow-hidden bg-dark-800 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">

        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6" ref={containerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BarChart3 className="w-4 h-4 text-primary" />
              <span className="text-sm text-gray-300">AI Analytics</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-6">
              <span
                className="text-white italic font-light block"
                style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
              >
                Data-Driven
              </span>
              <span
                className="text-white font-extrabold block mt-1"
                style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
              >
                <span className="gradient-text">Insights</span>
              </span>
            </h2>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Advanced analytics powered by AI to help administrators make informed decisions with real-time data visualization.
            </p>
          </motion.div>

          {/* Flat view metric cards */}
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
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <MetricCard
              icon={Users}
              label="Active Students"
              value="12,847"
              change="+5%"
              trend="up"
              color="#00E5FF"
            />
            <MetricCard
              icon={Shield}
              label="Security Score"
              value="98%"
              change="Stable"
              trend="neutral"
              color="#00FFD1"
            />
            <MetricCard
              icon={Zap}
              label="Engagement"
              value="89%"
              change="+12%"
              trend="up"
              color="#7B61FF"
            />
            <MetricCard
              icon={GraduationCap}
              label="Avg. CGPA"
              value="8.4"
              change="+0.3"
              trend="up"
              color="#FF00E5"
            />
          </motion.div>
        </div>
      </section>

      {/* Container Scroll Section for Analytics Dashboard */}
      <section className="relative py-24 overflow-hidden bg-dark-800 rounded-[2rem] md:rounded-[3rem] border border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 flex flex-col overflow-hidden w-full">
          <ContainerScroll
            titleComponent={
              <>
                <h2 className="text-4xl md:text-5xl leading-tight tracking-tight text-white mb-2 relative z-10">
                  <span
                    className="italic font-light block"
                    style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
                  >
                    Campus Analytics
                  </span>
                  <span
                    className="text-4xl md:text-[6rem] font-extrabold block mt-2 leading-none gradient-text"
                    style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
                  >
                    Visual Intelligence
                  </span>
                </h2>
              </>
            }
          >
            <div className="grid grid-cols-3 gap-4 p-4 h-full bg-dark-900 text-white select-none">
              {/* Left Column: Charts */}
              <div className="col-span-2 flex flex-col gap-4 h-full overflow-hidden">
                {/* Attendance Chart */}
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between h-[62%]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <LineChart className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-white">Attendance Analytics</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">Live</span>
                  </div>
                  <BarChart />
                </div>
                {/* Real-time Counts */}
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 h-[35%] flex flex-col justify-center">
                  <div className="text-xs font-semibold text-white mb-2">Real-time Counts</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase">Students</div>
                      <div className="text-base font-bold text-primary"><AnimatedCounter target={12847} /></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase">Faculty</div>
                      <div className="text-base font-bold text-green-400"><AnimatedCounter target={456} /></div>
                    </div>
                    <div>
                      <div className="text-[9px] text-gray-500 uppercase">Events Today</div>
                      <div className="text-base font-bold text-secondary"><AnimatedCounter target={23} /></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Resource Rings */}
              <div className="col-span-1 flex flex-col gap-4 h-full overflow-hidden">
                {/* Resource Utilization */}
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col items-center justify-center h-[49%]">
                  <div className="text-[9px] text-gray-400 uppercase font-semibold mb-2">Resource Utilization</div>
                  <CircularProgress value={78} size={90} strokeWidth={6} color="#00E5FF" />
                </div>
                {/* Activity Distribution */}
                <div className="rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col items-center justify-center h-[49%]">
                  <div className="text-[9px] text-gray-400 uppercase font-semibold mb-2">Activity Distribution</div>
                  <div className="scale-75 origin-center">
                    <DonutChart />
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
