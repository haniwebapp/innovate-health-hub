
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { MedicalHeading } from '@/components/ui/medical-heading';
import { MedicalButton } from '@/components/ui/medical-button';
import { MedicalCard } from '@/components/ui/medical-card';
import { MedicalBadge } from '@/components/ui/medical-badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  ChevronRight, 
  TrendingUp, 
  Brain, 
  BarChart3, 
  DollarSign, 
  Users, 
  Calendar, 
  ArrowRight,
  Lightbulb,
  BadgeCheck,
  Eye
} from "lucide-react";

// Animation variants for staggered animations
const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function InvestmentPage() {
  const [activeTab, setActiveTab] = useState('startups');
  const { t, language } = useLanguage();
  
  // Sample investment opportunities
  const investmentOpportunities = [
    {
      id: 1,
      title: "Remote Patient Monitoring Platform",
      category: "Digital Health",
      fundingStage: "Series A",
      description: "Comprehensive remote monitoring solution for chronic disease management with integrated telehealth features.",
      fundingTarget: "$2.5M",
      matchScore: 92,
      imageUrl: "/assets/investment/opportunity-1.jpg",
    },
    {
      id: 2,
      title: "Non-Invasive Glucose Monitor",
      category: "Medical Device",
      fundingStage: "Seed",
      description: "Revolutionary device for continuous glucose monitoring without needles, using advanced spectroscopy.",
      fundingTarget: "$750K",
      matchScore: 87,
      imageUrl: "/assets/investment/opportunity-2.jpg",
    },
    {
      id: 3,
      title: "AI-Powered Diagnostic Assistant",
      category: "Health AI",
      fundingStage: "Series B",
      description: "Machine learning platform that assists radiologists in detecting abnormalities in medical imaging.",
      fundingTarget: "$5M",
      matchScore: 94,
      imageUrl: "/assets/investment/opportunity-3.jpg",
    },
  ];

  // Animation variants for hero section
  const heroTextVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Hero Section with enhanced animations and modern design */}
      <section className="relative overflow-hidden bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
        {/* Background decoration elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            className="absolute top-20 left-10 w-72 h-72 rounded-full bg-moh-gold opacity-20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-moh-lightGold opacity-15 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
        </div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 z-0"></div>
        
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <MedicalBadge 
                variant="gold" 
                className="text-sm font-medium px-3 py-1.5"
                icon={<TrendingUp size={14} />}
              >
                Investment Hub
              </MedicalBadge>
              
              <MedicalHeading 
                as="h1" 
                size="h1" 
                className="font-bold"
                animated={false}
              >
                Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold">Healthcare Investment</span> Opportunities
              </MedicalHeading>
              
              <motion.p 
                className="text-lg md:text-xl text-moh-lightGreen leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.7 }}
              >
                Accelerating healthcare transformation with AI-powered investment matching, market insights, and connection opportunities for startups and investors.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <MedicalButton 
                  variant="goldGradient" 
                  size="lg" 
                  rounded="pill"
                  iconRight={<ArrowRight size={18} />}
                  className="font-medium"
                  onClick={() => window.location.href = "/dashboard/investment"}
                >
                  Get Started
                </MedicalButton>
                <MedicalButton 
                  variant="outline" 
                  size="lg" 
                  rounded="pill"
                  className="border-moh-gold/50 text-moh-lightGold hover:bg-moh-darkGreen/20 font-medium"
                  onClick={() => document.getElementById('investment-opportunities')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Explore Opportunities
                </MedicalButton>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="hidden md:flex justify-end relative"
            >
              <div className="relative w-full max-w-md">
                {/* Decorative background for the illustration */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-moh-green/30 to-moh-gold/30 rounded-2xl"
                  animate={{ rotate: [3, 2, 3] }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
                ></motion.div>
                
                {/* Investment illustration/visualization */}
                <motion.div 
                  className="relative z-10 bg-white/10 backdrop-blur-sm border border-moh-gold/20 rounded-xl p-6 shadow-2xl"
                  animate={{ rotate: [-2, -1, -2] }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                >
                  <div className="mb-4 flex justify-between items-center">
                    <h3 className="font-bold">Investment Dashboard</h3>
                    <MedicalBadge variant="gold" size="sm" className="text-xs">Live</MedicalBadge>
                  </div>
                  
                  {/* Mock chart */}
                  <div className="h-40 bg-gradient-to-r from-moh-green/20 to-moh-gold/20 rounded-lg mb-4 flex items-end p-2">
                    <motion.div 
                      className="h-1/3 w-1/6 bg-moh-green/60 rounded-t mx-1"
                      initial={{ height: 0 }}
                      animate={{ height: "33%" }}
                      transition={{ duration: 1, delay: 0.2 }}
                    ></motion.div>
                    <motion.div 
                      className="h-1/2 w-1/6 bg-moh-green/60 rounded-t mx-1"
                      initial={{ height: 0 }}
                      animate={{ height: "50%" }}
                      transition={{ duration: 1, delay: 0.3 }}
                    ></motion.div>
                    <motion.div 
                      className="h-2/3 w-1/6 bg-moh-darkGreen/60 rounded-t mx-1"
                      initial={{ height: 0 }}
                      animate={{ height: "66%" }}
                      transition={{ duration: 1, delay: 0.4 }}
                    ></motion.div>
                    <motion.div 
                      className="h-1/2 w-1/6 bg-moh-green/60 rounded-t mx-1"
                      initial={{ height: 0 }}
                      animate={{ height: "50%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>
                    <motion.div 
                      className="h-3/4 w-1/6 bg-moh-darkGreen/60 rounded-t mx-1"
                      initial={{ height: 0 }}
                      animate={{ height: "75%" }}
                      transition={{ duration: 1, delay: 0.6 }}
                    ></motion.div>
                    <motion.div 
                      className="h-5/6 w-1/6 bg-moh-darkGreen/60 rounded-t mx-1"
                      initial={{ height: 0 }}
                      animate={{ height: "83%" }}
                      transition={{ duration: 1, delay: 0.7 }}
                    ></motion.div>
                  </div>
                  
                  {/* Mock stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <TrendingUp size={16} className="mr-1 text-green-400" />
                        <span className="text-xs">Growth</span>
                      </div>
                      <motion.p 
                        className="font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                      >+24.5%</motion.p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <BarChart3 size={16} className="mr-1 text-moh-gold" />
                        <span className="text-xs">Opportunities</span>
                      </div>
                      <motion.p 
                        className="font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                      >42</motion.p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <TrendingUp size={16} className="mr-1 text-moh-lightGold" />
                        <span className="text-xs">Success Rate</span>
                      </div>
                      <motion.p 
                        className="font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                      >76%</motion.p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="flex items-center mb-1">
                        <DollarSign size={16} className="mr-1 text-moh-gold" />
                        <span className="text-xs">Total Fund</span>
                      </div>
                      <motion.p 
                        className="font-bold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.1 }}
                      >$2.4M</motion.p>
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
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Wave divider */}
        <motion.div 
          className="absolute bottom-0 left-0 w-full overflow-hidden z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16 md:h-24">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-moh-lightGreen"></path>
          </svg>
        </motion.div>
      </section>
      
      {/* Investment Metrics Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-moh-lightGreen to-white">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MedicalBadge variant="secondary" className="mb-4" icon={<BarChart3 size={14} />}>
              Performance Metrics
            </MedicalBadge>
            <MedicalHeading as="h2" size="h2" className="mb-4">
              Healthcare Investment Landscape
            </MedicalHeading>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover key performance indicators and growth opportunities in the healthcare investment ecosystem.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Total Investment", value: "$4.2B", subtext: "in healthcare startups", icon: <DollarSign className="text-moh-green" size={24} />, increase: "+18% YoY" },
              { title: "Active Investors", value: "320+", subtext: "specialized in healthcare", icon: <Users className="text-moh-green" size={24} />, increase: "+24% YoY" },
              { title: "Success Rate", value: "68%", subtext: "of funded innovations", icon: <BadgeCheck className="text-moh-green" size={24} />, increase: "+5% YoY" },
              { title: "Average ROI", value: "3.8x", subtext: "for medical technology", icon: <TrendingUp className="text-moh-green" size={24} />, increase: "+0.6x YoY" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={statsVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <MedicalCard 
                  className="h-full p-6 hover:border-moh-green/30" 
                  gradient={true}
                  hoverEffect={true}
                >
                  <div className="flex flex-col h-full">
                    <div className="rounded-full w-12 h-12 bg-moh-lightGreen flex items-center justify-center mb-4">
                      {stat.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{stat.title}</h3>
                    <div className="mt-2 mb-1">
                      <span className="text-3xl font-bold text-moh-darkGreen">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-500">{stat.subtext}</p>
                    <div className="mt-auto pt-4">
                      <MedicalBadge variant="secondary" className="text-xs bg-moh-lightGreen/70">
                        {stat.increase}
                      </MedicalBadge>
                    </div>
                  </div>
                </MedicalCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Investment Opportunities Section */}
      <section id="investment-opportunities" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <MedicalBadge variant="secondary" className="mb-4" icon={<Lightbulb size={14} />}>
              Featured Opportunities
            </MedicalBadge>
            <MedicalHeading as="h2" variant="gradient" size="h2" className="mb-4">
              Discover Promising Healthcare Innovations
            </MedicalHeading>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore high-potential healthcare projects actively seeking investment partners for growth and expansion.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerAnimation}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {investmentOpportunities.map((opportunity, index) => (
              <motion.div 
                key={opportunity.id}
                variants={itemAnimation}
                className="h-full"
              >
                <MedicalCard 
                  className="overflow-hidden border-moh-green/10 h-full flex flex-col"
                  hoverEffect={true}
                  elevation="medium"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                    <img 
                      src={opportunity.imageUrl}
                      alt={opportunity.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/assets/investment/placeholder.jpg";
                      }}
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <MedicalBadge variant="glass" className="text-xs font-medium">
                        {opportunity.category}
                      </MedicalBadge>
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <MedicalBadge variant="gold" className="text-xs font-medium">
                        {opportunity.fundingStage}
                      </MedicalBadge>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {opportunity.title}
                    </h3>
                    <p className="text-gray-600 mb-4 flex-grow">
                      {opportunity.description}
                    </p>
                    
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Funding target</p>
                        <p className="font-medium text-moh-darkGreen">
                          {opportunity.fundingTarget}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Match score</p>
                        <div className="flex items-center">
                          <span className="font-medium text-moh-green">
                            {opportunity.matchScore}%
                          </span>
                          <TrendingUp className="h-4 w-4 ml-1 text-moh-green" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <MedicalButton 
                        variant="gradient" 
                        rounded="pill"
                        className="w-full"
                        iconRight={<Eye size={16} />}
                        onClick={() => window.location.href = "/dashboard/investment"}
                      >
                        View Details
                      </MedicalButton>
                    </div>
                  </div>
                </MedicalCard>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <MedicalButton 
              variant="outline" 
              size="lg" 
              rounded="pill"
              iconRight={<ChevronRight size={18} />}
              onClick={() => window.location.href = "/dashboard/investment"}
            >
              Explore All Opportunities
            </MedicalButton>
          </motion.div>
        </div>
      </section>
      
      {/* AI Insights Section */}
      <section className="py-20 bg-gradient-to-br from-moh-green/5 to-moh-gold/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <MedicalBadge variant="secondary" icon={<Brain size={14} />} className="mb-4">
                AI-Powered Insights
              </MedicalBadge>
              <MedicalHeading as="h2" variant="gradient" size="h2" className="mb-6">
                Smart Investment Decisions Backed by Intelligent Analysis
              </MedicalHeading>
              
              <div className="space-y-6 mt-8">
                {[
                  {
                    title: "Pattern Recognition",
                    description: "Our AI analyzes thousands of successful healthcare ventures to identify patterns and success factors.",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 21H4.6C3.2 21 2 19.8 2 18.4V3"/><path d="m21 7-2.5 2.5c-.8.8-2 .8-2.8 0l-1.8-1.8c-.8-.8-2-.8-2.8 0L9.5 9.5c-.8.8-2 .8-2.8 0L5 7.9"/></svg>
                  },
                  {
                    title: "Market Forecast",
                    description: "Predictive analytics models future market trends to help you invest ahead of the curve.",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 13V2l8 4-8 4"/><path d="M20.55 10.23A9 9 0 1 1 8 4.94"/><path d="M8 10a5 5 0 1 0 8.9 2.02"/></svg>
                  },
                  {
                    title: "Matching Algorithm",
                    description: "Our sophisticated matching system connects your investment criteria with the perfect healthcare opportunities.",
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                    className="flex items-start gap-4"
                  >
                    <div className="rounded-full w-12 h-12 bg-moh-lightGreen flex items-center justify-center flex-shrink-0">
                      <span className="text-moh-green">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                <MedicalButton 
                  variant="gradient" 
                  size="lg" 
                  rounded="pill"
                  iconRight={<ArrowRight size={18} />}
                  onClick={() => window.location.href = "/dashboard/investment"}
                >
                  Try AI Analysis
                </MedicalButton>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border border-moh-green/10 overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-moh-green to-moh-darkGreen text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold">AI Investment Analysis</h3>
                      <Brain size={24} />
                    </div>
                    <p className="text-white/80 text-sm mt-1">Real-time market insights and opportunity matching</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                        <span className="font-medium">Market Trend Analysis</span>
                        <MedicalBadge variant="secondary" size="sm">96% accuracy</MedicalBadge>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Trending Healthcare Sectors</h4>
                        <div className="space-y-2">
                          {[
                            { name: "Remote Patient Monitoring", score: 96 },
                            { name: "AI Diagnostics", score: 92 },
                            { name: "Personalized Medicine", score: 89 },
                            { name: "Mental Health Tech", score: 85 }
                          ].map((sector, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{sector.name}</span>
                              <div className="flex items-center">
                                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2 overflow-hidden">
                                  <motion.div 
                                    className="bg-moh-green h-full rounded-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${sector.score}%` }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 + (index * 0.1), duration: 1 }}
                                  ></motion.div>
                                </div>
                                <span className="text-xs font-medium text-moh-darkGreen">{sector.score}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-medium text-gray-600 mb-3">AI Investment Insights</h4>
                        <div className="space-y-2">
                          {[
                            "Digital health solutions with remote monitoring features have a 34% higher chance of securing investment.",
                            "Investors are prioritizing solutions that integrate with existing healthcare systems in Saudi Arabia."
                          ].map((insight, index) => (
                            <motion.div 
                              key={index}
                              className="bg-moh-lightGreen/30 p-3 rounded-lg text-sm"
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.7 + (index * 0.2), duration: 0.5 }}
                            >
                              <div className="flex">
                                <Lightbulb size={16} className="text-moh-green mr-2 flex-shrink-0 mt-0.5" />
                                <p>{insight}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-moh-gold/10 rounded-full blur-3xl z-0"></div>
              <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-moh-green/10 rounded-full blur-3xl z-0"></div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call To Action */}
      <section className="py-20 bg-gradient-to-r from-moh-green to-moh-darkGreen text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto"
          >
            <MedicalBadge variant="gold" className="mb-6" icon={<DollarSign size={14} />}>
              Start Your Journey
            </MedicalBadge>
            <MedicalHeading as="h2" size="h2" className="text-white mb-6">
              Ready to Transform Healthcare Through Strategic Investment?
            </MedicalHeading>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              Join our platform to connect with curated healthcare investment opportunities, access AI-powered insights, and make data-driven investment decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MedicalButton 
                variant="goldGradient" 
                size="lg" 
                rounded="pill"
                iconRight={<ArrowRight size={18} />}
                onClick={() => window.location.href = "/dashboard/investment"}
              >
                Explore Investment Hub
              </MedicalButton>
              <MedicalButton 
                variant="glass" 
                size="lg" 
                rounded="pill"
                className="backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => window.location.href = "/contact"}
              >
                Contact Our Team
              </MedicalButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
