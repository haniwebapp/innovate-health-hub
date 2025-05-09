
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const StatisticsSection = () => {
  return (
    <motion.div 
      className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex gap-8 mb-6 md:mb-0">
        <div className="text-center">
          <p className="text-3xl font-bold text-moh-darkGreen">120+</p>
          <p className="text-gray-500">Innovations</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-moh-darkGreen">35+</p>
          <p className="text-gray-500">Categories</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-moh-darkGreen">18M+</p>
          <p className="text-gray-500">Investment</p>
        </div>
      </div>
      
      <Button className="bg-gradient-to-r from-moh-darkGreen to-moh-green text-white hover:shadow-lg transition-all">
        View All Innovations
      </Button>
    </motion.div>
  );
};
