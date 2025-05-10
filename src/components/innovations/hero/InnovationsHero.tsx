
import { FileUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface InnovationsHeroProps {
  showAIMatches: boolean;
  setShowAIMatches: (value: boolean) => void;
}

export default function InnovationsHero({ 
  showAIMatches, 
  setShowAIMatches 
}: InnovationsHeroProps) {
  return (
    <div className="bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative py-12">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-moh-darkGreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Health Innovations Showcase
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-gray-700 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover cutting-edge innovations transforming healthcare across Saudi Arabia
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button
              asChild
              className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white flex items-center gap-2 group shadow-lg hover:shadow-xl transition-all"
            >
              <Link to="/innovations/submit">
                <FileUp size={18} />
                Submit Innovation
                <span className="hidden sm:inline ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className={`border-2 ${showAIMatches ? 'border-moh-gold bg-moh-lightGold/20' : 'border-moh-green'} text-moh-darkGreen hover:bg-moh-lightGreen/20 flex items-center gap-2 shadow-md hover:shadow-lg transition-all`}
              onClick={() => setShowAIMatches(!showAIMatches)}
            >
              <Lightbulb size={18} className={showAIMatches ? "text-moh-gold" : "text-moh-darkGreen"} />
              {showAIMatches ? "Hide AI Matches" : "Show AI Matches"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
