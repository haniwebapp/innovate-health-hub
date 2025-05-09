
import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PlatformHighlights from "@/components/home/PlatformHighlights";
import FeaturedSection from "@/components/home/FeaturedSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      <main className="flex-grow pt-16">
        <HeroSection />
        <AboutSection />
        <PlatformHighlights />
        <FeaturedSection />
        <ChallengesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
