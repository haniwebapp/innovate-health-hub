
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Target, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export interface FundingRound {
  id: string;
  name: string;
  type: string;
  amount: string;
  deadline: string;
  daysLeft: number;
  status: string;
  categories: string[];
  description: string;
  organization: string;
  logo: string;
}

interface FundingRoundCardProps {
  round: FundingRound;
  index: number;
}

export function FundingRoundCard({ round, index }: FundingRoundCardProps) {
  return (
    <motion.div
      key={round.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              {round.status === "open" ? (
                <Badge className="bg-moh-green mb-3">Open</Badge>
              ) : (
                <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen mb-3">Upcoming</Badge>
              )}
              <h3 className="font-semibold text-lg text-moh-darkGreen">{round.name}</h3>
            </div>
            <div className="flex-shrink-0 h-12 w-12 bg-moh-lightGreen rounded-full flex items-center justify-center overflow-hidden">
              <img src={round.logo} alt={round.organization} className="h-full w-full object-cover" />
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{round.description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-moh-green" />
              <span className="font-medium text-moh-darkGreen">{round.amount}</span>
              <span className="mx-2">•</span>
              <span>{round.type}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-moh-green" />
              <span>Deadline: {round.deadline}</span>
              <span className="ml-2 text-xs bg-moh-lightGreen text-moh-darkGreen px-2 py-0.5 rounded-full">
                {round.daysLeft} days left
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Target className="h-4 w-4 mr-2 text-moh-green" />
              {round.categories.join(", ")}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {round.categories.map((category, i) => (
              <span 
                key={i} 
                className="text-xs bg-moh-lightGreen text-moh-darkGreen px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto p-4 bg-moh-lightGreen border-t">
          {round.status === "open" ? (
            <Button 
              className="w-full bg-moh-green hover:bg-moh-darkGreen"
              asChild
            >
              <Link to={`/dashboard/investment?program=${round.id}`} className="flex items-center justify-center">
                Apply Now
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          ) : (
            <Button 
              className="w-full border-moh-green/30 text-moh-green bg-white hover:bg-moh-lightGreen"
              variant="outline"
              asChild
            >
              <Link to={`/dashboard/investment?program=${round.id}`}>
                Set Reminder
              </Link>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
