
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClinicalAIService } from "@/services/ai/clinical/ClinicalAIService";
import { ClinicalRecord } from "@/types/clinicalTypes";
import { FileText, Tag, Activity, Clock } from "lucide-react";
import { toast } from "sonner";

export interface ClinicalRecordViewerProps {
  record: ClinicalRecord;
  onUpdate: () => void;
}

export function ClinicalRecordViewer({ record, onUpdate }: ClinicalRecordViewerProps) {
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [references, setReferences] = useState<string[]>([]);

  const handleGenerateTags = async () => {
    setIsGeneratingTags(true);
    try {
      if (!record.id) {
        toast.error("Record ID is required");
        return;
      }
      
      const tags = await ClinicalAIService.autoTagRecord(record.id);
      toast.success("Tags generated successfully");
      onUpdate();
    } catch (error) {
      toast.error("Failed to generate tags");
      console.error("Error generating tags:", error);
    } finally {
      setIsGeneratingTags(false);
    }
  };

  const handleGenerateRecommendations = async () => {
    setIsGeneratingRecommendations(true);
    try {
      if (!record.id) {
        toast.error("Record ID is required");
        return;
      }
      
      const result = await ClinicalAIService.generateRecommendations(record.id);
      setRecommendations(result.recommendations);
      setReferences(result.references);
      toast.success("Recommendations generated successfully");
    } catch (error) {
      toast.error("Failed to generate recommendations");
      console.error("Error generating recommendations:", error);
    } finally {
      setIsGeneratingRecommendations(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>{record.title}</CardTitle>
              <CardDescription>{record.record_type}</CardDescription>
            </div>
            <div>
              <Badge variant="outline">{new Date(record.created_at).toLocaleDateString()}</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {record.description && (
            <div>
              <h3 className="text-sm font-medium">Description</h3>
              <p className="text-sm text-muted-foreground mt-1">{record.description}</p>
            </div>
          )}

          {record.symptoms && record.symptoms.length > 0 && (
            <div>
              <h3 className="text-sm font-medium">Symptoms</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {record.symptoms.map((symptom, index) => (
                  <Badge key={index} variant="secondary">{symptom}</Badge>
                ))}
              </div>
            </div>
          )}

          {record.diagnosis && record.diagnosis.length > 0 && (
            <div>
              <h3 className="text-sm font-medium">Diagnosis</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {record.diagnosis.map((diagnosis, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50">{diagnosis}</Badge>
                ))}
              </div>
            </div>
          )}

          {record.medical_codes && Object.keys(record.medical_codes).length > 0 && (
            <div>
              <h3 className="text-sm font-medium">Medical Codes</h3>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {Object.entries(record.medical_codes).map(([code, value], index) => (
                  <div key={index} className="text-xs">
                    <span className="font-medium">{code}:</span> {value}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {new Date(record.updated_at).toLocaleString()}
          </div>
          <Button variant="outline" size="sm" onClick={onUpdate}>
            Edit Record
          </Button>
        </CardFooter>
      </Card>

      <Tabs defaultValue="ai-tools">
        <TabsList>
          <TabsTrigger value="ai-tools" className="flex items-center gap-1">
            <Activity className="h-4 w-4" />
            AI Tools
          </TabsTrigger>
          <TabsTrigger value="related" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Related Records
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ai-tools" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI Recommendations</CardTitle>
              <CardDescription>Generate clinical recommendations based on this record</CardDescription>
            </CardHeader>
            <CardContent>
              {recommendations.length > 0 ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {recommendations.map((recommendation, index) => (
                        <li key={index} className="text-sm">{recommendation}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {references.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">References</h3>
                      <ul className="space-y-1">
                        {references.map((reference, index) => (
                          <li key={index} className="text-xs text-muted-foreground">{reference}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center py-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    No recommendations generated yet. Click the button below to generate AI recommendations.
                  </p>
                  <Button
                    onClick={handleGenerateRecommendations}
                    disabled={isGeneratingRecommendations}
                    className="w-full sm:w-auto"
                  >
                    {isGeneratingRecommendations ? "Generating..." : "Generate Recommendations"}
                  </Button>
                </div>
              )}
            </CardContent>
            {recommendations.length > 0 && (
              <CardFooter className="border-t pt-4">
                <Button
                  variant="outline"
                  onClick={handleGenerateRecommendations}
                  disabled={isGeneratingRecommendations}
                  className="w-full"
                >
                  {isGeneratingRecommendations ? "Regenerating..." : "Regenerate Recommendations"}
                </Button>
              </CardFooter>
            )}
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">AI Tagging</CardTitle>
              <CardDescription>Automatically generate tags for this record</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center py-4">
              <Button
                className="flex items-center gap-2"
                onClick={handleGenerateTags}
                disabled={isGeneratingTags}
              >
                <Tag className="h-4 w-4" />
                {isGeneratingTags ? "Generating Tags..." : "Generate Tags"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="related" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Related Records</CardTitle>
              <CardDescription>Find similar records based on content</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Related records functionality will be available in the next release.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
