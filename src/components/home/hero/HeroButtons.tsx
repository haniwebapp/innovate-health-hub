
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Sparkles, FileUp, Coins } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function HeroButtons() {
  const { language } = useLanguage();
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  };
  
  return (
    <motion.div 
      className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-4 mt-8" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      {/* Primary buttons - first row */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <motion.div variants={itemVariants} className="flex-1">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white shadow-md group w-full border-0" 
            asChild
          >
            <Link to="/innovations">
              <Sparkles className="mr-2 h-5 w-5" />
              <span>Explore Innovations</span>
              <motion.div 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-moh-gold to-moh-darkGold hover:from-moh-darkGold hover:to-moh-gold text-white shadow-md group w-full border-0" 
            asChild
          >
            <Link to="/challenges">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <Award className="mr-2 h-5 w-5" />
              </motion.div>
              <span>Join a Challenge</span>
            </Link>
          </Button>
        </motion.div>
      </div>
      
      {/* Secondary buttons - second row */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <motion.div variants={itemVariants} className="flex-1">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-moh-green/30 text-white hover:bg-moh-green/10 hover:text-white shadow-sm w-full" 
            asChild
          >
            <Link to="/innovations/submit">
              <FileUp className="mr-2 h-5 w-5" />
              <span>Submit Innovation</span>
            </Link>
          </Button>
        </motion.div>
        
        <motion.div variants={itemVariants} className="flex-1">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-moh-gold/30 text-white hover:bg-moh-gold/10 shadow-sm w-full" 
            asChild
          >
            <Link to="/investment">
              <Coins className="mr-2 h-5 w-5" />
              <span>Access Investment</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
