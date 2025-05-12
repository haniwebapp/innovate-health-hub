
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { ScrollProgress } from "@/components/animations/ScrollProgress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { features } from "@/components/home/platform-highlights/features";
import { getIconByName } from "@/components/home/platform-highlights/features";

export default function FeaturesPage() {
  const navigate = useNavigate();
  
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
        key="features-page"
      >
        <Navbar />
        <ScrollProgress />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto mb-10">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-moh-darkGreen to-moh-green"
              variants={itemVariants}
            >
              Platform Features
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={itemVariants}
            >
              Discover all the innovative tools and capabilities our healthcare innovation platform offers to accelerate your journey.
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
            variants={pageVariants}
          >
            {features.map((feature, index) => {
              const IconComponent = getIconByName(feature.iconName);
              const colorClasses = getColorClasses(feature.color || "green");
              
              return (
                <motion.div 
                  key={feature.title} 
                  variants={itemVariants}
                  className="h-full"
                >
                  <Card className="h-full border border-gray-200 hover:border-moh-green/30 hover:shadow-md transition-all duration-300">
                    <CardHeader>
                      <div className={`w-12 h-12 rounded-lg ${colorClasses.bg} flex items-center justify-center mb-4`}>
                        <IconComponent className={`w-6 h-6 ${colorClasses.text}`} />
                      </div>
                      <CardTitle className={`${colorClasses.text}`}>{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">
                        {getExpandedDescription(feature.title)}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Button
                        variant="ghost"
                        className={`${colorClasses.text} hover:bg-transparent hover:opacity-80 p-0 h-auto font-medium text-sm group`}
                        onClick={() => navigate(feature.ctaLink)}
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
          
          {/* Additional features section */}
          <div className="max-w-4xl mx-auto mt-16 mb-10">
            <motion.h2 
              className="text-3xl font-bold mb-4 text-moh-darkGreen"
              variants={itemVariants}
            >
              Additional Platform Capabilities
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 mb-8"
              variants={itemVariants}
            >
              Beyond our core features, the platform offers these specialized capabilities:
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalFeatures.map((feature, index) => (
                <motion.div 
                  key={feature.title}
                  variants={itemVariants} 
                  className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-moh-gold/30 hover:shadow-sm transition-all duration-300"
                >
                  <div className="bg-moh-lightGold/50 text-moh-darkGold p-3 rounded-lg h-fit">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

// Helper function to generate expanded descriptions for features
function getExpandedDescription(title: string): string {
  switch(title) {
    case "AI-Powered Matching":
      return "Our advanced algorithms analyze innovation characteristics and match them with relevant investors, challenges, and opportunities based on over 50 different parameters.";
    case "Regulatory Sandbox":
      return "Test healthcare solutions in a controlled environment with direct guidance from regulatory experts and Ministry of Health representatives for faster approvals.";
    case "Investment Marketplace":
      return "Connect with vetted investors specifically interested in healthcare innovations, with detailed profiles and automated matching to maximize funding potential.";
    case "Knowledge Hub":
      return "Access a centralized repository of research papers, case studies, best practices, and expert insights curated specifically for healthcare innovators.";
    case "Challenge Platform":
      return "Participate in healthcare innovation challenges posed by various stakeholders, gain visibility, and win potential funding and implementation opportunities.";
    default:
      return "Explore this feature to unlock more capabilities within our healthcare innovation platform.";
  }
}

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

// Additional platform features
const additionalFeatures = [
  {
    title: "Healthcare Data Analytics",
    description: "Access anonymized healthcare data insights and analytics to better understand market needs and opportunities.",
    icon: <ChevronRight className="w-5 h-5" />
  },
  {
    title: "Collaborative Workspaces",
    description: "Virtual environments for teams to collaborate on innovation projects with regulatory experts and mentors.",
    icon: <ChevronRight className="w-5 h-5" />
  },
  {
    title: "Innovation Assessment Tools",
    description: "Evaluate the potential impact and feasibility of healthcare innovations through standardized assessment frameworks.",
    icon: <ChevronRight className="w-5 h-5" />
  },
  {
    title: "Implementation Roadmaps",
    description: "Customized guidance for navigating the path from concept to market entry in the Saudi healthcare sector.",
    icon: <ChevronRight className="w-5 h-5" />
  }
];
