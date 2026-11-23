import { LogisticsProvider } from './context/LogisticsContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NetworkMetricsStrip } from './components/NetworkMetricsStrip';
import { ServicesSection } from './components/ServicesSection';
import { ChinaDrcCorridorSection } from './components/ChinaDrcCorridorSection';
import { AboutOperationsSection } from './components/AboutOperationsSection';
import { WhyUsSection } from './components/WhyUsSection';
import { TrackingSection } from './components/TrackingSection';
import { QuoteSection } from './components/QuoteSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthPortalModal } from './components/AuthPortalModal';

export default function App() {
  return (
    <LogisticsProvider>
      <div className="min-h-screen flex flex-col bg-white text-[#102E49]">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <NetworkMetricsStrip />
          <ServicesSection />
          <ChinaDrcCorridorSection />
          <AboutOperationsSection />
          <WhyUsSection />
          <TrackingSection />
          <QuoteSection />
          <ContactSection />
        </main>
        <Footer />
        <AuthPortalModal />
      </div>
    </LogisticsProvider>
  );
}
