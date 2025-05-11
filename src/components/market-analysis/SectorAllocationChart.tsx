
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";
import { Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, Cell } from 'recharts';

interface SectorAllocation {
  name: string;
  value: number;
}

interface SectorAllocationChartProps {
  sectorAllocationData: SectorAllocation[];
  colors: string[];
}

export function SectorAllocationChart({ sectorAllocationData, colors }: SectorAllocationChartProps) {
  return (
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
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
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
                        style={{backgroundColor: colors[index % colors.length]}}
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
  );
}
