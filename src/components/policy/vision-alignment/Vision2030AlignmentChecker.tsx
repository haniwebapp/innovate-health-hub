
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertTriangle, Target } from "lucide-react";

export const Vision2030AlignmentChecker: React.FC = () => {
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [alignmentScore, setAlignmentScore] = useState(0);
  
  const handleCheckAlignment = () => {
    // Simulate analysis
    setAnalysisComplete(true);
    setAlignmentScore(78);
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-moh-green" />
          Vision 2030 Alignment Checker
        </CardTitle>
        <CardDescription>
          Evaluate how well your healthcare innovation aligns with Saudi Vision 2030 objectives
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!analysisComplete ? (
          <>
            <div>
              <Label htmlFor="innovation-title">Innovation Title</Label>
              <Input id="innovation-title" placeholder="Enter the title of your healthcare innovation" />
            </div>
            
            <div>
              <Label htmlFor="innovation-description">Innovation Description</Label>
              <Textarea 
                id="innovation-description" 
                placeholder="Describe your healthcare innovation, its purpose, and intended benefits"
                className="min-h-[120px]"
              />
            </div>
            
            <div className="space-y-3 pt-3">
              <Label>Primary Healthcare Domain</Label>
              <RadioGroup defaultValue="digital">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="digital" id="digital" />
                  <Label htmlFor="digital">Digital Health</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="access" id="access" />
                  <Label htmlFor="access">Healthcare Access</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="quality" id="quality" />
                  <Label htmlFor="quality">Quality Improvement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cost" id="cost" />
                  <Label htmlFor="cost">Cost Efficiency</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium mb-1">Vision 2030 Alignment Score</h3>
              <div className="relative pt-4">
                <Progress value={alignmentScore} className="h-3" />
                <span className="absolute right-0 top-0 text-sm font-medium">{alignmentScore}%</span>
              </div>
              {alignmentScore >= 70 ? (
                <div className="mt-2 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Strong Alignment</span>
                </div>
              ) : (
                <div className="mt-2 flex items-center justify-center text-amber-600">
                  <AlertTriangle className="h-5 w-5 mr-1" />
                  <span className="text-sm font-medium">Moderate Alignment</span>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Alignment Highlights</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Healthcare Access Improvement</p>
                    <p className="text-sm text-muted-foreground">Strong alignment with Vision 2030's goal to improve healthcare access across all regions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Digital Transformation</p>
                    <p className="text-sm text-muted-foreground">Aligns with the digital transformation objectives of the healthcare sector.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Cost Efficiency</p>
                    <p className="text-sm text-muted-foreground">Moderate alignment with cost efficiency targets - consider enhancing this aspect.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Recommendations</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Consider expanding rural implementation strategy to better align with regional development goals</li>
                <li>Strengthen cost-efficiency metrics to demonstrate economic impact</li>
                <li>Develop partnerships with local healthcare institutions for improved integration</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!analysisComplete ? (
          <Button onClick={handleCheckAlignment} className="w-full">
            Check Vision 2030 Alignment
          </Button>
        ) : (
          <div className="flex w-full gap-4">
            <Button variant="outline" onClick={() => setAnalysisComplete(false)} className="flex-1">
              Start New Analysis
            </Button>
            <Button className="flex-1">
              Download Detailed Report
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
