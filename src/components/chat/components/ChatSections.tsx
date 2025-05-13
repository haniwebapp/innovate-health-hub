
import React from "react";
import { Lightbulb, Award, DollarSign, ShieldCheck, BookOpen, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type Section = {
  id: string;
  label: string;
  icon: React.ReactNode;
  description: string;
};

export const sections: Section[] = [
  { 
    id: "innovation-marketplace", 
    label: "Innovation Marketplace", 
    icon: <Lightbulb className="text-moh-gold" />,
    description: "Discover and connect with innovative healthcare solutions."
  },
  { 
    id: "challenges-portal", 
    label: "Challenges Portal", 
    icon: <Award className="text-moh-gold" />,
    description: "Explore healthcare challenges and submit your solutions."
  },
  { 
    id: "funding-opportunities", 
    label: "Funding Opportunities", 
    icon: <DollarSign className="text-moh-gold" />,
    description: "Find funding options for your healthcare innovation."
  },
  { 
    id: "regulatory-sandbox", 
    label: "Regulatory Sandbox", 
    icon: <ShieldCheck className="text-moh-gold" />,
    description: "Navigate the regulatory landscape for healthcare innovations."
  },
  { 
    id: "knowledge-hub", 
    label: "Knowledge Hub", 
    icon: <BookOpen className="text-moh-gold" />,
    description: "Access resources and educational content."
  },
  { 
    id: "events", 
    label: "Events", 
    icon: <CalendarDays className="text-moh-gold" />,
    description: "Discover upcoming events, workshops, and webinars."
  }
];

interface ChatSectionsProps {
  currentSection: string | null;
  onSelectSection: (sectionId: string) => void;
}

export function ChatSections({ currentSection, onSelectSection }: ChatSectionsProps) {
  return (
    <div className="h-full overflow-y-auto p-2">
      <div className="grid grid-cols-2 gap-2">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-xl",
              "transition-colors border",
              currentSection === section.id 
                ? "bg-moh-green/10 border-moh-green/30" 
                : "bg-white hover:bg-gray-50 border-gray-100"
            )}
            onClick={() => onSelectSection(section.id)}
          >
            <div className="h-8 w-8 flex items-center justify-center mb-2">
              {section.icon}
            </div>
            <span className="text-xs font-medium text-center">{section.label}</span>
          </motion.button>
        ))}
      </div>
      
      <div className="p-3 mt-2 mx-2 bg-moh-gold/10 rounded-lg border border-moh-gold/20">
        <h4 className="text-xs font-medium text-moh-gold mb-1">Tip:</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          Select a section to get specialized assistance and resources related to that area.
        </p>
      </div>
    </div>
  );
}
