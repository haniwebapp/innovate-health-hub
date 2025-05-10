
import { useState } from "react";
import { Star, ArrowUpRight, Clock, Building, Globe, Mail, Users, Lightbulb, ChevronDown, ChevronUp, Scale } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Innovation, statusColors, categoryColors } from "@/types/innovations";
import { motion } from "framer-motion";

interface InnovationCardProps {
  innovation: Innovation;
  view: "grid" | "list";
}

export default function InnovationCard({ innovation, view }: InnovationCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Format date to be more readable
  const formattedDate = new Date(innovation.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Get appropriate category color, or default to a generic one
  const categoryClass = categoryColors[innovation.category] || "bg-moh-lightGreen text-moh-darkGreen border-moh-green/30";

  if (view === "grid") {
    return (
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white h-full flex flex-col group"
      >
        <div className="relative h-48">
          <img
            src={innovation.imageUrl}
            alt={innovation.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[innovation.status] || "bg-moh-lightGreen text-moh-darkGreen"}`}>
              {innovation.status}
            </span>
          </div>
          {innovation.aiMatchScore && (
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-moh-gold/80 to-moh-darkGold/80 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Lightbulb size={12} className="mr-1" />
              AI Match: {innovation.aiMatchScore}%
            </div>
          )}
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className={categoryClass}>
              {innovation.category}
            </Badge>
            <div className="flex items-center text-moh-gold">
              <Star size={16} className="fill-current" />
              <span className="ml-1 text-sm font-medium">{innovation.rating.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-moh-darkGreen mb-2">{innovation.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{innovation.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {innovation.tags.slice(0, 2).map(tag => (
              <Badge key={tag} variant="secondary" className="bg-moh-lightGreen/50 text-moh-darkGreen border border-moh-green/10">
                {tag}
              </Badge>
            ))}
            {innovation.tags.length > 2 && (
              <Badge variant="secondary" className="bg-moh-lightGreen/50 text-moh-darkGreen border border-moh-green/10">
                +{innovation.tags.length - 2}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-gray-500 text-xs">
              <Clock size={14} className="text-moh-green/60" />
              <span className="ml-1">{formattedDate}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-moh-green border-moh-green hover:bg-moh-lightGreen/30 group/btn"
              asChild
            >
              <Link to={`/innovations/${innovation.id}`}>
                View Details
                <ArrowUpRight size={14} className="ml-1 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div 
      initial={false}
      animate={{ height: expanded ? "auto" : "auto" }}
      className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col group"
    >
      <div className="md:flex">
        <div className="relative md:w-64 h-48 md:h-auto">
          <img
            src={innovation.imageUrl}
            alt={innovation.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[innovation.status] || "bg-moh-lightGreen text-moh-darkGreen"}`}>
              {innovation.status}
            </span>
          </div>
          {innovation.aiMatchScore && (
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-moh-gold/80 to-moh-darkGold/80 text-white px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <Lightbulb size={12} className="mr-1" />
              AI Match: {innovation.aiMatchScore}%
            </div>
          )}
        </div>
        <div className="p-5 flex-grow">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className={categoryClass}>
              {innovation.category}
            </Badge>
            <div className="flex items-center text-moh-gold">
              <Star size={16} className="fill-current" />
              <span className="ml-1 text-sm font-medium">{innovation.rating.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-moh-darkGreen mb-2">{innovation.title}</h3>
          <p className="text-gray-600 mb-4">
            {expanded ? innovation.description : `${innovation.description.substring(0, 150)}${innovation.description.length > 150 ? '...' : ''}`}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {innovation.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-moh-lightGreen/50 text-moh-darkGreen border border-moh-green/10">
                {tag}
              </Badge>
            ))}
          </div>
          
          {expanded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {innovation.organization && (
                <div className="flex items-center text-gray-700">
                  <Building size={16} className="mr-2 text-moh-green" />
                  <span>{innovation.organization}</span>
                </div>
              )}
              
              {innovation.website && (
                <div className="flex items-center text-gray-700">
                  <Globe size={16} className="mr-2 text-moh-green" />
                  <a href={innovation.website} target="_blank" rel="noopener noreferrer" className="text-moh-green hover:underline">
                    Website
                  </a>
                </div>
              )}
              
              {innovation.contact && (
                <div className="flex items-center text-gray-700">
                  <Mail size={16} className="mr-2 text-moh-green" />
                  <span>{innovation.contact}</span>
                </div>
              )}
              
              {innovation.impactMetrics && (
                <div className="flex items-center text-gray-700">
                  <Users size={16} className="mr-2 text-moh-green" />
                  <span>Potential Reach: {innovation.impactMetrics.potentialReach?.toLocaleString() || 'N/A'}</span>
                </div>
              )}
              
              {innovation.regulatoryStatus && (
                <div className="col-span-2 mt-2 border-t border-moh-green/10 pt-2">
                  <div className="flex items-center text-gray-700 font-medium mb-2">
                    <Scale size={16} className="mr-2 text-moh-green" />
                    <span>Regulatory Status: </span>
                    <Badge className={innovation.regulatoryStatus.compliant ? "bg-moh-lightGreen text-moh-darkGreen ml-2" : "bg-amber-100 text-amber-800 ml-2"}>
                      {innovation.regulatoryStatus.compliant ? "Compliant" : "In Progress"}
                    </Badge>
                  </div>
                  
                  {innovation.regulatoryStatus.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {innovation.regulatoryStatus.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="bg-white text-moh-darkGreen border-moh-green/30">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
          
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={16} className="text-moh-green/60" />
              <span className="ml-1">{formattedDate}</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setExpanded(!expanded)}
                className="border-moh-green/30 text-moh-darkGreen hover:bg-moh-lightGreen/20"
              >
                {expanded ? (
                  <>
                    <span>Show Less</span>
                    <ChevronUp size={16} className="ml-1" />
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <ChevronDown size={16} className="ml-1" />
                  </>
                )}
              </Button>
              
              <Button 
                className="bg-gradient-to-r from-moh-green to-moh-darkGreen hover:from-moh-darkGreen hover:to-moh-green text-white"
                asChild
              >
                <Link to={`/innovations/${innovation.id}`}>
                  View Details
                  <ArrowUpRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
