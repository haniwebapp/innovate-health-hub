
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Globe, Mail, Building, Calendar, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Innovation, statusColors } from "@/types/innovations";

export default function InnovationDetailPage() {
  const { id } = useParams();
  const [innovation, setInnovation] = useState<Innovation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchInnovation = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockInnovation: Innovation = {
          id: id || "1",
          title: "AI-Powered Diabetes Management System",
          description: "An innovative solution that combines continuous glucose monitoring with AI to predict blood sugar fluctuations and recommend preventive actions.",
          longDescription: "This comprehensive platform integrates seamlessly with continuous glucose monitoring devices, collecting real-time data to build a personalized health profile. Our proprietary AI algorithms analyze this data alongside nutritional information, physical activity, and medical history to provide predictive insights about potential blood sugar fluctuations hours before they occur. The system sends timely alerts and personalized recommendations for diet adjustments, activity suggestions, or medication reminders, empowering patients to take proactive control of their health. Healthcare providers can access aggregated data through a dedicated portal, enabling more informed treatment decisions and remote patient monitoring capabilities.",
          imageUrl: "https://images.unsplash.com/photo-1576671081837-49000212a370",
          category: "Digital Health",
          tags: ["Artificial Intelligence", "Diabetes Care", "Remote Monitoring", "Preventive Health"],
          rating: 4.8,
          status: "Scaling",
          createdAt: "2022-05-15T09:24:00Z",
          organization: "MedTech Innovations Ltd",
          website: "https://example.com/diabetes-ai",
          contact: "contact@medtechinnovations.com"
        };
        
        setInnovation(mockInnovation);
        setIsLoading(false);
      }, 1000);
    };
    
    fetchInnovation();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Skeleton className="h-64 w-full mb-6" />
            <Skeleton className="h-8 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
          </div>
          <div>
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }
  
  if (!innovation) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Innovation not found</h2>
        <p className="mb-6">The innovation you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/innovations">Back to Innovations</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <Button 
          variant="outline" 
          className="mb-4 group"
          asChild
        >
          <Link to="/innovations" className="flex items-center">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Innovations
          </Link>
        </Button>
        
        <h1 className="text-3xl md:text-4xl font-bold text-moh-darkGreen mb-4">
          {innovation.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Badge variant="outline" className={`${statusColors[innovation.status]} px-3 py-1`}>
            {innovation.status}
          </Badge>
          <Badge variant="outline" className="bg-moh-lightGreen text-moh-darkGreen border-moh-green px-3 py-1">
            {innovation.category}
          </Badge>
          <div className="flex items-center text-yellow-500 ml-auto">
            <Star size={18} className="fill-current" />
            <span className="ml-1 font-medium">{innovation.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <img 
              src={innovation.imageUrl} 
              alt={innovation.title}
              className="w-full h-auto rounded-lg object-cover mb-6"
              style={{ maxHeight: "400px" }}
            />
            
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-4">Overview</h2>
              <p className="text-gray-700 mb-4">{innovation.description}</p>
              <p className="text-gray-700">{innovation.longDescription}</p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {innovation.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 bg-gray-100">
                  <Tag size={14} className="mr-1" /> {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Innovation Details</h3>
            
            {innovation.organization && (
              <div className="flex items-start mb-4">
                <Building className="w-5 h-5 text-moh-green mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Organization</p>
                  <p className="text-gray-600">{innovation.organization}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start mb-4">
              <Calendar className="w-5 h-5 text-moh-green mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <p className="font-medium">Added</p>
                <p className="text-gray-600">
                  {new Date(innovation.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
            
            {innovation.website && (
              <div className="flex items-start mb-4">
                <Globe className="w-5 h-5 text-moh-green mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Website</p>
                  <a 
                    href={innovation.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-moh-green hover:underline"
                  >
                    Visit website
                  </a>
                </div>
              </div>
            )}
            
            {innovation.contact && (
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-moh-green mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="font-medium">Contact</p>
                  <a 
                    href={`mailto:${innovation.contact}`}
                    className="text-moh-green hover:underline"
                  >
                    {innovation.contact}
                  </a>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 bg-moh-lightGreen border border-moh-green rounded-lg p-6">
            <div className="flex items-center mb-4">
              <User className="w-5 h-5 text-moh-green mr-3" />
              <h3 className="text-lg font-semibold text-moh-darkGreen">Interested in this innovation?</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Contact the innovation team to learn more about implementation, partnerships, or investment opportunities.
            </p>
            <Button className="w-full bg-moh-green hover:bg-moh-darkGreen" asChild>
              <Link to={`/innovations/${innovation.id}/contact`}>Request Information</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
