
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Award, FileUp, Coins } from "lucide-react";

export function HeroContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };
  
  return (
    <motion.div
      className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.h1 
        className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
        variants={itemVariants}
      >
        <span className="block text-white">Transforming Healthcare</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold mt-1">
          Through Innovation
        </span>
      </motion.h1>
      
      {/* Description */}
      <motion.p 
        className="text-lg md:text-xl text-gray-300 mb-8"
        variants={itemVariants}
      >
        Connecting health innovators, investors, and regulators to advance healthcare delivery with cutting-edge technologies and solutions.
      </motion.p>
      
      {/* CTA Buttons */}
      <motion.div 
        className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
        variants={itemVariants}
      >
        {/* Primary Button */}
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-moh-gold to-moh-darkGold hover:from-moh-darkGold hover:to-moh-gold text-white shadow-lg group w-full sm:w-auto border-0" 
          asChild
        >
          <Link to="/innovations">
            <Sparkles className="mr-2 h-5 w-5" />
            <span>Explore Innovations</span>
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
            >
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.div>
          </Link>
        </Button>
        
        {/* Secondary Button */}
        <Button 
          size="lg" 
          variant="outline" 
          className="border-white/20 text-white hover:bg-white/10 group w-full sm:w-auto backdrop-blur-sm" 
          asChild
        >
          <Link to="/challenges">
            <Award className="mr-2 h-5 w-5" />
            <span>Join a Challenge</span>
          </Link>
        </Button>
        
        {/* Tertiary Buttons */}
        <div className="hidden lg:flex gap-4 mt-4">
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/5" 
            asChild
          >
            <Link to="/innovations/submit">
              <FileUp className="mr-2 h-4 w-4" />
              <span>Submit</span>
            </Link>
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-gray-300 hover:text-white hover:bg-white/5" 
            asChild
          >
            <Link to="/investment">
              <Coins className="mr-2 h-4 w-4" />
              <span>Investment</span>
            </Link>
          </Button>
        </div>
      </motion.div>
      
      {/* Stats */}
      <motion.div
        className="mt-10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
        variants={itemVariants}
      >
        {[
          { value: '1,200+', label: 'Innovations' },
          { value: '300+', label: 'Partners' },
          { value: '$45M+', label: 'Funding' }
        ].map((stat, index) => (
          <div 
            key={index} 
            className="text-center p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <span className="block text-xl lg:text-2xl font-bold text-white">{stat.value}</span>
            <span className="block text-sm text-gray-400">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
