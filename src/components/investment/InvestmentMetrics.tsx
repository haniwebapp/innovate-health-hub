
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
    <section className="bg-purple-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-10" 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-purple-900 mb-3">Investment Ecosystem Metrics</h2>
          <p className="text-purple-700 max-w-2xl mx-auto">
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
            className="bg-white rounded-xl shadow-md p-6 border border-purple-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active Investors</p>
                <h3 className="text-3xl font-bold text-purple-900">{counts.investors}+</h3>
                <p className="text-sm text-gray-500 mt-2">Healthcare focused investors</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>12% increase this quarter</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 border border-purple-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-400 to-indigo-600"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Healthcare Startups</p>
                <h3 className="text-3xl font-bold text-purple-900">{counts.startups}+</h3>
                <p className="text-sm text-gray-500 mt-2">Innovative solutions</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg group-hover:bg-indigo-200 transition-colors">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>23% growth year-over-year</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 border border-purple-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Funding</p>
                <h3 className="text-3xl font-bold text-purple-900">${counts.funding}M+</h3>
                <p className="text-sm text-gray-500 mt-2">Investment deployed</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>18% increase this year</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-md p-6 border border-purple-100 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-400 to-violet-600"></div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Success Rate</p>
                <h3 className="text-3xl font-bold text-purple-900">{counts.success}%</h3>
                <p className="text-sm text-gray-500 mt-2">Successful matches</p>
              </div>
              <div className="bg-violet-100 p-3 rounded-lg group-hover:bg-violet-200 transition-colors">
                <LineChart className="h-6 w-6 text-violet-600" />
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
