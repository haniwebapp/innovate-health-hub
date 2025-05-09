
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import HeroSection from "@/components/about/HeroSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import FocusAreasSection from "@/components/about/FocusAreasSection";
import PartnersSection from "@/components/about/PartnersSection";
import JoinCommunitySection from "@/components/about/JoinCommunitySection";

const AboutPage = () => {
  const { language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-white" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar />
      
      <HeroSection />
      <VisionMissionSection />
      <FocusAreasSection />
      <PartnersSection />
      <JoinCommunitySection />
      
      <Footer />
    </div>
  );
}

export default AboutPage;
