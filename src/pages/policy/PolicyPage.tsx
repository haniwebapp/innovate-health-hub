
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GlassCard } from "@/components/ui/glassmorphism";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Vision2030AlignmentChecker } from "@/components/policy/vision-alignment";
import { StrategyAnalytics, StrategyGapAnalyzer } from "@/components/policy/strategy";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Lightbulb, Scale, FileCheck, Activity } from "lucide-react";

const PolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen">
          Healthcare Policy & Governance
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the latest healthcare policies, analyze alignment with Vision 2030, and understand strategic implications for healthcare innovation.
        </p>
      </motion.div>

      {/* Policy Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Tool 
          title="Vision 2030 Alignment Checker" 
          description="Check how your healthcare initiative aligns with Saudi Arabia's Vision 2030 goals and objectives."
          icon={<Lightbulb className="h-6 w-6" />}
          delay={0.1}
          link="#vision-alignment"
        />
        <Tool 
          title="Strategy Gap Analysis" 
          description="Identify gaps between current healthcare initiatives and strategic objectives."
          icon={<Activity className="h-6 w-6" />}
          delay={0.2}
          link="#strategy-gap"
        />
        <Tool 
          title="Policy Analytics Dashboard" 
          description="Interactive dashboards showing policy impacts and adoption metrics."
          icon={<FileCheck className="h-6 w-6" />}
          delay={0.3}
          link="#policy-analytics"
        />
      </div>
      
      {/* Vision 2030 Alignment Section */}
      <section id="vision-alignment" className="mb-20">
        <SectionHeader 
          title="Vision 2030 Alignment" 
          description="Check how your healthcare initiatives align with Vision 2030 strategic objectives."
        />
        
        <GlassCard variant="white" className="p-6">
          <Vision2030AlignmentChecker />
        </GlassCard>
      </section>
      
      {/* Strategy Gap Analysis Section */}
      <section id="strategy-gap" className="mb-20">
        <SectionHeader 
          title="Strategy Gap Analysis" 
          description="Identify and analyze gaps between current policies and strategic objectives."
        />
        
        <GlassCard variant="subtle" className="p-6">
          <StrategyGapAnalyzer />
        </GlassCard>
      </section>
      
      {/* Policy Analytics Dashboard */}
      <section id="policy-analytics" className="mb-20">
        <SectionHeader 
          title="Policy Analytics" 
          description="Interactive analytics dashboard showing policy impacts and adoption metrics."
        />
        
        <GlassCard variant="green" className="p-6">
          <StrategyAnalytics />
        </GlassCard>
      </section>
      
      {/* Latest Policy Documents */}
      <section className="mb-12">
        <SectionHeader 
          title="Latest Policy Documents" 
          description="Access the most recent healthcare policy publications and guidelines."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PolicyDocument 
            title="Digital Health Strategy 2025" 
            date="May 2025"
            type="Strategy"
            imageUrl="/lovable-uploads/90b8f7e1-a93b-49bc-9fd6-06a4beeff4e6.png"
          />
          <PolicyDocument 
            title="Telehealth Regulatory Framework" 
            date="April 2025"
            type="Regulations"
            imageUrl="/lovable-uploads/8b61ff0c-8ac1-4567-a8c2-24b34ecda18b.png"
          />
          <PolicyDocument 
            title="AI in Healthcare: Ethical Guidelines" 
            date="March 2025"
            type="Guidelines"
            imageUrl="/lovable-uploads/f997b965-bd17-4e6d-ba9c-af09c86b0eb0.png"
          />
        </div>
      </section>
    </div>
  );
};

// Helper component for tools
const Tool = ({ title, description, icon, delay, link }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
  >
    <a href={link}>
      <Card className="h-full hover:shadow-lg transition-shadow border-moh-green/10 hover:border-moh-green/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="h-12 w-12 rounded-full bg-moh-lightGreen flex items-center justify-center text-moh-green">
              {icon}
            </div>
            <ChevronRight className="h-5 w-5 text-moh-green/60" />
          </div>
          <CardTitle className="mt-4">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
      </Card>
    </a>
  </motion.div>
);

// Helper component for section headers
const SectionHeader = ({ title, description }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-semibold text-moh-darkGreen mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

// Helper component for policy documents
const PolicyDocument = ({ title, date, type, imageUrl }) => (
  <motion.div
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <Card className="overflow-hidden hover:shadow-lg transition-all border-moh-green/10 hover:border-moh-green/30">
      <div className="relative h-48">
        <AspectRatio ratio={16/9}>
          <img 
            src={imageUrl} 
            alt={title} 
            className="object-cover w-full h-full" 
          />
        </AspectRatio>
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-xs font-medium text-moh-darkGreen">
          {type}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <FileText className="h-4 w-4 text-moh-green mr-2" />
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <button className="text-sm text-moh-green flex items-center hover:underline">
          View Document
          <ChevronRight className="h-4 w-4 ml-1" />
        </button>
      </CardContent>
    </Card>
  </motion.div>
);

export default PolicyPage;
