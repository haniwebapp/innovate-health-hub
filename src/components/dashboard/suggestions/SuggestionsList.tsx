
import { motion } from "framer-motion";
import { SuggestionItem, AISuggestion } from "./SuggestionItem";
import { SuggestionLoader } from "./SuggestionLoader";

interface SuggestionsListProps {
  isLoading: boolean;
  suggestions: AISuggestion[];
}

export function SuggestionsList({ isLoading, suggestions }: SuggestionsListProps) {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0 }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((index) => (
          <SuggestionLoader key={index} index={index} />
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {suggestions.map(suggestion => (
        <SuggestionItem
          key={suggestion.id}
          suggestion={suggestion}
          variants={item}
        />
      ))}
    </motion.div>
  );
}
