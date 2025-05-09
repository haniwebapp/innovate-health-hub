
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Mock AI suggestions - in a real app, these would be fetched from an API
const aiSuggestions = [
  {
    id: '1',
    text: 'Complete your profile to improve investor matching by 40%',
    link: '/dashboard/profile',
    linkText: 'Update Profile'
  },
  {
    id: '2',
    text: 'The "Digital Health Solutions" challenge closes in 3 days',
    link: '/challenges/digital-health',
    linkText: 'Submit Now'
  },
  {
    id: '3',
    text: 'Your innovation has received 5 new views since yesterday',
    link: '/dashboard/innovations',
    linkText: 'View Analytics'
  },
  {
    id: '4',
    text: 'New funding opportunity matches your "AI Diagnostics" innovation',
    link: '/investment',
    linkText: 'Explore Funding'
  }
];

export default function DashboardSuggestions() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">AI Suggestions</CardTitle>
          <CardDescription>Personalized recommendations</CardDescription>
        </div>
        <Lightbulb className="h-4 w-4 text-amber-500" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[250px] pr-4">
          <div className="space-y-4">
            {aiSuggestions.map(suggestion => (
              <div key={suggestion.id} className="space-y-2 border-b pb-3 last:border-0">
                <p className="text-sm">{suggestion.text}</p>
                <Button variant="ghost" size="sm" className="p-0 h-auto" asChild>
                  <Link to={suggestion.link}>
                    {suggestion.linkText}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
