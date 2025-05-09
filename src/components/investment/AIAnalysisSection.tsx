
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Zap, BarChart3, TrendingUp } from "lucide-react";
import { AIMatchScore, AIMatchScoreCard } from "./AIMatchScoreCard";
import { AIMarketTrend, MarketTrendCard } from "./MarketTrendCard";
import { useToast } from "@/components/ui/use-toast";

interface AIAnalysisSectionProps {
  aiMatchScores: AIMatchScore[];
  aiMarketTrends: AIMarketTrend[];
  isAnalyzing: boolean;
  selectedSector: string;
  onSectorChange: (value: string) => void;
  onAnalyzeClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AIAnalysisSection({
  aiMatchScores,
  aiMarketTrends,
  isAnalyzing,
  selectedSector,
  onSectorChange,
  onAnalyzeClick,
  searchQuery,
  onSearchChange
}: AIAnalysisSectionProps) {
  // Filter AI match scores based on search query
  const filteredMatches = aiMatchScores.filter(match => 
    match.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Button 
          onClick={onAnalyzeClick} 
          variant="outline"
          className="border-moh-green text-moh-green hover:bg-moh-green/10 flex items-center gap-2"
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing Investment Landscape...
            </>
          ) : (
            <>
              <BarChart3 className="h-4 w-4" />
              AI Investment Analysis
            </>
          )}
        </Button>
      </div>

      {aiMatchScores.length > 0 && (
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            AI Investment Match Scores
          </h3>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search opportunities..." 
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-1/3">
              <Select value={selectedSector} onValueChange={onSectorChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sector" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sectors</SelectItem>
                  <SelectItem value="digital-health">Digital Health</SelectItem>
                  <SelectItem value="medical-devices">Medical Devices</SelectItem>
                  <SelectItem value="biotech">Biotech</SelectItem>
                  <SelectItem value="ai-ml">AI/ML in Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4 mt-4">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((match, i) => (
                <AIMatchScoreCard key={i} match={match} />
              ))
            ) : (
              <p className="text-gray-500 italic">No matching opportunities found.</p>
            )}
          </div>
        </Card>
      )}
      
      {aiMarketTrends.length > 0 && (
        <Card className="p-6 mb-8">
          <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Healthcare Investment Market Trends
          </h3>
          <div className="space-y-4">
            {aiMarketTrends.map((trend, i) => (
              <MarketTrendCard key={i} trend={trend} />
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
