
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ParallaxCard } from "@/components/animations/ParallaxCard";
import { getCategoryColor } from "./utils";
import { Innovation } from "./types";

interface InnovationCardProps {
  innovation: Innovation;
}

export const InnovationCard = ({ innovation }: InnovationCardProps) => {
  return (
    <ParallaxCard 
      className="h-full"
      dataValue={innovation.trl * 10}
      priority={innovation.featured ? 'high' : 'medium'}
    >
      <Card className="overflow-hidden h-full border-none shadow-md">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={innovation.image} 
            alt={innovation.title}
            className="w-full h-full object-cover"
          />
          {innovation.featured && (
            <div className="absolute top-3 right-3 bg-moh-gold/90 text-white px-2 py-1 rounded-md text-sm font-medium flex items-center">
              <Star className="h-3 w-3 mr-1 fill-white" />
              Featured
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <Badge className={`${getCategoryColor(innovation.category)}`}>
              {innovation.category}
            </Badge>
          </div>
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 text-moh-darkGreen">
            {innovation.title}
          </h3>
          <div className="flex items-center mb-3 gap-2">
            <span className="text-sm text-gray-500">TRL Level:</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${
                  innovation.trl > 6 ? 'bg-moh-green' : 
                  innovation.trl > 3 ? 'bg-moh-gold' : 
                  'bg-orange-400'
                }`}
                style={{ width: `${(innovation.trl / 9) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium">{innovation.trl}/9</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-3">
            {innovation.summary}
          </p>
          <Button 
            variant="outline"
            className="mt-4 w-full border-moh-lightGreen text-moh-green hover:bg-moh-lightGreen/20"
          >
            View Details
          </Button>
        </CardContent>
      </Card>
    </ParallaxCard>
  );
};
