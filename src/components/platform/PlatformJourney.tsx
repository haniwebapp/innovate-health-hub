
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { PhaseCard, PhaseItem } from "../phases/PhaseCard";
import { PhasePathway } from "../phases/PhasePathway";
import { 
  Home, Database, BarChart3, Globe, Zap,
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PlatformJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Platform phases with progress data
  const phases: PhaseItem[] = [
    {
      id: "core",
      name: "1. Core Platform",
      description: "Essential platform features including user management, innovation tracking, and challenges.",
      icon: <Home className="w-5 h-5" />,
      completionPercent: 100,
      isActive: false,
      milestones: [
        "User Dashboard",
        "Profiles & Authentication",
        "Innovation Management",
        "Challenge Framework"
      ]
    },
    {
      id: "collaboration",
      name: "2. Collaboration Features",
      description: "Collaborative tools to connect innovators, investors, and regulatory experts.",
      icon: <Database className="w-5 h-5" />,
      completionPercent: 75,
      isActive: true,
      milestones: [
        "Investment Hub",
        "Regulatory Sandbox",
        "Knowledge Hub",
        "Ecosystem Connections"
      ]
    },
    {
      id: "analytics",
      name: "3. Advanced Analytics",
      description: "Data-driven insights and analytics for platform users and innovations.",
      icon: <BarChart3 className="w-5 h-5" />,
      completionPercent: 25,
      isActive: false,
      milestones: [
        "Market Analysis",
        "Portfolio Management",
        "Investment Trends",
        "Performance Metrics"
      ]
    },
    {
      id: "ecosystem",
      name: "4. Ecosystem Integration",
      description: "Integration with external systems, APIs and the broader healthcare ecosystem.",
      icon: <Globe className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Partner APIs",
        "External Data Sources",
        "Ecosystem Connectivity",
        "Cross-platform Integration"
      ]
    },
    {
      id: "scale",
      name: "5. Scale & Optimization",
      description: "Performance enhancements, mobile optimization, and multi-language support.",
      icon: <Zap className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Performance Optimization",
        "Advanced UX Features",
        "Mobile Responsiveness",
        "Multi-language Support"
      ]
    }
  ];
  
  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollFadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-darkGreen text-sm font-medium mb-4">
              Platform Roadmap
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
              Platform Development Journey
            </h2>
            <p className="text-gray-600">
              Our platform is continuously evolving to provide better features and experiences for our users.
              Track our progress as we build the future of healthcare innovation.
            </p>
          </div>
        </ScrollFadeIn>
        
        {/* Journey pathway visualization */}
        <div className="relative h-[40px] mb-8">
          <PhasePathway inView={inView} accentColor="bg-moh-lightGreen" />
        </div>
        
        {/* Platform phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {phases.map((phase, index) => (
            <PhaseCard 
              key={phase.id} 
              phase={phase} 
              index={index} 
              inView={inView}
              total={phases.length}
              accentColor="bg-moh-lightGreen"
              activeColor="bg-moh-green" 
              completedColor="bg-moh-gold"
            />
          ))}
        </div>
        
        {/* CTA section */}
        <ScrollFadeIn delay={0.6} direction="up" className="mt-16 text-center">
          <Button 
            size="lg" 
            className="bg-moh-green hover:bg-moh-darkGreen text-white px-8"
          >
            <span>Explore Platform Features</span>
            <Check className="ml-2 h-4 w-4" />
          </Button>
        </ScrollFadeIn>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-moh-lightGreen opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-moh-lightGold opacity-10 blur-3xl" />
    </section>
  );
}
