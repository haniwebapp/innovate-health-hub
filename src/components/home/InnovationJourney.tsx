
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { InnovationPhase } from "./journey/InnovationPhase";
import { InnovationPathway } from "./journey/InnovationPathway";
import { Sparkles, FileUp, Award, Database, Check, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InnovationJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  
  // Innovation phases with progress data
  const phases = [
    {
      id: "ideation",
      name: "1. Idea Generation",
      description: "Submit your innovative healthcare solutions to address current challenges.",
      icon: <Sparkles className="w-5 h-5" />,
      completionPercent: 100,
      isActive: false,
      milestones: [
        "Define problem",
        "Research existing solutions",
        "Develop concept",
        "Validate with stakeholders"
      ]
    },
    {
      id: "submission",
      name: "2. Submission",
      description: "Complete your innovation submission with all required details and documentation.",
      icon: <FileUp className="w-5 h-5" />,
      completionPercent: 75,
      isActive: true,
      milestones: [
        "Basic information",
        "Technical details",
        "Supporting documentation",
        "Review & submit"
      ]
    },
    {
      id: "evaluation",
      name: "3. Evaluation",
      description: "Expert reviewers assess innovations based on impact, feasibility, and innovation.",
      icon: <Award className="w-5 h-5" />,
      completionPercent: 25,
      isActive: false,
      milestones: [
        "Initial screening",
        "Technical evaluation",
        "Impact assessment",
        "Financial viability"
      ]
    },
    {
      id: "matching",
      name: "4. Opportunity Matching",
      description: "Connect with investors, partners, and stakeholders to advance your innovation.",
      icon: <Database className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Investor matching",
        "Partner connections",
        "Regulatory guidance",
        "Market access planning"
      ]
    },
    {
      id: "implementation",
      name: "5. Implementation",
      description: "Bring your innovation to market with support from our ecosystem partners.",
      icon: <Flag className="w-5 h-5" />,
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Pilot implementation",
        "Evaluation & feedback",
        "Scaling strategy",
        "Market entry"
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
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-moh-darkGreen">
              Innovation Journey
            </h2>
            <p className="text-gray-600">
              Our platform provides a structured pathway to bring your healthcare innovation from concept to implementation, with support at every stage.
            </p>
          </div>
        </ScrollFadeIn>
        
        {/* Journey pathway visualization */}
        <div className="relative h-[40px] mb-8">
          <InnovationPathway inView={inView} />
        </div>
        
        {/* Innovation phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {phases.map((phase, index) => (
            <InnovationPhase 
              key={phase.id} 
              phase={phase} 
              index={index} 
              inView={inView}
              total={phases.length}
            />
          ))}
        </div>
        
        {/* CTA section */}
        <ScrollFadeIn delay={0.6} direction="up" className="mt-16 text-center">
          <Button 
            size="lg" 
            className="bg-moh-green hover:bg-moh-darkGreen text-white px-8"
          >
            <span>Start Your Journey</span>
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
