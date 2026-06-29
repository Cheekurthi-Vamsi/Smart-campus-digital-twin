import Navigation from './components/Navigation';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import FeaturesGrid from './components/FeaturesGrid';
import AcademicsSection from './components/AcademicsSection';
import OpportunitiesSection from './components/OpportunitiesSection';
import ResourcesSection from './components/ResourcesSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white overflow-x-hidden transition-colors duration-300 relative">
      {/* Grid Pattern & Pastel Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Solid base */}
        <div className="absolute inset-0 bg-white dark:bg-neutral-950 transition-colors duration-300" />
        
        {/* Soft glowing mesh gradient (Cyan/Violet/Pink) */}
        <div className="absolute inset-0 mesh-bg opacity-[0.35] dark:opacity-20 transition-opacity duration-300" />
        
        {/* Grid pattern overlay */}
        <svg className="w-full h-full opacity-40 dark:opacity-100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-bg" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" className="stroke-slate-400/25 dark:stroke-white/[0.15]" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)" />
        </svg>
        
        {/* Radial fade so grid doesn't feel too uniform */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-white dark:from-transparent dark:via-neutral-950/50 dark:to-neutral-950" />
      </div>

      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <BentoGrid />
          <FeaturesGrid />
          <AcademicsSection />
          <OpportunitiesSection />
          <ResourcesSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;


