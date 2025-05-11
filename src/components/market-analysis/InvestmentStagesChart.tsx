
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';

interface InvestmentStage {
  stage: string;
  percentage: number;
}

interface InvestmentStagesChartProps {
  investmentStageData: InvestmentStage[];
  colors: string[];
}

export function InvestmentStagesChart({ investmentStageData, colors }: InvestmentStagesChartProps) {
  return (
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
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
  );
}
