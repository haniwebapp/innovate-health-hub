
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Building, Globe, Info, MapPin, Star, MessageSquare, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface InvestorMatchCardProps {
  investor: {
    id: string;
    name: string;
    logo?: string;
    location: string;
    matchScore: number;
    focusAreas: string[];
    stage: string;
    minInvestment: number;
    maxInvestment: number;
    recentInvestments?: number;
    portfolioCompanies?: number;
    verified: boolean;
    description: string;
  };
  onContactRequest?: (investorId: string) => void;
  onSaveInvestor?: (investorId: string) => void;
}

export function InvestorMatchCard({ investor, onContactRequest, onSaveInvestor }: InvestorMatchCardProps) {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };
  
  // Get match score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-slate-600";
  };
  
  // Get score indicator class
  const getScoreIndicatorClass = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-slate-500";
  };
  
  const handleSaveInvestor = () => {
    setIsSaved(!isSaved);
    if (onSaveInvestor) {
      onSaveInvestor(investor.id);
    }
    
    toast({
      title: isSaved ? "Investor removed" : "Investor saved",
      description: isSaved 
        ? "This investor has been removed from your saved list" 
        : "This investor has been added to your saved list",
    });
  };
  
  const handleContactRequest = () => {
    if (onContactRequest) {
      onContactRequest(investor.id);
    }
    
    toast({
      title: "Contact request sent",
      description: `Your request to connect with ${investor.name} has been sent.`,
    });
  };
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
              {investor.logo ? (
                <img src={investor.logo} alt={investor.name} className="w-full h-full object-cover" />
              ) : (
                <Building className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <CardTitle className="text-lg">{investor.name}</CardTitle>
                {investor.verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <BadgeCheck className="h-4 w-4 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Verified Investor</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardDescription className="flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                {investor.location}
              </CardDescription>
            </div>
          </div>
          
          <div className="text-center">
            <div className={cn("text-2xl font-semibold", getScoreColor(investor.matchScore))}>
              {investor.matchScore}%
            </div>
            <div className="text-xs text-muted-foreground">Match</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-1 mb-3">
          {investor.focusAreas.map((area, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {area}
            </Badge>
          ))}
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {investor.stage}
          </Badge>
        </div>
        
        <div className="text-sm space-y-2">
          <div>
            <span className="text-muted-foreground">Investment range: </span>
            <span className="font-medium">{formatCurrency(investor.minInvestment)} - {formatCurrency(investor.maxInvestment)}</span>
          </div>
          
          {(investor.portfolioCompanies || investor.recentInvestments) && (
            <div className="flex gap-4">
              {investor.portfolioCompanies && (
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="text-xs">{investor.portfolioCompanies} portfolio companies</span>
                </div>
              )}
              {investor.recentInvestments && (
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 text-muted-foreground" />
                  <span className="text-xs">{investor.recentInvestments} investments this year</span>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-3">
            <div className="flex justify-between items-center text-xs mb-1">
              <span>AI Match Score</span>
              <span className={getScoreColor(investor.matchScore)}>{investor.matchScore}% match with your innovation</span>
            </div>
            <Progress 
              value={investor.matchScore} 
              className="h-1.5" 
              indicatorClassName={getScoreIndicatorClass(investor.matchScore)}
            />
          </div>
        </div>
        
        {showDetails && (
          <div className="mt-4 pt-3 border-t text-sm">
            <p className="text-gray-700">{investor.description}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Less Info" : "More Info"}
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveInvestor}
            className={isSaved ? "bg-blue-50 text-blue-700 border-blue-200" : ""}
          >
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Button size="sm" onClick={handleContactRequest}>
            <MessageSquare className="h-3 w-3 mr-1" />
            Connect
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
