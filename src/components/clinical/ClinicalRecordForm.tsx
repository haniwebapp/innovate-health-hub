
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Tag, Sparkles } from "lucide-react";
import { ClinicalAIService, TextAnalysisResult } from "@/services/ai/clinical/ClinicalAIService";
import { toast } from "sonner";

interface ClinicalRecordFormProps {
  onSubmit: (data: {
    title?: string;
    description?: string;
    diagnosis?: string[];
    record_type?: string;
    symptoms?: string[];
  }) => void;
  onCancel: () => void;
  initialData?: {
    id?: string;
    title: string;
    description?: string;
    record_type: string;
    symptoms?: string[];
    diagnosis?: string[];
  };
}

export function ClinicalRecordForm({ onSubmit, onCancel, initialData }: ClinicalRecordFormProps) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [recordType, setRecordType] = useState(initialData?.record_type || '');
  const [symptoms, setSymptoms] = useState<string[]>(initialData?.symptoms || []);
  const [diagnosis, setDiagnosis] = useState<string[]>(initialData?.diagnosis || []);
  const [symptomInput, setSymptomInput] = useState('');
  const [diagnosisInput, setDiagnosisInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSymptomAdd = () => {
    if (symptomInput.trim()) {
      setSymptoms([...symptoms, symptomInput.trim()]);
      setSymptomInput('');
    }
  };

  const handleDiagnosisAdd = () => {
    if (diagnosisInput.trim()) {
      setDiagnosis([...diagnosis, diagnosisInput.trim()]);
      setDiagnosisInput('');
    }
  };

  const handleRemoveSymptom = (index: number) => {
    const newSymptoms = [...symptoms];
    newSymptoms.splice(index, 1);
    setSymptoms(newSymptoms);
  };

  const handleRemoveDiagnosis = (index: number) => {
    const newDiagnosis = [...diagnosis];
    newDiagnosis.splice(index, 1);
    setDiagnosis(newDiagnosis);
  };

  const handleAnalyzeText = async () => {
    if (!description) {
      toast.error("Please add a description to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const analysis = await ClinicalAIService.analyzeText(description);
      
      // Add any new tags found
      if (analysis.tags) {
        const newTags = analysis.tags.filter(
          tag => !symptoms.some(s => s.toLowerCase() === tag.toLowerCase())
        );
        if (newTags.length > 0) {
          setSymptoms([...symptoms, ...newTags]);
        }
      }
      
      // Add any entity mentions as diagnoses
      if (analysis.entities) {
        const newEntities = analysis.entities.filter(
          entity => !diagnosis.some(d => d.toLowerCase() === entity.toLowerCase())
        );
        if (newEntities.length > 0) {
          setDiagnosis([...diagnosis, ...newEntities]);
        }
      }
      
      toast.success("Text analyzed successfully");
    } catch (error) {
      toast.error("Failed to analyze text");
      console.error("Error analyzing text:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !recordType) {
      toast.error("Title and record type are required");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      onSubmit({
        title,
        description,
        record_type: recordType,
        symptoms,
        diagnosis
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to save record");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{initialData ? 'Edit Clinical Record' : 'New Clinical Record'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input 
              id="title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title for the clinical record"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recordType">Record Type *</Label>
            <Select value={recordType} onValueChange={setRecordType} required>
              <SelectTrigger id="recordType">
                <SelectValue placeholder="Select a record type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Medical Device">Medical Device</SelectItem>
                <SelectItem value="Digital Health">Digital Health</SelectItem>
                <SelectItem value="Pharmaceutical">Pharmaceutical</SelectItem>
                <SelectItem value="Diagnostic">Diagnostic</SelectItem>
                <SelectItem value="Treatment Protocol">Treatment Protocol</SelectItem>
                <SelectItem value="Clinical Study">Clinical Study</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Description</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAnalyzeText}
                disabled={isAnalyzing || !description}
                className="flex items-center gap-1"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-3 w-3 animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3 w-3" />
                    <span>Analyze Text</span>
                  </>
                )}
              </Button>
            </div>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a detailed description"
              rows={5}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms/Tags</Label>
            <div className="flex gap-2">
              <Input 
                id="symptoms" 
                value={symptomInput}
                onChange={(e) => setSymptomInput(e.target.value)}
                placeholder="Add a symptom or tag"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleSymptomAdd}
                disabled={!symptomInput.trim()}
                className="flex-shrink-0"
              >
                Add
              </Button>
            </div>
            {symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {symptoms.map((symptom, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-muted rounded-full px-3 py-1 text-sm"
                  >
                    <Tag className="h-3 w-3 mr-1 opacity-70" />
                    {symptom}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSymptom(index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="diagnosis">Diagnosis</Label>
            <div className="flex gap-2">
              <Input 
                id="diagnosis" 
                value={diagnosisInput}
                onChange={(e) => setDiagnosisInput(e.target.value)}
                placeholder="Add a diagnosis"
                className="flex-1"
              />
              <Button 
                type="button" 
                onClick={handleDiagnosisAdd}
                disabled={!diagnosisInput.trim()}
                className="flex-shrink-0"
              >
                Add
              </Button>
            </div>
            {diagnosis.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {diagnosis.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-blue-50 rounded-full px-3 py-1 text-sm"
                  >
                    {item}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveDiagnosis(index)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !title || !recordType}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              initialData ? 'Update Record' : 'Save Record'
            )}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
