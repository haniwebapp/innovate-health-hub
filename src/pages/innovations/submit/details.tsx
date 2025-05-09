
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import SubmissionLayout from '@/components/innovations/SubmissionLayout';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Form schema
const formSchema = z.object({
  fullDescription: z.string().min(100, "Full description must be at least 100 characters").max(2000),
  implementationStatus: z.enum(['concept', 'prototype', 'pilot', 'market']),
  problemStatement: z.string().min(50, "Problem statement must be at least 50 characters").max(1000),
  solutionDescription: z.string().min(50, "Solution description must be at least 50 characters").max(1000),
});

export default function DetailsPage() {
  const navigate = useNavigate();
  const { formData, updateFormData, updateProgress } = useSubmissionForm();
  
  // Initialize form with existing data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullDescription: formData.fullDescription || "",
      implementationStatus: (formData.implementationStatus as any) || "concept",
      problemStatement: formData.problemStatement || "",
      solutionDescription: formData.solutionDescription || "",
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Update form data in context
    updateFormData({
      ...data
    });
    
    // Mark this step as completed
    updateProgress('details', true);
    
    // Save progress in local storage
    const currentProgress = JSON.parse(localStorage.getItem('innovationFormProgress') || '{}');
    localStorage.setItem('innovationFormProgress', JSON.stringify({
      ...currentProgress,
      details: true
    }));
    
    // Show success message
    toast({
      title: "Details saved",
      description: "Your innovation's detailed information has been saved.",
    });
    
    // Navigate to next step
    navigate('/innovations/submit/media');
  };
  
  const handleNext = (): boolean => {
    // Trigger form validation and submission
    form.handleSubmit(onSubmit)();
    return form.formState.isValid;
  };

  return (
    <SubmissionLayout onNext={handleNext} nextButtonText="Continue to Media">
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Innovation Details</h2>
        <p className="text-gray-600 mb-6">
          Provide comprehensive details about your healthcare innovation.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="fullDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Provide a comprehensive description of your innovation" 
                      {...field}
                      rows={6}
                    />
                  </FormControl>
                  <FormDescription>
                    Describe your innovation in detail. Include its purpose, features, and how it works.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="implementationStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Implementation Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="concept" id="concept" />
                        <Label htmlFor="concept">Concept - Early idea stage</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="prototype" id="prototype" />
                        <Label htmlFor="prototype">Prototype - Working model developed</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pilot" id="pilot" />
                        <Label htmlFor="pilot">Pilot - Testing with users</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="market" id="market" />
                        <Label htmlFor="market">Market - Ready for or in market</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Select the current stage of your innovation's development.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="problemStatement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Statement</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What specific healthcare problem does your innovation solve?" 
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Clearly describe the healthcare challenge or problem your innovation addresses.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="solutionDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Solution Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="How does your innovation solve the described problem?" 
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain how your innovation addresses the problem and what makes your approach unique.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Hidden submit button for form validation */}
            <button type="submit" className="hidden"></button>
          </form>
        </Form>
      </div>
    </SubmissionLayout>
  );
}
