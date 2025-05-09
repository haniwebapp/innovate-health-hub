
import { motion } from "framer-motion";
import { HeroLogo } from "./hero/HeroLogo";
import { HeroHeading } from "./hero/HeroHeading";
import { HeroButtons } from "./hero/HeroButtons";
import { HeroStats } from "./hero/HeroStats";
import { HeroDecorations } from "./hero/HeroDecorations";
import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById('platform-highlights');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <HeroLogo />
          <HeroHeading />
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.4 }}
          >
            A one-stop-shop platform connecting health innovators, investors, and regulators to transform healthcare delivery across Saudi Arabia in alignment with Vision 2030.
          </motion.p>
          
          <HeroButtons />
          
          <HeroStats />
          
          {/* Add scroll indicator */}
          <motion.div 
            className="mt-16 cursor-pointer"
            onClick={scrollToNextSection}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0] }}
            transition={{ 
              opacity: { delay: 2.5, duration: 0.5 },
              y: { delay: 2.5, duration: 1.5, repeat: Infinity }
            }}
          >
            <ChevronDown className="mx-auto text-moh-green/70 h-8 w-8" />
            <span className="text-sm text-moh-green/70 font-medium">Explore More</span>
          </motion.div>
        </div>
      </div>
      
      <HeroDecorations />
    </section>
  );
}
