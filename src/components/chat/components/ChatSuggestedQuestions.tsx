
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ChatSuggestedQuestionsProps {
  followUpQuestions: string[];
  onSelectQuestion: (question: string) => void;
}

export function ChatSuggestedQuestions({ followUpQuestions, onSelectQuestion }: ChatSuggestedQuestionsProps) {
  if (!followUpQuestions || followUpQuestions.length === 0) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="mt-2"
    >
      <h4 className="text-xs text-gray-500 dark:text-gray-400 mb-2">Suggested questions:</h4>
      <div className="flex flex-wrap gap-2">
        {followUpQuestions.map((question, idx) => (
          <Button 
            key={idx} 
            variant="outline" 
            size="sm" 
            className="text-xs py-1 h-auto bg-white hover:bg-moh-green hover:text-white"
            onClick={() => onSelectQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </motion.div>
  );
}
