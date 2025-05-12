
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Tag, Zap, Lightbulb, LinkIcon } from "lucide-react";
import { ClinicalAIService, SimilarRecord } from '@/services/ai/clinical/ClinicalAIService';
import { toast } from "sonner";
import type { ClinicalRecord, ClinicalTag } from '@/types/clinicalTypes';

interface ClinicalRecordViewerProps {
  record: ClinicalRecord;
  onBack?: () => void;
  onEdit?: () => void;
}

export function ClinicalRecordViewer({ record, onBack, onEdit }: ClinicalRecordViewerProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [tags, setTags] = useState<ClinicalTag[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [references, setReferences] = useState<string[]>([]);
  const [similarRecords, setSimilarRecords] = useState<SimilarRecord[]>([]);

  useEffect(() => {
    // Reset state when record changes
    setTags([]);
    setRecommendations([]);
    setReferences([]);
    setSimilarRecords([]);
  }, [record.id]);

  const handleGenerateTags = async () => {
    setLoading(true);
    try {
      const generatedTags = await ClinicalAIService.autoTagRecord(record.id);
      
      // Convert string tags to ClinicalTag objects
      const formattedTags: ClinicalTag[] = generatedTags.map(tag => {
        if (typeof tag === 'string') {
          return {
            id: `temp-${Math.random().toString(36).substring(2, 11)}`,
            tag: tag,
            record_id: record.id,
            source: 'ai-generated',
            created_at: new Date().toISOString()
          };
        }
        return tag;
      });
      
      setTags(formattedTags);
      toast.success('Tags generated successfully');
    } catch (error) {
      console.error('Error generating tags:', error);
      toast.error('Failed to generate tags');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    setLoadingRecommendations(true);
    try {
      const result = await ClinicalAIService.generateRecommendations(record.id);
      setRecommendations(result.recommendations);
      setReferences(result.references);
      toast.success('Recommendations generated successfully');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast.error('Failed to generate recommendations');
    } finally {
      setLoadingRecommendations(false);
    }
  };

  const handleFindSimilarRecords = async () => {
    setLoadingSimilar(true);
    try {
      const similar = await ClinicalAIService.findSimilarRecords(record.id);
      setSimilarRecords(similar);
      toast.success('Found similar records');
    } catch (error) {
      console.error('Error finding similar records:', error);
      toast.error('Failed to find similar records');
    } finally {
      setLoadingSimilar(false);
    }
  };

  return (
    <Card className="border-0 shadow-none mb-6">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{record.title}</CardTitle>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <Clock className="h-4 w-4" />
              <span>Created {new Date(record.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="outline" onClick={onEdit}>
                Edit
              </Button>
            )}
            {onBack && (
              <Button variant="default" onClick={onBack}>
                Back to List
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="similar-records">Similar Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <CardContent className="space-y-4 px-6">
            <div>
              <h3 className="font-medium mb-2">Record Type</h3>
              <Badge variant="outline">{record.record_type}</Badge>
            </div>

            <div>
              <h3 className="font-medium mb-2">Description</h3>
              <p className="text-muted-foreground">{record.description || 'No description provided'}</p>
            </div>

            {record.symptoms && record.symptoms.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Symptoms</h3>
                <div className="flex flex-wrap gap-2">
                  {record.symptoms.map((symptom, index) => (
                    <Badge key={index} variant="secondary">{symptom}</Badge>
                  ))}
                </div>
              </div>
            )}

            {record.diagnosis && record.diagnosis.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Diagnosis</h3>
                <div className="flex flex-wrap gap-2">
                  {record.diagnosis.map((diagnosis, index) => (
                    <Badge key={index}>{diagnosis}</Badge>
                  ))}
                </div>
              </div>
            )}

            {record.medical_codes && (
              <div>
                <h3 className="font-medium mb-2">Medical Codes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(record.medical_codes).map(([codeType, code]) => (
                    <div key={codeType} className="flex items-center gap-2">
                      <span className="font-medium">{codeType}:</span>
                      <span>{code}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </TabsContent>
        
        <TabsContent value="ai-analysis" className="space-y-4 pt-4">
          <CardContent className="px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span>Auto-Generated Tags</span>
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateTags}
                      disabled={loading}
                    >
                      {loading ? "Generating..." : "Generate Tags"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {tags.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {typeof tag === 'string' ? tag : tag.tag}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {loading ? "Generating tags..." : "No tags generated yet. Click the button to generate AI tags."}
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Lightbulb className="h-4 w-4" />
                      <span>Recommendations</span>
                    </CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleGenerateRecommendations}
                      disabled={loadingRecommendations}
                    >
                      {loadingRecommendations ? "Generating..." : "Get Recommendations"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {recommendations.length > 0 ? (
                    <div className="space-y-4">
                      <ul className="list-disc pl-5 space-y-1">
                        {recommendations.map((rec, index) => (
                          <li key={index}>{rec}</li>
                        ))}
                      </ul>
                      
                      {references.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="font-medium mb-2 text-sm">References</h4>
                            <ul className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                              {references.map((ref, index) => (
                                <li key={index}>{ref}</li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {loadingRecommendations ? "Generating recommendations..." : "No recommendations generated yet. Click the button to get AI recommendations."}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </TabsContent>
        
        <TabsContent value="similar-records" className="space-y-4 pt-4">
          <CardContent className="px-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Similar Clinical Records</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleFindSimilarRecords}
                disabled={loadingSimilar}
              >
                {loadingSimilar ? "Searching..." : "Find Similar Records"}
              </Button>
            </div>
            
            {similarRecords.length > 0 ? (
              <div className="space-y-4">
                {similarRecords.map((similar) => (
                  <Card key={similar.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{similar.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {similar.description && similar.description.substring(0, 100)}
                            {similar.description && similar.description.length > 100 ? '...' : ''}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mt-2">
                            {similar.record_type && (
                              <Badge variant="outline">{similar.record_type}</Badge>
                            )}
                            
                            {similar.symptoms && similar.symptoms.map((symptom, i) => (
                              <Badge key={i} variant="secondary">{symptom}</Badge>
                            ))}
                            
                            {similar.diagnosis && similar.diagnosis.map((diag, i) => (
                              <Badge key={i}>{diag}</Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Badge className="bg-green-500">
                            {similar.similarity ? `${(similar.similarity * 100).toFixed(0)}% match` : 'Similar'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {loadingSimilar ? "Searching for similar records..." : "No similar records found yet. Click the button to search."}
              </p>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
