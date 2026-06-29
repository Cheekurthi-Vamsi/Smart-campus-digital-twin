import { useState } from 'react';
import { ClerkProvider } from '@clerk/react';
import lightBackground from './components/ui/light.png';
import darkBackground from './components/ui/dark.png';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import FeaturesGrid from './components/FeaturesGrid';
import AcademicsSection from './components/AcademicsSection';
import OpportunitiesSection from './components/OpportunitiesSection';
import ResourcesSection from './components/ResourcesSection';
import Footer from './components/Footer';
import LoginPortal from './components/LoginPortal';
import { StudentDashboard } from './components/StudentPortal';
import { FacultyDashboard } from './components/FacultyPortal';
import { UserSession } from './lib/supabase';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'student-dashboard' | 'faculty-dashboard'>('landing');
  const [user, setUser] = useState<UserSession | null>(null);

  const clerkPublishableKey = import.meta.env.VITE_CLERK_PROFESSOR_PUBLISHABLE_KEY || import.meta.env.VITE_CLERK_STUDENT_PUBLISHABLE_KEY || import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

  const navigateView = (view: 'landing' | 'login' | 'student-dashboard' | 'faculty-dashboard') => {
    setCurrentView(view);
  };

  const handleLoginSuccess = (loggedInUser: UserSession) => {
    setUser(loggedInUser);
    setCurrentView(loggedInUser.role === 'professor' ? 'faculty-dashboard' : 'student-dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('landing');
  };

  return (
    <ClerkProvider key={user?.role ?? 'auth'} publishableKey={clerkPublishableKey} afterSignOutUrl="/">
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-x-hidden transition-colors duration-300 relative">
      {/* Grid Pattern & Pastel Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300" />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat block dark:hidden"
          style={{ backgroundImage: `url(${lightBackground})` }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden dark:block"
          style={{ backgroundImage: `url(${darkBackground})` }}
        />
        <div className="absolute inset-0 mesh-bg mesh-drift opacity-[0.15] transition-opacity duration-300" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        <Navigation
          currentView={currentView}
          user={user}
          onNavigate={navigateView}
          onLogout={handleLogout}
        />
        
        <main className="flex-grow">
          {currentView === 'landing' && (
            <>
              <Hero onGetStarted={() => navigateView('login')} />
              <BentoGrid />
              <FeaturesGrid />
              <AcademicsSection />
              <OpportunitiesSection />
              <ResourcesSection />
            </>
          )}

          {currentView === 'login' && (
            <div className="min-h-screen">
              <LoginPortal
                onLoginSuccess={handleLoginSuccess}
                onBackToLanding={() => setCurrentView('landing')}
              />
            </div>
          )}

          {currentView === 'student-dashboard' && (
            <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto w-full">
              <StudentDashboard
                user={user || undefined}
                onLogout={handleLogout}
                isFullPage={true}
              />
            </div>
          )}

          {currentView === 'faculty-dashboard' && (
            <div className="pt-28 pb-12 px-4 max-w-7xl mx-auto w-full">
              <FacultyDashboard
                user={user || undefined}
                onLogout={handleLogout}
                isFullPage={true}
              />
            </div>
          )}

        </main>
        
        {currentView !== 'login' && <Footer />}
      </div>
    </div>
    </ClerkProvider>
  );
}

export default App;
