
import React, { useState } from 'react';
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { motion } from "framer-motion";
import { InvestmentHero } from '@/components/investment/InvestmentHero';
import { InvestmentTabs } from '@/components/investment/InvestmentTabs';
import { InvestmentAISection } from '@/components/investment/InvestmentAISection';
import { InvestmentMetrics } from '@/components/investment/InvestmentMetrics';
import { InvestmentFeaturedOpportunities } from '@/components/investment/InvestmentFeaturedOpportunities';
import { InvestmentCTA } from '@/components/investment/InvestmentCTA';
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { useLanguage } from '@/contexts/LanguageContext';

export default function InvestmentPage() {
  const [activeTab, setActiveTab] = useState('startups');
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <Navbar />
      <ScrollProgress />
      
      <main className="flex-grow pt-0 my-0 rounded-none py-0">
        {/* Hero Section - Now with updated purple theme */}
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
                  <a href="/dashboard/investment" className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                  <a href="#investment-opportunities" className="border border-purple-300 text-purple-100 hover:bg-purple-800/20 font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    Explore Opportunities
                  </a>
                </motion.div>
              </motion.div>
              
              <InvestmentHero />
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-purple-50"></path>
            </svg>
          </div>
        </section>
        
        {/* Investment Metrics */}
        <InvestmentMetrics />
        
        {/* Main Content Tabs */}
        <section className="py-16 px-4 container mx-auto">
          <InvestmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </section>
        
        {/* AI-Powered Analysis Section */}
        <InvestmentAISection />
        
        {/* Featured Opportunities with updated purple theme */}
        <section className="py-16 bg-gradient-to-br from-purple-50 to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-purple-100 text-purple-700 text-sm font-medium px-3 py-1 rounded-full">Curated Selection</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">Featured Investment Opportunities</h2>
                <p className="text-gray-600 max-w-3xl mx-auto">
                  Discover high-potential healthcare innovations carefully selected to match investor preferences and market demands.
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: item * 0.1 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-purple-100"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`/assets/investment/opportunity-${item}.jpg`} 
                      alt="Investment opportunity" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/investment/placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-purple-600 font-medium">
                        {item === 1 ? "Digital Health" : item === 2 ? "Medical Device" : "Health AI"}
                      </span>
                      <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                        {item === 1 ? "Series A" : item === 2 ? "Seed" : "Series B"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {item === 1 ? "Remote Patient Monitoring Platform" : 
                      item === 2 ? "Non-Invasive Glucose Monitor" : 
                      "AI-Powered Diagnostic Assistant"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {item === 1 ? "Comprehensive remote monitoring solution for chronic disease management with integrated telehealth features." : 
                      item === 2 ? "Revolutionary device for continuous glucose monitoring without needles, using advanced spectroscopy." : 
                      "Machine learning platform that assists radiologists in detecting abnormalities in medical imaging."}
                    </p>
                    <div className="flex justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Funding target</p>
                        <p className="font-medium">
                          {item === 1 ? "$2.5M" : item === 2 ? "$750K" : "$5M"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Match score</p>
                        <div className="flex items-center">
                          <span className="font-medium text-purple-700">
                            {item === 1 ? "92%" : item === 2 ? "87%" : "94%"}
                          </span>
                          <TrendingUp className="h-4 w-4 ml-1 text-purple-600" />
                        </div>
                      </div>
                    </div>
                    <a href="/dashboard/investment" className="mt-5 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded flex items-center justify-center">
                      View Details
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <a href="/dashboard/investment" className="inline-flex items-center border border-purple-300 text-purple-700 hover:bg-purple-50 font-medium py-2 px-5 rounded-lg">
                View All Opportunities
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Call To Action */}
        <InvestmentCTA />
      </main>
      
      <Footer />
    </div>
  );
}
