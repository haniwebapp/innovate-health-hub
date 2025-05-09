
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Form schema
const formSchema = z.object({
  regulatoryStatus: z.enum(['notStarted', 'inProgress', 'approved', 'notApplicable']),
  approvalType: z.string().optional(),
  approvalDetails: z.string().optional(),
  hasRiskAssessment: z.boolean().default(false),
  hasClinicalTrials: z.boolean().default(false),
  hasEthicalReview: z.boolean().default(false),
  complianceStandards: z.string().optional(),
  regulatoryChallenges: z.string().optional(),
});

export default function RegulatoryPage() {
  const navigate = useNavigate();
  const { formData, updateFormData, updateProgress } = useSubmissionForm();
  
  // Initialize form with existing data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      regulatoryStatus: (formData.regulatoryStatus as any) || "notStarted",
      approvalType: formData.approvalType || "",
      approvalDetails: formData.approvalDetails || "",
      hasRiskAssessment: formData.hasRiskAssessment || false,
      hasClinicalTrials: formData.hasClinicalTrials || false,
      hasEthicalReview: formData.hasEthicalReview || false,
      complianceStandards: formData.complianceStandards || "",
      regulatoryChallenges: formData.regulatoryChallenges || "",
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Update form data in context
    updateFormData({
      ...data
    });
    
    // Mark this step as completed
    updateProgress('regulatory', true);
    
    // Save progress in local storage
    const currentProgress = JSON.parse(localStorage.getItem('innovationFormProgress') || '{}');
    localStorage.setItem('innovationFormProgress', JSON.stringify({
      ...currentProgress,
      regulatory: true
    }));
    
    // Show success message
    toast({
      title: "Regulatory information saved",
      description: "Your innovation's regulatory information has been saved.",
    });
    
    // Navigate to next step
    navigate('/innovations/submit/contact');
  };
  
  const handleNext = (): boolean => {
    // Trigger form validation and submission
    form.handleSubmit(onSubmit)();
    return form.formState.isValid;
  };
  
  // Watch regulatory status to conditionally show fields
  const regulatoryStatus = form.watch('regulatoryStatus');

  return (
    <SubmissionLayout onNext={handleNext} nextButtonText="Continue to Contact Information">
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Regulatory Information</h2>
        <p className="text-gray-600 mb-6">
          Provide information about the regulatory status and compliance of your healthcare innovation.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="regulatoryStatus"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Regulatory Approval Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="notStarted" id="notStarted" />
                        <Label htmlFor="notStarted">Not Started</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inProgress" id="inProgress" />
                        <Label htmlFor="inProgress">In Progress</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="approved" id="approved" />
                        <Label htmlFor="approved">Approved</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="notApplicable" id="notApplicable" />
                        <Label htmlFor="notApplicable">Not Applicable</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    Select the current regulatory approval status of your innovation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {(regulatoryStatus === 'inProgress' || regulatoryStatus === 'approved') && (
              <>
                <FormField
                  control={form.control}
                  name="approvalType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approval Type</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="e.g., FDA 510(k), CE Mark, SFDA" 
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Specify what type of regulatory approval you have or are seeking.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="approvalDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Approval Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Provide details about your regulatory approval process" 
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormDescription>
                        Include details like submission date, reference numbers, or stages completed.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            
            <div className="space-y-3">
              <FormLabel>Compliance Activities</FormLabel>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="hasRiskAssessment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Risk Assessment Completed
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hasClinicalTrials"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Clinical Trials Conducted
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hasEthicalReview"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Ethical Review Completed
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="complianceStandards"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compliance Standards</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any standards your innovation complies with (e.g., ISO 13485, HIPAA)" 
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    List relevant healthcare standards, data protection laws, or other regulations your innovation complies with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="regulatoryChallenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Regulatory Challenges</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe any regulatory challenges you face" 
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Optionally, describe any regulatory challenges your innovation faces.
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
