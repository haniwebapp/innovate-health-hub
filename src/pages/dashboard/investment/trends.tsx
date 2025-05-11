
import React from 'react';
import BreadcrumbNav from '@/components/navigation/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { AIInsightsCard } from '@/components/investment/AIInsightsCard';

// Mock data for the trends chart
const trendData = [
  { month: 'Jan', healthtech: 32, biotech: 45, meddevice: 28, pharma: 50 },
  { month: 'Feb', healthtech: 38, biotech: 42, meddevice: 29, pharma: 48 },
  { month: 'Mar', healthtech: 45, biotech: 46, meddevice: 32, pharma: 51 },
  { month: 'Apr', healthtech: 50, biotech: 49, meddevice: 35, pharma: 55 },
  { month: 'May', healthtech: 48, biotech: 52, meddevice: 37, pharma: 58 },
  { month: 'Jun', healthtech: 55, biotech: 58, meddevice: 40, pharma: 60 },
  { month: 'Jul', healthtech: 62, biotech: 55, meddevice: 45, pharma: 59 },
  { month: 'Aug', healthtech: 68, biotech: 61, meddevice: 48, pharma: 62 },
  { month: 'Sep', healthtech: 72, biotech: 65, meddevice: 52, pharma: 66 },
];

// Mock AI insights for investment trends
const trendInsights = [
  "Health technology investments are showing the strongest growth trajectory, with a 125% increase since January.",
  "Medical device investments have been more stable but are now showing signs of acceleration.",
  "Biotechnology investments typically follow a seasonal pattern, with Q3 showing the highest activity.",
  "Regulatory changes in May directly correlated with increased pharmaceutical investment.",
  "Early-stage funding rounds are becoming more prevalent across all healthcare sectors."
];

export default function DashboardInvestmentTrendsPage() {
  return (
    <div className="space-y-6">
      <BreadcrumbNav 
        currentPage="Investment Trends" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Investment", href: "/dashboard/investment" },
        ]}
      />
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Investment Trends</h2>
          <p className="text-gray-500 mt-1">Analysis of healthcare investment trends and forecasts</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Healthcare Sector Investment Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={trendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="healthtech" stroke="#00814A" name="Health Tech" />
                <Line type="monotone" dataKey="biotech" stroke="#C3A86B" name="Biotech" />
                <Line type="monotone" dataKey="meddevice" stroke="#006B3E" name="Medical Devices" />
                <Line type="monotone" dataKey="pharma" stroke="#A38A56" name="Pharma" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <AIInsightsCard insights={trendInsights} title="Investment Trend Insights" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Geographic Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-96 flex items-center justify-center">
            <p className="text-gray-500">Geographic distribution visualization will be implemented in the next phase.</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Investor Type Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-96 flex items-center justify-center">
            <p className="text-gray-500">Investor type breakdown will be implemented in the next phase.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
