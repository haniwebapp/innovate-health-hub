
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ApplicationForm } from "@/components/regulatory/applications/ApplicationForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ApplicationFormData } from "@/components/regulatory/applications/types";

export default function NewApplicationPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleSubmit = async (data: ApplicationFormData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      if (!user?.id) {
        throw new Error("User not authenticated.");
      }

      // Map form fields to database column names
      const applicationData = {
        user_id: user.id,
        name: data.name,
        description: data.description,
        innovation_type: data.innovationType,
        organization_type: data.organizationType,
        regulatory_challenges: data.regulatoryChallenges,
        testing_duration: data.testingDuration,
        framework_id: data.frameworkId,
        status: 'draft',
        submitted_date: new Date().toISOString()
      };

      const { data: application, error } = await supabase
        .from('regulatory_applications')
        .insert(applicationData)
        .select()
        .single();

      if (error) {
        console.error("Supabase error:", error);
        throw new Error(error.message || "Failed to create application.");
      }

      toast({
        title: "Application Created",
        description: "Your regulatory application has been successfully created.",
      });
      navigate(`/dashboard/regulatory/applications/${application.id}`);
    } catch (error: any) {
      console.error("Error submitting application:", error);
      setSubmissionError(error.message || "Failed to create application. Please try again.");
      toast({
        title: "Error",
        description: error.message || "Failed to create application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">New Regulatory Application</CardTitle>
          <CardDescription>
            Fill out the form below to start a new regulatory application.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {submissionError && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {submissionError}
              </AlertDescription>
            </Alert>
          )}
          
          <ApplicationForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </CardContent>
      </Card>
    </div>
  );
}
