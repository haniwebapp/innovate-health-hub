
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { SuggestionsList } from "./suggestions/SuggestionsList";
import { defaultSuggestions } from "./suggestions/mockData";
import { AISuggestion } from "./suggestions/SuggestionItem";

export default function DashboardSuggestions() {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch by adding a small delay
    const timer = setTimeout(() => {
      // Sort suggestions by priority
      const sortedSuggestions = [...defaultSuggestions].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      
      setSuggestions(sortedSuggestions);
      setIsLoading(false);
    }, 900);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="h-full border-moh-green/10 overflow-hidden relative">
      {/* Subtle gradient background effect */}
      <div className="absolute inset-0 bg-green-gold-gradient rounded-lg" />
      
      <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
        <div>
          <CardTitle className="text-lg font-medium text-moh-darkGreen">AI Suggestions</CardTitle>
          <CardDescription>Personalized recommendations</CardDescription>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles className="h-4 w-4 text-blue-500 animate-pulse-soft" />
          <Lightbulb className="h-4 w-4 text-amber-500 animate-pulse-soft" />
        </div>
      </CardHeader>
      
      <CardContent className="relative">
        <ScrollArea className="h-[350px] pr-4">
          <SuggestionsList 
            isLoading={isLoading}
            suggestions={suggestions}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
