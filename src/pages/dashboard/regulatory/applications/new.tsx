
import { useState, useEffect } from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Save, Loader2 } from "lucide-react";
import { 
  RegulatoryFramework, 
  RegulatoryFrameworkCard 
} from "@/components/regulatory/RegulatoryFrameworkCard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation } from "@tanstack/react-query";

// Type for database framework
interface DbFramework {
  id: string;
  title: string;
  description: string;
  icon: string;
  total_steps: number;
}

// Type for database compliance requirement
interface DbComplianceRequirement {
  id: string;
  framework_id: string;
  title: string;
  description: string;
  status: string;
  order_index: number;
}

// Fetch frameworks from database
const fetchFrameworks = async () => {
  const { data, error } = await supabase
    .from('regulatory_frameworks')
    .select('*');

  if (error) throw error;
  return data;
};

// Fetch compliance requirements from database
const fetchComplianceRequirements = async () => {
  const { data, error } = await supabase
    .from('compliance_requirements')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
};

export default function NewRegulatoryApplicationPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [innovationType, setInnovationType] = useState("digital");
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Use React Query to fetch data
  const { data: frameworksData, isLoading: isLoadingFrameworks } = useQuery({
    queryKey: ['regulatory-frameworks'],
    queryFn: fetchFrameworks
  });
  
  const { data: requirementsData } = useQuery({
    queryKey: ['compliance-requirements'],
    queryFn: fetchComplianceRequirements
  });
  
  // Set default selected framework when data is loaded
  useEffect(() => {
    if (frameworksData?.length && !selectedFramework) {
      if (innovationType === 'digital' && frameworksData.find(f => f.id === 'dhf')) {
        setSelectedFramework('dhf');
      } else if (innovationType === 'device' && frameworksData.find(f => f.id === 'mdf')) {
        setSelectedFramework('mdf');
      } else if (innovationType === 'biotech' && frameworksData.find(f => f.id === 'biof')) {
        setSelectedFramework('biof');
      } else {
        setSelectedFramework(frameworksData[0]?.id);
      }
    }
  }, [frameworksData, innovationType, selectedFramework]);
  
  // Map database data to component props
  const prepareFrameworksForDisplay = (dbFrameworks: DbFramework[], dbRequirements: DbComplianceRequirement[]) => {
    if (!dbFrameworks || !dbRequirements) return [];
    
    return dbFrameworks.map(framework => {
      // Find requirements for this framework
      const frameworkRequirements = dbRequirements.filter(
        req => req.framework_id === framework.id
      );
      
      return {
        id: framework.id,
        title: framework.title,
        icon: framework.icon,
        description: framework.description,
        completedSteps: 0, // No steps completed yet for new application
        totalSteps: framework.total_steps,
        steps: frameworkRequirements.map(req => req.title)
      };
    });
  };
  
  const frameworks = prepareFrameworksForDisplay(frameworksData || [], requirementsData || []);
  
  // Handle form submission
  const submitApplication = useMutation({
    mutationFn: async (applicationData: {
      name: string;
      description: string;
      innovation_type: string;
      framework_id: string;
      user_id: string;
    }) => {
      const { data, error } = await supabase
        .from('regulatory_applications')
        .insert(applicationData)
        .select();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Application submitted",
        description: "Your regulatory sandbox application has been created",
      });
      navigate("/dashboard/regulatory");
    },
    onError: (error) => {
      toast({
        title: "Error submitting application",
        description: error.message,
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  });
  
  const handleSubmit = async (e: React.FormEvent) => {
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
    
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Authentication error",
        description: "You must be logged in to submit an application",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    submitApplication.mutate({
      name,
      description,
      innovation_type: innovationType,
      framework_id: selectedFramework,
      user_id: user.id
    });
  };
  
  const handleInnovationTypeChange = (value: string) => {
    setInnovationType(value);
    
    // Auto-select the appropriate framework based on innovation type
    if (value === 'digital' && frameworksData?.find(f => f.id === 'dhf')) {
      setSelectedFramework('dhf');
    } else if (value === 'device' && frameworksData?.find(f => f.id === 'mdf')) {
      setSelectedFramework('mdf');
    } else if (value === 'biotech' && frameworksData?.find(f => f.id === 'biof')) {
      setSelectedFramework('biof');
    }
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
                onValueChange={handleInnovationTypeChange}
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
            {isLoadingFrameworks ? (
              <div className="flex justify-center items-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
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
            )}
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
            
            <Button type="submit" disabled={isSubmitting || isLoadingFrameworks}>
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
