
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Sparkles, FileUp } from "lucide-react";
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
      className="flex flex-col sm:flex-row justify-center gap-4" 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Button 
          size="lg" 
          className="bg-moh-green hover:bg-moh-darkGreen text-white shadow-md group w-full sm:w-auto" 
          asChild
        >
          <Link to="/innovations/submit">
            <FileUp className="mr-2 h-4 w-4" />
            Submit Innovation
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
            >
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </Link>
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-moh-gold text-moh-darkGold hover:bg-moh-lightGold hover:text-moh-darkGold/90 shadow-sm group w-full sm:w-auto" 
          asChild
        >
          <Link to="/challenges">
            <motion.div 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="mr-2 h-4 w-4" />
            </motion.div>
            Join a Challenge
          </Link>
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Button 
          size="lg" 
          variant="outline" 
          className="border-moh-green text-moh-green hover:bg-moh-lightGreen shadow-sm w-full sm:w-auto" 
          asChild
        >
          <Link to="/innovations">
            <Award className="mr-2 h-4 w-4" />
            Explore Innovations
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
