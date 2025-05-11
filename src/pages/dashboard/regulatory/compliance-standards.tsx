
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SearchIcon, ArrowLeft, BookOpen, Shield, CheckCircle, AlertTriangle, FileText } from 'lucide-react';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useToast } from '@/components/ui/use-toast';
import { RegulatoryAIService, InnovationData, ComplianceMatchResult } from '@/services/ai/complianceAI/RegulatoryAIService';

// Sample compliance standards data - would be fetched from the database in production
const COMPLIANCE_STANDARDS = [
  {
    id: "1",
    name: "ISO 13485:2016",
    description: "Medical devices — Quality management systems — Requirements for regulatory purposes",
    category: "Quality Management",
    issuing_body: "International Organization for Standardization (ISO)",
    version: "2016",
    publication_date: "2016-03-01",
    url: "https://www.iso.org/standard/59752.html"
  },
  {
    id: "2",
    name: "GDPR",
    description: "General Data Protection Regulation - Regulation on data protection and privacy in the EU",
    category: "Data Privacy",
    issuing_body: "European Union",
    version: "2016/679",
    publication_date: "2016-04-27",
    url: "https://gdpr.eu/"
  },
  {
    id: "3",
    name: "HIPAA",
    description: "Health Insurance Portability and Accountability Act - US legislation for data privacy",
    category: "Data Privacy",
    issuing_body: "U.S. Department of Health and Human Services",
    version: "1996",
    publication_date: "1996-08-21",
    url: "https://www.hhs.gov/hipaa/"
  },
  {
    id: "4",
    name: "IEC 62304",
    description: "Medical device software — Software life cycle processes",
    category: "Software",
    issuing_body: "International Electrotechnical Commission",
    version: "2006+A1:2015",
    publication_date: "2015-06-01",
    url: "https://www.iso.org/standard/38421.html"
  },
  {
    id: "5",
    name: "Saudi FDA Medical Device Regulation",
    description: "Regulation for medical devices and products in Saudi Arabia",
    category: "Medical Devices",
    issuing_body: "Saudi Food and Drug Authority",
    version: "2019",
    publication_date: "2019-01-01",
    url: "https://www.sfda.gov.sa/en"
  }
];

export default function ComplianceStandardsPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState<string>("browse");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [standardsList, setStandardsList] = useState(COMPLIANCE_STANDARDS);
  const [selectedStandard, setSelectedStandard] = useState<any>(null);
  
  // For compliance matching
  const [innovationDescription, setInnovationDescription] = useState<string>("");
  const [innovationType, setInnovationType] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [matchResults, setMatchResults] = useState<ComplianceMatchResult[]>([]);
  const [selectedStandards, setSelectedStandards] = useState<string[]>(["ISO 13485", "HIPAA", "GDPR", "Saudi FDA Medical Device Regulation"]);
  
  // Filter standards based on search and category
  useEffect(() => {
    let filteredStandards = [...COMPLIANCE_STANDARDS];
    
    if (searchQuery) {
      filteredStandards = filteredStandards.filter(standard => 
        standard.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        standard.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filteredStandards = filteredStandards.filter(standard => 
        standard.category === selectedCategory
      );
    }
    
    setStandardsList(filteredStandards);
  }, [searchQuery, selectedCategory]);
  
  // Get unique categories
  const categories = Array.from(new Set(COMPLIANCE_STANDARDS.map(s => s.category)));
  
  const handleMatchStandards = async () => {
    if (!innovationDescription || !innovationType) {
      toast({
        title: "Missing information",
        description: "Please describe your innovation and select its type.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const innovationData: InnovationData = {
        description: innovationDescription,
        type: innovationType,
        name: "Standards Matching",
        sector: "healthcare",
        stage: "development",
      };
      
      const results = await RegulatoryAIService.matchComplianceStandards(
        innovationData,
        selectedStandards
      );
      
      setMatchResults(results);
      
      toast({
        title: "Standards Analysis Complete",
        description: "Review your compliance matching results.",
      });
    } catch (error) {
      console.error("Error matching compliance standards:", error);
      toast({
        title: "Analysis Failed",
        description: "Could not complete compliance standards analysis. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Regulatory", href: "/dashboard/regulatory" },
        ]}
        currentPage="Compliance Standards" 
      />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Healthcare Compliance Standards</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/regulatory')}
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="browse">Browse Standards</TabsTrigger>
          <TabsTrigger value="match">Match Your Innovation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Compliance Standards</CardTitle>
              <CardDescription>
                Browse healthcare regulatory frameworks, standards and compliance requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search standards..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category, i) => (
                      <SelectItem key={i} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <div className="grid grid-cols-5 border-b px-4 py-2 bg-muted/50">
                  <div className="col-span-2 font-medium">Standard</div>
                  <div className="col-span-2 font-medium">Description</div>
                  <div className="col-span-1 font-medium">Category</div>
                </div>
                
                <div className="divide-y max-h-[400px] overflow-y-auto">
                  {standardsList.length > 0 ? (
                    standardsList.map((standard) => (
                      <div 
                        key={standard.id} 
                        className="grid grid-cols-5 px-4 py-3 cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedStandard(standard)}
                      >
                        <div className="col-span-2">
                          <div className="font-medium">{standard.name}</div>
                          <div className="text-sm text-muted-foreground">{standard.issuing_body}</div>
                        </div>
                        <div className="col-span-2 text-sm">{standard.description}</div>
                        <div className="col-span-1">
                          <Badge variant="outline">{standard.category}</Badge>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      No standards found matching your criteria.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {selectedStandard && (
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{selectedStandard.name}</CardTitle>
                    <CardDescription>{selectedStandard.issuing_body}</CardDescription>
                  </div>
                  <Badge variant="outline">{selectedStandard.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{selectedStandard.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Version:</span> {selectedStandard.version}
                  </div>
                  <div>
                    <span className="font-medium">Publication Date:</span> {selectedStandard.publication_date}
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => window.open(selectedStandard.url, '_blank')}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Learn More
                  </Button>
                  
                  <Button onClick={() => setActiveTab("match")}>
                    <Shield className="mr-2 h-4 w-4" />
                    Check Compliance
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="match" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Your Innovation Against Standards</CardTitle>
              <CardDescription>
                Our AI will analyze your innovation against selected healthcare standards to assess compliance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="type">Innovation Type</label>
                  <Select value={innovationType} onValueChange={setInnovationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select innovation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical-device">Medical Device</SelectItem>
                      <SelectItem value="digital-health">Digital Health App</SelectItem>
                      <SelectItem value="ai-solution">AI/ML Solution</SelectItem>
                      <SelectItem value="telemedicine">Telemedicine Service</SelectItem>
                      <SelectItem value="pharmaceutical">Pharmaceutical</SelectItem>
                      <SelectItem value="diagnostic">Diagnostic Tool</SelectItem>
                      <SelectItem value="therapeutic">Therapeutic Tool</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="description">Describe your innovation in detail</label>
                  <Textarea
                    id="description"
                    placeholder="Describe what your innovation does, how it works, and its intended healthcare purpose..."
                    rows={6}
                    value={innovationDescription}
                    onChange={(e) => setInnovationDescription(e.target.value)}
                  />
                </div>
                
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Standards to check against</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["ISO 13485", "HIPAA", "GDPR", "Saudi FDA Medical Device Regulation", "IEC 62304"].map((standard) => (
                      <div key={standard} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`standard-${standard}`}
                          checked={selectedStandards.includes(standard)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedStandards([...selectedStandards, standard]);
                            } else {
                              setSelectedStandards(selectedStandards.filter(s => s !== standard));
                            }
                          }}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor={`standard-${standard}`}>{standard}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full"
                onClick={handleMatchStandards}
                disabled={isAnalyzing || !innovationDescription || !innovationType || selectedStandards.length === 0}
              >
                {isAnalyzing ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    Analyzing Standards...
                  </>
                ) : "Match Against Standards"}
              </Button>
            </CardContent>
          </Card>
          
          {matchResults.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Compliance Match Results</h3>
              
              {matchResults.map((result, i) => (
                <Card key={i} className={result.matchScore > 70 ? "border-l-4 border-l-green-500" : "border-l-4 border-l-amber-500"}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{result.standardName}</CardTitle>
                        <CardDescription>
                          {result.matchScore > 70 
                            ? "Your innovation largely aligns with this standard" 
                            : "Your innovation needs adjustments to meet this standard"}
                        </CardDescription>
                      </div>
                      <div className="bg-slate-100 px-3 py-1 rounded-full">
                        <span className="font-semibold">{result.matchScore}% Match</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                        Compliance Estimate
                      </h4>
                      <div className="grid gap-1.5">
                        <div className="flex justify-between text-sm">
                          <span>Current compliance</span>
                          <span>{result.complianceEstimate.percentCompliant}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              result.complianceEstimate.percentCompliant > 70 ? "bg-green-500" : 
                              result.complianceEstimate.percentCompliant > 30 ? "bg-amber-500" : "bg-red-500"
                            }`}
                            style={{ width: `${result.complianceEstimate.percentCompliant}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    {result.complianceEstimate.missingElements.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2 flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
                          Missing Elements
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {result.complianceEstimate.missingElements.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        Required Actions
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {result.requiredActions.map((action, idx) => (
                          <li key={idx}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Generate Compliance Report
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
