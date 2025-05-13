
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, FileUp } from "lucide-react";

export function HeroButtons() {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <Button 
        size="lg" 
        className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white shadow-md hover:shadow-lg transition-all duration-300 group"
        asChild
      >
        <Link to="/innovations/submit" className="flex items-center">
          <FileUp className="mr-2 h-4 w-4" />
          <span>Submit Innovation</span>
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
      
      <Button 
        size="lg"
        variant="outline"
        className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20 transition-all duration-300"
        asChild
      >
        <Link to="/challenges">
          <span>Explore Challenges</span>
        </Link>
      </Button>
    </motion.div>
  );
}
