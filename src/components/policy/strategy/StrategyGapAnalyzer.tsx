
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, ChevronRight, CheckCircle2, XCircle } from "lucide-react";

export const StrategyGapAnalyzer: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState("digital-health");
  const [confidence, setConfidence] = useState([75]);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Healthcare Strategy Gap Analyzer</CardTitle>
          <CardDescription>
            Identify potential gaps between current healthcare policy and strategic objectives
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Healthcare Focus Area</label>
              <Select value={selectedArea} onValueChange={setSelectedArea}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a focus area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital-health">Digital Health Transformation</SelectItem>
                  <SelectItem value="primary-care">Primary Care Enhancement</SelectItem>
                  <SelectItem value="specialized-care">Specialized Care Access</SelectItem>
                  <SelectItem value="preventative">Preventative Medicine</SelectItem>
                  <SelectItem value="workforce">Healthcare Workforce</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-medium">Confidence Threshold</label>
                <span className="text-sm">{confidence}%</span>
              </div>
              <Slider
                value={confidence}
                onValueChange={setConfidence}
                min={50}
                max={95}
                step={5}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Set the minimum confidence level for identified gaps
              </p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-4">
              {selectedArea === 'digital-health' && 'Digital Health Transformation'}
              {selectedArea === 'primary-care' && 'Primary Care Enhancement'}
              {selectedArea === 'specialized-care' && 'Specialized Care Access'}
              {selectedArea === 'preventative' && 'Preventative Medicine'}
              {selectedArea === 'workforce' && 'Healthcare Workforce'}
              {' '}Gap Analysis
            </h3>
            
            <div className="space-y-4">
              {selectedArea === 'digital-health' && (
                <>
                  <GapItem 
                    title="Telehealth Coverage Regulations"
                    status="aligned"
                    description="Current policies adequately address telehealth coverage and reimbursement."
                    impact="high"
                  />
                  <GapItem 
                    title="Cross-border Telehealth Services"
                    status="gap"
                    description="Policies do not fully address international telehealth service provision."
                    impact="medium"
                  />
                  <GapItem 
                    title="AI in Clinical Decision Support"
                    status="partial"
                    description="Current regulations partially address AI-based clinical decision support tools."
                    impact="high"
                  />
                </>
              )}
              {selectedArea === 'primary-care' && (
                <>
                  <GapItem 
                    title="Rural Primary Care Access"
                    status="gap"
                    description="Significant gap in policies supporting rural primary care access."
                    impact="high"
                  />
                  <GapItem 
                    title="Primary Care Workforce Incentives"
                    status="aligned"
                    description="Current incentive programs effectively support primary care workforce development."
                    impact="medium"
                  />
                </>
              )}
              {(selectedArea !== 'digital-health' && selectedArea !== 'primary-care') && (
                <div className="flex items-center justify-center p-8 text-center">
                  <div>
                    <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select Digital Health or Primary Care to view sample gap analysis results. Other areas are under development.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            Generate Complete Gap Analysis
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

interface GapItemProps {
  title: string;
  status: 'aligned' | 'gap' | 'partial';
  description: string;
  impact: 'high' | 'medium' | 'low';
}

const GapItem: React.FC<GapItemProps> = ({ title, status, description, impact }) => {
  return (
    <div className="border rounded-md p-4">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium">{title}</h4>
        {status === 'aligned' && <Badge className="bg-green-500">Aligned</Badge>}
        {status === 'gap' && <Badge variant="destructive">Gap Identified</Badge>}
        {status === 'partial' && <Badge className="bg-amber-500">Partial Alignment</Badge>}
      </div>
      <p className="text-sm text-muted-foreground mb-3">{description}</p>
      <div className="flex items-center text-sm">
        <span className="text-muted-foreground mr-2">Strategic Impact:</span>
        {impact === 'high' && (
          <Badge variant="outline" className="text-red-500 border-red-200">High</Badge>
        )}
        {impact === 'medium' && (
          <Badge variant="outline" className="text-amber-500 border-amber-200">Medium</Badge>
        )}
        {impact === 'low' && (
          <Badge variant="outline" className="text-green-500 border-green-200">Low</Badge>
        )}
      </div>
    </div>
  );
};
