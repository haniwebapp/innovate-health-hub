
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Building, Briefcase, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data for investor types
const investorTypes = [
  { 
    type: 'Government Funds', 
    percentage: 40, 
    amount: '$320M', 
    change: '+15%', 
    increasing: true,
    icon: Shield,
    color: '#00814A' 
  },
  { 
    type: 'Venture Capital', 
    percentage: 25, 
    amount: '$200M',
    change: '+8%', 
    increasing: true,
    icon: Briefcase,
    color: '#C3A86B'
  },
  { 
    type: 'Corporate Investors', 
    percentage: 20, 
    amount: '$160M', 
    change: '+5%', 
    increasing: true,
    icon: Building,
    color: '#006B3E'
  },
  { 
    type: 'Angel Investors', 
    percentage: 10, 
    amount: '$80M', 
    change: '-3%',
    increasing: false,
    icon: Users,
    color: '#A38A56'
  },
  { 
    type: 'Crowdfunding', 
    percentage: 5, 
    amount: '$40M', 
    change: '+20%', 
    increasing: true,
    icon: DollarSign,
    color: '#80C18E'
  },
];

export function InvestorTypeAnalysis() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 text-moh-green mr-2" />
          Investor Type Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investorTypes.map((investor, index) => (
            <motion.div 
              key={investor.type}
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full mr-2" style={{ backgroundColor: `${investor.color}20` }}>
                    <investor.icon className="h-4 w-4" style={{ color: investor.color }} />
                  </div>
                  <span className="font-medium text-sm">{investor.type}</span>
                </div>
                <div className="text-sm font-bold" style={{ color: investor.color }}>
                  {investor.amount}
                </div>
              </div>
              
              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{ backgroundColor: investor.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${investor.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>{investor.percentage}% of total investment</span>
                <span className={investor.increasing ? "text-green-600" : "text-red-600"}>
                  {investor.change} from last year
                </span>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-moh-lightGreen/20 rounded-lg border border-moh-green/10">
          <h4 className="text-sm font-medium text-moh-darkGreen mb-2">Key Insights</h4>
          <ul className="text-xs text-moh-darkGreen/80 space-y-1">
            <li className="flex items-start">
              <span className="rounded-full bg-moh-green h-1.5 w-1.5 mt-1.5 mr-2 flex-shrink-0"></span>
              Government funds represent the largest portion of healthcare investment (40%)
            </li>
            <li className="flex items-start">
              <span className="rounded-full bg-moh-green h-1.5 w-1.5 mt-1.5 mr-2 flex-shrink-0"></span>
              Crowdfunding shows the highest growth rate (+20%) albeit from a smaller base
            </li>
            <li className="flex items-start">
              <span className="rounded-full bg-moh-green h-1.5 w-1.5 mt-1.5 mr-2 flex-shrink-0"></span>
              Angel investment is the only category showing a decline (-3%) year-over-year
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
