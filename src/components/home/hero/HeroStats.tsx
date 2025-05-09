
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { Users, Award, Globe } from "lucide-react";

export function HeroStats() {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6" 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <motion.div 
        className="text-center p-4 rounded-lg hover:bg-white/50 transition-colors"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex justify-center mb-2">
          <Users className="h-6 w-6 text-moh-green" />
        </div>
        <div className="font-bold text-2xl md:text-3xl text-moh-green">
          <AnimatedCounter value={500} suffix="+" duration={2.5} />
        </div>
        <div className="text-sm md:text-base text-gray-600">Registered Innovators</div>
      </motion.div>
      
      <motion.div 
        className="text-center p-4 rounded-lg hover:bg-white/50 transition-colors"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex justify-center mb-2">
          <Award className="h-6 w-6 text-moh-darkGold" />
        </div>
        <div className="font-bold text-2xl md:text-3xl text-moh-darkGold">
          <AnimatedCounter value={250} suffix="M+" duration={2.5} delay={0.2} />
        </div>
        <div className="text-sm md:text-base text-gray-600">Investment Funding</div>
      </motion.div>
      
      <motion.div 
        className="text-center p-4 rounded-lg hover:bg-white/50 transition-colors"
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <div className="flex justify-center mb-2">
          <Globe className="h-6 w-6 text-moh-green" />
        </div>
        <div className="font-bold text-2xl md:text-3xl text-moh-green">
          <AnimatedCounter value={40} suffix="+" duration={2.5} delay={0.4} />
        </div>
        <div className="text-sm md:text-base text-gray-600">Active Challenges</div>
      </motion.div>
    </motion.div>
  );
}
