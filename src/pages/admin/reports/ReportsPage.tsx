
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from 'lucide-react';

const ReportsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Analytics & Reports</h1>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="challenges">Challenge Analytics</TabsTrigger>
          <TabsTrigger value="innovations">Innovation Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              title="Total Users" 
              value="2,543" 
              change="+12.3%" 
              trend="up"
            />
            <MetricCard 
              title="Active Innovations" 
              value="187" 
              change="+5.7%" 
              trend="up"
            />
            <MetricCard 
              title="Challenge Submissions" 
              value="432" 
              change="-2.1%" 
              trend="down"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center">
                  <LineChart className="h-4 w-4 mr-2" />
                  Platform Growth
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Growth Chart Will Render Here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium flex items-center">
                  <PieChart className="h-4 w-4 mr-2" />
                  Innovation Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Distribution Chart Will Render Here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">User Growth Trend</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-slate-50">
              <div className="text-slate-400">User Growth Chart Will Render Here</div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">User Demographics</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Demographics Chart Will Render Here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">User Activity</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Activity Chart Will Render Here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Challenge Performance</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-slate-50">
              <div className="text-slate-400">Challenge Performance Chart Will Render Here</div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">Submission Analytics</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Submission Analytics Will Render Here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">Challenge Categories</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Categories Chart Will Render Here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="innovations" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-md font-medium">Innovation Metrics</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-slate-50">
              <div className="text-slate-400">Innovation Metrics Chart Will Render Here</div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">Sector Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Sector Distribution Chart Will Render Here</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md font-medium">Innovation Status</CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center bg-slate-50">
                <div className="text-slate-400">Status Chart Will Render Here</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, trend }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-sm text-muted-foreground">{title}</div>
        <div className="text-2xl font-bold mt-1">{value}</div>
        <div className={`text-xs mt-1 ${
          trend === 'up' ? 'text-green-600' : 
          trend === 'down' ? 'text-red-600' : 
          'text-gray-600'
        }`}>
          {change}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsPage;
