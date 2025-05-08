
import { Star, ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Innovation {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  rating: number;
  status: "New" | "Validated" | "Scaling" | "Established";
  createdAt: string;
}

interface InnovationCardProps {
  innovation: Innovation;
  view: "grid" | "list";
}

// Status badge color mapping
const statusColors: Record<string, string> = {
  "New": "bg-blue-100 text-blue-800",
  "Validated": "bg-green-100 text-green-800",
  "Scaling": "bg-purple-100 text-purple-800",
  "Established": "bg-gray-100 text-gray-800"
};

export default function InnovationCard({ innovation, view }: InnovationCardProps) {
  if (view === "grid") {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white h-full flex flex-col">
        <div className="relative h-48">
          <img
            src={innovation.imageUrl}
            alt={innovation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[innovation.status]}`}>
              {innovation.status}
            </span>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-3">
            <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen border-moh-green">
              {innovation.category}
            </Badge>
            <div className="flex items-center text-yellow-500">
              <Star size={16} className="fill-current" />
              <span className="ml-1 text-sm font-medium">{innovation.rating.toFixed(1)}</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-moh-darkGreen mb-2">{innovation.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{innovation.description}</p>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center text-gray-500 text-xs">
              <Clock size={14} />
              <span className="ml-1">
                {new Date(innovation.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <Button variant="outline" size="sm" className="text-moh-green border-moh-green hover:bg-moh-lightGreen group">
              View Details
              <ArrowUpRight size={14} className="ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col md:flex-row">
      <div className="relative md:w-64 h-48 md:h-auto">
        <img
          src={innovation.imageUrl}
          alt={innovation.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusColors[innovation.status]}`}>
            {innovation.status}
          </span>
        </div>
      </div>
      <div className="p-5 flex-grow">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen border-moh-green">
            {innovation.category}
          </Badge>
          <div className="flex items-center text-yellow-500">
            <Star size={16} className="fill-current" />
            <span className="ml-1 text-sm font-medium">{innovation.rating.toFixed(1)}</span>
          </div>
        </div>
        <h3 className="text-xl font-semibold text-moh-darkGreen mb-2">{innovation.title}</h3>
        <p className="text-gray-600 mb-4">{innovation.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {innovation.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-700">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} />
            <span className="ml-1">
              {new Date(innovation.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          </div>
          <Button className="bg-moh-green hover:bg-moh-darkGreen text-white">
            View Details
            <ArrowUpRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
