
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface MarketTrend {
  month: string;
  healthtech: number;
  biotech: number;
  pharma: number;
}

interface MarketTrendsChartProps {
  marketTrendsData: MarketTrend[];
}

export function MarketTrendsChart({ marketTrendsData }: MarketTrendsChartProps) {
  return (
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
  );
}
