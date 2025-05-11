
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb, ShieldAlert, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface AISuggestion {
  id: string;
  text: string;
  link: string;
  linkText: string;
  priority: 'high' | 'medium' | 'low';
  isNew?: boolean;
  icon?: 'lightbulb' | 'shield' | 'clock';
}

// Helper function to get icon component based on type
export const getIconComponent = (iconType: string | undefined) => {
  switch(iconType) {
    case 'shield':
      return <ShieldAlert className="h-4 w-4 text-moh-green" />;
    case 'clock':
      return <Clock className="h-4 w-4 text-amber-500" />;
    case 'lightbulb':
    default:
      return <Lightbulb className="h-4 w-4 text-moh-gold" />;
  }
};

// Helper function to get priority class
export const getPriorityClass = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'border-l-4 border-amber-500 pl-3';
    case 'medium':
      return 'border-l-4 border-blue-400 pl-3';
    case 'low':
      return 'border-l-4 border-gray-300 pl-3';
    default:
      return '';
  }
};

interface SuggestionItemProps {
  suggestion: AISuggestion;
  variants: any;
}

export function SuggestionItem({ suggestion, variants }: SuggestionItemProps) {
  return (
    <motion.div 
      variants={variants}
      className={`space-y-2 border-b pb-3 last:border-0 ${getPriorityClass(suggestion.priority)}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-1.5 rounded-full ${
          suggestion.priority === 'high' 
            ? 'bg-amber-100' 
            : suggestion.priority === 'medium'
              ? 'bg-blue-100'
              : 'bg-gray-100'
        }`}>
          {getIconComponent(suggestion.icon)}
        </div>
        <div className="flex-1">
          <p className="text-sm">
            {suggestion.text}
            {suggestion.isNew && (
              <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                New
              </span>
            )}
          </p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="p-0 h-auto text-moh-green hover:text-moh-darkGreen hover:bg-transparent mt-1" 
            asChild
          >
            <Link to={suggestion.link} className="flex items-center">
              {suggestion.linkText}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
