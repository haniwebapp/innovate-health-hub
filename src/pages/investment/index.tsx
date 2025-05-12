
import React, { useState } from 'react';
import MedicalNavbar from "@/components/layouts/MedicalNavbar";
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
import { ChevronRight, TrendingUp } from "lucide-react";
import { AnimatedWavesDivider } from '@/components/animations/AnimatedWavesDivider';
import { MedicalButton } from '@/components/ui/medical-button';

export default function InvestmentPage() {
  const [activeTab, setActiveTab] = useState('startups');
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGreen">
      <MedicalNavbar />
      <ScrollProgress />
      
      <main className="flex-grow pt-0 my-0 rounded-none py-0">
        {/* Hero Section - Now with updated green theme */}
        <section className="relative overflow-hidden bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
          {/* Background decoration elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-moh-gold blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-moh-lightGold blur-3xl"></div>
            <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-moh-darkGreen blur-3xl"></div>
          </div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[url('/medical-dna-pattern.svg')] opacity-10 bg-repeat"></div>
          
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
                  className="inline-block px-3 py-1 rounded-full bg-moh-darkGreen text-moh-lightGreen text-sm font-medium"
                >
                  Investment Hub
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold">Healthcare Investment</span> Opportunities
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-moh-lightGreen"
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
                  <MedicalButton variant="gold" asChild>
                    <a href="/dashboard/investment" className="flex items-center justify-center">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </a>
                  </MedicalButton>
                  <MedicalButton variant="outline" asChild>
                    <a href="#investment-opportunities" className="border-moh-gold/50 text-moh-lightGold hover:bg-moh-darkGreen/20">
                      Explore Opportunities
                    </a>
                  </MedicalButton>
                </motion.div>
              </motion.div>
              
              <InvestmentHero />
            </div>
          </div>
          
          <AnimatedWavesDivider color="text-moh-lightGreen" secondaryColor="text-white" />
        </section>
        
        {/* Investment Metrics */}
        <InvestmentMetrics />
        
        {/* Main Content Tabs */}
        <section className="py-16 px-4 container mx-auto">
          <InvestmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </section>
        
        {/* AI-Powered Analysis Section */}
        <InvestmentAISection />
        
        {/* Featured Opportunities with updated green theme */}
        <section className="py-16 bg-gradient-to-br from-moh-lightGreen to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="bg-moh-lightGreen text-moh-green text-sm font-medium px-3 py-1 rounded-full">Curated Selection</span>
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
                  className="h-full"
                >
                  <div 
                    className="h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-moh-lightGreen"
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
                        <span className="text-sm text-moh-green font-medium">
                          {item === 1 ? "Digital Health" : item === 2 ? "Medical Device" : "Health AI"}
                        </span>
                        <span className="bg-moh-lightGreen text-moh-darkGreen text-xs font-medium px-2 py-1 rounded">
                          {item === 1 ? "Series A" : item === 2 ? "Seed" : "Series B"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        {item === 1 ? "Remote Patient Monitoring Platform" : 
                        item === 2 ? "Non-Invasive Glucose Monitor" : 
                        "AI-Powered Diagnostic Assistant"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
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
                            <span className="font-medium text-moh-green">
                              {item === 1 ? "92%" : item === 2 ? "87%" : "94%"}
                            </span>
                            <TrendingUp className="h-4 w-4 ml-1 text-moh-green" />
                          </div>
                        </div>
                      </div>
                      <MedicalButton variant="default" className="mt-5 w-full" asChild>
                        <a href="/dashboard/investment">
                          View Details
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </a>
                      </MedicalButton>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <MedicalButton variant="outline" asChild>
                <a href="/dashboard/investment" className="inline-flex items-center">
                  View All Opportunities
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </MedicalButton>
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
