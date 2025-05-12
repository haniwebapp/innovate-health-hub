import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ClinicalRecord, ClinicalTag, ClinicalAnalysis } from "@/types/clinicalTypes";
import { ClinicalService } from "@/services/clinical/ClinicalService";
import { ClinicalAIService, SimilarRecord } from "@/services/ai/clinical/ClinicalAIService";
import { Loader2, Tag, RefreshCcw, ClipboardList, Activity, BookOpen } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface ClinicalRecordViewerProps {
  recordId: string;
  onUpdate: () => void;
}

export function ClinicalRecordViewer({ recordId, onUpdate }: ClinicalRecordViewerProps) {
  const [record, setRecord] = useState<ClinicalRecord | null>(null);
  const [tags, setTags] = useState<ClinicalTag[]>([]);
  const [analyses, setAnalyses] = useState<ClinicalAnalysis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [tagLoading, setTagLoading] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<{
    recommendations: string[];
    references: string[];
  }>({ recommendations: [], references: [] });
  const [similarRecords, setSimilarRecords] = useState<SimilarRecord[]>([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState<boolean>(false);
  const [loadingSimilar, setLoadingSimilar] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecord = async () => {
      setLoading(true);
      try {
        const recordData = await ClinicalService.getRecordById(recordId);
        if (recordData) {
          setRecord(recordData);
          
          // Fetch tags
          const tags = await ClinicalService.getTagsForRecord(recordId);
          setTags(tags);
          
          // Fetch analyses
          const analyses = await ClinicalService.getAnalysesForRecord(recordId);
          setAnalyses(analyses);
        }
      } catch (error) {
        console.error("Error fetching clinical record:", error);
        toast.error("Failed to load clinical record");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecord();
  }, [recordId]);

  const handleAutoTag = async () => {
    if (!record) return;
    
    setTagLoading(true);
    try {
      const newTags = await ClinicalAIService.autoTagRecord(record.id);
      if (newTags.length > 0) {
        // Fix: Convert string tags to ClinicalTag objects
        const formattedTags: ClinicalTag[] = newTags.map(tag => {
          if (typeof tag === 'string') {
            // Create a proper ClinicalTag object for string tags
            return {
              id: `temp-${Date.now()}-${Math.random()}`,
              record_id: record.id,
              tag: tag,
              source: 'ai',
              created_at: new Date()
            };
          }
          return tag as ClinicalTag;
        });
        
        setTags(prevTags => [...prevTags, ...formattedTags]);
        toast.success(`Added ${newTags.length} new tags`);
      } else {
        toast.info("No new tags identified");
      }
    } catch (error) {
      console.error("Error auto-tagging:", error);
      toast.error("Failed to generate tags");
    } finally {
      setTagLoading(false);
    }
  };

  const handleGetRecommendations = async () => {
    if (!record) return;
    
    setLoadingRecommendations(true);
    try {
      const recs = await ClinicalAIService.generateRecommendations(record.id);
      setRecommendations(recs);
      if (recs.recommendations.length > 0) {
        toast.success("Generated recommendations");
      } else {
        toast.info("No recommendations available");
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast.error("Failed to generate recommendations");
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleFindSimilar = async () => {
    if (!record) return;
    
    setLoadingSimilar(true);
    try {
      const similar = await ClinicalAIService.findSimilarRecords(record.id);
      // Fix: Keep the records as SimilarRecord[] rather than trying to convert to ClinicalRecord[]
      setSimilarRecords(similar);
      if (similar.length > 0) {
        toast.success(`Found ${similar.length} similar records`);
      } else {
        toast.info("No similar records found");
      }
    } catch (error) {
      console.error("Error finding similar records:", error);
      toast.error("Failed to find similar records");
    } finally {
      setLoadingSimilar(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!record) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Record Not Found</CardTitle>
          <CardDescription>The clinical record could not be found</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // Group tags by confidence
  const groupedTags = tags.reduce<Record<string, ClinicalTag[]>>((acc, tag) => {
    const confidenceLevel = tag.confidence && tag.confidence > 0.8 
      ? 'high' 
      : tag.confidence && tag.confidence > 0.5 
        ? 'medium' 
        : 'low';
    
    if (!acc[confidenceLevel]) {
      acc[confidenceLevel] = [];
    }
    acc[confidenceLevel].push(tag);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{record?.title}</CardTitle>
              <CardDescription>
                Record Type: <Badge variant="outline">{record?.record_type}</Badge>
              </CardDescription>
            </div>
            <Badge className="bg-moh-green hover:bg-moh-green/90">
              {record && new Date(record.created_at).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{record?.description || "No description available"}</p>
          </div>

          {record?.symptoms && record.symptoms.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Symptoms</h3>
              <div className="flex flex-wrap gap-2">
                {record.symptoms.map((symptom, idx) => (
                  <Badge key={idx} variant="secondary">
                    {symptom}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {record?.diagnosis && record.diagnosis.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Diagnosis</h3>
              <div className="flex flex-wrap gap-2">
                {record.diagnosis.map((diagnosis, idx) => (
                  <Badge key={idx} variant="outline" className="border-moh-gold text-moh-gold">
                    {diagnosis}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {record?.medical_codes && Object.keys(record.medical_codes).length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Medical Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {Object.entries(record.medical_codes).map(([type, codes]) => (
                  <div key={type} className="border rounded p-2">
                    <span className="text-sm font-medium">{type}:</span>{" "}
                    <span className="text-sm">{Array.isArray(codes) ? codes.join(", ") : codes}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="tags">
        <TabsList>
          <TabsTrigger value="tags" className="flex items-center">
            <Tag className="mr-2 h-4 w-4" />
            Tags
          </TabsTrigger>
          <TabsTrigger value="analyses" className="flex items-center">
            <ClipboardList className="mr-2 h-4 w-4" />
            Analyses
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center">
            <Activity className="mr-2 h-4 w-4" />
            Recommendations
          </TabsTrigger>
          <TabsTrigger value="similar" className="flex items-center">
            <BookOpen className="mr-2 h-4 w-4" />
            Similar Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="tags">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Clinical Tags</CardTitle>
                <Button 
                  onClick={handleAutoTag} 
                  size="sm" 
                  variant="outline"
                  disabled={tagLoading}
                >
                  {tagLoading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <Tag className="h-4 w-4 mr-2" />
                  )}
                  Auto-Tag
                </Button>
              </div>
              <CardDescription>
                Tags help categorize and find clinical records
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tags.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No tags found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click Auto-Tag to generate tags based on the record content
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {groupedTags.high && groupedTags.high.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">High Confidence</h4>
                      <div className="flex flex-wrap gap-2">
                        {groupedTags.high.map((tag) => (
                          <Badge key={tag.id} className="bg-green-100 text-green-800 hover:bg-green-200">
                            {tag.tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {groupedTags.medium && groupedTags.medium.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Medium Confidence</h4>
                      <div className="flex flex-wrap gap-2">
                        {groupedTags.medium.map((tag) => (
                          <Badge key={tag.id} className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                            {tag.tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {groupedTags.low && groupedTags.low.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Low Confidence</h4>
                      <div className="flex flex-wrap gap-2">
                        {groupedTags.low.map((tag) => (
                          <Badge key={tag.id} variant="outline">
                            {tag.tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analyses">
          <Card>
            <CardHeader>
              <CardTitle>Clinical Analyses</CardTitle>
              <CardDescription>
                Analytical results and interpretations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analyses.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No analyses found for this record</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {analyses.map((analysis) => (
                    <div key={analysis.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{analysis.analysis_type}</h3>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(analysis.created_at), 'MMM d, yyyy')}
                        </span>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="space-y-2">
                        {Object.entries(analysis.results).map(([key, value]) => (
                          <div key={key} className="grid grid-cols-3 gap-2">
                            <span className="text-sm font-medium">{key}:</span>
                            <span className="text-sm col-span-2">{
                              typeof value === 'object' 
                                ? JSON.stringify(value) 
                                : String(value)
                            }</span>
                          </div>
                        ))}
                      </div>
                      
                      {analysis.confidence !== undefined && (
                        <div className="mt-3 text-sm">
                          <span className="text-muted-foreground">Confidence: </span>
                          <span>{Math.round(analysis.confidence * 100)}%</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Clinical Recommendations</CardTitle>
                <Button 
                  onClick={handleGetRecommendations}
                  size="sm"
                  variant="outline"
                  disabled={loadingRecommendations}
                >
                  {loadingRecommendations ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-4 w-4 mr-2" />
                  )}
                  Generate
                </Button>
              </div>
              <CardDescription>
                AI-generated clinical recommendations based on record data
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recommendations.recommendations.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No recommendations generated yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click Generate to create recommendations based on this record
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {recommendations.recommendations.map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {recommendations.references.length > 0 && (
                    <div>
                      <h3 className="font-medium mb-2">References</h3>
                      <ul className="list-decimal pl-5 space-y-1 text-sm">
                        {recommendations.references.map((ref, idx) => (
                          <li key={idx} className="text-muted-foreground">{ref}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="similar">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Similar Records</CardTitle>
                <Button 
                  onClick={handleFindSimilar}
                  size="sm"
                  variant="outline"
                  disabled={loadingSimilar}
                >
                  {loadingSimilar ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCcw className="h-4 w-4 mr-2" />
                  )}
                  Find Similar
                </Button>
              </div>
              <CardDescription>
                Records with similar symptoms or diagnoses
              </CardDescription>
            </CardHeader>
            <CardContent>
              {similarRecords.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No similar records found</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Click Find Similar to search for related clinical records
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {similarRecords.map(record => (
                    <Card key={record.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{record.title}</CardTitle>
                        <CardDescription>
                          Type: {record.record_type || 'Unknown'} • Created: {
                            record.created_at ? format(new Date(record.created_at), 'MMM d, yyyy') : 'Unknown date'
                          }
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-3">
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {record.description || 'No description available'}
                        </p>
                        
                        {record.diagnosis && record.diagnosis.length > 0 && (
                          <div className="mt-3">
                            <span className="text-xs text-muted-foreground">Diagnosis: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {record.diagnosis.slice(0, 3).map((diagnosis, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {diagnosis}
                                </Badge>
                              ))}
                              {record.diagnosis.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{record.diagnosis.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" size="sm">View Record</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
