
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, LineChart, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InvestmentHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="hidden md:flex justify-end relative"
    >
      <div className="relative w-full max-w-md">
        {/* Decorative background for the illustration */}
        <div className="absolute inset-0 bg-gradient-to-br from-moh-green/30 to-moh-gold/30 rounded-2xl transform rotate-3"></div>
        
        {/* Investment illustration/visualization */}
        <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-moh-gold/20 rounded-xl p-6 shadow-2xl transform -rotate-2">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="font-bold">Investment Dashboard</h3>
            <span className="text-sm bg-moh-green/30 px-2 py-1 rounded">Live</span>
          </div>
          
          {/* Mock chart */}
          <div className="h-40 bg-gradient-to-r from-moh-green/20 to-moh-gold/20 rounded-lg mb-4 flex items-end p-2">
            <div className="h-1/3 w-1/6 bg-moh-green/60 rounded-t mx-1"></div>
            <div className="h-1/2 w-1/6 bg-moh-green/60 rounded-t mx-1"></div>
            <div className="h-2/3 w-1/6 bg-moh-darkGreen/60 rounded-t mx-1"></div>
            <div className="h-1/2 w-1/6 bg-moh-green/60 rounded-t mx-1"></div>
            <div className="h-3/4 w-1/6 bg-moh-darkGreen/60 rounded-t mx-1"></div>
            <div className="h-5/6 w-1/6 bg-moh-darkGreen/60 rounded-t mx-1"></div>
          </div>
          
          {/* Mock stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <TrendingUp size={16} className="mr-1 text-green-400" />
                <span className="text-xs">Growth</span>
              </div>
              <p className="font-bold">+24.5%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <BarChart3 size={16} className="mr-1 text-moh-gold" />
                <span className="text-xs">Opportunities</span>
              </div>
              <p className="font-bold">42</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <LineChart size={16} className="mr-1 text-moh-lightGold" />
                <span className="text-xs">Success Rate</span>
              </div>
              <p className="font-bold">76%</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex items-center mb-1">
                <DollarSign size={16} className="mr-1 text-moh-gold" />
                <span className="text-xs">Total Fund</span>
              </div>
              <p className="font-bold">$2.4M</p>
            </div>
          </div>
          
          {/* Animated elements */}
          <motion.div 
            className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-moh-green to-moh-gold"
            animate={{ 
              y: [0, -10, 0],
              opacity: [1, 0.8, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-gradient-to-r from-moh-darkGreen to-moh-gold"
            animate={{ 
              y: [0, 10, 0],
              opacity: [1, 0.7, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
