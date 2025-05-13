
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ChallengeHeroProps {
  title: ReactNode;
  description: ReactNode;
}

export default function ChallengeHero({ title, description }: ChallengeHeroProps) {
  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-moh-gold blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 rounded-full bg-moh-lightGold blur-3xl"></div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h1 
            className="text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>
          
          <motion.p 
            className="text-lg text-white/80 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-white"></path>
        </svg>
      </div>
    </section>
  );
}
