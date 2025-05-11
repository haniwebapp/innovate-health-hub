
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from "recharts";

const kpiData = [
  { name: 'Q1', actual: 78, target: 75 },
  { name: 'Q2', actual: 83, target: 80 },
  { name: 'Q3', actual: 86, target: 85 },
  { name: 'Q4', actual: 91, target: 90 },
];

const alignmentData = [
  { name: 'Digital Health', score: 87 },
  { name: 'Access', score: 76 },
  { name: 'Quality', score: 82 },
  { name: 'Prevention', score: 68 },
  { name: 'Workforce', score: 72 },
];

const impactData = [
  { name: 'Patients', value: 35 },
  { name: 'Providers', value: 25 },
  { name: 'Payers', value: 20 },
  { name: 'Regulators', value: 15 },
  { name: 'Industry', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function StrategyAnalytics() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Analytics</CardTitle>
        <CardDescription>
          Tracking progress against strategic objectives
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="kpis">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="kpis">KPIs</TabsTrigger>
            <TabsTrigger value="alignment">Alignment</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>
          
          <TabsContent value="kpis">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={kpiData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#14532d" 
                    strokeWidth={2} 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#14532d" 
                    strokeWidth={2}
                    strokeDasharray="5 5" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-center text-muted-foreground mt-2">
              Quarterly performance against strategic targets
            </div>
          </TabsContent>
          
          <TabsContent value="alignment">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={alignmentData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="score" fill="#14532d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-center text-muted-foreground mt-2">
              Vision 2030 alignment scores by strategic pillar
            </div>
          </TabsContent>
          
          <TabsContent value="impact">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={impactData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {impactData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-sm text-center text-muted-foreground mt-2">
              Strategic impact distribution across healthcare stakeholders
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
