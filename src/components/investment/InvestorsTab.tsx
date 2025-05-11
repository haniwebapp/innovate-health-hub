
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InvestorCard, type Investor } from "./InvestorCard";

interface InvestorsTabProps {
  investors: Investor[];
}

export function InvestorsTab({ investors }: InvestorsTabProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investors.map((investor, index) => (
          <InvestorCard key={investor.id} investor={investor} index={index} />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Button 
          className="bg-moh-green hover:bg-moh-darkGreen"
          size="lg"
          asChild
        >
          <Link to="/dashboard/investment">
            Browse All Investors
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
