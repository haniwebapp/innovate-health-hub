
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { StrategyGapService } from '@/services/ai/policy/StrategyGapService';
import { StrategyGapResult } from '@/services/ai/policy/types';
import { StrategyGapResults } from './StrategyGapResults';
import { History, Loader2, RefreshCw } from 'lucide-react';

interface AnalysisHistoryItem {
  id: string;
  title: string;
  description: string;
  created_at: string;
  gap_count: number;
  recommendation_count: number;
}

export function StrategyAnalysisHistory() {
  const { toast } = useToast();
  const [analyses, setAnalyses] = useState<AnalysisHistoryItem[]>([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState<StrategyGapResult | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

  const loadAnalyses = async () => {
    setIsLoading(true);
    try {
      const data = await StrategyGapService.listAnalyses();
      setAnalyses(data || []);
    } catch (error) {
      console.error('Error loading analyses:', error);
      toast({
        title: 'Failed to load history',
        description: error instanceof Error ? error.message : 'Could not load analysis history',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadAnalysisDetails = async (id: string) => {
    setIsLoadingAnalysis(true);
    setSelectedId(id);
    try {
      const data = await StrategyGapService.getAnalysis(id);
      setSelectedAnalysis(data);
    } catch (error) {
      console.error('Error loading analysis details:', error);
      toast({
        title: 'Failed to load analysis',
        description: error instanceof Error ? error.message : 'Could not load analysis details',
        variant: 'destructive',
      });
      setSelectedAnalysis(null);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  useEffect(() => {
    loadAnalyses();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-[#00814A]/5 pb-4">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2 text-[#00814A]">
                <History className="h-5 w-5" />
                Analysis History
              </CardTitle>
              <CardDescription>
                View your previously saved strategy gap analyses
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={loadAnalyses} 
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {analyses.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {isLoading ? 'Loading analyses...' : 'No saved analyses found'}
            </div>
          ) : (
            <div className="space-y-4">
              {analyses.map((analysis) => (
                <div 
                  key={analysis.id} 
                  className={`p-4 border rounded-lg cursor-pointer transition-all hover:border-[#00814A]/70 hover:bg-[#00814A]/5 ${
                    selectedId === analysis.id ? 'border-[#00814A] bg-[#00814A]/10' : ''
                  }`}
                  onClick={() => loadAnalysisDetails(analysis.id)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{analysis.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {new Date(analysis.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {analysis.description || 'No description'}
                  </p>
                  <div className="flex gap-3 mt-2">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {analysis.gap_count} gaps
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {analysis.recommendation_count} recommendations
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isLoadingAnalysis && (
        <div className="h-40 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#00814A]" />
          <span className="ml-2 text-lg font-medium">Loading analysis...</span>
        </div>
      )}

      {selectedAnalysis && !isLoadingAnalysis && (
        <StrategyGapResults results={selectedAnalysis} />
      )}
    </div>
  );
}
