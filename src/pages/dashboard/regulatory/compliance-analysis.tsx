import React, { useState } from 'react';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, FileSearch, Download, Save, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { RegulatoryAIService, InnovationData } from '@/services/ai/complianceAI/RegulatoryAIService';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  name: z.string().min(3, 'Innovation name is required'),
  description: z.string().min(10, 'Please provide a detailed description'),
  type: z.string().min(1, 'Type is required'),
  sector: z.string().min(1, 'Sector is required'),
  stage: z.string().min(1, 'Development stage is required'),
  medicalClaims: z.string().optional(),
  targetUsers: z.string().optional(),
  dataCollection: z.string().optional(),
  patientImpact: z.string().optional(),
  hasClinicalData: z.boolean().default(false),
  hasPatientData: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function ComplianceAnalysisPage() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('input-form');
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      type: '',
      sector: '',
      stage: 'concept',
      medicalClaims: '',
      targetUsers: '',
      dataCollection: '',
      patientImpact: '',
      hasClinicalData: false,
      hasPatientData: false,
    }
  });
  
  const navigate = useNavigate();
  
  const onSubmit = async (values: FormValues) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Transform form data to match InnovationData structure
      const innovationData: InnovationData = {
        name: values.name,
        description: values.description,
        type: values.type,
        sector: values.sector,
        stage: values.stage,
        medicalClaims: values.medicalClaims ? values.medicalClaims.split(',').map(c => c.trim()) : [],
        targetUsers: values.targetUsers ? values.targetUsers.split(',').map(u => u.trim()) : [],
        dataCollection: values.dataCollection,
        patientImpact: values.patientImpact,
        hasClinicalData: values.hasClinicalData,
        hasPatientData: values.hasPatientData,
      };
      
      // Call the regulatory analysis service
      const results = await RegulatoryAIService.generateComplianceAnalysis(innovationData);
      
      if (results.error) {
        throw new Error(results.error);
      }
      
      setAnalysisResults(results);
      setActiveTab('results');
      
      toast({
        title: "Analysis Complete",
        description: "Regulatory compliance analysis has been generated.",
      });
    } catch (err: any) {
      console.error("Failed to generate compliance analysis:", err);
      setError(err.message || "Failed to generate compliance analysis. Please try again later.");
      
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing your innovation for compliance requirements.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleDownloadReport = () => {
    // In a real implementation, this would generate and download a PDF
    toast({
      title: "Report Downloaded",
      description: "The compliance analysis report has been downloaded.",
    });
  };

  const handleSaveAnalysis = () => {
    // In a real implementation, this would save to the database
    toast({
      title: "Analysis Saved",
      description: "The compliance analysis has been saved to your account.",
    });
  };
  
  const getRiskLevelBadge = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium Risk</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low Risk</Badge>;
      default:
        return <Badge variant="outline">{riskLevel}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Compliance Analysis" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory", href: "/dashboard/regulatory" },
        ]}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="input-form">Innovation Details</TabsTrigger>
          <TabsTrigger value="results" disabled={!analysisResults}>Analysis Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="input-form" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance Analysis</CardTitle>
              <CardDescription>
                Analyze your healthcare innovation for regulatory requirements and compliance pathways
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Innovation Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter the name of your innovation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Innovation Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe your healthcare innovation in detail..." 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide a detailed description of what your innovation does and how it works
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="type"
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
                              <SelectItem value="digital-health">Digital Health Solution</SelectItem>
                              <SelectItem value="diagnostic">Diagnostic Tool</SelectItem>
                              <SelectItem value="therapeutic">Therapeutic Intervention</SelectItem>
                              <SelectItem value="telemedicine">Telemedicine Platform</SelectItem>
                              <SelectItem value="ai-solution">AI-Based Solution</SelectItem>
                              <SelectItem value="monitoring-system">Monitoring System</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Healthcare Sector</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select healthcare sector" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="primary-care">Primary Care</SelectItem>
                              <SelectItem value="specialized-care">Specialized Care</SelectItem>
                              <SelectItem value="remote-monitoring">Remote Monitoring</SelectItem>
                              <SelectItem value="diagnostics">Diagnostics</SelectItem>
                              <SelectItem value="mental-health">Mental Health</SelectItem>
                              <SelectItem value="preventative-care">Preventative Care</SelectItem>
                              <SelectItem value="rehabilitation">Rehabilitation</SelectItem>
                              <SelectItem value="chronic-disease">Chronic Disease Management</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="stage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Development Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select development stage" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="concept">Concept/Idea</SelectItem>
                            <SelectItem value="prototype">Prototype</SelectItem>
                            <SelectItem value="mvp">Minimum Viable Product</SelectItem>
                            <SelectItem value="clinical-testing">Clinical Testing</SelectItem>
                            <SelectItem value="pre-market">Pre-Market</SelectItem>
                            <SelectItem value="market-ready">Market Ready</SelectItem>
                            <SelectItem value="launched">Launched</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="medicalClaims"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Claims</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="List the medical claims your innovation makes (separated by commas)"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          What specific medical benefits or outcomes does your innovation claim to provide?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="targetUsers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Target Users</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Who will use this innovation? (comma separated)"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dataCollection"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Collection</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="What data does your innovation collect?"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="patientImpact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Patient Impact</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe how your innovation impacts patients or healthcare outcomes..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="hasClinicalData"
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
                              This innovation has clinical validation data
                            </FormLabel>
                            <FormDescription>
                              Check if you have conducted clinical trials or validation studies
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasPatientData"
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
                              This innovation collects or processes patient data
                            </FormLabel>
                            <FormDescription>
                              Check if your innovation handles personal health information
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
            
            <CardFooter className="flex justify-between border-t pt-6">
              <Button variant="outline">Reset Form</Button>
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isAnalyzing}
                className="bg-moh-darkGreen hover:bg-moh-darkGreen/90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Compliance...
                  </>
                ) : (
                  <>
                    <FileSearch className="mr-2 h-4 w-4" />
                    Generate Compliance Analysis
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
          
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </TabsContent>
        
        <TabsContent value="results" className="space-y-6">
          {analysisResults && (
            <>
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                      <CardTitle>Compliance Analysis Report</CardTitle>
                      <CardDescription>
                        {form.getValues('name')} | {form.getValues('type').replace('-', ' ')}
                      </CardDescription>
                    </div>
                    <div>
                      {getRiskLevelBadge(analysisResults.riskLevel)}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Summary</h3>
                      <p className="text-gray-700">{analysisResults.summary}</p>
                      
                      <div className="mt-4">
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>Compliance Score</span>
                          <span className="font-medium">{analysisResults.complianceScore}%</span>
                        </div>
                        <Progress value={analysisResults.complianceScore} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Key Requirements</h3>
                        <div className="space-y-2">
                          {analysisResults.keyRequirements.map((req: any, idx: number) => (
                            <div key={idx} className="border p-3 rounded-md">
                              <div className="flex justify-between">
                                <div className="font-medium">{req.requirement}</div>
                                <Badge 
                                  variant="outline" 
                                  className={
                                    req.complexity.toLowerCase() === 'high' 
                                      ? "bg-red-100 text-red-800 border-red-200" 
                                      : req.complexity.toLowerCase() === 'medium'
                                      ? "bg-amber-100 text-amber-800 border-amber-200"
                                      : "bg-green-100 text-green-800 border-green-200"
                                  }
                                >
                                  {req.complexity}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 flex justify-between mt-1">
                                <div>{req.status}</div>
                                <div>Est. {req.estimatedTime}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Applicable Regulations</h3>
                        <div className="space-y-2">
                          {analysisResults.applicableRegulations.map((reg: any, idx: number) => (
                            <div key={idx} className="border p-3 rounded-md">
                              <div className="font-medium">{reg.name}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                <span className="text-gray-500">Authority:</span> {reg.authority}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                <span className="text-gray-500">Relevance:</span> {reg.relevance}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Documentation Needed</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {analysisResults.documentationNeeded.map((doc: string, idx: number) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Testing Requirements</h3>
                        <ul className="list-disc list-inside space-y-1 text-gray-700">
                          {analysisResults.testingRequirements.map((test: string, idx: number) => (
                            <li key={idx}>{test}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Compliance Timeline</h3>
                      <div className="grid md:grid-cols-4 gap-4">
                        <Card className="p-4">
                          <h4 className="font-medium">Preparation</h4>
                          <p className="text-sm text-gray-500">
                            {analysisResults.complianceTimeline.preparationPhase}
                          </p>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium">Submission</h4>
                          <p className="text-sm text-gray-500">
                            {analysisResults.complianceTimeline.submissionPhase}
                          </p>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium">Review</h4>
                          <p className="text-sm text-gray-500">
                            {analysisResults.complianceTimeline.reviewPhase}
                          </p>
                        </Card>
                        <Card className="p-4">
                          <h4 className="font-medium">Approval</h4>
                          <p className="text-sm text-gray-500">
                            {analysisResults.complianceTimeline.approvalPhase}
                          </p>
                        </Card>
                      </div>
                      <div className="mt-2 text-right text-sm font-medium">
                        Total Estimated Time: {analysisResults.complianceTimeline.totalEstimatedTime}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Next Steps</h3>
                      <ol className="list-decimal list-inside space-y-1 text-gray-700">
                        {analysisResults.nextSteps.map((step: string, idx: number) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">International Considerations</h3>
                        <p className="text-gray-700">{analysisResults.internationalConsiderations}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Vision 2030 Alignment</h3>
                        <p className="text-gray-700">{analysisResults.vision2030Alignment}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-end space-x-4 border-t pt-6">
                  <Button variant="outline" onClick={handleSaveAnalysis}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Analysis
                  </Button>
                  <Button onClick={handleDownloadReport} className="bg-moh-darkGreen hover:bg-moh-darkGreen/90">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setActiveTab('input-form')}>
                  Edit Innovation Details
                </Button>
                <Button onClick={() => navigate('/dashboard/regulatory/applications/new')} className="bg-moh-darkGreen hover:bg-moh-darkGreen/90">
                  Apply for Sandbox
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
