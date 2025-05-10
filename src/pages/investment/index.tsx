
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
        {/* Hero Section */}
        <InvestmentHero />
        
        {/* Investment Metrics */}
        <InvestmentMetrics />
        
        {/* Main Content Tabs */}
        <section className="py-16 px-4 container mx-auto">
          <InvestmentTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </section>
        
        {/* AI-Powered Analysis Section */}
        <InvestmentAISection />
        
        {/* Featured Opportunities */}
        <InvestmentFeaturedOpportunities />
        
        {/* Call To Action */}
        <InvestmentCTA />
      </main>
      
      <Footer />
    </div>
  );
}
