
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ClinicalService } from "@/services/clinical/ClinicalService";
import { ClinicalAIService } from "@/services/ai/clinical/ClinicalAIService";
import { ClinicalRecordFormData } from "@/types/clinicalTypes";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, X, Sparkles } from "lucide-react";

interface ClinicalRecordFormProps {
  onSubmit: (recordId: string) => void;
  onCancel?: () => void;
}

export function ClinicalRecordForm({ onSubmit, onCancel }: ClinicalRecordFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ClinicalRecordFormData>({
    title: '',
    description: '',
    record_type: 'case_study',
    symptoms: [],
    diagnosis: [],
    medical_codes: {}
  });
  const [symptom, setSymptom] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSymptom = () => {
    if (symptom && !formData.symptoms?.includes(symptom)) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...(prev.symptoms || []), symptom]
      }));
      setSymptom('');
    }
  };

  const removeSymptom = (index: number) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms?.filter((_, i) => i !== index)
    }));
  };

  const addDiagnosis = () => {
    if (diagnosis && !formData.diagnosis?.includes(diagnosis)) {
      setFormData(prev => ({
        ...prev,
        diagnosis: [...(prev.diagnosis || []), diagnosis]
      }));
      setDiagnosis('');
    }
  };

  const removeDiagnosis = (index: number) => {
    setFormData(prev => ({
      ...prev,
      diagnosis: prev.diagnosis?.filter((_, i) => i !== index)
    }));
  };

  const analyzeText = async () => {
    if (!formData.description) {
      toast({
        title: "Description required",
        description: "Please enter a description to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const text = `${formData.title}. ${formData.description}`;
      const result = await ClinicalAIService.analyzeText(text);
      
      setFormData(prev => ({
        ...prev,
        medical_codes: result.medicalCodes || {},
        symptoms: [...(prev.symptoms || []), ...(result.symptoms || [])].filter((v, i, a) => a.indexOf(v) === i),
        diagnosis: [...(prev.diagnosis || []), ...(result.diagnosis || [])].filter((v, i, a) => a.indexOf(v) === i)
      }));
      
      toast({
        title: "AI Analysis Complete",
        description: "Extracted data has been added to the form.",
      });
    } catch (error) {
      console.error("Error during AI analysis:", error);
      toast({
        title: "Analysis failed",
        description: error.message || "Could not complete the analysis.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const newRecord = await ClinicalService.createRecord(formData);
      if (!newRecord) {
        throw new Error("Failed to create record");
      }
      
      toast({
        title: "Record Created",
        description: "Clinical record has been successfully created.",
      });
      
      onSubmit(newRecord.id);
    } catch (error) {
      console.error("Error creating clinical record:", error);
      toast({
        title: "Submission failed",
        description: error.message || "Could not create the clinical record.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>New Clinical Record</CardTitle>
        <CardDescription>Enter clinical data for analysis and documentation</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Record Title</Label>
            <Input 
              id="title" 
              name="title" 
              required 
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Case Study: Diabetes Management"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="record_type">Record Type</Label>
              <Select 
                value={formData.record_type} 
                onValueChange={(value) => handleSelectChange('record_type', value)}
              >
                <SelectTrigger id="record_type">
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="case_study">Case Study</SelectItem>
                  <SelectItem value="clinical_trial">Clinical Trial</SelectItem>
                  <SelectItem value="research_finding">Research Finding</SelectItem>
                  <SelectItem value="treatment_protocol">Treatment Protocol</SelectItem>
                  <SelectItem value="patient_record">Patient Record</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-1">
              <Label htmlFor="related_innovation_id">Related Innovation (Optional)</Label>
              <Input 
                id="related_innovation_id" 
                name="related_innovation_id" 
                value={formData.related_innovation_id || ''}
                onChange={handleChange}
                placeholder="Innovation ID if applicable"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Clinical Description</Label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                disabled={isAnalyzing || !formData.description}
                onClick={analyzeText}
              >
                {isAnalyzing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Analyze Text
              </Button>
            </div>
            <Textarea 
              id="description" 
              name="description" 
              required 
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Provide detailed clinical information..."
              className="min-h-32"
            />
          </div>
          
          <div className="space-y-3">
            <Label>Symptoms</Label>
            <div className="flex space-x-2">
              <Input 
                value={symptom}
                onChange={(e) => setSymptom(e.target.value)}
                placeholder="Add symptom"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={addSymptom}
                disabled={!symptom}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 min-h-10">
              {formData.symptoms?.map((s, index) => (
                <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {s}
                  <button 
                    type="button" 
                    onClick={() => removeSymptom(index)}
                    className="ml-1 hover:bg-muted p-1 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {!formData.symptoms || formData.symptoms.length === 0 ? (
                <span className="text-xs text-muted-foreground">No symptoms added</span>
              ) : null}
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>Diagnosis</Label>
            <div className="flex space-x-2">
              <Input 
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Add diagnosis"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={addDiagnosis}
                disabled={!diagnosis}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 min-h-10">
              {formData.diagnosis?.map((d, index) => (
                <Badge key={index} variant="secondary" className="pl-2 pr-1 py-1 flex items-center gap-1">
                  {d}
                  <button 
                    type="button"
                    onClick={() => removeDiagnosis(index)}
                    className="ml-1 hover:bg-muted p-1 rounded-full"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {!formData.diagnosis || formData.diagnosis.length === 0 ? (
                <span className="text-xs text-muted-foreground">No diagnosis added</span>
              ) : null}
            </div>
          </div>
          
          {/* Show medical codes if any are present after analysis */}
          {formData.medical_codes && Object.keys(formData.medical_codes).length > 0 && (
            <div className="space-y-2">
              <Label>Medical Codes (AI Generated)</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-slate-50 rounded-md">
                {Object.entries(formData.medical_codes).map(([code, description], index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Badge variant="outline" className="whitespace-nowrap">{code}</Badge>
                    <span className="text-sm">{description as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Record
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
