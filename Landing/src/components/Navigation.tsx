import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Menu, X, GraduationCap, ChevronDown } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Platform', href: '#platform' },
  { name: 'Features', href: '#features' },
  { name: 'Faculty', href: '#faculty' },
  { name: 'Students', href: '#students' },
  { name: 'Security', href: '#security' },
  { name: 'Analytics', href: '#analytics' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 60);

    // Track active section
    const sections = navLinks.map((l) => l.href.replace('#', ''));
    for (const section of sections.reverse()) {
      const el = document.getElementById(section);
      if (el && el.getBoundingClientRect().top <= 100) {
        setActiveSection(section);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* ── Desktop / Tablet Navigation ── */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
        style={{ paddingTop: isScrolled ? '12px' : '20px', transition: 'padding-top 0.4s ease' }}
      >
        <div
          className={`pointer-events-auto flex items-center gap-1 rounded-full transition-all duration-500 ${
            isScrolled
              ? 'px-3 py-2 shadow-2xl'
              : 'px-4 py-2.5'
          }`}
          style={{
            maxWidth: '1100px',
            width: '100%',
            background: isScrolled
              ? 'rgba(3, 7, 18, 0.45)'
              : 'rgba(15, 23, 42, 0.15)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: isScrolled
              ? '1px solid rgba(0, 229, 255, 0.15)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 0.5px rgba(0,229,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 4px 24px rgba(0,0,0,0.15)',
          }}
        >
          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full mr-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
                boxShadow: '0 0 16px rgba(0, 229, 255, 0.4)',
              }}
            >
              <GraduationCap className="w-4.5 h-4.5 text-white" style={{ width: '18px', height: '18px' }} />
            </div>
            <span
              className="font-bold text-white hidden sm:block text-sm tracking-wide"
              style={{ fontFamily: 'Sora, Inter, sans-serif', letterSpacing: '0.02em' }}
            >
              CampusTwin
            </span>
          </motion.a>

          {/* Divider */}
          <div className="hidden lg:block w-px h-5 bg-white/10 mx-1" />

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  className="relative px-3 py-1.5 text-xs font-medium rounded-full transition-colors duration-200"
                  style={{
                    color: isActive ? '#00E5FF' : 'rgba(203, 213, 225, 0.85)',
                    background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
                  }}
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 + 0.15, duration: 0.4, ease: 'easeOut' }}
                  whileHover={{ color: '#ffffff', background: 'rgba(255,255,255,0.06)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="hidden lg:block w-px h-5 bg-white/10 mx-1" />

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 ml-1">
            <motion.a
              href="#login"
              className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/5"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Sign In
            </motion.a>
            <motion.a
              href="#get-started"
              className="px-4 py-2 text-xs font-semibold text-white rounded-full relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)',
                boxShadow: '0 2px 12px rgba(0, 229, 255, 0.25)',
              }}
              whileHover={{
                scale: 1.04,
                boxShadow: '0 4px 20px rgba(0, 229, 255, 0.4)',
              }}
              whileTap={{ scale: 0.96 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Mobile menu trigger */}
          <motion.button
            className="lg:hidden ml-auto p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile Side Drawer ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0"
              style={{ background: 'rgba(3, 7, 18, 0.8)', backdropFilter: 'blur(8px)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220, mass: 0.8 }}
              className="absolute right-0 top-0 bottom-0 w-72"
              style={{
                background: 'rgba(3, 7, 18, 0.95)',
                backdropFilter: 'blur(40px)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Drawer header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)' }}
                  >
                    <GraduationCap style={{ width: '17px', height: '17px', color: 'white' }} />
                  </div>
                  <span className="font-bold text-white text-sm" style={{ fontFamily: 'Sora, sans-serif' }}>
                    CampusTwin
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer links */}
              <div className="flex flex-col px-3 py-4 gap-0.5">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                      style={{
                        color: isActive ? '#00E5FF' : 'rgba(203, 213, 225, 0.8)',
                        background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
                      }}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                      {link.name}
                    </motion.a>
                  );
                })}
              </div>

              {/* Drawer CTA */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-4 border-t border-white/5">
                <a
                  href="#login"
                  className="block w-full text-center py-2.5 text-sm text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/5 mb-2"
                >
                  Sign In
                </a>
                <a
                  href="#get-started"
                  className="block w-full text-center py-3 text-sm font-semibold text-white rounded-xl"
                  style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)' }}
                >
                  Get Started Free
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
