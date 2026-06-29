import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, LogOut, LayoutDashboard, Home } from 'lucide-react';
import { UserButton, useAuth } from '@clerk/react';
import ThemeToggle from './ThemeToggle';
import { UserSession } from '../lib/supabase';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Ecosystem Hub', href: '#ecosystem' },
  { name: 'Academics', href: '#academics' },
  { name: 'Opportunities', href: '#opportunities' },
  { name: 'Resources', href: '#resources' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  currentView: 'landing' | 'login' | 'student-dashboard' | 'faculty-dashboard';
  user: UserSession | null;
  onNavigate: (view: 'landing' | 'login' | 'student-dashboard' | 'faculty-dashboard') => void;
  onLogout: () => void;
}

export default function Navigation({ currentView, user, onNavigate, onLogout }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { isSignedIn, isLoaded } = useAuth();

  const handleScroll = useCallback(() => {
    if (currentView !== 'landing') return;
    
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 60);

    const sections = ['home', 'ecosystem', 'academics', 'opportunities', 'resources', 'contact'];
    for (const section of sections.reverse()) {
      const el = document.getElementById(section);
      if (el && el.getBoundingClientRect().top <= 120) {
        setActiveSection(section);
        break;
      }
    }
  }, [currentView]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Adjust scroll styling when on dashboard / login view
  useEffect(() => {
    if (currentView !== 'landing') {
      setIsScrolled(true);
    } else {
      setIsScrolled(window.scrollY > 60);
    }
  }, [currentView]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (currentView !== 'landing') {
      onNavigate('landing');
      // Delay scrolling slightly to let landing page mount
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentView !== 'landing') {
      onNavigate('landing');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          className={`pointer-events-auto flex items-center gap-1 rounded-full transition-all duration-500 relative ${
            isScrolled ? 'px-4 py-2' : 'px-5 py-3'
          }`}
          style={{
            maxWidth: '1200px',
            width: '100%',
            background: isScrolled
              ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 50%, rgba(200,220,255,0.08) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 50%, rgba(200,220,255,0.05) 100%)',
            backdropFilter: 'blur(40px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
            border: isScrolled
              ? '1px solid rgba(255, 255, 255, 0.18)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isScrolled
              ? '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.2)'
              : '0 4px 24px rgba(0,0,0,0.06), inset 0 1px 1px rgba(255,255,255,0.15)',
          }}
        >
          {/* Top edge light refraction */}
          <div
            className="absolute top-0 left-[10%] right-[10%] h-[1px] rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), rgba(0,229,255,0.2), transparent)',
            }}
          />

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={handleLogoClick}
            className="flex items-center px-3 py-1.5 rounded-full mr-1 pointer-events-auto"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span
              className="font-bold text-slate-800 dark:text-white hidden sm:block text-sm tracking-wide"
              style={{ fontFamily: 'Sora, Inter, sans-serif', letterSpacing: '0.02em' }}
            >
              CampusTwin
            </span>
          </motion.a>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center gap-1.5 flex-grow relative">
            {currentView === 'landing' ? (
              navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="relative px-3 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200"
                    style={{
                      color: isActive ? '#00E5FF' : 'rgba(203, 213, 225, 0.85)',
                      background: isActive ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
                    }}
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
              })
            ) : (
              // Simplified navigation when not on landing page
              <motion.button
                onClick={() => onNavigate('landing')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-300 hover:text-white rounded-full hover:bg-white/5 transition-all cursor-pointer"
                whileTap={{ scale: 0.96 }}
              >
                <Home className="w-3.5 h-3.5" />
                Landing Home
              </motion.button>
            )}
          </nav>

          <div className="hidden lg:block w-px h-5 bg-white/10 mx-1" />

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 ml-1">
            <ThemeToggle />
            
            {isLoaded && isSignedIn ? (
              <>
                <motion.button
                  onClick={() => onNavigate(user?.role === 'student' ? 'student-dashboard' : 'faculty-dashboard')}
                  className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-full transition-all border ${
                    currentView.includes('dashboard')
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </motion.button>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              currentView !== 'login' && (
                <motion.button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-xs font-semibold text-white rounded-full relative overflow-hidden cursor-pointer"
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
                </motion.button>
              )
            )}
          </div>

          {/* Mobile menu trigger */}
          <motion.button
            className="lg:hidden ml-auto p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/5 transition-colors pointer-events-auto cursor-pointer"
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
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[90vw]"
              style={{
                background: 'rgba(3, 7, 18, 0.95)',
                backdropFilter: 'blur(40px)',
                borderLeft: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Drawer header */}
              <div className="flex justify-between items-center px-6 py-5 border-b border-white/5">
                <div className="flex items-center gap-2.5" onClick={(e) => { setIsMobileMenuOpen(false); handleLogoClick(e); }}>
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)' }}
                  >
                    <GraduationCap style={{ width: '17px', height: '17px', color: 'white' }} />
                  </div>
                  <span className="font-bold text-white text-sm cursor-pointer" style={{ fontFamily: 'Sora, sans-serif' }}>
                    CampusTwin
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col px-4 py-6 gap-3 overflow-y-auto max-h-[calc(100vh-180px)]">
                <div className="space-y-1">
                  {currentView === 'landing' ? (
                    navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                        className="block px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white rounded-xl hover:bg-white/5"
                      >
                        {link.name}
                      </a>
                    ))
                  ) : (
                    <button
                      onClick={() => { setIsMobileMenuOpen(false); onNavigate('landing'); }}
                      className="w-full text-left px-4 py-2.5 text-sm font-semibold text-gray-300 hover:text-white rounded-xl hover:bg-white/5 flex items-center gap-2 cursor-pointer"
                    >
                      <Home className="w-4 h-4" />
                      Back to Home
                    </button>
                  )}
                </div>
              </div>

              {/* Drawer CTA */}
              <div className="absolute bottom-0 left-0 right-0 px-4 pb-8 pt-4 border-t border-white/5">
                {user ? (
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onNavigate(user.role === 'student' ? 'student-dashboard' : 'faculty-dashboard');
                      }}
                      className="w-full text-center py-2.5 text-sm text-white transition-colors rounded-xl bg-white/5 border border-white/10 font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4 text-primary" />
                      Go to Dashboard
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full text-center py-2.5 text-sm text-red-400 hover:text-red-300 transition-colors rounded-xl bg-red-500/5 border border-red-500/20 font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <>
                    {currentView !== 'login' && (
                      <>
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            onNavigate('login');
                          }}
                          className="block w-full text-center py-3 text-sm font-semibold text-white rounded-xl cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #00E5FF 0%, #7B61FF 100%)' }}
                        >
                          Get Started
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
