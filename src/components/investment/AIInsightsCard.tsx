
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { LightbulbIcon } from "lucide-react";

interface AIInsightsCardProps {
  insights: string[];
  title?: string;
  icon?: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  textColor?: string;
}

export function AIInsightsCard({
  insights,
  title = "AI Insights",
  icon = <LightbulbIcon className="h-5 w-5 text-yellow-500" />,
  bgColor = "bg-yellow-50",
  borderColor = "border-yellow-200",
  textColor = "text-yellow-900"
}: AIInsightsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className={`${bgColor} ${borderColor} overflow-hidden shadow-sm`}>
        <CardHeader className="pb-2">
          <CardTitle className={`text-xl flex items-center gap-2 ${textColor}`}>
            {icon}
            {title}
            <Badge variant="outline" className="ml-2 font-normal text-xs">AI Generated</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                className="flex items-start gap-2"
              >
                <span className="flex-shrink-0 mt-1">•</span>
                <span className={`text-sm ${textColor}`}>{insight}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}
