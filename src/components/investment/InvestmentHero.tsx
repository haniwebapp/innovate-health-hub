
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, BarChart3, LineChart, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InvestmentHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-800 text-white">
      {/* Background decoration elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-purple-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-indigo-500 blur-3xl"></div>
      </div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full bg-purple-700 text-purple-100 text-sm font-medium"
            >
              Investment Hub
            </motion.span>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Healthcare Investment</span> Opportunities
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-purple-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Accelerating healthcare transformation with AI-powered investment matching, market insights, and connection opportunities for startups and investors.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Button asChild size="lg" className="bg-purple-500 hover:bg-purple-600">
                <Link to="/dashboard/investment">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-300 text-purple-100 hover:bg-purple-800/20">
                <Link to="#investment-opportunities">
                  Explore Opportunities
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:flex justify-end relative"
          >
            <div className="relative w-full max-w-md">
              {/* Decorative background for the illustration */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 rounded-2xl transform rotate-3"></div>
              
              {/* Investment illustration/visualization */}
              <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-purple-300/20 rounded-xl p-6 shadow-2xl transform -rotate-2">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="font-bold">Investment Dashboard</h3>
                  <span className="text-sm bg-purple-600/30 px-2 py-1 rounded">Live</span>
                </div>
                
                {/* Mock chart */}
                <div className="h-40 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-lg mb-4 flex items-end p-2">
                  <div className="h-1/3 w-1/6 bg-purple-400/60 rounded-t mx-1"></div>
                  <div className="h-1/2 w-1/6 bg-purple-500/60 rounded-t mx-1"></div>
                  <div className="h-2/3 w-1/6 bg-purple-600/60 rounded-t mx-1"></div>
                  <div className="h-1/2 w-1/6 bg-purple-500/60 rounded-t mx-1"></div>
                  <div className="h-3/4 w-1/6 bg-purple-600/60 rounded-t mx-1"></div>
                  <div className="h-5/6 w-1/6 bg-purple-700/60 rounded-t mx-1"></div>
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
                      <BarChart3 size={16} className="mr-1 text-purple-300" />
                      <span className="text-xs">Opportunities</span>
                    </div>
                    <p className="font-bold">42</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <LineChart size={16} className="mr-1 text-blue-400" />
                      <span className="text-xs">Success Rate</span>
                    </div>
                    <p className="font-bold">76%</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center mb-1">
                      <DollarSign size={16} className="mr-1 text-yellow-300" />
                      <span className="text-xs">Total Fund</span>
                    </div>
                    <p className="font-bold">$2.4M</p>
                  </div>
                </div>
                
                {/* Animated elements */}
                <motion.div 
                  className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
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
                  className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-gradient-to-r from-indigo-400 to-blue-400"
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
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-purple-50"></path>
        </svg>
      </div>
    </section>
  );
}
