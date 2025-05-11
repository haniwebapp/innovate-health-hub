
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, TrendingUp, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { AIInsightsCard } from "@/components/investment/AIInsightsCard";
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

// Mock data for investment trends
const investmentTrendsData = [
  { month: 'Jan', funding: 120, deals: 18 },
  { month: 'Feb', funding: 145, deals: 20 },
  { month: 'Mar', funding: 190, deals: 25 },
  { month: 'Apr', funding: 210, deals: 28 },
  { month: 'May', funding: 230, deals: 30 },
  { month: 'Jun', funding: 250, deals: 32 },
  { month: 'Jul', funding: 270, deals: 35 },
  { month: 'Aug', funding: 290, deals: 38 },
];

// AI insights
const aiInsights = [
  "Healthcare AI startups saw a 45% increase in funding compared to the previous quarter.",
  "Early-stage investments (Seed & Series A) have grown by 23% year-over-year in digital health.",
  "Telehealth services continue to attract the most investment, with a 32% share of total healthcare funding."
];

export default function InvestmentTrendsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Investment Trends</h1>
        <p className="text-muted-foreground">
          Track healthcare investment trends and patterns over time
        </p>
      </div>

      <AIInsightsCard 
        insights={aiInsights} 
        title="AI Market Insights"
        icon={<TrendingUp className="h-5 w-5 text-moh-green" />}
        bgColor="bg-moh-lightGreen/20"
        borderColor="border-moh-green"
        textColor="text-moh-darkGreen"
      />

      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-moh-green/10 overflow-hidden shadow-md">
            <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
              <CardTitle className="text-xl font-playfair text-moh-darkGreen flex items-center">
                <LineChart className="h-5 w-5 mr-2 text-moh-green" />
                Healthcare Investment Trends (2023)
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-80 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={investmentTrendsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#00814A" />
                    <YAxis yAxisId="right" orientation="right" stroke="#C3A86B" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="funding" stroke="#00814A" activeDot={{ r: 8 }} name="Funding (in $M)" />
                    <Line yAxisId="right" type="monotone" dataKey="deals" stroke="#C3A86B" name="Number of Deals" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="bg-moh-lightGreen/20 p-4 rounded-lg border border-moh-green/10">
                  <div className="text-sm text-muted-foreground">Total Funding</div>
                  <div className="text-2xl font-bold text-moh-darkGreen mt-1">$1.71B</div>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>22% vs last year</span>
                  </div>
                </div>
                
                <div className="bg-moh-lightGold/20 p-4 rounded-lg border border-moh-gold/10">
                  <div className="text-sm text-muted-foreground">Number of Deals</div>
                  <div className="text-2xl font-bold text-moh-darkGreen mt-1">226</div>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>15% vs last year</span>
                  </div>
                </div>

                <div className="bg-moh-lightGreen/20 p-4 rounded-lg border border-moh-green/10">
                  <div className="text-sm text-muted-foreground">Avg. Deal Size</div>
                  <div className="text-2xl font-bold text-moh-darkGreen mt-1">$7.5M</div>
                  <div className="flex items-center mt-2 text-green-600 text-sm">
                    <ArrowUpRight size={16} className="mr-1" />
                    <span>8% vs last year</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
