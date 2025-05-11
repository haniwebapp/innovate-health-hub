
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { PhaseCard, PhaseItem } from "../phases/PhaseCard";
import { PhasePathway } from "../phases/PhasePathway";
import { 
  Cpu, BrainCircuit, LineChart, UserPlus, ServerCog,
  Check 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // AI phases with progress data
  const phases: PhaseItem[] = [
    {
      id: "foundation",
      name: "1. Foundation AI",
      description: "Core AI infrastructure with basic service architecture and integration capabilities.",
      icon: <Cpu className="w-5 h-5" />,
      completionPercent: 100,
      isActive: false,
      milestones: [
        "AI Service Architecture",
        "Service Registry",
        "Error Handling",
        "Basic AI Operations"
      ]
    },
    {
      id: "domain",
      name: "2. Domain Intelligence",
      description: "Domain-specific AI capabilities tailored for healthcare innovation.",
      icon: <BrainCircuit className="w-5 h-5" />,
      completionPercent: 75,
      isActive: true,
      milestones: [
        "Investment Analysis AI",
        "Regulatory Compliance AI",
        "Innovation Assessment AI",
        "Policy Analysis AI"
      ]
    },
    {
      id: "predictive",
      name: "3. Predictive Capabilities",
      description: "Advanced predictive analytics for healthcare innovation outcomes.",
      icon: <LineChart className="w-5 h-5" />,
      completionPercent: 25,
      isActive: false,
      milestones: [
        "Trend Forecasting",
        "Success Prediction",
        "Risk Assessment",
        "Market Opportunity Detection"
      ]
    },
    {
      id: "personalization",
      name: "4. Advanced Personalization",
      description: "User-specific recommendations and personalized insights through AI.",
      icon: <UserPlus className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "User-specific Recommendations",
        "Adaptive Learning",
        "Personalized Insights",
        "Context-aware Assistance"
      ]
    },
    {
      id: "autonomous",
      name: "5. Autonomous Operations",
      description: "Self-optimizing workflows and automated decision support systems.",
      icon: <ServerCog className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Self-optimizing Workflows",
        "Automated Decision Support",
        "Intelligent Resource Allocation",
        "System Health Management"
      ]
    }
  ];
  
  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollFadeIn>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
              AI Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800">
              AI Development Journey
            </h2>
            <p className="text-gray-600">
              Our AI capabilities are continuously evolving to provide smarter insights and automation
              for healthcare innovation. Track our progress as we build advanced AI features.
            </p>
          </div>
        </ScrollFadeIn>
        
        {/* Journey pathway visualization */}
        <div className="relative h-[40px] mb-8">
          <PhasePathway inView={inView} accentColor="bg-purple-200" />
        </div>
        
        {/* AI phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {phases.map((phase, index) => (
            <PhaseCard 
              key={phase.id} 
              phase={phase} 
              index={index} 
              inView={inView}
              total={phases.length}
              accentColor="bg-purple-100"
              activeColor="bg-purple-600" 
              completedColor="bg-indigo-400"
            />
          ))}
        </div>
        
        {/* CTA section */}
        <ScrollFadeIn delay={0.6} direction="up" className="mt-16 text-center">
          <Button 
            size="lg" 
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
          >
            <span>Experience AI Capabilities</span>
            <Check className="ml-2 h-4 w-4" />
          </Button>
        </ScrollFadeIn>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-100 opacity-20 blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] rounded-full bg-indigo-100 opacity-20 blur-3xl" />
    </section>
  );
}
