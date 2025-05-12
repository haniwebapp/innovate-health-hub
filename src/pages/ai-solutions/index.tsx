
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BrainCircuit, Microchip, Bot, ServerCog, Code, Wand, Network, Target } from "lucide-react";
import { Link } from "react-router-dom";

export default function AISolutionsPage() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0 }
  };
  
  const itemVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        className="min-h-screen flex flex-col bg-white" 
        initial="initial" 
        animate="animate" 
        exit="exit" 
        variants={pageVariants}
        key="ai-solutions-page"
      >
        <Navbar />
        <ScrollProgress />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto mb-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-moh-darkGreen to-moh-gold"
              variants={itemVariants}
            >
              AI Solutions
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={itemVariants}
            >
              Explore the innovative AI capabilities powering our healthcare innovation platform, designed to accelerate innovation and improve healthcare outcomes.
            </motion.p>
          </div>
          
          {/* AI Solutions Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={pageVariants}
          >
            {aiSolutions.map((solution, index) => {
              const colorClasses = getColorClasses(solution.color || "green");
              
              return (
                <motion.div 
                  key={solution.title} 
                  variants={itemVariants}
                  className="h-full"
                >
                  <Card className="h-full border border-gray-200 hover:border-moh-green/30 hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-4`}>
                        <solution.icon className={`w-6 h-6 ${colorClasses.text}`} />
                      </div>
                      <CardTitle className={`${colorClasses.text}`}>{solution.title}</CardTitle>
                      <CardDescription>{solution.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">
                        {solution.details}
                      </p>
                      
                      {solution.capabilities && (
                        <ul className="mt-4 space-y-2">
                          {solution.capabilities.map((capability, i) => (
                            <li key={i} className="flex items-start">
                              <span className={`${colorClasses.text} mr-2 mt-1`}>•</span>
                              <span className="text-gray-600 text-sm">{capability}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        className={`${colorClasses.text} hover:bg-transparent hover:opacity-80 p-0 h-auto font-medium text-sm group`}
                        onClick={() => console.log(`Navigate to ${solution.title}`)}
                      >
                        Learn More
                        <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
          
          {/* Integrations Section */}
          <div className="max-w-4xl mx-auto mt-20 mb-10">
            <motion.h2 
              className="text-3xl font-bold mb-4 text-moh-darkGreen"
              variants={itemVariants}
            >
              AI Platform Integrations
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={itemVariants}
            >
              Our AI solutions seamlessly integrate with these leading platforms and technologies:
            </motion.p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {integrations.map((integration, index) => (
                <motion.div 
                  key={integration.name}
                  variants={itemVariants} 
                  className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-moh-gold/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="bg-gray-100 text-gray-500 p-3 rounded-lg h-16 w-16 flex items-center justify-center mb-3">
                    {integration.icon}
                  </div>
                  <h3 className="font-medium text-center">{integration.name}</h3>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="inline-flex flex-wrap justify-center gap-6">
              <Button 
                className="bg-gradient-to-r from-moh-green to-moh-darkGreen text-white px-8 py-3 rounded-md font-medium hover:shadow-lg transition-all group"
                asChild
              >
                <Link to="/innovations">
                  <span>View Innovations</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="outline"
                className="border-moh-green text-moh-darkGreen hover:bg-moh-lightGreen/20 px-8 py-3 rounded-md font-medium group"
                asChild
              >
                <Link to="/about" className="flex items-center">
                  <span>Learn About Our Platform</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-opacity duration-300 opacity-70 group-hover:opacity-100" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

// AI Solutions data
const aiSolutions = [
  {
    title: "Innovation AI Analysis",
    description: "AI-powered innovation analysis and insights",
    details: "Our advanced AI evaluates healthcare innovations, providing comprehensive analysis on market fit, impact potential, and alignment with Vision 2030 goals.",
    capabilities: [
      "Innovation scoring and evaluation",
      "Market opportunity identification",
      "Disruption potential assessment",
      "Vision 2030 alignment analysis"
    ],
    icon: BrainCircuit,
    color: "green",
    ctaLink: "/innovations"
  },
  {
    title: "Regulatory Compliance AI",
    description: "Streamlining regulatory compliance processes",
    details: "AI tools that simplify regulatory compliance by analyzing innovations against Saudi healthcare regulations and international standards.",
    capabilities: [
      "Automated compliance checks",
      "Regulatory requirement mapping",
      "Documentation recommendation",
      "Testing guidance and timeline estimation"
    ],
    icon: ServerCog,
    color: "darkGreen",
    ctaLink: "/regulatory"
  },
  {
    title: "Investment Matching AI",
    description: "Smart connections with potential investors",
    details: "Our AI algorithm matches healthcare innovations with suitable investors based on sector expertise, investment history, and strategic goals.",
    capabilities: [
      "Investor-innovation matching",
      "Funding opportunity identification",
      "Market trend analysis",
      "Investment readiness assessment"
    ],
    icon: Target,
    color: "gold",
    ctaLink: "/investment"
  },
  {
    title: "Knowledge Discovery AI",
    description: "Advanced semantic search and knowledge discovery",
    details: "AI-powered knowledge discovery tools that enable users to find relevant research, case studies, and expertise within the healthcare innovation ecosystem.",
    capabilities: [
      "Semantic search capabilities",
      "Document summarization",
      "Content recommendation",
      "Learning pathway generation"
    ],
    icon: Bot,
    color: "darkGold",
    ctaLink: "/knowledge-hub"
  },
  {
    title: "Challenge Generation AI",
    description: "AI-powered healthcare challenge identification",
    details: "AI systems that analyze healthcare data and trends to identify meaningful challenges that innovators can address for maximum impact.",
    capabilities: [
      "Challenge opportunity identification",
      "Problem statement refinement",
      "Success criteria development",
      "Duplicate challenge detection"
    ],
    icon: Wand,
    color: "green",
    ctaLink: "/challenges"
  },
  {
    title: "Policy Impact Simulation",
    description: "AI simulations for healthcare policy impact",
    details: "Sophisticated AI models that simulate the potential impacts of healthcare policies and innovations on various stakeholders and outcomes.",
    capabilities: [
      "Policy impact forecasting",
      "Stakeholder effect analysis",
      "Implementation challenge prediction",
      "Strategy gap identification"
    ],
    icon: Network,
    color: "darkGreen",
    ctaLink: "/policy"
  },
];

// Integration platforms
const integrations = [
  { name: "Vision 2030 Framework", icon: <Target className="h-8 w-8" /> },
  { name: "MOH Clinical Systems", icon: <Microchip className="h-8 w-8" /> },
  { name: "Healthcare Data Lake", icon: <ServerCog className="h-8 w-8" /> },
  { name: "SFDA Regulatory API", icon: <Code className="h-8 w-8" /> },
];

// Helper function to get color classes based on the color
function getColorClasses(color: string): {
  bg: string;
  text: string;
  border: string;
  hover: string;
} {
  const colorMap: {[key: string]: {bg: string, text: string, border: string, hover: string}} = {
    green: {
      bg: "bg-moh-lightGreen/50",
      text: "text-moh-green",
      border: "border-moh-green/20",
      hover: "hover:bg-moh-lightGreen/80"
    },
    gold: {
      bg: "bg-moh-lightGold/50",
      text: "text-moh-darkGold",
      border: "border-moh-gold/20",
      hover: "hover:bg-moh-lightGold/80"
    },
    darkGreen: {
      bg: "bg-moh-lightGreen/60",
      text: "text-moh-darkGreen",
      border: "border-moh-darkGreen/20",
      hover: "hover:bg-moh-lightGreen/90"
    },
    darkGold: {
      bg: "bg-moh-lightGold/60",
      text: "text-moh-darkGold",
      border: "border-moh-darkGold/20",
      hover: "hover:bg-moh-lightGold/90"
    }
  };
  
  return colorMap[color] || colorMap.green;
}
