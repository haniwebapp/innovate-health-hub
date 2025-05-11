
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, BrainCircuit, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";

interface InvestmentAIAdvisorProps {
  onGenerateInsights?: (query: string) => Promise<string[]>;
}

export function InvestmentAIAdvisor({ onGenerateInsights }: InvestmentAIAdvisorProps) {
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [insights, setInsights] = useState<string[]>([]);
  const [showInsights, setShowInsights] = useState(false);
  
  // Sample insights to use when no API is connected
  const sampleInsights = [
    "Based on market trends, your innovation aligns well with the growing demand in digital health diagnostics, which saw a 27% increase in investment in Q1 2025.",
    "Consider highlighting your regulatory compliance progress more prominently, as 78% of healthcare investors prioritize this in their due diligence process.",
    "Your target market size calculation appears conservative compared to industry forecasts. Consider updating your TAM analysis with the latest market research.",
    "Similar innovations to yours have typically secured Series A funding in the $2-5M range with 15-20% equity dilution. Use this as a benchmark in your negotiations.",
    "Your team composition would benefit from adding clinical expertise. 85% of successfully funded healthcare startups have at least one medical professional on their founding team."
  ];
  
  const handleGenerateInsights = async () => {
    if (!query.trim()) {
      toast({
        title: "Input required",
        description: "Please enter a question or describe your investment needs.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      let results: string[];
      if (onGenerateInsights) {
        // Use the actual API if provided
        results = await onGenerateInsights(query);
      } else {
        // Use sample insights for demo
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
        results = sampleInsights;
      }
      
      setInsights(results);
      setShowInsights(true);
      
      toast({
        title: "AI Analysis Complete",
        description: "Your investment insights are ready.",
      });
    } catch (error) {
      toast({
        title: "Error generating insights",
        description: "Unable to generate investment insights. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const sampleQueries = [
    "How can I optimize my pitch deck for healthcare investors?",
    "What valuation method is best for my early-stage health tech?",
    "Analyze current funding trends in medical devices.",
    "What metrics should I highlight to attract Series A funding?"
  ];
  
  const handleSampleQueryClick = (sampleQuery: string) => {
    setQuery(sampleQuery);
  };
  
  return (
    <Card className="border-blue-200">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-blue-500" />
          <CardTitle>Investment AI Advisor</CardTitle>
        </div>
        <CardDescription>
          Get AI-powered investment insights for your healthcare innovation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Ask a question about your investment strategy, valuation, or funding options..."
          className="min-h-[120px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <div>
          <p className="text-xs text-muted-foreground mb-2">Try one of these:</p>
          <div className="flex flex-wrap gap-2">
            {sampleQueries.map((sampleQuery, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => handleSampleQueryClick(sampleQuery)}
              >
                {sampleQuery}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex-col gap-4">
        <Button
          className="w-full"
          onClick={handleGenerateInsights}
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            <>
              Generate Investment Insights
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
        
        <AnimatePresence>
          {showInsights && insights.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full border-t pt-4"
            >
              <h4 className="text-sm font-medium mb-2">AI Investment Insights:</h4>
              <div className="space-y-2">
                {insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    className="text-sm p-2 border rounded-md bg-blue-50"
                  >
                    {insight}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
