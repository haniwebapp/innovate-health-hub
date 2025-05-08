
import Navbar from "@/components/layouts/Navbar";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import PlatformHighlights from "@/components/home/PlatformHighlights";
import FeaturedSection from "@/components/home/FeaturedSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
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
