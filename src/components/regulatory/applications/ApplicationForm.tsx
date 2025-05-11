
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Save } from "lucide-react";
import { ApplicationFormData } from "./types";
import { SandboxApplication } from "@/utils/regulatoryUtils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  name: z.string().min(5, "Application name must be at least 5 characters").max(100),
  description: z.string().min(20, "Description must be at least 20 characters"),
  innovationType: z.string().min(1, "Please select an innovation type"),
  framework: z.string().optional(),
  regulatoryChallenges: z.string().optional(),
  testingDuration: z.string().min(1, "Please select a testing duration"),
  organizationType: z.string().min(1, "Please select an organization type"),
  innovator: z.string().optional() // Added this field to match the database schema
});

interface ApplicationFormProps {
  onSubmit: (data: ApplicationFormData) => void;
  onSaveDraft?: (data: ApplicationFormData) => void;
  isSubmitting: boolean;
  initialValues?: Partial<ApplicationFormData>;
}

export function ApplicationForm({
  onSubmit,
  onSaveDraft,
  isSubmitting,
  initialValues
}: ApplicationFormProps) {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      innovationType: initialValues?.innovationType || "",
      framework: initialValues?.framework || "",
      regulatoryChallenges: initialValues?.regulatoryChallenges || "",
      testingDuration: initialValues?.testingDuration || "",
      organizationType: initialValues?.organizationType || "",
      innovator: user?.first_name && user?.last_name 
        ? `${user.first_name} ${user.last_name}` 
        : user?.email || ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const applicationData: ApplicationFormData = {
      name: values.name,
      description: values.description,
      innovationType: values.innovationType,
      framework: values.framework || "",
      regulatoryChallenges: values.regulatoryChallenges,
      testingDuration: values.testingDuration,
      organizationType: values.organizationType
    };

    // Create application object for API submission - modify fields as needed
    const application: Partial<SandboxApplication> = {
      name: values.name,
      description: values.description,
      innovation_type: values.innovationType,
      status: "pending",
      risk_level: "Medium",
      organization_type: values.organizationType,
      regulatory_challenges: values.regulatoryChallenges,
      testing_duration: values.testingDuration,
    };
    
    onSubmit(applicationData);
  };
  
  const handleSaveDraft = () => {
    if (!onSaveDraft) return;
    
    const values = form.getValues();
    const valid = form.trigger();
    
    if (valid) {
      setIsDraftSaving(true);
      
      const applicationData: ApplicationFormData = {
        name: values.name,
        description: values.description,
        innovationType: values.innovationType,
        framework: values.framework || "",
        regulatoryChallenges: values.regulatoryChallenges,
        testingDuration: values.testingDuration,
        organizationType: values.organizationType
      };
      
      onSaveDraft(applicationData);
      
      setTimeout(() => {
        setIsDraftSaving(false);
      }, 1000);
    } else {
      toast({
        title: "Unable to save draft",
        description: "Please fill all required fields correctly",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the name of your regulatory application" {...field} />
              </FormControl>
              <FormDescription>
                Provide a clear, descriptive name for your application
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe your innovation and why you need regulatory testing" 
                  className="min-h-[120px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Explain what your innovation does and how it works
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Innovation Type Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="innovationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Innovation Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select innovation type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="medical-device">Medical Device</SelectItem>
                    <SelectItem value="digital-health">Digital Health Technology</SelectItem>
                    <SelectItem value="diagnostic">Diagnostic Tool</SelectItem>
                    <SelectItem value="telemedicine">Telemedicine Platform</SelectItem>
                    <SelectItem value="ai-solution">AI/ML Solution</SelectItem>
                    <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose the category that best fits your innovation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Organization Type Field */}
          <FormField
            control={form.control}
            name="organizationType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organization Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="startup">Startup</SelectItem>
                    <SelectItem value="sme">SME</SelectItem>
                    <SelectItem value="large-enterprise">Large Enterprise</SelectItem>
                    <SelectItem value="research-institution">Research Institution</SelectItem>
                    <SelectItem value="non-profit">Non-profit Organization</SelectItem>
                    <SelectItem value="individual">Individual Innovator</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your organization type
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        {/* Testing Duration Field */}
        <FormField
          control={form.control}
          name="testingDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requested Testing Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select testing duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="3-months">3 Months</SelectItem>
                  <SelectItem value="6-months">6 Months</SelectItem>
                  <SelectItem value="12-months">12 Months</SelectItem>
                  <SelectItem value="custom">Custom Duration</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                How long do you need for sandbox testing?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Regulatory Challenges Field */}
        <FormField
          control={form.control}
          name="regulatoryChallenges"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Regulatory Challenges</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe the specific regulatory challenges you're facing" 
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                What regulatory barriers are you trying to address?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
          {onSaveDraft && (
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isDraftSaving || isSubmitting}
            >
              {isDraftSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </>
              )}
            </Button>
          )}
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
