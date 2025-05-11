
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { FundingRoundCard, type FundingRound } from "./FundingRoundCard";

interface FundingRoundsTabProps {
  fundingRounds: FundingRound[];
}

export function FundingRoundsTab({ fundingRounds }: FundingRoundsTabProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fundingRounds.map((round, index) => (
          <FundingRoundCard key={round.id} round={round} index={index} />
        ))}
      </div>
      
      <div className="text-center mt-10">
        <Button 
          className="bg-moh-green hover:bg-moh-darkGreen"
          size="lg"
          asChild
        >
          <Link to="/dashboard/investment">
            View All Funding Opportunities
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
