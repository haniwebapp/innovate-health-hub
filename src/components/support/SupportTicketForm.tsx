
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { SupportAIService, TicketClassification } from "@/services/ai/support/SupportAIService";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  category: z.string().min(1, "Please select a category"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
});

export default function SupportTicketForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isClassifying, setIsClassifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [classification, setClassification] = useState<TicketClassification | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      category: "",
      description: "",
      priority: "medium",
    },
  });

  const classifyTicket = async (data: z.infer<typeof formSchema>) => {
    setIsClassifying(true);
    try {
      // Use the AI service to classify the ticket
      const result = await SupportAIService.classifyTicket(
        `Subject: ${data.subject}\n\nDescription: ${data.description}`
      );
      
      // Update form with the classification results
      setClassification(result);
      
      form.setValue("category", result.category || data.category);
      form.setValue("priority", result.urgency || "medium" as any);
      
      toast({
        title: "Ticket Classified",
        description: `This ticket has been classified as ${result.urgency} priority in the ${result.category} category.`,
      });
    } catch (error: any) {
      console.error("Error classifying ticket:", error);
      toast({
        variant: "destructive",
        title: "Classification Error",
        description: "Failed to classify the support ticket automatically.",
      });
    } finally {
      setIsClassifying(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to submit a support ticket.",
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // If not classified yet, classify now
      let ticketClass = classification;
      if (!ticketClass) {
        try {
          ticketClass = await SupportAIService.classifyTicket(
            `Subject: ${data.subject}\n\nDescription: ${data.description}`
          );
        } catch (error) {
          console.error("Error during classification:", error);
        }
      }
      
      // Generate first response using AI
      let initialResponse = "";
      try {
        initialResponse = await SupportAIService.generateFirstResponse(
          `Subject: ${data.subject}\n\nDescription: ${data.description}`, 
          data.category
        );
      } catch (error) {
        console.error("Error generating first response:", error);
      }
      
      // Submit the ticket to Supabase
      const { error } = await supabase.from('support_tickets').insert({
        user_id: user.id,
        subject: data.subject,
        category: data.category,
        description: data.description,
        priority: data.priority || ticketClass?.urgency || 'medium',
        status: 'open',
        assigned_team: ticketClass?.assignedTeam || 'support',
        sentiment: ticketClass?.sentiment || 'neutral',
        initial_response: initialResponse,
      });
      
      if (error) throw error;
      
      toast({
        title: "Ticket Submitted",
        description: "Your support ticket has been submitted successfully.",
      });
      
      // Reset form
      form.reset();
      setClassification(null);
    } catch (error: any) {
      console.error("Error submitting ticket:", error);
      toast({
        variant: "destructive",
        title: "Submission Error",
        description: error.message || "Failed to submit support ticket.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Brief description of your issue" {...field} />
              </FormControl>
              <FormDescription>
                Provide a clear and concise subject for your support request
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="account">Account & Profile</SelectItem>
                  <SelectItem value="innovation">Innovation Submission</SelectItem>
                  <SelectItem value="regulatory">Regulatory Process</SelectItem>
                  <SelectItem value="investment">Investment Inquiries</SelectItem>
                  <SelectItem value="platform">Platform Technical Issues</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Select the category that best fits your inquiry
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Please provide detailed information about your issue or question" 
                  className="min-h-[150px]"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                The more details you provide, the better we can assist you
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low - General inquiry or minor issue</SelectItem>
                  <SelectItem value="medium">Medium - Affects some functionality</SelectItem>
                  <SelectItem value="high">High - Critical for current work</SelectItem>
                  <SelectItem value="critical">Critical - Blocking issue or emergency</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Indicate the urgency of your request
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => classifyTicket(form.getValues())}
            disabled={isClassifying || isSubmitting || !form.getValues().subject || !form.getValues().description}
          >
            {isClassifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze & Classify"
            )}
          </Button>
          
          <Button type="submit" disabled={isSubmitting || !form.formState.isValid}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Ticket"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
