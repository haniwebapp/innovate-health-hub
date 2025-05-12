
import { motion } from "framer-motion";

export function HighlightsSectionHeader() {
  return (
    <div className="text-center mb-14">
      <motion.div 
        className="inline-block mb-2 px-4 py-1.5 bg-moh-lightGreen rounded-full text-moh-darkGreen text-sm font-medium"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        Comprehensive Healthcare Innovation Platform
      </motion.div>
      
      <motion.h2 
        className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Platform Features
      </motion.h2>
      
      <motion.p 
        className="text-gray-700 max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Our integrated platform provides all the tools and resources needed to take healthcare innovations 
        from concept to implementation, aligned with Saudi Arabia's Vision 2030 healthcare transformation goals.
      </motion.p>
      
      {/* Decorative underline */}
      <motion.div 
        className="h-1 w-24 bg-gradient-to-r from-moh-green to-moh-gold rounded-full mx-auto mt-6"
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />
    </div>
  );
}
