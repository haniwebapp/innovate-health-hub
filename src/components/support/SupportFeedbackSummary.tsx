
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SupportAIService } from "@/services/ai/support/SupportAIService";
import { Loader2, MessageSquare, AlertTriangle, TrendingUp, ListChecks } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { FeedbackSummary as AIFeedbackSummary, SupportTicket } from "@/types/supportTypes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface FeedbackData {
  summary: string;
  sentimentBreakdown: Record<string, number>;
  commonThemes: string[];
  recommendations: string[];
}

export default function SupportFeedbackSummary() {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackItems, setFeedbackItems] = useState<string[]>([]);
  const [summary, setSummary] = useState<FeedbackData | null>(null);
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTickets();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  const fetchTickets = async () => {
    setIsLoading(true);
    try {
      // Query to fetch tickets
      let query = supabase
        .from('support_tickets')
        .select('*');
      
      // If not admin, only show user's tickets
      if (!isAdmin) {
        query = query.eq('user_id', user?.id);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Extract feedback items from tickets
        const items = (data as SupportTicket[]).map(ticket => 
          `Subject: ${ticket.subject}\nDescription: ${ticket.description}\nCategory: ${ticket.category}\nPriority: ${ticket.priority}\nStatus: ${ticket.status}`
        );
        
        setFeedbackItems(items);
        
        // Generate summary using AI
        if (items.length > 0) {
          generateSummary(items);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    } catch (error: any) {
      console.error("Error fetching tickets for feedback analysis:", error);
      toast({
        variant: "destructive",
        title: "Data Fetch Error",
        description: "Failed to load support data for analysis.",
      });
      setIsLoading(false);
    }
  };

  const generateSummary = async (items: string[]) => {
    try {
      // Use AI service to analyze feedback
      const result = await SupportAIService.summarizeFeedback(items);
      setSummary(result);
    } catch (error: any) {
      console.error("Error generating feedback summary:", error);
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: "Failed to generate feedback analysis.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatSentimentData = () => {
    if (!summary?.sentimentBreakdown) return [];
    
    return Object.entries(summary.sentimentBreakdown).map(([key, value]) => ({
      sentiment: key.charAt(0).toUpperCase() + key.slice(1),
      count: value,
    }));
  };

  if (!user) {
    return (
      <Card className="bg-slate-50">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Authentication Required</h3>
          <p className="text-slate-600">
            Please log in to view support insights.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-moh-green mb-4" />
        <p className="text-slate-600">Analyzing support data...</p>
      </div>
    );
  }

  if (feedbackItems.length === 0) {
    return (
      <Card className="bg-slate-50">
        <CardContent className="p-8 text-center">
          <MessageSquare className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Support Data Available</h3>
          <p className="text-slate-600">
            There are no support tickets available to analyze. Submit a support ticket to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!summary) {
    return (
      <Card className="bg-slate-50">
        <CardContent className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Analysis Unavailable</h3>
          <p className="text-slate-600">
            Unable to generate support insights at this time. Please try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-moh-green" />
            <h3 className="text-lg font-semibold">Support Summary</h3>
          </div>
          <p className="text-slate-600">{summary.summary}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <ListChecks className="h-5 w-5 text-moh-green" />
              <h3 className="font-semibold">Common Themes</h3>
            </div>
            <ul className="space-y-2">
              {summary.commonThemes.map((theme, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200">{idx + 1}</Badge>
                  <span className="text-slate-600">{theme}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-moh-green" />
              <h3 className="font-semibold">Sentiment Distribution</h3>
            </div>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={formatSentimentData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="sentiment" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#00814A" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold">Recommendations</h3>
          </div>
          <ul className="space-y-3">
            {summary.recommendations.map((recommendation, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Badge className="mt-0.5 bg-amber-100 text-amber-700 hover:bg-amber-200">{idx + 1}</Badge>
                <span className="text-slate-600">{recommendation}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
