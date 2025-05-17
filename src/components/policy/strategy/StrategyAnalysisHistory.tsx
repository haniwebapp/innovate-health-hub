
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, ChevronRight, RefreshCw, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { StrategyGapService } from '@/services/ai/policy/StrategyGapService';
import { StrategyGapResult } from '@/services/ai/policy/types';

interface AnalysisHistoryItem {
  id: string;
  title: string;
  description?: string;
  created_at: string;
  gap_count?: number;
  recommendation_count?: number;
  user_id?: string;
}

export const StrategyAnalysisHistory: React.FC = () => {
  const [analyses, setAnalyses] = useState<AnalysisHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAnalysis, setSelectedAnalysis] = useState<StrategyGapResult | null>(null);
  const [loadingAnalysisId, setLoadingAnalysisId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  useEffect(() => {
    loadAnalyses();
  }, []);

  const loadAnalyses = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await StrategyGapService.listAnalyses();
      setAnalyses(data as AnalysisHistoryItem[]);
    } catch (err: any) {
      console.error("Error loading analyses:", err);
      setError(err.message || "Failed to load analysis history");
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAnalysis = async (analysisId: string) => {
    setLoadingAnalysisId(analysisId);
    setError(null);
    
    try {
      const analysisData = await StrategyGapService.getAnalysis(analysisId);
      setSelectedAnalysis(analysisData);
    } catch (err: any) {
      console.error("Error loading analysis:", err);
      setError(err.message || "Failed to load this analysis");
    } finally {
      setLoadingAnalysisId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Analysis History</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={loadAnalyses}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-800 p-4 rounded-md border border-red-200">
          {error}
        </div>
      )}
      
      {selectedAnalysis ? (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Analysis Details</CardTitle>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedAnalysis(null)}
                size="sm"
              >
                Back to List
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Reuse the StrategyGapResults component */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Overall Analysis</h3>
                <div className="bg-slate-50 border border-slate-100 rounded-md p-4">
                  <p className="text-sm text-slate-700 whitespace-pre-line">
                    {selectedAnalysis.overallAnalysis}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Identified Gaps</h3>
                <div className="space-y-4">
                  {selectedAnalysis.gaps.map((gap, index) => (
                    <div 
                      key={index}
                      className={`border rounded-md p-4 ${gap.severity === 'high' 
                        ? 'bg-red-100 border-red-200' 
                        : gap.severity === 'medium'
                          ? 'bg-amber-100 border-amber-200'
                          : 'bg-green-100 border-green-200'}`}
                    >
                      <h4 className="font-medium mb-1">{gap.title}</h4>
                      <p className="text-sm mb-2">{gap.description}</p>
                      {gap.potentialImpact && (
                        <div className="text-sm">
                          <span className="font-medium">Potential Impact: </span>
                          {gap.potentialImpact}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Recommendations</h3>
                <div className="space-y-2">
                  {selectedAnalysis.recommendations.map((recommendation, index) => (
                    <div key={index} className="bg-moh-lightGreen/20 border border-moh-green/20 rounded-md p-3">
                      <p className="text-sm">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="flex justify-center items-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
        </div>
      ) : analyses.length === 0 ? (
        <div className="bg-slate-50 border border-slate-100 rounded-md p-8 text-center">
          <FileText className="h-10 w-10 mx-auto text-slate-400 mb-2" />
          <h3 className="font-medium text-lg mb-1">No analyses yet</h3>
          <p className="text-muted-foreground mb-4">Your saved analyses will appear here.</p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {analyses.map((analysis) => (
                  <TableRow key={analysis.id}>
                    <TableCell className="font-medium">{analysis.title}</TableCell>
                    <TableCell>{formatDate(analysis.created_at)}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewAnalysis(analysis.id)}
                        disabled={loadingAnalysisId === analysis.id}
                      >
                        {loadingAnalysisId === analysis.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            View <ChevronRight className="ml-1 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
