
import { motion } from "framer-motion";
import { Users, Award, Globe } from "lucide-react";
import { ArabicVerticalText } from "@/components/animations/ArabicVerticalText";

export default function HeroSection() {
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };
  
  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  return (
    <section className="pt-28 pb-16 bg-gradient-to-br from-moh-lightGreen to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="max-w-3xl ml-auto"
          initial="hidden"
          animate="visible"
          variants={fadeInUpVariants}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-moh-darkGreen">
            Saudi Healthcare Innovation Platform
            <div className="inline-block ml-4">
              <ArabicVerticalText text="SHIP" />
            </div>
          </h1>
          <motion.p 
            className="text-lg text-gray-700 mb-8 leading-relaxed"
            variants={fadeInUpVariants}
          >
            Accelerating healthcare transformation across Saudi Arabia through innovation, collaboration, and strategic partnerships aligned with Vision 2030.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-3"
            variants={staggerVariants}
          >
            <motion.span 
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Users className="mr-1.5" size={16} />
              500+ Innovators
            </motion.span>
            <motion.span 
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Award className="mr-1.5" size={16} />
              40+ Challenges
            </motion.span>
            <motion.span 
              className="inline-flex items-center px-3 py-1.5 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium"
              variants={fadeInUpVariants}
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="mr-1.5" size={16} />
              Nationwide Impact
            </motion.span>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 right-0 opacity-20">
        <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="#00814A" strokeWidth="2" />
          <path d="M30,50 L45,65 L70,35" stroke="#00814A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
