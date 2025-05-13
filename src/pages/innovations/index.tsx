
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Button } from "@/components/ui/button";
import { ChevronRight, Lightbulb, Target, ArrowUpRight, Clock, Users, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock innovations data
const mockInnovations = [
  {
    id: "1",
    title: "AI-Powered Diagnostic Assistant",
    description: "Machine learning platform that assists healthcare providers in detecting abnormalities in medical imaging with greater accuracy and speed.",
    category: "AI & Machine Learning",
    stage: "Growth",
    innovator: "Medical Vision Technologies",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "25% improvement in diagnostic accuracy",
    date: "June 2023"
  },
  {
    id: "2",
    title: "Remote Patient Monitoring Platform",
    description: "Comprehensive system for tracking patient vital signs and health metrics remotely, enabling early intervention and reducing hospital readmissions.",
    category: "Digital Health",
    stage: "Scaling",
    innovator: "HealthConnect Systems",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "30% reduction in hospital readmissions",
    date: "March 2023"
  },
  {
    id: "3",
    title: "Non-Invasive Glucose Monitor",
    description: "Revolutionary device that monitors blood glucose levels without needles, improving quality of life for diabetes patients.",
    category: "Medical Device",
    stage: "Early Growth",
    innovator: "DiabCare Innovations",
    image: "https://images.unsplash.com/photo-1579154341098-e4e158cc7f55?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "Improved compliance with glucose monitoring by 40%",
    date: "August 2023"
  },
  {
    id: "4",
    title: "Healthcare Supply Chain Solution",
    description: "Blockchain-based platform that enhances transparency and efficiency in healthcare supply chains, reducing waste and ensuring authenticity.",
    category: "Supply Chain",
    stage: "Pilot",
    innovator: "MedChain Solutions",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "15% reduction in supply chain costs",
    date: "October 2023"
  },
  {
    id: "5",
    title: "Mental Health Support App",
    description: "Mobile application providing personalized mental health resources, exercises, and connection to professional support when needed.",
    category: "Mental Health",
    stage: "Scaling",
    innovator: "MindWell Technologies",
    image: "https://images.unsplash.com/photo-1471283710737-7a6172042d6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "Reached over 50,000 users in first year",
    date: "February 2023"
  },
  {
    id: "6",
    title: "Smart Hospital Management System",
    description: "Integrated platform for optimizing hospital operations, resource allocation, and patient flow to improve efficiency and care quality.",
    category: "Hospital Management",
    stage: "Growth",
    innovator: "HealthOps Solutions",
    image: "https://images.unsplash.com/photo-1516549655645-e9218bcb6352?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    impact: "20% improvement in hospital operational efficiency",
    date: "April 2023"
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "AI & Machine Learning",
  "Digital Health",
  "Medical Device",
  "Supply Chain",
  "Mental Health",
  "Hospital Management"
];

// Innovation stages
const stages = [
  "All Stages",
  "Pilot",
  "Early Growth",
  "Growth",
  "Scaling"
];

export default function InnovationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [stageFilter, setStageFilter] = useState("All Stages");
  const { t, language } = useLanguage();
  
  // Fetch innovations from API (using mock data for now)
  const { data: innovations, isLoading, error } = useQuery({
    queryKey: ['innovations'],
    queryFn: async () => {
      // In a real app, this would be fetching from an API
      return new Promise(resolve => {
        setTimeout(() => resolve(mockInnovations), 1000);
      });
    }
  });
  
  // Filter innovations based on search and filters
  const filteredInnovations = innovations?.filter(innovation => {
    const matchesSearch = innovation.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         innovation.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "All Categories" || 
                           innovation.category === categoryFilter;
                           
    const matchesStage = stageFilter === "All Stages" ||
                        innovation.stage === stageFilter;
                        
    return matchesSearch && matchesCategory && matchesStage;
  });
  
  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("All Categories");
    setStageFilter("All Stages");
  };
  
  // Featured innovation data
  const featuredInnovation = {
    title: "AI-Powered Diagnostic Assistant",
    description: "This breakthrough platform uses advanced machine learning algorithms to analyze medical images and assist healthcare providers in detecting abnormalities with greater accuracy and speed than traditional methods.",
    impact: [
      "25% improvement in diagnostic accuracy",
      "40% reduction in diagnosis time",
      "Supports 15+ types of medical imaging"
    ],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    innovator: "Medical Vision Technologies",
    category: "AI & Machine Learning"
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-moh-lightGreen via-white to-moh-lightGreen">
      <Navbar />
      <ScrollProgress />
      
      <main className="flex-grow pt-0 my-0 rounded-none py-0">
        {/* Hero Section - with updated green theme similar to Investment page */}
        <section className="relative overflow-hidden bg-gradient-to-br from-moh-green via-moh-darkGreen to-moh-green text-white">
          {/* Background decoration elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-moh-gold blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-moh-lightGold blur-3xl"></div>
            <div className="absolute top-40 right-20 w-60 h-60 rounded-full bg-moh-darkGreen blur-3xl"></div>
          </div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
          
          <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block px-3 py-1 rounded-full bg-moh-darkGreen text-moh-lightGreen text-sm font-medium"
                >
                  Innovation Hub
                </motion.span>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Healthcare <span className="text-transparent bg-clip-text bg-gradient-to-r from-moh-gold to-moh-lightGold">Innovations</span>
                </motion.h1>
                
                <motion.p 
                  className="text-lg md:text-xl text-moh-lightGreen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Discover groundbreaking healthcare solutions developed across the Kingdom, driving the transformation of healthcare delivery and improving outcomes for all.
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <a href="#innovations-list" className="bg-moh-gold hover:bg-moh-darkGold text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    Explore Innovations
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </a>
                  <a href="/dashboard/submit-innovation" className="border border-moh-gold/50 text-moh-lightGold hover:bg-moh-darkGreen/20 font-medium py-3 px-6 rounded-lg flex items-center justify-center">
                    Submit Your Innovation
                  </a>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="hidden md:block"
              >
                <div className="relative">
                  <div className="absolute -top-10 -left-10 w-20 h-20 bg-moh-gold/20 rounded-full blur-md"></div>
                  <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-moh-gold/30 rounded-full blur-md"></div>
                  
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-moh-green flex items-center justify-center">
                          <Lightbulb className="h-5 w-5 text-white" />
                        </div>
                        <div className="ml-3">
                          <h3 className="font-medium text-white">Featured Innovation</h3>
                          <p className="text-sm text-white/70">Making an impact</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden mb-4">
                      <img 
                        src={featuredInnovation.image} 
                        alt={featuredInnovation.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <h4 className="font-medium text-white">{featuredInnovation.title}</h4>
                          <span className="text-xs bg-moh-gold/20 text-moh-lightGold px-2 py-0.5 rounded">
                            {featuredInnovation.category}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 mb-2">By {featuredInnovation.innovator}</p>
                      </div>
                      
                      <div className="text-xs text-white/80">
                        <div className="flex items-start mb-1">
                          <Target className="h-3 w-3 mr-1 mt-0.5 text-moh-gold" />
                          <span>{featuredInnovation.impact[0]}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 text-center">
                      <a href="#featured-innovation" className="text-moh-lightGold hover:text-moh-gold text-sm flex items-center justify-center">
                        Learn more
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-12">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,130.83,141.41,214.86,114.72,271.78,97.31,328.1,64.46,392.73,38.81" fill="currentColor" className="text-moh-lightGreen"></path>
            </svg>
          </div>
        </section>
        
        {/* Innovation stats section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Lightbulb className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    100+
                  </span>
                </div>
                <p className="text-sm text-gray-600">Active Innovations</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Users className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    50+
                  </span>
                </div>
                <p className="text-sm text-gray-600">Healthcare Partners</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Target className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    6+
                  </span>
                </div>
                <p className="text-sm text-gray-600">Categories</p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-moh-lightGreen"
              >
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-lg bg-moh-lightGreen flex items-center justify-center mr-3">
                    <Sparkles className="h-4 w-4 text-moh-green" />
                  </div>
                  <span className="text-2xl font-bold text-moh-darkGreen">
                    30%
                  </span>
                </div>
                <p className="text-sm text-gray-600">Avg Impact Rate</p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Featured innovation section */}
        <section id="featured-innovation" className="py-12 bg-gradient-to-br from-moh-lightGreen to-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <motion.span 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="inline-block px-3 py-1 rounded-full bg-moh-green/10 text-moh-darkGreen text-sm font-medium mb-4"
              >
                Innovation Spotlight
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-moh-darkGreen"
              >
                Featured Innovation
              </motion.h2>
            </div>
            
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredInnovation.image} 
                    alt={featuredInnovation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="md:w-1/2 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-moh-darkGreen">{featuredInnovation.title}</h3>
                    <span className="bg-moh-lightGreen text-moh-darkGreen text-xs px-3 py-1 rounded-full">
                      {featuredInnovation.category}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-6">By {featuredInnovation.innovator}</p>
                  
                  <p className="text-gray-700 mb-6">{featuredInnovation.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-moh-darkGreen mb-3">Key Impact</h4>
                    <ul className="space-y-2">
                      {featuredInnovation.impact.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-moh-lightGreen flex-shrink-0 flex items-center justify-center mr-3 mt-0.5">
                            <Target className="h-3 w-3 text-moh-green" />
                          </div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button 
                    className="bg-moh-green hover:bg-moh-darkGreen"
                    asChild
                  >
                    <a href={`/innovations/1`} className="flex items-center">
                      View Full Details
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Innovations listing */}
        <section id="innovations-list" className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-moh-darkGreen mb-2">Browse Innovations</h2>
              <p className="text-gray-600">Discover the latest healthcare innovations making an impact across the Kingdom</p>
            </div>
            
            {/* Filters */}
            <div className="mb-8 p-6 rounded-xl bg-white shadow-sm border border-moh-lightGreen">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Search Innovations
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      id="search"
                      type="text"
                      placeholder="Search by title or description..."
                      className="block w-full pl-10 pr-3 py-2 border border-moh-green/20 rounded-md leading-5 bg-white 
                          placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-moh-green focus:border-moh-green sm:text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-64">
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    className="block w-full pl-3 pr-10 py-2 border border-moh-green/20 rounded-md leading-5 bg-white 
                        focus:outline-none focus:ring-2 focus:ring-moh-green focus:border-moh-green sm:text-sm"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="w-full md:w-64">
                  <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">
                    Stage
                  </label>
                  <select
                    id="stage"
                    className="block w-full pl-3 pr-10 py-2 border border-moh-green/20 rounded-md leading-5 bg-white 
                        focus:outline-none focus:ring-2 focus:ring-moh-green focus:border-moh-green sm:text-sm"
                    value={stageFilter}
                    onChange={(e) => setStageFilter(e.target.value)}
                  >
                    {stages.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Results info */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredInnovations?.length || 0} innovations
              </p>
            </div>
            
            {/* Innovation grid */}
            {isLoading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="rounded-xl border border-gray-200 overflow-hidden bg-white animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2 w-5/6"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-4/6"></div>
                      <div className="flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {!isLoading && filteredInnovations?.length === 0 && (
              <div className="text-center py-12 bg-moh-lightGreen/20 rounded-lg border border-dashed border-moh-green/30">
                <div className="w-16 h-16 mx-auto mb-4 bg-moh-lightGreen rounded-full flex items-center justify-center">
                  <Lightbulb className="text-moh-green h-8 w-8" />
                </div>
                <h3 className="text-xl font-medium mb-2 text-moh-darkGreen">No innovations found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters to find what you're looking for.</p>
                <Button onClick={handleResetFilters} className="bg-moh-green hover:bg-moh-darkGreen">
                  Reset Filters
                </Button>
              </div>
            )}
            
            {!isLoading && filteredInnovations && filteredInnovations.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInnovations.map((innovation, index) => (
                  <motion.div
                    key={innovation.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={innovation.image} 
                          alt={innovation.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold text-moh-darkGreen">{innovation.title}</h3>
                          <span className="bg-moh-lightGreen text-moh-darkGreen text-xs px-2 py-1 rounded-full">
                            {innovation.stage}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">By {innovation.innovator}</p>
                        <p className="text-gray-700 mb-4">{innovation.description}</p>
                        <div className="mt-auto">
                          <div className="flex justify-between text-sm">
                            <span className="bg-moh-green/10 text-moh-darkGreen px-2 py-1 rounded">
                              {innovation.category}
                            </span>
                            <span className="flex items-center text-moh-green">
                              <Target className="h-4 w-4 mr-1" />
                              {innovation.impact}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 pb-6 pt-2">
                        <Button 
                          className="w-full bg-moh-green hover:bg-moh-darkGreen"
                          asChild
                        >
                          <a href={`/innovations/${innovation.id}`} className="flex items-center justify-center">
                            View Details
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {!isLoading && filteredInnovations && filteredInnovations.length > 0 && (
              <div className="mt-10 text-center">
                <Button 
                  variant="outline"
                  className="border-moh-green text-moh-green hover:bg-moh-lightGreen"
                >
                  Load More Innovations
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
