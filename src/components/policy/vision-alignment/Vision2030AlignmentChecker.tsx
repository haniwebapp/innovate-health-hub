
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, CheckCircle, AlertTriangle, XCircle, Landmark, Send } from "lucide-react";

export function Vision2030AlignmentChecker() {
  const [policyText, setPolicyText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | {
    overallScore: number;
    alignmentAreas: {
      area: string;
      score: number;
      status: "high" | "medium" | "low";
      insights: string;
    }[];
    recommendations: string[];
  }>(null);

  const handleAnalyze = () => {
    if (!policyText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulating API call with timeout
    setTimeout(() => {
      // Mock result
      const mockResult = {
        overallScore: 76,
        alignmentAreas: [
          {
            area: "Healthcare Access",
            score: 85,
            status: "high" as const,
            insights: "Strong alignment with Vision 2030's goal to improve healthcare access across all regions."
          },
          {
            area: "Digital Transformation",
            score: 92,
            status: "high" as const,
            insights: "Excellent integration with digital health initiatives outlined in Vision 2030."
          },
          {
            area: "Preventative Care",
            score: 68,
            status: "medium" as const,
            insights: "Moderate alignment with preventative care goals, but could be strengthened."
          },
          {
            area: "Healthcare Workforce",
            score: 45,
            status: "low" as const,
            insights: "Limited alignment with workforce development targets in Vision 2030."
          },
          {
            area: "Private Sector Participation",
            score: 72,
            status: "medium" as const,
            insights: "Good alignment with goals for increasing private sector involvement."
          }
        ],
        recommendations: [
          "Strengthen workforce development provisions to align better with Vision 2030 healthcare talent goals.",
          "Enhance preventative care aspects by incorporating community health initiatives.",
          "Consider integrating more explicit references to Vision 2030's healthcare quality metrics.",
          "Add provisions for tracking and measuring outcomes related to strategic healthcare objectives."
        ]
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const getStatusColor = (status: "high" | "medium" | "low") => {
    switch (status) {
      case "high": return "bg-green-100 text-green-800 border-green-200";
      case "medium": return "bg-amber-100 text-amber-800 border-amber-200";
      case "low": return "bg-red-100 text-red-800 border-red-200";
      default: return "";
    }
  };
  
  const getStatusIcon = (status: "high" | "medium" | "low") => {
    switch (status) {
      case "high": return <CheckCircle className="h-4 w-4" />;
      case "medium": return <AlertTriangle className="h-4 w-4" />;
      case "low": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-moh-green" />
            Vision 2030 Alignment Checker
          </CardTitle>
          <CardDescription>
            Analyze how well your policy or innovation aligns with Saudi Arabia's Vision 2030 healthcare objectives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Enter your policy text, proposal, or innovation description below:
            </label>
            <Textarea 
              className="h-[200px] resize-none"
              placeholder="Paste or type your policy document, healthcare initiative proposal, or innovation description here..."
              value={policyText}
              onChange={(e) => setPolicyText(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button 
            onClick={handleAnalyze}
            disabled={!policyText.trim() || isAnalyzing}
          >
            {isAnalyzing ? (
              <>Analyzing...</>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Analyze Alignment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
      
      {isAnalyzing && (
        <Card>
          <CardContent className="py-6">
            <div className="space-y-2 text-center">
              <div className="text-moh-green animate-pulse">
                <FileText className="h-12 w-12 mx-auto" />
              </div>
              <div className="font-medium">Analyzing your document</div>
              <div className="text-sm text-muted-foreground">
                Evaluating alignment with Vision 2030 healthcare objectives...
              </div>
              <Progress value={65} className="mt-4" />
            </div>
          </CardContent>
        </Card>
      )}
      
      {result && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Alignment Analysis Results</CardTitle>
              <CardDescription>
                Overall alignment score with Vision 2030 healthcare objectives
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-moh-green">
                  {result.overallScore}%
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  Overall Alignment Score
                </div>
                <Progress value={result.overallScore} className="mt-2" />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alignment by Area</h3>
                {result.alignmentAreas.map((area, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(area.status)}>
                          {getStatusIcon(area.status)}
                          <span className="ml-1">{area.area}</span>
                        </Badge>
                      </div>
                      <span className="font-medium">{area.score}%</span>
                    </div>
                    <Progress value={area.score} className="h-2" />
                    <p className="text-sm text-muted-foreground">
                      {area.insights}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>
                Suggestions to improve alignment with Vision 2030
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="bg-moh-lightGreen/30 border-moh-green">
                <AlertTitle className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-moh-green" />
                  Improvement Opportunities
                </AlertTitle>
                <AlertDescription>
                  <ul className="mt-2 space-y-2 list-disc ml-5">
                    {result.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline">
                Download Report
              </Button>
              <Button>
                Share Results
              </Button>
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
