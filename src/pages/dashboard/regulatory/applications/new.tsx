
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplicationForm } from "@/components/regulatory/applications/ApplicationForm";
import { ApplicationFormData } from "@/components/regulatory/applications/types";
import { Lightbulb } from "lucide-react";

export default function NewRegulatoryApplicationPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmitApplication = (formData: ApplicationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API submission
    setTimeout(() => {
      toast({
        title: "Application submitted",
        description: "Your application has been submitted for review",
      });
      setIsSubmitting(false);
      navigate("/dashboard/regulatory");
    }, 1500);
  };
  
  const handleSaveDraft = (formData: ApplicationFormData) => {
    toast({
      title: "Draft saved",
      description: "Your application draft has been saved",
    });
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="New Sandbox Application" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory Sandbox", href: "/dashboard/regulatory" },
        ]}
      />
      
      <h1 className="text-2xl font-bold tracking-tight">New Sandbox Application</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Sandbox Application</CardTitle>
          <CardDescription>Submit your innovation for testing in our regulatory sandbox environment</CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationForm
            onSubmit={handleSubmitApplication}
            onSaveDraft={handleSaveDraft}
            isSubmitting={isSubmitting}
          />
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
            <div className="shrink-0">
              <Lightbulb className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-sm text-blue-800">
              Applications are reviewed within 10 business days. Priority access is given to innovations 
              addressing critical healthcare challenges or aligned with Ministry of Health strategic priorities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
