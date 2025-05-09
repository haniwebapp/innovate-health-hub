
import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  description: string;
  isVisible: boolean;
}

export function SectionHeading({ title, description, isVisible }: SectionHeadingProps) {
  return (
    <div className="text-center mb-10">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold text-moh-darkGreen"
      >
        {title} <span className="text-gradient">Innovation</span>
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-4 text-gray-700 max-w-2xl mx-auto"
      >
        {description}
      </motion.p>
    </div>
  );
}
