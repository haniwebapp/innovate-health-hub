
import { useState } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, CheckCircle, Save, Loader2 } from "lucide-react";
import { 
  RegulatoryFramework, 
  RegulatoryFrameworkCard 
} from "@/components/regulatory/RegulatoryFrameworkCard";

// Mock frameworks - same as in index page
const frameworks = [
  {
    id: "mdf",
    title: "Medical Devices Framework",
    icon: <CheckCircle size={24} />,
    description: "For physical medical devices and equipment",
    completedSteps: 0,
    totalSteps: 5,
    steps: [
      "Complete device classification form",
      "Submit technical documentation",
      "Register for conformity assessment",
      "Perform safety testing",
      "Submit final approval request"
    ]
  },
  {
    id: "dhf",
    title: "Digital Health Software Framework",
    icon: <CheckCircle size={24} />,
    description: "For healthcare software and digital tools",
    completedSteps: 0,
    totalSteps: 4,
    steps: [
      "Complete software assessment form",
      "Submit security & privacy documentation",
      "Perform usability testing",
      "Submit final compliance report"
    ]
  },
  {
    id: "biof",
    title: "Biotechnology Framework",
    icon: <CheckCircle size={24} />,
    description: "For biotech and pharmaceutical innovations",
    completedSteps: 0,
    totalSteps: 6,
    steps: [
      "Submit product classification form",
      "Register R&D protocols",
      "Submit safety test results",
      "Complete clinical trial documentation",
      "Submit manufacturing protocols",
      "Apply for final approval"
    ]
  }
];

export default function NewRegulatoryApplicationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [innovationType, setInnovationType] = useState("digital");
  const [selectedFramework, setSelectedFramework] = useState<string | null>("dhf");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !selectedFramework) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application submitted",
        description: "Your regulatory sandbox application has been created",
      });
      setIsSubmitting(false);
      navigate("/dashboard/regulatory");
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="New Application" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory Sandbox", href: "/dashboard/regulatory" },
        ]}
      />
      
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Sandbox Application</h1>
        <p className="text-muted-foreground">
          Apply to test your innovation in a controlled regulatory environment
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Provide details about your innovation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Innovation Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Enter the name of your innovation"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Innovation Type</Label>
              <Select 
                value={innovationType} 
                onValueChange={setInnovationType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select innovation type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="device">Medical Device</SelectItem>
                  <SelectItem value="digital">Digital Health Software</SelectItem>
                  <SelectItem value="biotech">Biotechnology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Describe your innovation in detail, including its purpose and how it works..."
                rows={5}
                required
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Select Regulatory Framework</CardTitle>
            <CardDescription>Choose the most appropriate framework for your innovation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {frameworks.map((framework) => (
                <RegulatoryFrameworkCard
                  key={framework.id}
                  framework={framework}
                  isSelected={selectedFramework === framework.id}
                  onSelect={setSelectedFramework}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-between">
          <Button variant="outline" type="button" asChild>
            <Link to="/dashboard/regulatory">Cancel</Link>
          </Button>
          
          <div className="space-x-2">
            <Button variant="outline" type="button">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Submit Application
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
