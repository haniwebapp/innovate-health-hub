
import { FileUp, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface InnovationsHeroProps {
  showAIMatches: boolean;
  setShowAIMatches: (value: boolean) => void;
}

export default function InnovationsHero({ 
  showAIMatches, 
  setShowAIMatches 
}: InnovationsHeroProps) {
  return (
    <div className="bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGold relative py-12">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 bg-repeat"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-moh-darkGreen">
            Health Innovations Showcase
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Discover cutting-edge innovations transforming healthcare across Saudi Arabia
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="bg-moh-green hover:bg-moh-darkGreen text-white flex items-center gap-2 group"
            >
              <Link to="/innovations/submit">
                <FileUp size={18} />
                Submit Innovation
                <span className="hidden sm:inline ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20 flex items-center gap-2"
              onClick={() => setShowAIMatches(!showAIMatches)}
            >
              <Lightbulb size={18} className={showAIMatches ? "text-yellow-500" : ""} />
              {showAIMatches ? "Hide AI Matches" : "Show AI Matches"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
