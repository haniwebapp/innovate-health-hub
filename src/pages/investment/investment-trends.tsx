
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BarChart3, Calendar, Download, ChevronRight, TrendingDown, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { Bar, BarChart, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell } from 'recharts';

// Mock investment trends data
const quarterlyInvestment = [
  { quarter: 'Q1 2022', amount: 320, count: 24 },
  { quarter: 'Q2 2022', amount: 400, count: 28 },
  { quarter: 'Q3 2022', amount: 350, count: 25 },
  { quarter: 'Q4 2022', amount: 480, count: 32 },
  { quarter: 'Q1 2023', amount: 520, count: 35 },
  { quarter: 'Q2 2023', amount: 580, count: 38 },
];

const sectorTrends = [
  { name: 'Digital Health', current: 45, previous: 32, trend: '+40.6%' },
  { name: 'Medical Devices', current: 38, previous: 30, trend: '+26.7%' },
  { name: 'Biotech', current: 52, previous: 48, trend: '+8.3%' },
  { name: 'AI in Healthcare', current: 65, previous: 40, trend: '+62.5%' },
  { name: 'Genomics', current: 28, previous: 22, trend: '+27.3%' },
];

const regionData = [
  { region: 'North America', amount: 380 },
  { region: 'Europe', amount: 240 },
  { region: 'Asia Pacific', amount: 320 },
  { region: 'Middle East', amount: 180 },
  { region: 'Latin America', amount: 120 },
];

// Stage data
const stageData = [
  { stage: 'Seed', y2022: 120, y2023: 180 },
  { stage: 'Series A', y2022: 220, y2023: 280 },
  { stage: 'Series B', y2022: 180, y2023: 240 },
  { stage: 'Series C', y2022: 150, y2023: 120 },
  { stage: 'Late Stage', y2022: 80, y2023: 90 },
];

// Colors
const COLORS = ['#00814A', '#C3A86B', '#006B3E', '#A38A56', '#E8F5F0'];

export default function InvestmentTrendsPage() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Investment Trends</h1>
        <p className="text-muted-foreground">
          Analysis of healthcare investment patterns and emerging trends
        </p>
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-moh-lightGreen/20 text-moh-darkGreen border-moh-green/20 py-1.5">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Last Updated: May 12, 2023
          </Badge>
          <Badge variant="outline" className="bg-moh-lightGold/20 text-moh-darkGold border-moh-gold/20 py-1.5">
            <TrendingUp className="h-3.5 w-3.5 mr-1" />
            Overall Trend: Positive
          </Badge>
        </div>
        
        <Button variant="outline" className="border-moh-green/30 text-moh-green hover:bg-moh-lightGreen">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>
      
      {/* Quarterly Investment Trends */}
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-moh-green/10 overflow-hidden shadow-md">
          <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
            <CardTitle className="text-xl font-playfair text-moh-darkGreen flex items-center">
              <LineChart className="h-5 w-5 mr-2 text-moh-green" />
              Quarterly Investment Volume
            </CardTitle>
            <CardDescription>Funding amount and deal count over time</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart
                  data={quarterlyInvestment}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis dataKey="quarter" />
                  <YAxis yAxisId="left" orientation="left" stroke="#00814A" />
                  <YAxis yAxisId="right" orientation="right" stroke="#C3A86B" />
                  <Tooltip contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }} />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#00814A" 
                    name="Investment Amount ($M)" 
                    strokeWidth={3}
                    dot={{ r: 4, stroke: '#00814A', fill: 'white' }}
                    activeDot={{ r: 6, stroke: '#00814A', strokeWidth: 2, fill: '#00814A' }}
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="count" 
                    stroke="#C3A86B" 
                    name="Deal Count" 
                    strokeWidth={3}
                    dot={{ r: 4, stroke: '#C3A86B', fill: 'white' }}
                    activeDot={{ r: 6, stroke: '#C3A86B', strokeWidth: 2, fill: '#C3A86B' }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-moh-lightGreen/10 p-4 rounded-lg border border-moh-green/10">
                <div className="text-sm text-muted-foreground">YTD Investment</div>
                <div className="text-2xl font-bold text-moh-darkGreen mt-1">$1.1B</div>
                <div className="text-sm text-moh-green flex items-center mt-1">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  +24% from previous year
                </div>
              </div>
              
              <div className="bg-moh-lightGold/10 p-4 rounded-lg border border-moh-gold/10">
                <div className="text-sm text-muted-foreground">Average Deal Size</div>
                <div className="text-2xl font-bold text-moh-darkGreen mt-1">$14.7M</div>
                <div className="text-sm text-moh-gold flex items-center mt-1">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  +8.3% from previous year
                </div>
              </div>
              
              <div className="bg-moh-lightGreen/10 p-4 rounded-lg border border-moh-green/10">
                <div className="text-sm text-muted-foreground">YTD Deal Count</div>
                <div className="text-2xl font-bold text-moh-darkGreen mt-1">73</div>
                <div className="text-sm text-moh-green flex items-center mt-1">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  +15% from previous year
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Sector & Regional Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <Card className="border-moh-green/10 overflow-hidden shadow-md h-full">
            <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
              <CardTitle className="text-lg font-playfair text-moh-darkGreen">Sector Growth Analysis</CardTitle>
              <CardDescription>Year-over-year comparison by sector</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {sectorTrends.map((sector, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">{sector.name}</span>
                      <Badge className={sector.trend.startsWith('+') ? 'bg-moh-green' : 'bg-red-500'}>
                        {sector.trend}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-moh-green to-moh-darkGreen"
                        style={{ width: `${(sector.current / Math.max(...sectorTrends.map(s => s.current))) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {sector.previous}M → {sector.current}M
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div 
          variants={fadeInUp} 
          initial="hidden" 
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <Card className="border-moh-green/10 overflow-hidden shadow-md h-full">
            <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
              <CardTitle className="text-lg font-playfair text-moh-darkGreen">Regional Distribution</CardTitle>
              <CardDescription>Investment allocation by region</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={regionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis dataKey="region" type="category" width={100} />
                    <Tooltip 
                      formatter={(value) => [`$${value}M`, 'Investment']}
                      contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }}
                    />
                    <Bar dataKey="amount" name="Investment ($M)" radius={[0, 4, 4, 0]}>
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Investment Stage Comparison */}
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.4 }}
      >
        <Card className="border-moh-green/10 overflow-hidden shadow-md">
          <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
            <CardTitle className="text-xl font-playfair text-moh-darkGreen flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-moh-green" />
              Investment by Stage
            </CardTitle>
            <CardDescription>Comparison between 2022 and 2023</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stageData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }} />
                  <Legend />
                  <Bar dataKey="y2022" name="2022" fill="#C3A86B" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="y2023" name="2023" fill="#00814A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-lg text-moh-darkGreen">Key Observations</h3>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
                <li>Series A investments show the strongest year-over-year growth at 27%</li>
                <li>Seed funding increased by 50%, indicating strong early-stage investment activity</li>
                <li>Series C investments decreased by 20%, suggesting a shift toward earlier-stage companies</li>
                <li>Overall investment volume increased across most stages, with total funding up 24%</li>
              </ul>
              
              <Button variant="outline" className="mt-4 border-moh-green/30 text-moh-green hover:bg-moh-lightGreen">
                View Complete Analysis
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
