
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

interface FollowUpQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
}

export function FollowUpQuestions({ questions, onSelect }: FollowUpQuestionsProps) {
  if (!questions || questions.length === 0) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="mt-4 mb-4 bg-gray-50 border-gray-200">
        <CardContent className="pt-4">
          <h4 className="text-sm font-medium flex items-center gap-1 mb-2">
            <Info size={14} />
            You might also want to ask:
          </h4>
          <div className="flex flex-wrap gap-2">
            {questions.map((question, idx) => (
              <Button 
                key={idx} 
                variant="outline" 
                size="sm" 
                className="text-xs"
                onClick={() => onSelect(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
