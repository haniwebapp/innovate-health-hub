
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const itemVariants = {
  initial: { y: 20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

// Additional platform features
const additionalFeatures = [
  {
    title: "Healthcare Data Analytics",
    description: "Access anonymized healthcare data insights and analytics to better understand market needs and opportunities.",
    icon: <ChevronRight className="w-5 h-5" />
  },
  {
    title: "Collaborative Workspaces",
    description: "Virtual environments for teams to collaborate on innovation projects with regulatory experts and mentors.",
    icon: <ChevronRight className="w-5 h-5" />
  },
  {
    title: "Innovation Assessment Tools",
    description: "Evaluate the potential impact and feasibility of healthcare innovations through standardized assessment frameworks.",
    icon: <ChevronRight className="w-5 h-5" />
  },
  {
    title: "Implementation Roadmaps",
    description: "Customized guidance for navigating the path from concept to market entry in the Saudi healthcare sector.",
    icon: <ChevronRight className="w-5 h-5" />
  }
];

export function AdditionalFeatures() {
  return (
    <div className="max-w-4xl mx-auto mt-16 mb-10">
      <motion.h2 
        className="text-3xl font-bold mb-4 text-moh-darkGreen"
        variants={itemVariants}
      >
        Additional Platform Capabilities
      </motion.h2>
      <motion.p 
        className="text-lg text-gray-600 mb-8"
        variants={itemVariants}
      >
        Beyond our core features, the platform offers these specialized capabilities:
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {additionalFeatures.map((feature, index) => (
          <motion.div 
            key={feature.title}
            variants={itemVariants} 
            className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-moh-gold/30 hover:shadow-sm transition-all duration-300"
          >
            <div className="bg-moh-lightGold/50 text-moh-darkGold p-3 rounded-lg h-fit">
              {feature.icon}
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
