
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface AISuggestion {
  id: string;
  text: string;
  link: string;
  linkText: string;
  priority: 'high' | 'medium' | 'low';
  isNew?: boolean;
}

// Mock AI suggestions - in a real app, these would be fetched from an API
const defaultSuggestions: AISuggestion[] = [
  {
    id: '1',
    text: 'Complete your profile to improve investor matching by 40%',
    link: '/dashboard/profile',
    linkText: 'Update Profile',
    priority: 'high',
    isNew: true
  },
  {
    id: '2',
    text: 'The "Digital Health Solutions" challenge closes in 3 days',
    link: '/challenges/digital-health',
    linkText: 'Submit Now',
    priority: 'high'
  },
  {
    id: '3',
    text: 'Your innovation has received 5 new views since yesterday',
    link: '/dashboard/innovations',
    linkText: 'View Analytics',
    priority: 'medium'
  },
  {
    id: '4',
    text: 'New funding opportunity matches your "AI Diagnostics" innovation',
    link: '/investment',
    linkText: 'Explore Funding',
    priority: 'medium'
  },
  {
    id: '5',
    text: 'Review new regulatory guidelines for medical devices',
    link: '/dashboard/regulatory',
    linkText: 'View Guidelines',
    priority: 'medium'
  },
  {
    id: '6',
    text: 'Connect with 3 innovators working in similar fields',
    link: '/dashboard/collaboration',
    linkText: 'View Connections',
    priority: 'low'
  },
  {
    id: '7',
    text: 'Update your innovation description for better investor matching',
    link: '/dashboard/innovations',
    linkText: 'Edit Innovation',
    priority: 'low'
  }
];

export default function DashboardSuggestions() {
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  
  useEffect(() => {
    // Simulate API fetch by adding a small delay
    const timer = setTimeout(() => {
      // Sort suggestions by priority
      const sortedSuggestions = [...defaultSuggestions].sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });
      
      setSuggestions(sortedSuggestions);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const getPriorityClass = (priority: string) => {
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

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">AI Suggestions</CardTitle>
          <CardDescription>Personalized recommendations</CardDescription>
        </div>
        <div className="flex items-center space-x-1">
          <Sparkles className="h-4 w-4 text-blue-500" />
          <Lightbulb className="h-4 w-4 text-amber-500" />
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] pr-4">
          {suggestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="animate-pulse">
                <Lightbulb className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Generating personalized suggestions...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {suggestions.map(suggestion => (
                <div 
                  key={suggestion.id} 
                  className={`space-y-2 border-b pb-3 last:border-0 ${getPriorityClass(suggestion.priority)}`}
                >
                  <div className="flex items-start">
                    <p className="text-sm">
                      {suggestion.text}
                      {suggestion.isNew && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                          New
                        </span>
                      )}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                    <Link to={suggestion.link}>
                      {suggestion.linkText}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
