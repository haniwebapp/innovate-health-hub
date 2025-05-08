
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { Button } from "@/components/ui/button";
import { Search, Download, BookOpen, Globe, Video, FileText } from "lucide-react";
import { useState } from "react";

// Resource type definition
type Resource = {
  id: string;
  title: string;
  description: string;
  category: "article" | "video" | "guide" | "research";
  source: string;
  date: string;
  imageUrl: string;
  link: string;
}

// Sample resources data
const resourcesData: Resource[] = [
  {
    id: "1",
    title: "Understanding Health Innovation Regulations in Saudi Arabia",
    description: "A comprehensive guide to navigating the regulatory landscape for healthcare innovations in the Kingdom.",
    category: "guide",
    source: "Ministry of Health",
    date: "June 15, 2024",
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2370&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "2",
    title: "Emerging Trends in Digital Health Technologies",
    description: "Explore the latest digital health technologies and their potential impact on healthcare delivery.",
    category: "article",
    source: "Health Innovation Journal",
    date: "May 22, 2024",
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2370&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "3",
    title: "AI in Healthcare: Applications and Ethics",
    description: "A research paper examining the ethical considerations of implementing AI in healthcare settings.",
    category: "research",
    source: "Saudi Digital Health Council",
    date: "April 10, 2024",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2370&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "4",
    title: "Telemedicine Implementation Guide",
    description: "Step-by-step guide for healthcare providers looking to implement telemedicine services.",
    category: "guide",
    source: "Ministry of Health",
    date: "March 5, 2024",
    imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2370&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "5",
    title: "Introduction to Health Innovation Ecosystem",
    description: "Learn about the components and stakeholders in the Saudi health innovation ecosystem.",
    category: "video",
    source: "Innovation Center",
    date: "February 18, 2024",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2370&auto=format&fit=crop",
    link: "#"
  },
  {
    id: "6",
    title: "Funding Options for Health Startups",
    description: "An overview of funding opportunities available for healthcare startups in Saudi Arabia.",
    category: "article",
    source: "Saudi Venture Capital",
    date: "January 30, 2024",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    link: "#"
  }
];

// Category icon mapping
const categoryIcons = {
  article: <FileText className="h-5 w-5" />,
  video: <Video className="h-5 w-5" />,
  guide: <BookOpen className="h-5 w-5" />,
  research: <Globe className="h-5 w-5" />
};

// Category colors mapping
const categoryColors = {
  article: "bg-blue-100 text-blue-800",
  video: "bg-red-100 text-red-800",
  guide: "bg-green-100 text-green-800",
  research: "bg-purple-100 text-purple-800"
};

export default function KnowledgeHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Filter resources based on search and category
  const filteredResources = resourcesData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? resource.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        {/* Hero section */}
        <div className="bg-moh-lightGreen py-12 mb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-moh-darkGreen sm:text-4xl mb-6">
                Knowledge Hub
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Access resources, research papers, and guides to support your healthcare innovation journey
              </p>
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md leading-5 bg-white 
                          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-moh-green focus:border-moh-green sm:text-sm"
                  placeholder="Search for resources, topics, or keywords"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Categories filter */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              className={selectedCategory === null ? "bg-moh-green" : ""}
              onClick={() => setSelectedCategory(null)}
            >
              All Resources
            </Button>
            <Button 
              variant={selectedCategory === "article" ? "default" : "outline"}
              className={selectedCategory === "article" ? "bg-blue-600" : ""}
              onClick={() => setSelectedCategory("article")}
            >
              <FileText className="h-4 w-4 mr-2" /> Articles
            </Button>
            <Button 
              variant={selectedCategory === "video" ? "default" : "outline"}
              className={selectedCategory === "video" ? "bg-red-600" : ""}
              onClick={() => setSelectedCategory("video")}
            >
              <Video className="h-4 w-4 mr-2" /> Videos
            </Button>
            <Button 
              variant={selectedCategory === "guide" ? "default" : "outline"}
              className={selectedCategory === "guide" ? "bg-green-600" : ""}
              onClick={() => setSelectedCategory("guide")}
            >
              <BookOpen className="h-4 w-4 mr-2" /> Guides
            </Button>
            <Button 
              variant={selectedCategory === "research" ? "default" : "outline"}
              className={selectedCategory === "research" ? "bg-purple-600" : ""}
              onClick={() => setSelectedCategory("research")}
            >
              <Globe className="h-4 w-4 mr-2" /> Research
            </Button>
          </div>
          
          {/* Results info */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredResources.length} results 
              {selectedCategory && ` for ${selectedCategory}s`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>
          
          {/* Resources grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource) => (
                <div 
                  key={resource.id} 
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-md ${categoryColors[resource.category]}`}>
                        <div className="flex items-center">
                          {categoryIcons[resource.category]}
                          <span className="ml-1 capitalize">{resource.category}</span>
                        </div>
                      </span>
                      <span className="text-sm text-gray-500">{resource.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-moh-darkGreen">{resource.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Source: {resource.source}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-moh-green border-moh-green hover:bg-moh-lightGreen"
                        asChild
                      >
                        <a href={resource.link} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-1" /> Access
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">No resources found matching your criteria</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Featured resource section */}
          <div className="bg-moh-lightGold/30 rounded-lg p-8 mb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="lg:w-2/3">
                <span className="inline-block px-3 py-1 bg-moh-gold/20 text-moh-darkGold text-sm font-medium rounded-full mb-4">
                  Featured Resource
                </span>
                <h2 className="text-2xl font-bold text-moh-darkGreen mb-4">
                  2024 Saudi Healthcare Innovation Index
                </h2>
                <p className="text-gray-700 mb-6">
                  This comprehensive report analyzes the state of healthcare innovation across the Kingdom, 
                  highlighting emerging trends, success stories, and opportunities for growth in the healthcare sector.
                </p>
                <Button className="bg-moh-gold text-white hover:bg-moh-darkGold">
                  <Download className="h-4 w-4 mr-2" />
                  Download Full Report
                </Button>
              </div>
              <div className="lg:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2370&auto=format&fit=crop"
                  alt="2024 Saudi Healthcare Innovation Index"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
