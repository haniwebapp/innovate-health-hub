
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, ArrowRight, Building, Calendar } from "lucide-react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";

interface Innovation {
  id: string;
  title: string;
  description: string;
  organization: string;
  date: string;
  category: string;
  imageUrl: string;
}

// Mocked innovation data
const innovations: Innovation[] = [
  {
    id: "1",
    title: "AI-Powered Health Assistant",
    description: "A virtual assistant that uses artificial intelligence to provide health guidance, medication reminders, and symptom checking.",
    organization: "Digital Health Solutions",
    date: "March 2025",
    category: "Digital Health",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "2",
    title: "Smart Hospital Navigation System",
    description: "An indoor navigation system that helps patients and visitors find their way around large hospital complexes.",
    organization: "MediTech Innovations",
    date: "January 2025",
    category: "Hospital Management",
    imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "3",
    title: "Portable Diagnostic Kit",
    description: "A compact kit containing multiple diagnostic tools for basic health assessment in remote areas.",
    organization: "Rural Health Innovations",
    date: "February 2025",
    category: "Diagnostics",
    imageUrl: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "4",
    title: "Healthcare Delivery Drones",
    description: "Specialized drones for delivering medical supplies to hard-to-reach areas and emergency situations.",
    organization: "Aerial Medical Services",
    date: "April 2025",
    category: "Logistics",
    imageUrl: "https://images.unsplash.com/photo-1580810734858-139605e31d66?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "5",
    title: "Virtual Reality Therapy Platform",
    description: "A VR platform for mental health therapy, pain management, and rehabilitation treatments.",
    organization: "Immersive Health Technologies",
    date: "March 2025",
    category: "Mental Health",
    imageUrl: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: "6",
    title: "Wearable Health Monitor",
    description: "Advanced wearable device that tracks vital signs and detects early warning signs of health issues.",
    organization: "Health Sensors Inc",
    date: "January 2025",
    category: "Wearables",
    imageUrl: "https://images.unsplash.com/photo-1557354392-cbc9a432cf8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

// Innovation card component
const InnovationCard = ({ innovation }: { innovation: Innovation }) => {
  return (
    <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border-none animate-fade-in">
      <div className="h-40 overflow-hidden">
        <img 
          src={innovation.imageUrl} 
          alt={innovation.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
      </div>
      <CardHeader className="pb-2">
        <Badge className="w-fit bg-moh-gold hover:bg-moh-darkGold">{innovation.category}</Badge>
        <CardTitle className="text-xl text-moh-darkGreen mt-2 hover:text-moh-green transition-colors">
          {innovation.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-gray-600 mb-4">{innovation.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Building className="h-3 w-3" />
            {innovation.organization}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {innovation.date}
          </span>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button asChild className="w-full bg-moh-green hover:bg-moh-darkGreen text-white group">
          <Link to={`/innovations/${innovation.id}`}>
            View Innovation
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function InnovationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  
  // Filter innovations based on search
  const filteredInnovations = innovations.filter(innovation => 
    innovation.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    innovation.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-12 md:py-16 bg-moh-lightGreen/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen">
                Healthcare Innovations
              </h1>
              <p className="text-lg text-gray-700">
                Discover cutting-edge solutions developed to address healthcare challenges in the Kingdom.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb Navigation */}
            <BreadcrumbNav currentPage="Innovations" />
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
              <div className="flex-1">
                <h2 className="text-lg font-medium mb-2">Search Innovations</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    placeholder="Search by keywords..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="outline" onClick={handleResetFilters} className="h-10">
                <Filter className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </div>
            
            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {filteredInnovations.length} innovations
              </p>
            </div>
            
            {/* Innovations grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredInnovations.length === 0 ? (
                <div className="col-span-full text-center p-8">
                  <p className="font-medium text-lg">No innovations found matching your search criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={handleResetFilters}>
                    Clear Filters
                  </Button>
                </div>
              ) : (
                filteredInnovations.map((innovation) => (
                  <InnovationCard key={innovation.id} innovation={innovation} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
