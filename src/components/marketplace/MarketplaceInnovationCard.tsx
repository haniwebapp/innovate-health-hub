
import { Innovation } from "@/types/innovations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowUpRight, ShieldCheck, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TRLBadge from "@/components/marketplace/TRLBadge";

interface MarketplaceInnovationCardProps {
  innovation: Innovation;
  viewMode: "grid" | "list";
}

export default function MarketplaceInnovationCard({ innovation, viewMode }: MarketplaceInnovationCardProps) {
  // Function to get IP status badge color
  const getIpStatusColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch (status) {
      case "patent_granted":
        return "bg-green-100 text-green-800 border-green-300";
      case "patent_pending":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "patent_in_preparation":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "trade_secret":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "copyright":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  
  // Function to get IP status label
  const getIpStatusLabel = (status?: string) => {
    if (!status) return "Unprotected";
    
    switch (status) {
      case "patent_granted":
        return "Patent Granted";
      case "patent_pending":
        return "Patent Pending";
      case "patent_in_preparation":
        return "Patent in Prep";
      case "trade_secret":
        return "Trade Secret";
      case "copyright":
        return "Copyright";
      default:
        return "Not Protected";
    }
  };
  
  // Function to get licensing badge color
  const getLicensingColor = (status?: string) => {
    if (!status) return "bg-gray-100 text-gray-800";
    
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 border-green-300";
      case "exclusive":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "non_exclusive":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "negotiating":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "licensed":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };
  
  // Function to get licensing label
  const getLicensingLabel = (status?: string) => {
    if (!status) return "Not Available";
    
    switch (status) {
      case "available":
        return "Available for License";
      case "exclusive":
        return "Exclusive License";
      case "non_exclusive":
        return "Non-exclusive License";
      case "negotiating":
        return "In Negotiations";
      case "licensed":
        return "Already Licensed";
      default:
        return "Not Available";
    }
  };
  
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-shadow">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-auto relative">
            <img 
              src={innovation.imageUrl || "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=60"} 
              alt={innovation.title}
              className="w-full h-full object-cover"
            />
            {innovation.trl && (
              <div className="absolute bottom-2 left-2">
                <TRLBadge trl={innovation.trl} />
              </div>
            )}
          </div>
          
          <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-start justify-between gap-2 mb-2">
              <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen">
                {innovation.category}
              </Badge>
              
              <div className="flex gap-1">
                {innovation.ipStatus && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className={`${getIpStatusColor(innovation.ipStatus)} flex items-center`}>
                          <ShieldCheck className="h-3 w-3 mr-1" />
                          {getIpStatusLabel(innovation.ipStatus)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Intellectual Property Status</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                
                {innovation.licensingStatus && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className={`${getLicensingColor(innovation.licensingStatus)} flex items-center`}>
                          <FileText className="h-3 w-3 mr-1" />
                          {getLicensingLabel(innovation.licensingStatus)}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Licensing Status</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-medium mb-2">{innovation.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">{innovation.description}</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {innovation.tags && innovation.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">{tag}</Badge>
              ))}
              {innovation.tags && innovation.tags.length > 3 && (
                <Badge variant="secondary" className="bg-gray-100 text-gray-700">+{innovation.tags.length - 3}</Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-auto">
              <div className="text-sm text-gray-500">
                {innovation.organization || "Unknown Organization"}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/marketplace/innovations/${innovation.id}`}>
                    Details
                  </Link>
                </Button>
                
                {innovation.licensingStatus && innovation.licensingStatus !== "licensed" && (
                  <Button size="sm" className="bg-moh-green hover:bg-moh-darkGreen" asChild>
                    <Link to={`/marketplace/innovations/${innovation.id}/license`}>
                      License Info <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  // Grid view
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="h-48 relative">
        <img 
          src={innovation.imageUrl || "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=500&auto=format&fit=crop&q=60"} 
          alt={innovation.title}
          className="w-full h-full object-cover"
        />
        {innovation.trl && (
          <div className="absolute bottom-2 left-2">
            <TRLBadge trl={innovation.trl} />
          </div>
        )}
      </div>
      
      <CardContent className="p-5 flex-grow">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen">
            {innovation.category}
          </Badge>
          
          {innovation.ipStatus && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className={`${getIpStatusColor(innovation.ipStatus)} flex items-center`}>
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    {getIpStatusLabel(innovation.ipStatus)}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Intellectual Property Status</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <h3 className="text-xl font-medium mb-2">{innovation.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{innovation.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {innovation.tags && innovation.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700">{tag}</Badge>
          ))}
          {innovation.tags && innovation.tags.length > 2 && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-700">+{innovation.tags.length - 2}</Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 mt-auto flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {innovation.organization || "Unknown Organization"}
        </span>
        
        {innovation.licensingStatus && (
          <Badge variant="outline" className={getLicensingColor(innovation.licensingStatus)}>
            {getLicensingLabel(innovation.licensingStatus)}
          </Badge>
        )}
      </CardFooter>
      
      <div className="p-4 pt-0 border-t flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to={`/marketplace/innovations/${innovation.id}`}>
            Details
          </Link>
        </Button>
        
        {innovation.licensingStatus && innovation.licensingStatus !== "licensed" && (
          <Button size="sm" className="bg-moh-green hover:bg-moh-darkGreen flex-1" asChild>
            <Link to={`/marketplace/innovations/${innovation.id}/license`}>
              License
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
}
