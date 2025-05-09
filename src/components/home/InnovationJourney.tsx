
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Lightbulb, 
  Beaker, 
  ShieldCheck, 
  Rocket, 
  BarChart3, 
  ArrowRight,
  Check
} from "lucide-react";
import { ScrollFadeIn } from "@/components/animations/ScrollFadeIn";
import { Card, CardContent } from "@/components/ui/card";
import { InnovationPhase } from "@/components/home/journey/InnovationPhase";
import { InnovationPathway } from "@/components/home/journey/InnovationPathway";

export default function InnovationJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  // Innovation phases data - could be moved to a separate file or CMS
  const phases = [
    {
      id: "ideation",
      icon: <Lightbulb className="text-moh-gold w-6 h-6" />,
      name: t("home.journey.ideation.title") || "Ideation",
      description: t("home.journey.ideation.description") || 
        "Identifying healthcare challenges and developing innovative solutions",
      completionPercent: 100,
      isActive: false,
      milestones: [
        "Challenge identification",
        "Idea generation",
        "Concept validation",
        "Proposal submission"
      ]
    },
    {
      id: "development",
      icon: <Beaker className="text-moh-green w-6 h-6" />,
      name: t("home.journey.development.title") || "Development",
      description: t("home.journey.development.description") || 
        "Building prototypes and testing with stakeholders",
      completionPercent: 65,
      isActive: true,
      milestones: [
        "Technical planning",
        "Prototype development",
        "User testing",
        "Iteration cycles"
      ]
    },
    {
      id: "validation",
      icon: <ShieldCheck className="text-moh-darkGreen w-6 h-6" />,
      name: t("home.journey.validation.title") || "Validation",
      description: t("home.journey.validation.description") || 
        "Ensuring solutions meet clinical and regulatory standards",
      completionPercent: 15,
      isActive: false,
      milestones: [
        "Clinical trials",
        "Regulatory review",
        "Safety testing",
        "Effectiveness assessment"
      ]
    },
    {
      id: "implementation",
      icon: <Rocket className="text-moh-darkGold w-6 h-6" />,
      name: t("home.journey.implementation.title") || "Implementation",
      description: t("home.journey.implementation.description") || 
        "Scaling solutions across healthcare facilities",
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Deployment planning",
        "Staff training",
        "System integration",
        "Full-scale rollout"
      ]
    },
    {
      id: "impact",
      icon: <BarChart3 className="text-moh-gold w-6 h-6" />,
      name: t("home.journey.impact.title") || "Impact Measurement",
      description: t("home.journey.impact.description") || 
        "Evaluating outcomes and optimizing solutions",
      completionPercent: 0,
      isActive: false,
      milestones: [
        "Data collection",
        "Outcome analysis",
        "Optimization",
        "Continuous improvement"
      ]
    },
  ];

  // Find the current active phase
  const currentPhase = phases.find(phase => phase.isActive)?.name || phases[0].name;

  return (
    <section 
      ref={ref} 
      className="py-16 md:py-24 relative bg-gradient-to-b from-moh-lightGreen/20 to-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollFadeIn className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-moh-lightGreen text-moh-green text-sm font-medium mb-4">
            {t("home.journey.tag") || "Innovation Journey"}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-moh-darkGreen mb-4">
            {t("home.journey.title") || "Healthcare Innovation Roadmap"}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-700">
            {t("home.journey.description") || 
              "Our structured approach to healthcare innovation ensures ideas are properly vetted, developed, and implemented across Saudi Arabia's healthcare system."}
          </p>
        </ScrollFadeIn>

        {/* Current Phase Indicator */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md border border-moh-lightGreen/50">
            <div className="w-3 h-3 rounded-full bg-moh-green animate-pulse"></div>
            <span className="font-medium text-moh-darkGreen">
              {t("home.journey.currentPhase") || "Current Phase"}:
            </span>
            <span className="font-bold text-moh-green">{currentPhase}</span>
          </div>
        </motion.div>

        {/* Innovation Timeline */}
        <div 
          ref={containerRef}
          className="relative max-w-6xl mx-auto"
        >
          {/* Main Pathway */}
          <InnovationPathway inView={inView} />
          
          {/* Phase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
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
        </div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-moh-green/5 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-moh-gold/5 blur-3xl"></div>
    </section>
  );
}
