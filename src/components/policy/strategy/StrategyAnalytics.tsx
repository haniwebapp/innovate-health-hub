
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock data for policy analytics
const policyPerformanceData = [
  { name: 'Access to Care', target: 85, actual: 72 },
  { name: 'Digital Health', target: 70, actual: 65 },
  { name: 'Preventive Care', target: 90, actual: 76 },
  { name: 'Healthcare Workforce', target: 80, actual: 65 },
  { name: 'Medical Tourism', target: 60, actual: 42 },
  { name: 'Research & Innovation', target: 75, actual: 68 },
];

export const StrategyAnalytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card className="border-moh-green/10 shadow-sm">
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Healthcare Strategy Performance Metrics</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={policyPerformanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
                <Legend />
                <Bar dataKey="target" name="Target" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <p>This chart shows the performance comparison between target goals and actual achievements across various healthcare strategy dimensions.</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-moh-green/10 shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">Key Policies</h4>
            <p className="text-3xl font-bold text-moh-darkGreen">24</p>
            <p className="text-xs text-muted-foreground mt-1">+3 in last quarter</p>
          </CardContent>
        </Card>
        
        <Card className="border-moh-green/10 shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">Avg. Implementation</h4>
            <p className="text-3xl font-bold text-moh-darkGreen">67%</p>
            <p className="text-xs text-muted-foreground mt-1">+4.2% from previous year</p>
          </CardContent>
        </Card>
        
        <Card className="border-moh-green/10 shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">Vision 2030 Alignment</h4>
            <p className="text-3xl font-bold text-moh-darkGreen">78%</p>
            <p className="text-xs text-muted-foreground mt-1">Target: 85%</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
