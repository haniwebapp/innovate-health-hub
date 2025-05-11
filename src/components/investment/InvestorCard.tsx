
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, DollarSign, Clock, Users, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface Investor {
  id: string;
  name: string;
  focus: string[];
  stage: string[];
  totalInvested: string;
  description: string;
  logo: string;
  deals: number;
}

interface InvestorCardProps {
  investor: Investor;
  index: number;
}

export function InvestorCard({ investor, index }: InvestorCardProps) {
  return (
    <motion.div 
      key={investor.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="h-16 w-16 bg-moh-lightGreen rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <img src={investor.logo} alt={investor.name} className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-moh-darkGreen">{investor.name}</h3>
              <p className="text-sm text-gray-500">Active Healthcare Investor</p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{investor.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Target className="h-4 w-4 mr-2 text-moh-green" />
              <span className="font-medium">Focus:</span> 
              <span className="ml-1">{investor.focus.join(", ")}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-moh-green" />
              <span className="font-medium">Total Invested:</span>
              <span className="ml-1">{investor.totalInvested}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-moh-green" />
              <span className="font-medium">Stage:</span>
              <span className="ml-1">{investor.stage.join(", ")}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2 text-moh-green" />
              <span className="font-medium">Deals:</span>
              <span className="ml-1">{investor.deals} completed</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {investor.focus.map((area, i) => (
              <span 
                key={i} 
                className="text-xs bg-moh-lightGreen text-moh-darkGreen px-2 py-1 rounded"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto p-4 bg-moh-lightGreen border-t">
          <Button 
            className="w-full bg-moh-green hover:bg-moh-darkGreen"
            asChild
          >
            <Link to={`/dashboard/investment?investor=${investor.id}`} className="flex items-center justify-center">
              View Investor Profile
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
