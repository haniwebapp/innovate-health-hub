
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
import { Checkbox } from "@/components/ui/checkbox";

// Form schema
const formSchema = z.object({
  technicalSpecifications: z.string().min(50, "Technical specifications must be at least 50 characters").max(2000),
  innovationAdvantages: z.string().min(50, "Advantages must be at least 50 characters").max(1000),
  patentStatus: z.enum(['none', 'pending', 'granted']),
  hasAI: z.boolean().default(false),
  hasConnectedDevices: z.boolean().default(false),
  hasMobileApp: z.boolean().default(false),
  compatibleSystems: z.string().optional(),
  targetUsers: z.string().min(10, "Target users must be at least 10 characters").max(500),
});

export default function TechnicalPage() {
  const navigate = useNavigate();
  const { formData, updateFormData, updateProgress } = useSubmissionForm();
  
  // Initialize form with existing data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technicalSpecifications: formData.technicalSpecifications || "",
      innovationAdvantages: formData.innovationAdvantages || "",
      patentStatus: (formData.patentStatus as any) || "none",
      hasAI: formData.hasAI || false,
      hasConnectedDevices: formData.hasConnectedDevices || false,
      hasMobileApp: formData.hasMobileApp || false,
      compatibleSystems: formData.compatibleSystems || "",
      targetUsers: formData.targetUsers || "",
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Update form data in context
    updateFormData({
      ...data
    });
    
    // Mark this step as completed
    updateProgress('technical', true);
    
    // Save progress in local storage
    const currentProgress = JSON.parse(localStorage.getItem('innovationFormProgress') || '{}');
    localStorage.setItem('innovationFormProgress', JSON.stringify({
      ...currentProgress,
      technical: true
    }));
    
    // Show success message
    toast({
      title: "Technical details saved",
      description: "Your innovation's technical specifications have been saved.",
    });
    
    // Navigate to next step
    navigate('/innovations/submit/regulatory');
  };
  
  const handleNext = (): boolean => {
    // Trigger form validation and submission
    form.handleSubmit(onSubmit)();
    return form.formState.isValid;
  };

  return (
    <SubmissionLayout onNext={handleNext} nextButtonText="Continue to Regulatory Information">
      <div>
        <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Technical Specifications</h2>
        <p className="text-gray-600 mb-6">
          Provide technical details about your healthcare innovation.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="technicalSpecifications"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technical Specifications</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the technical aspects of your innovation" 
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide detailed technical information about your innovation, including its components, functionality, and specifications.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="innovationAdvantages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technical Advantages</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="What technical advantages does your innovation offer?" 
                      {...field}
                      rows={4}
                    />
                  </FormControl>
                  <FormDescription>
                    Explain the technical advantages of your innovation compared to existing solutions.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="patentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patent Status</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="none">No Patent</option>
                      <option value="pending">Patent Pending</option>
                      <option value="granted">Patent Granted</option>
                    </select>
                  </FormControl>
                  <FormDescription>
                    Indicate the current patent status of your innovation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-3">
              <FormLabel>Technology Features</FormLabel>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="hasAI"
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
                          Uses Artificial Intelligence / Machine Learning
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hasConnectedDevices"
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
                          Incorporates Connected Devices / IoT
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="hasMobileApp"
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
                          Includes Mobile Application
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="compatibleSystems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compatible Systems</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., iOS, Android, Windows, specific medical systems" 
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    List any systems, platforms, or standards your innovation is compatible with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="targetUsers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Users</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the intended users of your innovation" 
                      {...field}
                      rows={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify who will use your innovation (e.g., physicians, patients, lab technicians).
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
