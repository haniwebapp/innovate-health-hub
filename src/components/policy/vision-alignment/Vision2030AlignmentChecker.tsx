
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle2, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Results interface for type checking
interface AlignmentResults {
  score: number;
  alignmentLevel: 'High' | 'Medium' | 'Low';
  alignedObjectives: string[];
  recommendations: string[];
  improvementAreas: string[];
}

export const Vision2030AlignmentChecker = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<AlignmentResults | null>(null);
  
  const handleSubmit = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setResults({
        score: 78,
        alignmentLevel: 'Medium',
        alignedObjectives: [
          'Improve healthcare access through digital solutions',
          'Enhance healthcare quality through innovation',
          'Develop sustainable healthcare infrastructure'
        ],
        recommendations: [
          'Strengthen integration with primary healthcare services',
          'Expand rural implementation strategy',
          'Develop training programs for healthcare providers',
          'Partner with local technology providers'
        ],
        improvementAreas: [
          'Affordability considerations for underserved populations',
          'Integration with existing health information systems',
          'Localization of content and interfaces for diverse populations'
        ]
      });
      setStep(3);
    }, 2000);
  };
  
  const resetForm = () => {
    setStep(1);
    setResults(null);
  };
  
  return (
    <div className="space-y-6">
      {step === 1 && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Type of Initiative or Policy*
              </label>
              <Select defaultValue="innovation">
                <SelectTrigger>
                  <SelectValue placeholder="Select initiative type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="innovation">Healthcare Innovation or Solution</SelectItem>
                  <SelectItem value="policy">Health Policy or Framework</SelectItem>
                  <SelectItem value="research">Medical Research Initiative</SelectItem>
                  <SelectItem value="program">Public Health Program</SelectItem>
                  <SelectItem value="infrastructure">Healthcare Infrastructure Project</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Title*
              </label>
              <Input placeholder="Enter the name of your innovation, policy, or initiative" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Description*
              </label>
              <Textarea 
                placeholder="Provide a detailed description of your initiative, its objectives, and its expected impact on healthcare..." 
                className="min-h-[120px]"
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Target Audience/Beneficiaries*
              </label>
              <Input placeholder="e.g., Rural communities, Elderly patients, Healthcare providers, etc." />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Implementation Timeline
              </label>
              <Select defaultValue="short">
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="short">Short-term (0-1 year)</SelectItem>
                  <SelectItem value="medium">Medium-term (1-3 years)</SelectItem>
                  <SelectItem value="long">Long-term (3+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={() => setStep(2)} 
              className="w-full bg-moh-green hover:bg-moh-darkGreen"
            >
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
      
      {step === 2 && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <h3 className="text-base font-medium mb-3">Vision 2030 Health Objectives Relevance</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Rate how strongly your initiative aligns with each of the following Vision 2030 health objectives:
              </p>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">
                      Improve access to healthcare services
                    </label>
                  </div>
                  <RadioGroup defaultValue="high" className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="high" id="access-high" />
                      <Label htmlFor="access-high" className="text-xs">High</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="medium" id="access-medium" />
                      <Label htmlFor="access-medium" className="text-xs">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="low" id="access-low" />
                      <Label htmlFor="access-low" className="text-xs">Low</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="none" id="access-none" />
                      <Label htmlFor="access-none" className="text-xs">Not Applicable</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">
                      Enhance quality of healthcare services
                    </label>
                  </div>
                  <RadioGroup defaultValue="high" className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="high" id="quality-high" />
                      <Label htmlFor="quality-high" className="text-xs">High</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="medium" id="quality-medium" />
                      <Label htmlFor="quality-medium" className="text-xs">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="low" id="quality-low" />
                      <Label htmlFor="quality-low" className="text-xs">Low</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="none" id="quality-none" />
                      <Label htmlFor="quality-none" className="text-xs">Not Applicable</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">
                      Promote preventive care and healthy lifestyles
                    </label>
                  </div>
                  <RadioGroup defaultValue="medium" className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="high" id="preventive-high" />
                      <Label htmlFor="preventive-high" className="text-xs">High</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="medium" id="preventive-medium" />
                      <Label htmlFor="preventive-medium" className="text-xs">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="low" id="preventive-low" />
                      <Label htmlFor="preventive-low" className="text-xs">Low</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="none" id="preventive-none" />
                      <Label htmlFor="preventive-none" className="text-xs">Not Applicable</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">
                      Develop sustainable healthcare infrastructure
                    </label>
                  </div>
                  <RadioGroup defaultValue="medium" className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="high" id="infrastructure-high" />
                      <Label htmlFor="infrastructure-high" className="text-xs">High</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="medium" id="infrastructure-medium" />
                      <Label htmlFor="infrastructure-medium" className="text-xs">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="low" id="infrastructure-low" />
                      <Label htmlFor="infrastructure-low" className="text-xs">Low</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="none" id="infrastructure-none" />
                      <Label htmlFor="infrastructure-none" className="text-xs">Not Applicable</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium">
                      Build digital health capabilities
                    </label>
                  </div>
                  <RadioGroup defaultValue="high" className="flex space-x-2">
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="high" id="digital-high" />
                      <Label htmlFor="digital-high" className="text-xs">High</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="medium" id="digital-medium" />
                      <Label htmlFor="digital-medium" className="text-xs">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="low" id="digital-low" />
                      <Label htmlFor="digital-low" className="text-xs">Low</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="none" id="digital-none" />
                      <Label htmlFor="digital-none" className="text-xs">Not Applicable</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Additional Information (Optional)
              </label>
              <Textarea 
                placeholder="Provide any additional details about how your initiative supports Vision 2030 health objectives..." 
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setStep(1)}
                className="flex-1 border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
              >
                Back
              </Button>
              <Button 
                onClick={handleSubmit} 
                className="flex-1 bg-moh-green hover:bg-moh-darkGreen"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Check Alignment"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {step === 3 && results && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div className="p-4 bg-moh-lightGreen/20 rounded-lg border border-moh-green/20">
              <div className="flex items-center mb-2">
                <div className="mr-3 p-1.5 bg-moh-green/10 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-moh-green" />
                </div>
                <h3 className="text-lg font-medium text-moh-darkGreen">Analysis Complete</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                We've analyzed your innovation and assessed its alignment with Vision 2030 health objectives.
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="relative h-36 w-36">
                <div className="h-full w-full rounded-full bg-moh-lightGreen/20 flex items-center justify-center">
                  <div className="text-3xl font-bold text-moh-green">{results.score}%</div>
                </div>
                <Badge 
                  className={`absolute bottom-0 right-0 ${
                    results.alignmentLevel === 'High' 
                      ? 'bg-moh-green text-white' 
                      : results.alignmentLevel === 'Medium' 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-rose-500 text-white'
                  }`}
                >
                  {results.alignmentLevel} Alignment
                </Badge>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-base font-medium mb-3">Aligned Vision 2030 Objectives</h3>
              <ul className="space-y-2">
                {results.alignedObjectives.map((objective, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-moh-green mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{objective}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-base font-medium mb-3">Areas for Improvement</h3>
              <ul className="space-y-2">
                {results.improvementAreas.map((area, index) => (
                  <li key={index} className="text-sm flex items-start">
                    <div className="h-5 w-5 text-amber-500 mr-2 flex items-center justify-center flex-shrink-0">
                      •
                    </div>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <div className="flex items-start">
                <Lightbulb className="h-6 w-6 text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-amber-800 mb-1">Recommendations to Improve Alignment</h4>
                  <ul className="space-y-1">
                    {results.recommendations.map((recommendation, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        • {recommendation}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button className="flex-1 bg-moh-green hover:bg-moh-darkGreen">
                Download Full Report
              </Button>
              <Button 
                variant="outline" 
                onClick={resetForm}
                className="flex-1 border-moh-green text-moh-green hover:bg-moh-lightGreen/20"
              >
                Start New Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
