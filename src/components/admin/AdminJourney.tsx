
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { PhaseCard, PhaseItem } from "../phases/PhaseCard";
import { PhasePathway } from "../phases/PhasePathway";
import { 
  Settings, Gauge, PieChart, Globe, Shield,
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { AccessDenied } from "@/components/common/AccessDenied";

export default function AdminJourney() {
  const { isAdmin } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Admin phases with progress data
  const phases: PhaseItem[] = [
    {
      id: "core-admin",
      name: "1. Core Administration",
      description: "Essential admin features including user management, settings, and basic analytics.",
      icon: <Settings className="w-5 h-5" />,
      completionPercent: 100,
      isActive: false,
      milestones: [
        "User Management",
        "Basic Settings",
        "Dashboard Analytics",
        "Content Management"
      ]
    },
    {
      id: "advanced-management",
      name: "2. Advanced Management",
      description: "Enhanced administration tools for platform governance and oversight.",
      icon: <Gauge className="w-5 h-5" />,
      completionPercent: 75,
      isActive: true,
      milestones: [
        "Challenge Administration",
        "Innovation Registry",
        "Knowledge Base Management",
        "Integration Management"
      ]
    },
    {
      id: "analytics-reporting",
      name: "3. Analytics & Reporting",
      description: "Comprehensive analytics and custom reporting capabilities.",
      icon: <PieChart className="w-5 h-5" />,
      completionPercent: 25,
      isActive: false,
      milestones: [
        "Advanced Analytics",
        "Custom Reporting",
        "Performance Monitoring",
        "Engagement Metrics"
      ]
    },
    {
      id: "ecosystem-governance",
      name: "4. Ecosystem Governance",
      description: "Tools for policy management, compliance, and partner ecosystem oversight.",
      icon: <Globe className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Policy Management",
        "Compliance Monitoring",
        "Partner Management",
        "Service Level Agreements"
      ]
    },
    {
      id: "enterprise-features",
      name: "5. Enterprise Features",
      description: "Advanced enterprise-grade capabilities for large-scale operations.",
      icon: <Shield className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Multi-tenant Management",
        "Enterprise Security",
        "Advanced Access Controls",
        "Audit & Compliance Tools"
      ]
    }
  ];
  
  if (!isAdmin) {
    return <AccessDenied />;
  }

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollFadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGold text-moh-darkGold text-sm font-medium mb-4">
              Admin Tools
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
              Administration Development
            </h2>
            <p className="text-gray-600">
              Track the development of administration capabilities for platform governance, 
              reporting, and enterprise management features.
            </p>
          </div>
        </ScrollFadeIn>
        
        {/* Journey pathway visualization */}
        <div className="relative h-[40px] mb-8">
          <PhasePathway inView={inView} accentColor="bg-moh-lightGold" />
        </div>
        
        {/* Admin phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {phases.map((phase, index) => (
            <PhaseCard 
              key={phase.id} 
              phase={phase} 
              index={index} 
              inView={inView}
              total={phases.length}
              accentColor="bg-moh-lightGold"
              activeColor="bg-moh-gold" 
              completedColor="bg-moh-darkGold"
            />
          ))}
        </div>
        
        {/* CTA section */}
        <ScrollFadeIn delay={0.6} direction="up" className="mt-16 text-center">
          <Button 
            size="lg" 
            className="bg-moh-gold hover:bg-moh-darkGold text-white px-8"
          >
            <span>Access Admin Dashboard</span>
            <Check className="ml-2 h-4 w-4" />
          </Button>
        </ScrollFadeIn>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-moh-lightGold opacity-10 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-moh-gold opacity-10 blur-3xl" />
    </section>
  );
}
