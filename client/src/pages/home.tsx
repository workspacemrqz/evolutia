import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ChatWidget from "@/components/chat-widget";
import ChatPopup from "@/components/chat-popup";
import AgentsSection from "@/components/agents-section";
import AdvantagesSection from "@/components/advantages-section";

import IntegrationsSection from "@/components/integrations-section";
import HowItWorksSection from "@/components/how-it-works-section";
import PoweredBySection from "@/components/powered-by-section";
import FinalCTASection from "@/components/final-cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#060606]">
      {/* Seção superior com grid */}
      <div className="top-section-grid">
        <Header />
        <HeroSection />
      </div>
      
      {/* Seções sem grid */}
      <ChatWidget />
      <AgentsSection />
      <AdvantagesSection />
      
      <IntegrationsSection />
      <HowItWorksSection />
      <PoweredBySection />
      <FinalCTASection />
      <Footer />
      <ChatPopup />
    </div>
  );
}