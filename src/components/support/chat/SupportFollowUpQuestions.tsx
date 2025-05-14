
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SupportFollowUpQuestionsProps {
  questions: string[];
  onSelectQuestion: (question: string) => void;
}

export function SupportFollowUpQuestions({ questions, onSelectQuestion }: SupportFollowUpQuestionsProps) {
  if (!questions || questions.length === 0) return null;
  
  return (
    <Card className="mt-4 bg-slate-50 border-slate-200">
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
              onClick={() => onSelectQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
