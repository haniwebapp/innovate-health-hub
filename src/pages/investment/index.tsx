
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { callAIAssistant, AIResponse } from "@/utils/aiUtils";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Lightbulb } from "lucide-react";
import { AIInsightsCard } from "@/components/investment/AIInsightsCard";
import { AIMatchScore } from "@/components/investment/AIMatchScoreCard";
import { AIMarketTrend } from "@/components/investment/MarketTrendCard";
import { AIAnalysisSection } from "@/components/investment/AIAnalysisSection";
import { InvestmentTabs } from "@/components/investment/InvestmentTabs";

export default function InvestmentPage() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("startups");
  const [aiRecommendations, setAiRecommendations] = useState<string[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [investmentType, setInvestmentType] = useState("all");
  
  // State for AI-powered features
  const [aiMatchScores, setAiMatchScores] = useState<AIMatchScore[]>([]);
  const [aiMarketTrends, setAiMarketTrends] = useState<AIMarketTrend[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSector, setSelectedSector] = useState("all");
  
  // Generate AI recommendations based on selected tab
  const generateRecommendations = async () => {
    setIsLoadingAI(true);
    
    try {
      const context = activeTab === "startups" 
        ? "investment-startup" 
        : activeTab === "investors" 
          ? "investment-investor" 
          : "investment-resources";
      
      const response: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: `Generate personalized ${activeTab} recommendations for the investment platform.`
        }
      ], context);
      
      if (response.error) {
        throw new Error(response.error);
      }
      
      setAiRecommendations(response.insights || [response.message]);
      
      toast({
        title: "AI Recommendations Generated",
        description: "Personalized insights are now available.",
      });
    } catch (error) {
      console.error("Error generating AI recommendations:", error);
      toast({
        title: "Could not generate recommendations",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Analyze investment opportunities
  const analyzeInvestmentOpportunities = async () => {
    setIsAnalyzing(true);
    
    try {
      // Call AI assistant for investment matching
      const matchResponse: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: `Analyze and match investment opportunities in the ${selectedSector === 'all' ? 'healthcare' : selectedSector} sector. Consider factors like innovation potential, market readiness, and growth potential.`
        }
      ], "investment-matching");
      
      if (matchResponse.error) {
        throw new Error(matchResponse.error);
      }
      
      // Generate mock data for demo purposes
      const mockMatches: AIMatchScore[] = [
        {
          name: "Digital Health Platform",
          score: 87,
          reason: "Strong market fit with current healthcare digitalization trends"
        },
        {
          name: "Remote Patient Monitoring Solution",
          score: 92,
          reason: "High growth potential with increasing telehealth adoption"
        },
        {
          name: "AI Diagnostic Tool",
          score: 79,
          reason: "Innovative technology with regulatory pathway challenges"
        },
        {
          name: "Personalized Medicine Platform",
          score: 84,
          reason: "Growing market with strong intellectual property position"
        }
      ];
      
      setAiMatchScores(mockMatches);
      
      // Get market trend analysis
      const trendsResponse: AIResponse = await callAIAssistant([
        {
          role: "user",
          content: `Analyze market trends in healthcare investment for ${new Date().getFullYear()}. Identify growth sectors, emerging opportunities, and potential risks.`
        }
      ], "market-analysis");
      
      // Mock market trends data
      const mockTrends: AIMarketTrend[] = [
        {
          sector: "Digital Therapeutics",
          growth: 32,
          confidence: 89,
          insight: "Rapid growth driven by regulatory acceptance and insurance coverage"
        },
        {
          sector: "AI in Healthcare",
          growth: 48,
          confidence: 92,
          insight: "Continued expansion with focus on clinical decision support systems"
        },
        {
          sector: "Remote Monitoring",
          growth: 27,
          confidence: 85,
          insight: "Steady growth supported by aging population and chronic disease management"
        },
        {
          sector: "Personalized Medicine",
          growth: 19,
          confidence: 78,
          insight: "Growing interest with advances in genomics and proteomics"
        }
      ];
      
      setAiMarketTrends(mockTrends);
      
      toast({
        title: "Investment Analysis Complete",
        description: "AI-powered matching and trend analysis is now available.",
      });
    } catch (error) {
      console.error("Error analyzing investments:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete investment analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-6">Investment Platform</h1>
        <p className="text-lg text-gray-700 mb-10">
          Connect healthcare innovations with the right investment opportunities. Our AI-powered platform brings together startups, investors, and growth resources to accelerate healthcare solutions.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Button 
            onClick={generateRecommendations} 
            className="bg-moh-green hover:bg-moh-darkGreen flex items-center gap-2"
            disabled={isLoadingAI}
          >
            {isLoadingAI ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Generating Recommendations...
              </>
            ) : (
              <>
                <Lightbulb className="h-4 w-4" />
                Get AI Recommendations
              </>
            )}
          </Button>
        </div>
        
        <AIInsightsCard insights={aiRecommendations} />
        
        <AIAnalysisSection 
          aiMatchScores={aiMatchScores}
          aiMarketTrends={aiMarketTrends}
          isAnalyzing={isAnalyzing}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
          onAnalyzeClick={analyzeInvestmentOpportunities}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <InvestmentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
}
