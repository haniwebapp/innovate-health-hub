
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicalService } from "@/services/clinical/ClinicalService";
import { ClinicalAIService } from "@/services/ai/clinical/ClinicalAIService";
import { ClinicalRecord, ClinicalTag, ClinicalAnalysis } from "@/types/clinicalTypes";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Tag, FileText, Activity, List, Star, PlusCircle } from "lucide-react";

interface ClinicalRecordViewerProps {
  recordId: string;
  onUpdate?: () => void;
}

export function ClinicalRecordViewer({ recordId, onUpdate }: ClinicalRecordViewerProps) {
  const { toast } = useToast();
  const [record, setRecord] = useState<ClinicalRecord | null>(null);
  const [tags, setTags] = useState<ClinicalTag[]>([]);
  const [analyses, setAnalyses] = useState<ClinicalAnalysis[]>([]);
  const [similarRecords, setSimilarRecords] = useState<ClinicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    fetchRecordData();
  }, [recordId]);

  const fetchRecordData = async () => {
    setIsLoading(true);
    try {
      // Load the main record
      const recordData = await ClinicalService.getRecordById(recordId);
      setRecord(recordData);
      
      // Load associated tags
      const tagsData = await ClinicalService.getTagsForRecord(recordId);
      setTags(tagsData);
      
      // Load associated analyses
      const analysesData = await ClinicalService.getAnalysesForRecord(recordId);
      setAnalyses(analysesData);
      
      // Load similar records
      const similarRecordsData = await ClinicalAIService.findSimilarRecords(recordId);
      setSimilarRecords(similarRecordsData);
    } catch (error) {
      console.error("Error loading clinical record data:", error);
      toast({
        variant: "destructive",
        title: "Error loading clinical data",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAutoTag = async () => {
    setIsProcessing(true);
    try {
      const newTags = await ClinicalAIService.autoTagRecord(recordId);
      if (newTags.length > 0) {
        setTags(prev => [...prev, ...newTags]);
        toast({
          title: "Auto-tagging successful",
          description: `Added ${newTags.length} new tags to the record.`,
        });
      } else {
        toast({
          variant: "default",
          title: "No new tags identified",
          description: "AI analysis did not identify any additional tags.",
        });
      }
    } catch (error) {
      console.error("Error auto-tagging record:", error);
      toast({
        variant: "destructive",
        title: "Error auto-tagging record",
        description: error.message,
      });
    } finally {
      setIsProcessing(false);
      if (onUpdate) onUpdate();
    }
  };

  const handleGenerateRecommendations = async () => {
    setIsProcessing(true);
    try {
      const recommendations = await ClinicalAIService.generateRecommendations(recordId);
      
      // Save the recommendations as a new analysis
      if (recommendations && recommendations.recommendations?.length > 0) {
        const analysisData = {
          record_id: recordId,
          analysis_type: 'recommendations',
          results: {
            recommendations: recommendations.recommendations,
            references: recommendations.references
          },
          created_by: record?.created_by || "",
          confidence: 0.85
        };
        
        const newAnalysis = await ClinicalService.addAnalysis(analysisData);
        if (newAnalysis) {
          setAnalyses(prev => [...prev, newAnalysis]);
          toast({
            title: "Recommendations generated",
            description: "AI recommendations have been added to the record.",
          });
        }
      } else {
        toast({
          variant: "default",
          title: "No recommendations generated",
          description: "AI analysis could not generate recommendations for this record.",
        });
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error generating recommendations",
        description: error.message,
      });
    } finally {
      setIsProcessing(false);
      if (onUpdate) onUpdate();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-moh-green" />
          <p className="text-muted-foreground">Loading clinical record data...</p>
        </div>
      </div>
    );
  }

  if (!record) {
    return (
      <div className="flex items-center justify-center p-6 min-h-[400px]">
        <div className="text-center space-y-2">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
          <h3 className="font-medium text-lg">Record Not Found</h3>
          <p className="text-muted-foreground">The requested clinical record could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{record.title}</CardTitle>
            <CardDescription>
              {record.record_type} • Created {new Date(record.created_at).toLocaleDateString()}
            </CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm" onClick={fetchRecordData}>
              Refresh
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="px-6 pt-2">
          <TabsList className="w-full bg-slate-100">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="tags" className="flex-1">Tags</TabsTrigger>
            <TabsTrigger value="analyses" className="flex-1">Analyses</TabsTrigger>
            <TabsTrigger value="similar" className="flex-1">Similar Records</TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-4">
          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{record.description || 'No description provided'}</p>
            </div>
            
            {record.symptoms && record.symptoms.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {record.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="outline">{symptom}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {record.diagnosis && record.diagnosis.length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Diagnosis</h3>
                <div className="flex flex-wrap gap-2">
                  {record.diagnosis.map((diagnosis, index) => (
                    <Badge key={index} variant="outline">{diagnosis}</Badge>
                  ))}
                </div>
              </div>
            )}
            
            {record.medical_codes && Object.keys(record.medical_codes).length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Medical Codes</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(record.medical_codes).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="font-medium">{key}:</span>
                      <span>{value as string}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tags" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Record Tags</h3>
              <Button size="sm" disabled={isProcessing} onClick={handleAutoTag}>
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Tag className="mr-2 h-4 w-4" />
                )}
                Auto-Tag
              </Button>
            </div>
            
            {tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag.id} className="px-3 py-1">
                    {tag.tag}
                    {tag.confidence && (
                      <span className="ml-1 text-xs opacity-70">
                        {(tag.confidence * 100).toFixed(0)}%
                      </span>
                    )}
                  </Badge>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md">
                <Tag className="h-8 w-8 mx-auto text-muted-foreground opacity-50 mb-2" />
                <p className="text-muted-foreground">No tags have been added yet</p>
                <p className="text-xs text-muted-foreground mt-1">Click Auto-Tag to analyze and add tags automatically</p>
              </div>
            )}
            
            <div className="bg-slate-50 p-4 rounded-md mt-4">
              <h4 className="font-medium mb-2">Tag Sources</h4>
              {Array.from(new Set(tags.map(t => t.source))).map((source) => (
                <div key={source} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full bg-moh-green"></span>
                  <span>{source}</span>
                  <span className="text-muted-foreground ml-auto">
                    {tags.filter(t => t.source === source).length} tags
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="analyses" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Clinical Analyses</h3>
              <Button size="sm" disabled={isProcessing} onClick={handleGenerateRecommendations}>
                {isProcessing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <PlusCircle className="mr-2 h-4 w-4" />
                )}
                Generate Recommendations
              </Button>
            </div>
            
            {analyses.length > 0 ? (
              <div className="space-y-4">
                {analyses.map((analysis) => (
                  <Card key={analysis.id} className="overflow-hidden">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base flex items-center">
                        <Activity className="h-4 w-4 mr-2 text-moh-green" />
                        {analysis.analysis_type.charAt(0).toUpperCase() + analysis.analysis_type.slice(1)} Analysis
                        {analysis.confidence && (
                          <Badge variant="outline" className="ml-auto">
                            {(analysis.confidence * 100).toFixed(0)}% confidence
                          </Badge>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-3">
                      <div className="text-sm space-y-2">
                        {analysis.analysis_type === 'recommendations' && (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Recommendations</h4>
                              <ul className="list-disc pl-5 space-y-2">
                                {analysis.results.recommendations.map((rec: string, index: number) => (
                                  <li key={index}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                            
                            {analysis.results.references && analysis.results.references.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-2">References</h4>
                                <ul className="list-decimal pl-5 space-y-1 text-xs text-muted-foreground">
                                  {analysis.results.references.map((ref: string, index: number) => (
                                    <li key={index}>{ref}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {analysis.analysis_type !== 'recommendations' && (
                          <pre className="text-xs overflow-auto p-2 bg-slate-50 rounded-md">
                            {JSON.stringify(analysis.results, null, 2)}
                          </pre>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="py-2 bg-slate-50 text-xs text-muted-foreground">
                      Generated on {new Date(analysis.created_at).toLocaleString()}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md">
                <Activity className="h-8 w-8 mx-auto text-muted-foreground opacity-50 mb-2" />
                <p className="text-muted-foreground">No analyses have been conducted yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Click Generate Recommendations to create an AI analysis
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="similar" className="space-y-4">
            <h3 className="text-lg font-medium mb-2">Similar Records</h3>
            
            {similarRecords.length > 0 ? (
              <div className="space-y-3">
                {similarRecords.map((similarRecord, index) => (
                  <div key={similarRecord.id} className="border rounded-md p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{similarRecord.title}</h4>
                      <Badge variant="outline">
                        {similarRecord.record_type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {similarRecord.description}
                    </p>
                    
                    {/* Show common elements if available */}
                    {similarRecord.commonTags && similarRecord.commonTags.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-medium">Common Tags:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {similarRecord.commonTags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md">
                <List className="h-8 w-8 mx-auto text-muted-foreground opacity-50 mb-2" />
                <p className="text-muted-foreground">No similar records found</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try adding more tags or details to improve similarity matching
                </p>
              </div>
            )}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
