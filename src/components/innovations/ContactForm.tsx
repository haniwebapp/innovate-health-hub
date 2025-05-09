
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from '@/hooks/use-toast';
import { useSubmissionForm } from '@/contexts/SubmissionFormContext';
import { Button } from '@/components/ui/button';
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
  contactName: z.string().min(2, "Name must be at least 2 characters").max(100),
  contactEmail: z.string().email("Please enter a valid email address"),
  organization: z.string().min(2, "Organization name is required").max(100),
  phoneNumber: z.string().min(8, "Please enter a valid phone number").max(20),
  address: z.string().optional(),
  additionalInfo: z.string().optional(),
  allowPublicContact: z.boolean().default(false),
});

interface ContactFormProps {
  onComplete?: () => void;
}

export default function ContactForm({ onComplete }: ContactFormProps) {
  const { formData, updateFormData, updateProgress } = useSubmissionForm();
  
  // Initialize form with existing data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactName: formData.contactName || "",
      contactEmail: formData.contactEmail || "",
      organization: formData.organization || "",
      phoneNumber: formData.phoneNumber || "",
      address: formData.address || "",
      additionalInfo: formData.additionalInfo || "",
      allowPublicContact: formData.allowPublicContact || false,
    },
  });
  
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    // Update form data in context
    updateFormData({
      ...data
    });
    
    // Mark this step as completed
    updateProgress('contact', true);
    
    // Save progress in local storage
    const currentProgress = JSON.parse(localStorage.getItem('innovationFormProgress') || '{}');
    localStorage.setItem('innovationFormProgress', JSON.stringify({
      ...currentProgress,
      contact: true
    }));
    
    // Show success message
    toast({
      title: "Contact information saved",
      description: "Your contact information has been saved.",
    });
    
    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="contactName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormDescription>
                The name of the primary contact person for this innovation.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormDescription>
                Your professional email address for communication.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <FormControl>
                <Input placeholder="Company or institution name" {...field} />
              </FormControl>
              <FormDescription>
                Your company, institution, or organization name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+966 5X XXX XXXX" {...field} />
              </FormControl>
              <FormDescription>
                A phone number where you can be reached.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your business address" 
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Your business or organization address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="additionalInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Information (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Any additional contact information or notes" 
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormDescription>
                Any additional information you'd like to provide.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="allowPublicContact"
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
                  Allow public contact
                </FormLabel>
                <FormDescription>
                  Check this if you allow potential partners and investors to contact you directly about your innovation.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <Button 
          type="submit" 
          className="bg-moh-green hover:bg-moh-darkGreen text-white w-full sm:w-auto"
        >
          Save Contact Information
        </Button>
      </form>
    </Form>
  );
}
