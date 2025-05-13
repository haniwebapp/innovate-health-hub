
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { HeartPulse, Lightbulb, Users, BarChart3, Upload } from "lucide-react";

export const Vision2030AlignmentChecker = () => {
  const [selectedProject, setSelectedProject] = useState("default");
  
  // Mock alignment data for Vision 2030
  const alignmentData = {
    scores: {
      overall: 78,
      healthcareAccess: 85,
      digitalTransformation: 92,
      qualityOfCare: 68,
      economicImpact: 72
    },
    highlights: [
      "Strong alignment with digital transformation goals",
      "Supports healthcare access improvement targets",
      "Contributes to healthcare workforce development"
    ],
    recommendations: [
      "Enhance focus on preventive care aspects",
      "Strengthen alignment with quality metrics",
      "Consider integration with national health information systems"
    ]
  };

  const visionPillars = [
    { 
      id: "healthcare-access", 
      title: "Healthcare Access", 
      icon: <Users className="h-4 w-4" />,
      score: alignmentData.scores.healthcareAccess,
      description: "Ensuring all citizens have access to high-quality healthcare services"
    },
    { 
      id: "digital-transformation", 
      title: "Digital Transformation", 
      icon: <Lightbulb className="h-4 w-4" />,
      score: alignmentData.scores.digitalTransformation,
      description: "Leveraging technology to improve healthcare delivery and outcomes"
    },
    { 
      id: "quality-of-care", 
      title: "Quality of Care", 
      icon: <HeartPulse className="h-4 w-4" />,
      score: alignmentData.scores.qualityOfCare,
      description: "Enhancing healthcare quality and patient experience"
    },
    { 
      id: "economic-impact", 
      title: "Economic Impact", 
      icon: <BarChart3 className="h-4 w-4" />,
      score: alignmentData.scores.economicImpact,
      description: "Contributing to economic growth and healthcare sustainability"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-medium">Vision 2030 Alignment Score</h3>
          <p className="text-sm text-muted-foreground">
            How well your innovation aligns with Saudi Vision 2030 healthcare pillars
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            <span>Upload Innovation</span>
          </Button>
          <select 
            className="border rounded px-2 py-1 text-sm"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="default">Select existing innovation</option>
            <option value="1">TeleHealth Platform</option>
            <option value="2">AI Diagnostic Tool</option>
            <option value="3">Patient Management System</option>
          </select>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Overall Alignment</CardTitle>
          <CardDescription>
            Combined score across all Vision 2030 healthcare pillars
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center">
            <div className="w-40 h-40 rounded-full border-8 border-muted flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-4xl font-bold">{alignmentData.scores.overall}%</div>
                <div className="text-xs text-muted-foreground">Alignment</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="pillars">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pillars">Pillars</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pillars" className="space-y-4 mt-4">
          {visionPillars.map((pillar) => (
            <div key={pillar.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {pillar.icon}
                  <span className="font-medium">{pillar.title}</span>
                </div>
                <span className="text-sm font-medium">{pillar.score}%</span>
              </div>
              <Progress value={pillar.score} className="h-2" />
              <p className="text-xs text-muted-foreground">{pillar.description}</p>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="highlights" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {alignmentData.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-2">
                {alignmentData.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 mt-0.5" />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end">
        <Button>Generate Detailed Report</Button>
      </div>
    </div>
  );
};

// Helper component for the CheckCircle icon
const CheckCircle = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <path d="m9 12 2 2 4-4"></path>
    </svg>
  );
};
