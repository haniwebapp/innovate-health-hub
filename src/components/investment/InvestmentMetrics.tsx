
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Globe, DollarSign, LineChart } from 'lucide-react';

export function InvestmentMetrics() {
  // Animation for the counter effect
  const [counts, setCounts] = useState({
    investors: 0,
    startups: 0,
    funding: 0,
    success: 0
  });
  
  const targetCounts = {
    investors: 150,
    startups: 430,
    funding: 45,
    success: 88
  };
  
  useEffect(() => {
    const duration = 2000; // 2 seconds duration
    const frameRate = 60;
    const totalFrames = duration / (1000 / frameRate);
    
    let frame = 0;
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      setCounts({
        investors: Math.floor(progress * targetCounts.investors),
        startups: Math.floor(progress * targetCounts.startups),
        funding: Math.floor(progress * targetCounts.funding),
        success: Math.floor(progress * targetCounts.success)
      });
      
      if (frame === totalFrames) {
        clearInterval(counter);
        setCounts(targetCounts);
      }
    }, 1000 / frameRate);
    
    return () => clearInterval(counter);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  return (
    <section className="bg-moh-lightGreen py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-3">Investment Ecosystem Metrics</h2>
          <p className="text-moh-green max-w-2xl mx-auto">
            Our growing network connects healthcare innovators with strategic investors to accelerate healthcare transformation across Saudi Arabia.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 border border-moh-lightGreen relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-moh-green to-moh-darkGreen"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Investors</p>
                <h3 className="text-3xl font-bold text-moh-darkGreen">{counts.investors}+</h3>
                <p className="text-sm text-gray-500 mt-2">Healthcare focused investors</p>
              </div>
              <div className="bg-moh-lightGreen p-3 rounded-lg group-hover:bg-moh-lightGreen/80 transition-colors">
                <Users className="h-6 w-6 text-moh-green" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12% increase this quarter</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 border border-moh-lightGreen relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-moh-gold to-moh-darkGold"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Healthcare Startups</p>
                <h3 className="text-3xl font-bold text-moh-darkGreen">{counts.startups}+</h3>
                <p className="text-sm text-gray-500 mt-2">Innovative solutions</p>
              </div>
              <div className="bg-moh-lightGold p-3 rounded-lg group-hover:bg-moh-lightGold/80 transition-colors">
                <Award className="h-6 w-6 text-moh-gold" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>23% growth year-over-year</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 border border-moh-lightGreen relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-moh-green to-moh-gold"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Funding</p>
                <h3 className="text-3xl font-bold text-moh-darkGreen">${counts.funding}M+</h3>
                <p className="text-sm text-gray-500 mt-2">Investment deployed</p>
              </div>
              <div className="bg-moh-lightGreen p-3 rounded-lg group-hover:bg-moh-lightGreen/80 transition-colors">
                <DollarSign className="h-6 w-6 text-moh-darkGreen" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>18% increase this year</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 border border-moh-lightGreen relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-moh-darkGreen to-moh-green"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Success Rate</p>
                <h3 className="text-3xl font-bold text-moh-darkGreen">{counts.success}%</h3>
                <p className="text-sm text-gray-500 mt-2">Successful matches</p>
              </div>
              <div className="bg-moh-lightGreen p-3 rounded-lg group-hover:bg-moh-lightGreen/80 transition-colors">
                <LineChart className="h-6 w-6 text-moh-green" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>5% higher than industry average</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
