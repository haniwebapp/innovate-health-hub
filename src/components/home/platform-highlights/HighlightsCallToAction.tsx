
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function HighlightsCallToAction() {
  return (
    <motion.div 
      className="mt-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Button 
        className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white shadow-md group"
        size="lg"
        asChild
      >
        <Link to="/dashboard">
          <span>Explore All Features</span>
          <motion.div 
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 1 }}
          >
            <ArrowRight className="ml-2 h-5 w-5" />
          </motion.div>
        </Link>
      </Button>
      
      <div className="mt-4 text-sm text-gray-500">
        <span className="text-moh-darkGreen font-medium">Vision 2030 Aligned</span> • Enabling healthcare transformation across Saudi Arabia
      </div>
    </motion.div>
  );
}
