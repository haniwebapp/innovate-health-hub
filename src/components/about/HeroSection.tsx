
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
      {/* Background decoration elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-moh-gold blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-moh-lightGold blur-3xl"></div>
        <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-moh-darkGreen blur-3xl"></div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-moh-darkGreen text-moh-lightGreen text-sm font-medium"
            >
              About Us
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold">Healthcare</span> Through Innovation
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-moh-lightGreen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              We're building a vibrant ecosystem that accelerates healthcare transformation by connecting innovators, providers, and policymakers.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a href="#vision-mission" className="bg-moh-gold hover:bg-moh-darkGold text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                Our Vision & Mission
                <ChevronRight className="ml-2 h-4 w-4" />
              </a>
              <a href="#partners" className="border border-moh-gold/50 text-moh-lightGold hover:bg-moh-darkGreen/20 font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                Our Partners
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-20 h-20 bg-moh-gold/20 rounded-full blur-md"></div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-moh-gold/30 rounded-full blur-md"></div>
              
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 relative">
                <div className="grid gap-4 grid-cols-2">
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors text-center">
                    <div className="text-3xl font-bold text-white mb-1">3+</div>
                    <div className="text-sm text-white/70">Years of Innovation</div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors text-center">
                    <div className="text-3xl font-bold text-white mb-1">500+</div>
                    <div className="text-sm text-white/70">Innovators</div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors text-center">
                    <div className="text-3xl font-bold text-white mb-1">25+</div>
                    <div className="text-sm text-white/70">Strategic Partners</div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors text-center">
                    <div className="text-3xl font-bold text-white mb-1">100+</div>
                    <div className="text-sm text-white/70">Innovations Launched</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-moh-lightGreen"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
