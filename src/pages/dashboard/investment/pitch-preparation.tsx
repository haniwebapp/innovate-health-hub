
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, FileText, ArrowDownToLine, CheckCircle, BarChart3, Copy, PenLine, ArrowRight, ChevronRight } from "lucide-react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { useToast } from "@/components/ui/use-toast";
import { InvestmentAIService, InnovationData, PitchDeckTemplate } from "@/services/ai/InvestmentAIService";

export default function DashboardPitchPreparationPage() {
  const [activeTab, setActiveTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [innovationData, setInnovationData] = useState<InnovationData>({
    name: "",
    description: "",
    stage: "seed",
    sector: "digital-health"
  });
  const [templates, setTemplates] = useState<PitchDeckTemplate[]>([]);
  const [generatedContent, setGeneratedContent] = useState<Record<string, string> | null>(null);
  
  const { toast } = useToast();
  
  useEffect(() => {
    // Fetch available templates on component mount
    const fetchTemplates = async () => {
      try {
        const templatesData = await InvestmentAIService.getPitchDeckTemplates();
        setTemplates(templatesData);
        
        // Set the first template as the default selected template
        if (templatesData.length > 0) {
          setSelectedTemplate(templatesData[0].id);
        }
      } catch (error) {
        console.error("Error fetching templates:", error);
        toast({
          variant: "destructive",
          title: "Error loading templates",
          description: "Failed to load pitch deck templates. Please try again later."
        });
      }
    };
    
    fetchTemplates();
  }, [toast]);
  
  // Handle form input changes
  const handleInnovationChange = (field: keyof InnovationData, value: string | number) => {
    setInnovationData(prev => ({ ...prev, [field]: value }));
  };
  
  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };
  
  // Generate pitch deck content
  const handleGeneratePitchDeck = async () => {
    if (!selectedTemplate) {
      toast({
        variant: "destructive",
        title: "Template not selected",
        description: "Please select a template before generating a pitch deck."
      });
      return;
    }
    
    if (!innovationData.name || !innovationData.description) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide at least your innovation name and description."
      });
      return;
    }
    
    setIsGenerating(true);
    setActiveTab("content");
    
    try {
      const content = await InvestmentAIService.generatePitchDeckContent(
        innovationData,
        selectedTemplate
      );
      
      if ('error' in content) {
        throw new Error(content.error);
      }
      
      setGeneratedContent(content);
      
      toast({
        title: "Pitch deck content generated",
        description: "Your personalized pitch deck content is now ready to use."
      });
    } catch (error: any) {
      console.error("Error generating pitch deck content:", error);
      toast({
        variant: "destructive",
        title: "Generation failed",
        description: error.message || "Failed to generate pitch deck content."
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  // Get the selected template object
  const getSelectedTemplateObject = () => {
    return templates.find(template => template.id === selectedTemplate) || null;
  };
  
  // Handle copy to clipboard
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Content copied",
      description: "Text copied to clipboard."
    });
  };

  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Pitch Preparation" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment Hub", href: "/dashboard/investment" }
        ]}
      />
      
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pitch Deck Creator</h1>
          <p className="text-muted-foreground">
            Create professional investor pitch decks for your healthcare innovation
          </p>
        </div>
        
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button variant="outline" className="flex items-center gap-1">
            <ArrowDownToLine className="h-4 w-4" />
            Templates
          </Button>
          <Button
            className="bg-moh-green hover:bg-moh-darkGreen"
            disabled={isGenerating || !selectedTemplate || !innovationData.name || !innovationData.description}
            onClick={handleGeneratePitchDeck}
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Pitch Content
                <FileText className="h-4 w-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-muted grid w-full grid-cols-2 h-11 items-stretch">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="content">Generated Content</TabsTrigger>
        </TabsList>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Innovation Details</CardTitle>
                <CardDescription>Provide information about your innovation for the pitch deck</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Innovation Name*</label>
                  <Input 
                    id="name" 
                    value={innovationData.name} 
                    onChange={(e) => handleInnovationChange("name", e.target.value)}
                    placeholder="Enter your innovation name"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">Description*</label>
                  <Textarea 
                    id="description" 
                    value={innovationData.description}
                    onChange={(e) => handleInnovationChange("description", e.target.value)}
                    placeholder="Describe your healthcare innovation in detail"
                    className="h-32"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium mb-1">Sector</label>
                    <Select 
                      value={innovationData.sector}
                      onValueChange={(value) => handleInnovationChange("sector", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="digital-health">Digital Health</SelectItem>
                        <SelectItem value="medical-devices">Medical Devices</SelectItem>
                        <SelectItem value="biotech">Biotech</SelectItem>
                        <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                        <SelectItem value="healthcare-services">Healthcare Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="stage" className="block text-sm font-medium mb-1">Stage</label>
                    <Select 
                      value={innovationData.stage}
                      onValueChange={(value) => handleInnovationChange("stage", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="idea">Idea</SelectItem>
                        <SelectItem value="prototype">Prototype</SelectItem>
                        <SelectItem value="mvp">MVP</SelectItem>
                        <SelectItem value="seed">Seed</SelectItem>
                        <SelectItem value="early-growth">Early Growth</SelectItem>
                        <SelectItem value="scaling">Scaling</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="fundingNeeded" className="block text-sm font-medium mb-1">Funding Needed ($)</label>
                  <Input 
                    id="fundingNeeded" 
                    type="number" 
                    value={innovationData.fundingNeeded || ''} 
                    onChange={(e) => handleInnovationChange("fundingNeeded", parseFloat(e.target.value) || 0)}
                    placeholder="Amount in USD"
                  />
                </div>
                
                <div>
                  <label htmlFor="traction" className="block text-sm font-medium mb-1">Traction / Progress</label>
                  <Textarea 
                    id="traction" 
                    value={innovationData.traction || ''}
                    onChange={(e) => handleInnovationChange("traction", e.target.value)}
                    placeholder="Describe your current traction, users, or progress"
                    className="h-20"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Select a Template</CardTitle>
                <CardDescription>Choose a template design for your pitch deck</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <div 
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                        selectedTemplate === template.id ? 'ring-2 ring-moh-green' : ''
                      }`}
                    >
                      <div className="h-32 bg-moh-lightGreen/20 relative">
                        {/* Template thumbnail image would go here */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <FileText className="h-10 w-10 text-moh-green/50" />
                        </div>
                        
                        {selectedTemplate === template.id && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="h-5 w-5 text-moh-green" />
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3">
                        <h3 className="font-medium text-sm">{template.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader className="pb-3">
              <CardTitle>Pitch Deck Structure</CardTitle>
              <CardDescription>Your pitch deck will include these key sections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-moh-lightGreen/10 text-moh-green border-moh-green/20">Slide 1-2</Badge>
                  <h3 className="font-medium">Company Introduction</h3>
                  <p className="text-sm text-muted-foreground">Clear vision and elevator pitch for your innovation</p>
                </div>
                
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-moh-lightGreen/10 text-moh-green border-moh-green/20">Slide 3-4</Badge>
                  <h3 className="font-medium">Problem & Solution</h3>
                  <p className="text-sm text-muted-foreground">The healthcare challenge and your innovative approach</p>
                </div>
                
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-moh-lightGreen/10 text-moh-green border-moh-green/20">Slide 5-7</Badge>
                  <h3 className="font-medium">Market & Business Model</h3>
                  <p className="text-sm text-muted-foreground">Market size, growth potential, and revenue strategy</p>
                </div>
                
                <div className="space-y-1">
                  <Badge variant="outline" className="bg-moh-lightGreen/10 text-moh-green border-moh-green/20">Slide 8-10</Badge>
                  <h3 className="font-medium">Traction & Investment Ask</h3>
                  <p className="text-sm text-muted-foreground">Progress so far and specific funding requirements</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          {isGenerating ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-moh-green mb-4" />
                <h3 className="text-lg font-medium">Generating Pitch Content</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Creating personalized pitch deck content for {innovationData.name}...
                </p>
              </CardContent>
            </Card>
          ) : generatedContent ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Generated Pitch Deck Content</CardTitle>
                  <CardDescription>
                    Copy and use this AI-generated content in your presentation software
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y">
                    {generatedContent && Object.entries(generatedContent).map(([key, content]) => (
                      <div key={key} className="p-4 hover:bg-muted/40 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h3>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleCopyText(content)}
                            className="h-8"
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <p className="text-sm whitespace-pre-line">{content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <PenLine className="h-5 w-5 text-moh-green mr-2" />
                      <CardTitle>Next Steps</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <div className="bg-moh-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                          1
                        </div>
                        <p className="text-sm">Copy the generated content to use in your presentation software</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-moh-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                          2
                        </div>
                        <p className="text-sm">Customize and enhance with your specific data and visuals</p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-moh-green text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0">
                          3
                        </div>
                        <p className="text-sm">Practice your delivery with the pitch coaching tool</p>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4 flex items-center justify-center gap-1">
                      <ArrowRight className="h-4 w-4" />
                      Pitch Coaching
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <BarChart3 className="h-5 w-5 text-moh-green mr-2" />
                      <CardTitle>Market Data</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Enhance your pitch with market data for the {innovationData.sector} sector:</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Market Size (2025):</span>
                        <span className="font-medium">$24.5B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CAGR:</span>
                        <span className="font-medium">12.8%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Key Growth Region:</span>
                        <span className="font-medium">Saudi Arabia</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-4 flex items-center justify-center gap-1">
                      <ArrowRight className="h-4 w-4" />
                      Market Analysis
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-moh-green mr-2" />
                      <CardTitle>Templates</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">Download professional presentation templates for your pitch:</p>
                    
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        PowerPoint Template
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        Keynote Template
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <ArrowDownToLine className="h-4 w-4 mr-2" />
                        Google Slides Template
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-20">
                <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Content Generated Yet</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md text-center">
                  Select a template and fill in your innovation details, then click "Generate Pitch Content"
                </p>
                <Button 
                  onClick={() => setActiveTab("templates")}
                  className="mt-4 bg-moh-green hover:bg-moh-darkGreen"
                >
                  Select Template
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Pitch Resources</CardTitle>
          <CardDescription>Additional resources to create an effective investment pitch</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto py-3 justify-start text-left">
              <div className="mr-3 bg-moh-lightGreen p-2 rounded">
                <FileText className="h-5 w-5 text-moh-green" />
              </div>
              <div>
                <div className="font-medium">Investor Q&A Guide</div>
                <div className="text-xs text-muted-foreground">Prepare for tough investor questions</div>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Button variant="outline" className="h-auto py-3 justify-start text-left">
              <div className="mr-3 bg-moh-lightGreen p-2 rounded">
                <FileText className="h-5 w-5 text-moh-green" />
              </div>
              <div>
                <div className="font-medium">Financial Projections</div>
                <div className="text-xs text-muted-foreground">Templates for financial forecasts</div>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </Button>
            
            <Button variant="outline" className="h-auto py-3 justify-start text-left">
              <div className="mr-3 bg-moh-lightGreen p-2 rounded">
                <FileText className="h-5 w-5 text-moh-green" />
              </div>
              <div>
                <div className="font-medium">Pitch Coaching</div>
                <div className="text-xs text-muted-foreground">Practice your delivery and get feedback</div>
              </div>
              <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
