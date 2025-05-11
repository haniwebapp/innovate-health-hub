
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, AlertCircle, Clipboard, CheckCircle, ArrowLeft } from 'lucide-react';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { useToast } from '@/components/ui/use-toast';
import { RegulatoryAIService, InnovationData, EthicsAssessment } from '@/services/ai/complianceAI/RegulatoryAIService';

export default function EthicsAssessmentPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [innovationDescription, setInnovationDescription] = useState('');
  const [innovationType, setInnovationType] = useState('');
  const [dataCollection, setDataCollection] = useState('');
  const [patientImpact, setPatientImpact] = useState('');
  const [targetUsers, setTargetUsers] = useState('');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [ethicsResults, setEthicsResults] = useState<EthicsAssessment | null>(null);
  
  const handleEthicsAssessment = async () => {
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
        name: "Ethics Assessment",
        sector: "healthcare",
        stage: "development",
        dataCollection: dataCollection,
        patientImpact: patientImpact,
        targetUsers: targetUsers ? targetUsers.split(',').map(item => item.trim()) : []
      };
      
      const results = await RegulatoryAIService.assessEthics(innovationData);
      setEthicsResults(results);
      
      toast({
        title: "Ethics Assessment Complete",
        description: "Review the ethical considerations for your innovation.",
      });
    } catch (error) {
      console.error("Error during ethics assessment:", error);
      toast({
        title: "Assessment Failed",
        description: "Could not complete ethics assessment. Please try again later.",
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
        currentPage="Ethics Assessment" 
      />
      
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">AI Ethics Assessment</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/dashboard/regulatory')}
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Analyze Ethical Considerations</CardTitle>
          <CardDescription>
            Our AI will analyze your healthcare innovation for ethical considerations, potential risks, and provide recommendations.
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
              <label className="text-sm font-medium" htmlFor="dataCollection">What data does your innovation collect?</label>
              <Textarea
                id="dataCollection"
                placeholder="E.g., patient health records, biometric data, usage patterns..."
                rows={3}
                value={dataCollection}
                onChange={(e) => setDataCollection(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="targetUsers">Who are the intended users? (comma-separated)</label>
              <Textarea
                id="targetUsers"
                placeholder="E.g., Healthcare professionals, elderly patients, chronic disease patients..."
                rows={2}
                value={targetUsers}
                onChange={(e) => setTargetUsers(e.target.value)}
              />
            </div>
            
            <div className="grid gap-2">
              <label className="text-sm font-medium" htmlFor="patientImpact">How does it impact patients or healthcare delivery?</label>
              <Textarea
                id="patientImpact"
                placeholder="Describe how patients or healthcare providers will be affected..."
                rows={3}
                value={patientImpact}
                onChange={(e) => setPatientImpact(e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={handleEthicsAssessment} 
            disabled={isAnalyzing || !innovationDescription || !innovationType}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Ethics Considerations...
              </>
            ) : "Conduct Ethics Assessment"}
          </Button>
          
          {!innovationDescription || !innovationType ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Required information missing</AlertTitle>
              <AlertDescription>
                Please provide at minimum the innovation type and description.
              </AlertDescription>
            </Alert>
          ) : null}
        </CardContent>
      </Card>
      
      {ethicsResults && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Ethics Assessment Results</CardTitle>
                <CardDescription>Analysis of ethical considerations for your healthcare innovation</CardDescription>
              </div>
              <div className="bg-slate-100 px-3 py-1 rounded-full">
                <span className="font-semibold">{ethicsResults.ethicsScore}/100</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {ethicsResults.risks.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Potential Ethical Risks</h3>
                <div className="space-y-4">
                  {ethicsResults.risks.map((risk, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{risk.category}</h4>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          risk.severity === 'high' ? 'bg-red-100 text-red-800' :
                          risk.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {risk.severity.toUpperCase()} RISK
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{risk.description}</p>
                      {risk.mitigationSteps.length > 0 && (
                        <div className="mt-3">
                          <h5 className="text-sm font-medium">Mitigation Steps:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                            {risk.mitigationSteps.map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {ethicsResults.recommendations.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Recommendations</h3>
                <ul className="space-y-2">
                  {ethicsResults.recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {ethicsResults.requiredActions.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Required Actions</h3>
                <ul className="space-y-2">
                  {ethicsResults.requiredActions.map((action, index) => (
                    <li key={index} className="flex gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <Button 
              variant="outline"
              className="w-full mt-4"
              onClick={() => {
                toast({
                  title: "Report copied",
                  description: "Ethics assessment report has been copied to clipboard.",
                });
              }}
            >
              <Clipboard className="mr-2 h-4 w-4" />
              Export Assessment Report
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
