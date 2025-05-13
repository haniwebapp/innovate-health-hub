
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Badge } from "@/components/ui/badge";

// Mock data for gap analysis
const gapAnalysisData = [
  { year: '2022', projected: 45, actual: 42 },
  { year: '2023', projected: 55, actual: 49 },
  { year: '2024', projected: 65, actual: 58 },
  { year: '2025', projected: 75, actual: 67 },
  { year: '2026', projected: 85, current: 72 },
  { year: '2027', projected: 90, current: 78 },
  { year: '2028', projected: 95 },
  { year: '2029', projected: 98 },
  { year: '2030', projected: 100 },
];

const gapIssues = [
  {
    area: "Digital Transformation",
    status: "significant-gap",
    description: "Current EHR adoption at 62%, target is 85% by 2025"
  },
  {
    area: "Preventive Care Programs",
    status: "moderate-gap",
    description: "Screening programs reaching 68% of target population, goal is 80%"
  },
  {
    area: "Healthcare Workforce",
    status: "on-track",
    description: "Training programs increased healthcare staff by 12% this year, meeting targets"
  },
  {
    area: "Medical Tourism",
    status: "significant-gap",
    description: "Currently 45% below projected visitor targets for international patients"
  },
  {
    area: "Research Output",
    status: "moderate-gap",
    description: "Publishing 72% of targeted research volume in international journals"
  }
];

export const StrategyGapAnalyzer: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-moh-green/10 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Vision 2030 Progress Trajectory</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={gapAnalysisData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Achievement']} />
                <Legend />
                <Line type="monotone" dataKey="projected" name="Target Path" stroke="#00814A" strokeWidth={2} />
                <Line type="monotone" dataKey="actual" name="Actual Progress" stroke="#9b87f5" strokeWidth={2} />
                <Line type="monotone" dataKey="current" name="Current Trajectory" stroke="#F97316" strokeDasharray="5 5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>This chart shows the projected targets versus actual progress towards Vision 2030 healthcare goals, with current trajectory projections.</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-moh-green/10 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Key Strategy Gaps</h3>
          <div className="space-y-4">
            {gapIssues.map((issue, index) => (
              <div key={index} className="flex items-start gap-4 pb-3 border-b border-gray-100 last:border-0">
                <div>
                  <Badge className={
                    issue.status === "significant-gap" ? "bg-red-500" : 
                    issue.status === "moderate-gap" ? "bg-amber-500" : 
                    "bg-green-500"
                  }>{index + 1}</Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium">{issue.area}</h4>
                  <p className="text-sm text-gray-500 mt-1">{issue.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
