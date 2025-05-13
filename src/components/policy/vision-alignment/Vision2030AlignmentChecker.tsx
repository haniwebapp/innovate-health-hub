
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const alignmentData = [
  { name: 'Highly Aligned', value: 40 },
  { name: 'Partially Aligned', value: 30 },
  { name: 'Needs Adjustment', value: 20 },
  { name: 'Not Aligned', value: 10 },
];

const COLORS = ['#00814A', '#65dba9', '#F59E0B', '#EF4444'];

const mockAlignmentAreas = [
  "Improving quality of healthcare services",
  "Expanding digital health infrastructure",
  "Increasing preventive care accessibility",
  "Developing local pharmaceutical manufacturing",
  "Promoting medical research and innovation"
];

const mockImprovementAreas = [
  "Focus more on rural healthcare access initiatives",
  "Strengthen integration with private sector providers",
  "Increase workforce development incentives",
  "Expand medical education programs"
];

export const Vision2030AlignmentChecker: React.FC = () => {
  const [policyText, setPolicyText] = useState<string>('');
  const [policyType, setPolicyType] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (policyText && policyType) {
      setShowResults(true);
    }
  };

  return (
    <div className="space-y-6">
      {!showResults ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="policy-type">Policy Type</Label>
              <Select value={policyType} onValueChange={setPolicyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select policy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthcare-access">Healthcare Access</SelectItem>
                  <SelectItem value="digital-health">Digital Health</SelectItem>
                  <SelectItem value="preventive-care">Preventive Care</SelectItem>
                  <SelectItem value="workforce-development">Workforce Development</SelectItem>
                  <SelectItem value="research-innovation">Research & Innovation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="policy-text">Policy Text or Summary</Label>
              <Textarea
                id="policy-text"
                value={policyText}
                onChange={(e) => setPolicyText(e.target.value)}
                placeholder="Enter the policy text or a detailed summary..."
                className="h-32"
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={!policyText || !policyType}>
              Check Vision 2030 Alignment
            </Button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <Card className="border-moh-green/10 shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-2">Alignment Analysis Results</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={alignmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {alignmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, 'Proportion']} />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-moh-green/10 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Areas of Alignment</h3>
                <ul className="space-y-2">
                  {mockAlignmentAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-moh-green/10 shadow-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4">Improvement Areas</h3>
                <ul className="space-y-2">
                  {mockImprovementAreas.map((area, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-amber-500"></span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button variant="outline" onClick={() => setShowResults(false)}>
              Check Another Policy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
