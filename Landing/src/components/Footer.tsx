import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from 'lucide-react';

const footerLinks = {
  Platform: ['Digital Twin', 'AI Analytics', 'Mobile Apps', 'Integrations', 'API'],
  Solutions: ['Universities', 'Colleges', 'Research Labs', 'Online Learning', 'Corporate'],
  Resources: ['Documentation', 'Tutorials', 'Blog', 'Case Studies', 'Webinars'],
  Company: ['About Us', 'Careers', 'Press', 'Partners', 'Contact'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });

  return (
    <footer ref={containerRef} id="contact" className="relative pt-32 pb-8 overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-black/5 dark:border-white/5 mx-4 md:mx-8 my-12 shadow-2xl">
      <div className="absolute inset-0 bg-dark-900">
        <div className="absolute inset-0 mesh-bg opacity-40" />
        <div className="absolute top-0 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <motion.div
          className="absolute top-20 left-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(123, 97, 255, 0.08) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl leading-[1.15] tracking-tight mb-6">
              <span
                className="text-white italic font-light block"
                style={{ fontFamily: "'Playfair Display', 'Georgia', 'Times New Roman', serif" }}
              >
                Ready to Transform
              </span>
              <span
                className="text-white font-extrabold block mt-1"
                style={{ fontFamily: "'Sora', 'Inter', system-ui, sans-serif" }}
              >
                Your <span className="gradient-text">Campus?</span>
              </span>
            </h2>
            <p className="text-gray-400 mb-8">
              Join 150+ universities already using Smart Campus Digital Twin to create
              intelligent, connected learning environments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Sales
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-white">CampusTwin</span>
              </motion.div>
              <p className="text-gray-400 text-sm mb-6">
                Transforming universities into intelligent, connected, and predictive digital campuses.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-9 h-9 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary/30 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h4 className="text-white font-semibold mb-4">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 text-sm hover:text-primary transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <span>2024 CampusTwin. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-primary transition-colors">Cookies</a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@campustwin.io</span>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 pt-8 border-t border-white/5"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
            <span>SOC 2 Compliant</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>GDPR Ready</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>ISO 27001</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>99.9% Uptime SLA</span>
            <span className="w-1 h-1 rounded-full bg-gray-600" />
            <span>24/7 Support</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
