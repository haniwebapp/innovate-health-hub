
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Innovation, statusColors } from "@/types/innovations";
import {
  Calendar,
  Star,
  Award,
  User,
  Building,
  Globe,
  FileText,
  Share2,
  MessageCircle,
  Bookmark,
  ChevronLeft,
} from "lucide-react";

// Mock innovation data (in a real app, this would come from an API)
const mockInnovations: Record<string, Innovation> = {
  "1": {
    id: "1",
    title: "AI-Powered Diagnostic Assistant",
    description: "Machine learning tool that helps doctors diagnose complex conditions with higher accuracy.",
    longDescription: "This AI-powered diagnostic assistant uses advanced machine learning algorithms trained on millions of medical records to assist healthcare providers in diagnosing complex conditions. The system continuously learns from new data and provides evidence-based recommendations with confidence scores. It supports integration with existing electronic health record systems and has been validated in multiple clinical trials across Saudi Arabia's leading hospitals with a diagnostic accuracy improvement of 23% compared to conventional methods.",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Digital Health",
    tags: ["AI", "Diagnostics", "Machine Learning", "Clinical Decision Support", "Healthcare IT"],
    rating: 4.8,
    status: "Validated",
    createdAt: "2024-04-15",
    organization: "MediTech Solutions",
    website: "www.meditechsolutions.sa",
    contact: "info@meditechsolutions.sa"
  },
  "2": {
    id: "2",
    title: "Remote Patient Monitoring Platform",
    description: "Comprehensive system for monitoring patients at home with real-time data transmission to healthcare providers.",
    longDescription: "Our remote patient monitoring platform allows healthcare providers to continuously monitor patients with chronic conditions from their homes. The system includes a set of medical-grade IoT devices that measure vital signs, medication adherence, and other health metrics. Data is securely transmitted in real-time to healthcare providers, who can respond promptly to concerning changes. The platform includes an AI-powered alert system that prioritizes patients who need immediate attention, significantly reducing hospital readmissions for chronic disease patients in pilot programs.",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    category: "Telehealth",
    tags: ["Remote Care", "IoT", "Patient Monitoring", "Chronic Disease Management"],
    rating: 4.5,
    status: "Scaling",
    createdAt: "2024-02-20",
    organization: "HealthConnect Arabia",
    website: "www.healthconnect.sa",
    contact: "partnerships@healthconnect.sa"
  }
};

export default function InnovationDetailPage() {
  const { id } = useParams();
  const [innovation, setInnovation] = useState<Innovation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, fetch from API
    setLoading(true);
    
    setTimeout(() => {
      if (id && mockInnovations[id]) {
        setInnovation(mockInnovations[id]);
        setLoading(false);
      } else {
        setError("Innovation not found");
        setLoading(false);
      }
    }, 500); // Simulate API loading
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="animate-pulse text-xl text-moh-green">Loading...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !innovation) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-16">
              <h1 className="text-3xl font-bold text-moh-darkGreen mb-4">{error || "Innovation not found"}</h1>
              <p className="mb-8 text-gray-600">The innovation you're looking for doesn't exist or has been removed.</p>
              <Button
                onClick={() => window.history.back()}
                className="bg-moh-green hover:bg-moh-darkGreen text-white"
              >
                <ChevronLeft size={16} className="mr-2" />
                Back to Innovations
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero section */}
        <div className="relative h-64 md:h-96 bg-gray-300 overflow-hidden">
          <img
            src={innovation.imageUrl}
            alt={innovation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Button
                component={Link}
                to="/innovations"
                variant="outline"
                className="mb-4 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to Innovations
              </Button>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{innovation.title}</h1>
              <div className="flex items-center flex-wrap gap-3">
                <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-moh-darkGreen border-transparent">
                  {innovation.category}
                </Badge>
                <span className={`px-3 py-1 rounded-md text-sm font-medium ${statusColors[innovation.status]}`}>
                  {innovation.status}
                </span>
                <div className="flex items-center text-yellow-400 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-md">
                  <Star size={16} className="fill-current" />
                  <span className="ml-1 text-sm font-medium text-white">{innovation.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Content section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="prose prose-lg max-w-none mb-8">
                  <h2 className="text-2xl font-semibold text-moh-darkGreen mb-4">Overview</h2>
                  <p className="text-gray-700">{innovation.longDescription || innovation.description}</p>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-moh-darkGreen mb-4">Innovation Details</h2>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-moh-green mb-4">Key Features</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Advanced machine learning algorithms</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Integration with existing EHR systems</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Evidence-based recommendations</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Continuous learning from new data</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-moh-green mb-4">Benefits</h3>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Improved diagnostic accuracy by 23%</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Reduced diagnostic time by 45%</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Lower healthcare costs</span>
                          </li>
                          <li className="flex items-start">
                            <div className="mr-2 mt-1 w-5 h-5 bg-moh-lightGreen rounded-full flex items-center justify-center">
                              <span className="text-moh-green text-xs">✓</span>
                            </div>
                            <span>Supports remote clinical decision-making</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-moh-darkGreen mb-4">Related Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {innovation.tags.map(tag => (
                      <Badge key={tag} className="bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium text-moh-darkGreen mb-4">Innovation Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-moh-green mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Launch Date</p>
                        <p className="font-medium">
                          {new Date(innovation.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    
                    {innovation.organization && (
                      <div className="flex items-start">
                        <Building className="w-5 h-5 text-moh-green mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Organization</p>
                          <p className="font-medium">{innovation.organization}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Award className="w-5 h-5 text-moh-green mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="font-medium">{innovation.status}</p>
                      </div>
                    </div>
                    
                    {innovation.website && (
                      <div className="flex items-start">
                        <Globe className="w-5 h-5 text-moh-green mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Website</p>
                          <a href={`https://${innovation.website}`} className="font-medium text-moh-green hover:underline" target="_blank" rel="noreferrer">
                            {innovation.website}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {innovation.contact && (
                      <div className="flex items-start">
                        <User className="w-5 h-5 text-moh-green mr-3 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Contact</p>
                          <a href={`mailto:${innovation.contact}`} className="font-medium text-moh-green hover:underline">
                            {innovation.contact}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Button className="w-full bg-moh-green hover:bg-moh-darkGreen text-white">
                      Request More Information
                    </Button>
                  </div>
                </div>
                
                <div className="bg-moh-lightGreen border border-moh-green/20 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-moh-darkGreen mb-4">Documentation</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:shadow-sm transition-shadow">
                      <FileText className="w-5 h-5 text-moh-green mr-3" />
                      <div>
                        <p className="font-medium">Product Brochure</p>
                        <p className="text-xs text-gray-500">PDF, 2.4 MB</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:shadow-sm transition-shadow">
                      <FileText className="w-5 h-5 text-moh-green mr-3" />
                      <div>
                        <p className="font-medium">Clinical Validation Study</p>
                        <p className="text-xs text-gray-500">PDF, 3.8 MB</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 bg-white rounded-md border border-gray-200 hover:shadow-sm transition-shadow">
                      <FileText className="w-5 h-5 text-moh-green mr-3" />
                      <div>
                        <p className="font-medium">Technical Specifications</p>
                        <p className="text-xs text-gray-500">PDF, 1.7 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button variant="outline" className="flex-1 border-gray-300">
                    <Share2 size={16} className="mr-1" />
                    Share
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-300">
                    <Bookmark size={16} className="mr-1" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-300">
                    <MessageCircle size={16} className="mr-1" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
