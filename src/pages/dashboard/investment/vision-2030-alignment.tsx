
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, ArrowRight, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InvestmentAIService } from '@/services/ai/InvestmentAIService';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const formSchema = z.object({
  name: z.string().min(3, 'Innovation name is required'),
  description: z.string().min(10, 'Please provide a detailed description'),
  sector: z.string().min(1, 'Sector is required'),
  target_audience: z.string().optional(),
  technology: z.string().optional(),
  impact: z.string().min(10, 'Please describe the expected impact'),
});

type FormValues = z.infer<typeof formSchema>;

export default function Vision2030AlignmentPage() {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [alignmentResults, setAlignmentResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      sector: '',
      target_audience: '',
      technology: '',
      impact: ''
    }
  });
  
  const onSubmit = async (values: FormValues) => {
    setIsAnalyzing(true);
    setError(null);
    
    try {
      // Bundle the form data as the innovation data
      const innovationData = {
        ...values,
      };
      
      // Call the Vision 2030 alignment service
      const results = await InvestmentAIService.analyzeVision2030Alignment(innovationData);
      setAlignmentResults(results);
      
      toast({
        title: "Analysis Complete",
        description: "Vision 2030 alignment analysis has been generated.",
      });
    } catch (err) {
      console.error("Failed to analyze Vision 2030 alignment:", err);
      setError("We couldn't complete the Vision 2030 alignment analysis. Please try again later.");
      
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing your innovation's alignment with Vision 2030.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const getAlignmentBadge = (score: number) => {
    if (score >= 85) return <Badge className="bg-green-600">Strong Alignment</Badge>;
    if (score >= 70) return <Badge className="bg-emerald-500">Good Alignment</Badge>;
    if (score >= 50) return <Badge className="bg-amber-500">Moderate Alignment</Badge>;
    return <Badge className="bg-red-500">Weak Alignment</Badge>;
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Vision 2030 Alignment" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment", href: "/dashboard/investment" },
        ]}
      />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold text-moh-darkGreen mb-4">
                Vision 2030 Alignment Analysis
              </h2>
              <p className="text-gray-600 mb-6">
                Evaluate how well your healthcare innovation aligns with Saudi Vision 2030's healthcare transformation goals. 
                This AI-powered analysis will provide insights on alignment areas and opportunities for improvement.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Innovation Name</FormLabel>
                        <FormControl>
                          <input 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Enter the name of your innovation" 
                            {...field} 
                          />
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
                            placeholder="Describe your healthcare innovation in detail" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Provide details about what your innovation does and how it works.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
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
                              <SelectItem value="telehealth">Telehealth</SelectItem>
                              <SelectItem value="medical-devices">Medical Devices</SelectItem>
                              <SelectItem value="digital-health">Digital Health</SelectItem>
                              <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                              <SelectItem value="diagnostics">Diagnostics</SelectItem>
                              <SelectItem value="mental-health">Mental Health</SelectItem>
                              <SelectItem value="preventative-care">Preventative Care</SelectItem>
                              <SelectItem value="elderly-care">Elderly Care</SelectItem>
                              <SelectItem value="maternal-child">Maternal & Child Health</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="technology"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Technology Used</FormLabel>
                          <FormControl>
                            <input 
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder="Primary technologies used (e.g., AI, IoT, Mobile)" 
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
                    name="target_audience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Audience</FormLabel>
                        <FormControl>
                          <input 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Who will benefit from this innovation?" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="impact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expected Impact</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe the healthcare impact you expect to achieve" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Explain how your innovation will improve healthcare outcomes or experiences.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="bg-moh-darkGreen hover:bg-moh-darkGreen/90 w-full md:w-auto"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing Alignment
                        </>
                      ) : (
                        <>
                          Analyze Vision 2030 Alignment
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-moh-darkGreen mb-3">
                Why Align with Vision 2030?
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Improve chances of securing government partnerships and support</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Access specialized funding and resources for aligned innovations</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Benefit from strategic priority areas in healthcare transformation</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Increase market relevance within Saudi Arabia's healthcare ecosystem</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                  <span>Contribute to national healthcare goals and social impact</span>
                </li>
              </ul>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-medium mb-2">Key Vision 2030 Healthcare Goals</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Improve quality and efficiency of healthcare services</li>
                  <li>• Expand privatization of government healthcare services</li>
                  <li>• Focus on preventative care and reducing infectious diseases</li>
                  <li>• Develop digital healthcare infrastructure</li>
                  <li>• Increase capacity and quality of healthcare workforce</li>
                  <li>• Improve healthcare access in all regions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {alignmentResults && (
        <Card className="border-l-4 border-l-moh-darkGreen">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-5">
              <h3 className="text-xl font-semibold">Vision 2030 Alignment Results</h3>
              <div className="flex flex-col items-center">
                {getAlignmentBadge(alignmentResults.alignmentScore)}
                <div className="w-full mt-2">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span>Alignment Score</span>
                    <span className="font-medium">{alignmentResults.alignmentScore}%</span>
                  </div>
                  <Progress value={alignmentResults.alignmentScore} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-medium text-moh-darkGreen mb-2">Primary Alignment Areas</h4>
                <ul className="space-y-1 text-gray-700">
                  {alignmentResults.alignmentAreas?.map((area: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-moh-darkGreen mb-2">Vision 2030 Healthcare Objectives</h4>
                <ul className="space-y-1 text-gray-700">
                  {alignmentResults.vision2030Objectives?.map((objective: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-medium text-moh-darkGreen mb-2">Potential Impact on Vision 2030 KPIs</h4>
                <p className="text-gray-700">{alignmentResults.potentialImpact}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-amber-600 mb-2">Areas for Improvement</h4>
                <ul className="space-y-1 text-gray-700">
                  {alignmentResults.improvementAreas?.map((area: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <Clock className="h-4 w-4 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-moh-darkGreen mb-2">Recommendations</h4>
                <ul className="space-y-1 text-gray-700">
                  {alignmentResults.recommendations?.map((rec: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <ArrowRight className="h-4 w-4 text-moh-darkGreen mr-2 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t flex justify-end">
              <Button variant="outline" className="mr-3">
                Save Analysis
              </Button>
              <Button>
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
