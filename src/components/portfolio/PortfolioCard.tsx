
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ArrowUpRight, TrendingUp } from "lucide-react";

// Define motion animation variants
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

interface Investment {
  id: number;
  name: string;
  logo: string;
  sector: string;
  stage: string;
  investmentAmount: string;
  roi: string;
  date: string;
  trend: string;
  status: string;
}

interface PortfolioCardProps {
  investment: Investment;
}

export function PortfolioCard({ investment }: PortfolioCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="border-moh-green/10 overflow-hidden hover:shadow-md transition-shadow">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-moh-green/10">
                <AvatarImage src={investment.logo} alt={investment.name} />
                <AvatarFallback className="bg-moh-lightGreen text-moh-darkGreen">
                  {investment.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-base">{investment.name}</CardTitle>
                <div className="flex gap-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className="text-xs border-moh-green/20 bg-moh-lightGreen/10"
                  >
                    {investment.sector}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-xs border-moh-gold/20 bg-moh-lightGold/10"
                  >
                    {investment.stage}
                  </Badge>
                </div>
              </div>
            </div>
            {investment.status === "active" && (
              <Star size={16} className="text-moh-gold fill-moh-gold" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-muted-foreground">Investment</div>
              <div className="font-medium">{investment.investmentAmount}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Date</div>
              <div className="font-medium">{investment.date}</div>
            </div>
            <div>
              <div className="text-muted-foreground">ROI</div>
              <div className={`font-medium flex items-center ${
                investment.roi.startsWith("+") ? "text-green-600" : 
                investment.roi.startsWith("-") ? "text-red-500" : ""
              }`}>
                {investment.roi}
                {investment.trend === "up" && <TrendingUp size={14} className="ml-1 text-green-600" />}
                {investment.trend === "down" && <TrendingUp size={14} className="ml-1 text-red-500 rotate-180" />}
              </div>
            </div>
            <div>
              <div className="text-muted-foreground">Status</div>
              <div className="font-medium capitalize">{investment.status}</div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button variant="ghost" className="w-full hover:bg-moh-lightGreen/30 hover:text-moh-darkGreen">
            View Details
            <ArrowUpRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
