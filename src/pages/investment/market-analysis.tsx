
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, TrendingUp, LineChart, PieChart } from "lucide-react";
import { motion } from "framer-motion";
import { Bar, BarChart, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Pie, PieChart as RechartsPieChart, Cell } from 'recharts';

// Mock data
const marketTrendsData = [
  { month: 'Jan', healthtech: 1200, biotech: 1800, pharma: 900 },
  { month: 'Feb', healthtech: 1900, biotech: 1398, pharma: 1200 },
  { month: 'Mar', healthtech: 2400, biotech: 1908, pharma: 1400 },
  { month: 'Apr', healthtech: 1800, biotech: 2300, pharma: 1800 },
  { month: 'May', healthtech: 2600, biotech: 2100, pharma: 2000 },
  { month: 'Jun', healthtech: 2900, biotech: 2800, pharma: 2300 },
];

const sectorAllocationData = [
  { name: 'Telehealth', value: 35 },
  { name: 'Medical Devices', value: 25 },
  { name: 'AI Diagnostics', value: 20 },
  { name: 'Genomics', value: 15 },
  { name: 'Other', value: 5 },
];

const investmentStageData = [
  { stage: 'Seed', percentage: 20 },
  { stage: 'Series A', percentage: 35 },
  { stage: 'Series B', percentage: 25 },
  { stage: 'Series C+', percentage: 15 },
  { stage: 'IPO/M&A', percentage: 5 },
];

const COLORS = ['#00814A', '#C3A86B', '#006B3E', '#A38A56', '#E8F5F0'];

export default function MarketAnalysisPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Market Analysis</h1>
        <p className="text-muted-foreground">
          Detailed insights and trends in healthcare investment markets
        </p>
      </div>

      <Tabs defaultValue="trends" className="space-y-6">
        <TabsList className="bg-moh-lightGreen/50 border-moh-green/10">
          <TabsTrigger value="trends" className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen">
            <TrendingUp className="h-4 w-4 mr-2" />
            Market Trends
          </TabsTrigger>
          <TabsTrigger value="sectors" className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen">
            <PieChart className="h-4 w-4 mr-2" />
            Sector Analysis
          </TabsTrigger>
          <TabsTrigger value="stages" className="data-[state=active]:bg-white data-[state=active]:text-moh-darkGreen">
            <BarChart3 className="h-4 w-4 mr-2" />
            Investment Stages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-moh-green/10 overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
                <CardTitle className="text-xl font-playfair text-moh-darkGreen flex items-center">
                  <LineChart className="h-5 w-5 mr-2 text-moh-green" />
                  Healthcare Investment Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={marketTrendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="healthtech" stroke="#00814A" activeDot={{ r: 8 }} name="HealthTech" />
                      <Line type="monotone" dataKey="biotech" stroke="#C3A86B" name="Biotech" />
                      <Line type="monotone" dataKey="pharma" stroke="#006B3E" name="Pharma" />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium text-lg text-moh-darkGreen">Key Insights</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>HealthTech investments show strong growth trajectory in Q2 2023</li>
                    <li>Biotech funding stabilizing after previous quarter volatility</li>
                    <li>Pharma sector seeing consistent growth with focus on innovation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="sectors">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-moh-green/10 overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
                <CardTitle className="text-xl font-playfair text-moh-darkGreen flex items-center">
                  <PieChart className="h-5 w-5 mr-2 text-moh-green" />
                  Healthcare Sector Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={sectorAllocationData}
                          innerRadius={60}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sectorAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Allocation']}
                          contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-moh-darkGreen">Sector Breakdown</h3>
                    <div className="space-y-3">
                      {sectorAllocationData.map((sector, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="h-3 w-3 rounded-full mr-2" 
                              style={{backgroundColor: COLORS[index % COLORS.length]}}
                            ></div>
                            <span>{sector.name}</span>
                          </div>
                          <span className="font-medium">{sector.value}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-4 border-t">
                      <h4 className="font-medium mb-2">Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Telehealth continues to lead investment volume in 2023, with Medical Devices 
                        and AI Diagnostics showing significant growth from previous quarters. Genomics
                        remains a strong contender for future growth.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="stages">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-moh-green/10 overflow-hidden shadow-md">
              <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
                <CardTitle className="text-xl font-playfair text-moh-darkGreen flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-moh-green" />
                  Investment Stages Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-80 mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={investmentStageData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Percentage']}
                        contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }}
                      />
                      <Bar dataKey="percentage" name="Investment %">
                        {investmentStageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium text-lg text-moh-darkGreen">Stage Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Series A funding continues to be the most active in the healthcare sector, 
                    constituting 35% of all investments. Early-stage investments (Seed + Series A) 
                    account for 55% of all healthcare innovation funding, indicating strong momentum
                    in new ventures entering the healthcare space.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
