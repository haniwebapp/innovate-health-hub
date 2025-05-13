
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react";

export const StrategyGapAnalyzer = () => {
  // Mock data for gap analysis
  const gapAnalysis = [
    { aspect: "Real-time Data Sharing", status: "aligned", description: "Meets requirements for secure real-time data exchange" },
    { aspect: "Rural Access Solution", status: "gap", description: "Current strategy prioritizes rural access solutions" },
    { aspect: "AI Implementation", status: "aligned", description: "Aligns with AI adoption framework for diagnostics" },
    { aspect: "Interoperability", status: "gap", description: "Stronger interoperability standards needed" }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Gap Analysis
        </CardTitle>
        <CardDescription>
          Identify gaps between your solution and policy requirements
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {gapAnalysis.map((item, index) => (
            <div key={index} className="p-3 border rounded-md">
              <div className="flex justify-between items-start mb-2">
                <span className="font-medium">{item.aspect}</span>
                <Badge 
                  variant={item.status === "aligned" ? "outline" : "default"}
                  className={item.status === "aligned" ? "bg-green-100 text-green-800 border-green-200" : "bg-amber-100 text-amber-800 border-amber-200"}
                >
                  {item.status === "aligned" ? (
                    <><CheckCircle2 className="h-3 w-3 mr-1" /> Aligned</>
                  ) : (
                    <><AlertCircle className="h-3 w-3 mr-1" /> Gap Identified</>
                  )}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
          
          <Button variant="outline" size="sm" className="w-full mt-2">
            Get Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
