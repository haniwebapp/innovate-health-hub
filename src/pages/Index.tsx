
import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PlatformHighlights from "@/components/home/PlatformHighlights";
import AIDrivenSection from "@/components/home/AIDrivenSection";
import FeaturedSection from "@/components/home/FeaturedSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-grow pt-16">
        <TooltipProvider>
          <HeroSection />
          <AboutSection />
          <PlatformHighlights />
          <AIDrivenSection />
          <FeaturedSection />
          <ChallengesSection />
        </TooltipProvider>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
