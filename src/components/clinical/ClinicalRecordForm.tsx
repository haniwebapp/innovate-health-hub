
import React, { useState } from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ClinicalAIService } from '@/services/ai/clinical/ClinicalAIService';
import type { ClinicalRecord } from '@/types/clinicalTypes';

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  record_type: z.string().min(1, "Record type is required"),
  symptoms: z.array(z.string()).optional(),
  diagnosis: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ClinicalRecordFormProps {
  initialData?: Partial<ClinicalRecord>;
  onSubmit: (data: FormValues) => void;
  onCancel?: () => void;
}

export function ClinicalRecordForm({ initialData, onSubmit, onCancel }: ClinicalRecordFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      record_type: initialData?.record_type || "",
      symptoms: initialData?.symptoms || [],
      diagnosis: initialData?.diagnosis || [],
    },
  });
  
  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      onSubmit(data);
    } catch (error) {
      console.error('Error submitting clinical record:', error);
      toast.error('Failed to save clinical record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnalyze = async () => {
    const description = form.getValues('description');
    if (!description) {
      toast.error('Please enter a description to analyze');
      return;
    }
    
    setIsAnalyzing(true);
    try {
      const result = await ClinicalAIService.analyzeText(description);
      
      // Update the form with the analysis results
      form.setValue('symptoms', result.symptoms);
      form.setValue('diagnosis', result.diagnosis);
      
      toast.success('Text analyzed successfully');
    } catch (error) {
      console.error('Error analyzing text:', error);
      toast.error('Failed to analyze text');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const recordTypes = [
    "Medical Device", 
    "Digital Health Solution", 
    "Wearable Tech", 
    "Clinical Protocol", 
    "Treatment Procedure",
    "Health App",
    "Diagnostic Tool"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{initialData ? 'Edit Clinical Record' : 'Create Clinical Record'}</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            {/* Basic Information */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter clinical record title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="record_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Record Type</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select record type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {recordTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Description</FormLabel>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter detailed description" 
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Symptoms and Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Symptoms</FormLabel>
                    <div className="flex flex-wrap gap-2 border rounded-md p-3 min-h-[80px]">
                      {field.value && field.value.length > 0 ? (
                        field.value.map((symptom, index) => (
                          <Badge 
                            key={index} 
                            variant="secondary"
                            className="cursor-pointer"
                            onClick={() => {
                              const newSymptoms = field.value?.filter((_, i) => i !== index);
                              form.setValue('symptoms', newSymptoms);
                            }}
                          >
                            {symptom}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No symptoms added</p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Diagnosis</FormLabel>
                    <div className="flex flex-wrap gap-2 border rounded-md p-3 min-h-[80px]">
                      {field.value && field.value.length > 0 ? (
                        field.value.map((diagnosis, index) => (
                          <Badge 
                            key={index}
                            className="cursor-pointer"
                            onClick={() => {
                              const newDiagnosis = field.value?.filter((_, i) => i !== index);
                              form.setValue('diagnosis', newDiagnosis);
                            }}
                          >
                            {diagnosis}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No diagnosis added</p>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : initialData ? 'Update Record' : 'Create Record'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
