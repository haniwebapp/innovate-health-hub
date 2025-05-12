
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/home/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Brain, Bot, BarChart3, Shield, BookOpen, Database, ChevronRight, Sparkles } from "lucide-react";

interface AISolutionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  delay: number;
}

function AISolutionCard({ title, description, icon, link, delay }: AISolutionCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
    >
      <div className="p-6">
        <div className="bg-moh-lightGreen/30 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-moh-darkGreen">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Button variant="outline" className="w-full" asChild>
          <Link to={link}>
            Explore
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

const AISolutionsPage = () => {
  const { language } = useLanguage();
  
  const aiSolutions = [
    {
      title: "AI-Powered Innovation Matching",
      description: "Match your healthcare innovations with investors, partners, and regulatory pathways using advanced AI algorithms.",
      icon: <Brain className="h-6 w-6 text-moh-green" />,
      link: "/ai-solutions/innovation-matching",
      delay: 0.1
    },
    {
      title: "Smart Regulatory Assistant",
      description: "Navigate complex healthcare regulations with our AI assistant that provides personalized compliance guidance.",
      icon: <Shield className="h-6 w-6 text-moh-green" />,
      link: "/ai-solutions/regulatory-assistant",
      delay: 0.2
    },
    {
      title: "Healthcare Market Analysis",
      description: "Get AI-generated insights on market trends, competitive landscape, and growth opportunities in the healthcare sector.",
      icon: <BarChart3 className="h-6 w-6 text-moh-green" />,
      link: "/ai-solutions/market-analysis",
      delay: 0.3
    },
    {
      title: "Knowledge Mining Engine",
      description: "Access and search through vast healthcare research and policy documents with our semantic search engine.",
      icon: <BookOpen className="h-6 w-6 text-moh-green" />,
      link: "/ai-solutions/knowledge-mining",
      delay: 0.4
    },
    {
      title: "Predictive Health Analytics",
      description: "Leverage AI to analyze health data and predict trends, outcomes, and potential intervention points.",
      icon: <Database className="h-6 w-6 text-moh-green" />,
      link: "/ai-solutions/predictive-analytics",
      delay: 0.5
    },
    {
      title: "Virtual Innovation Coach",
      description: "Get personalized guidance and feedback on your healthcare innovation from our AI coach.",
      icon: <Bot className="h-6 w-6 text-moh-green" />,
      link: "/ai-solutions/innovation-coach",
      delay: 0.6
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-moh-lightGreen/50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center justify-center p-2 bg-white bg-opacity-70 rounded-full mb-4">
                  <Sparkles className="h-6 w-6 text-moh-green mr-2" />
                  <span className="text-moh-darkGreen font-medium">AI-Powered Healthcare Innovation</span>
                </div>
                
                <h1 className="text-3xl md:text-5xl font-bold mb-6 text-moh-darkGreen">
                  Advanced AI Solutions for Healthcare Innovation
                </h1>
                
                <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                  Accelerate your healthcare innovation journey with our suite of AI-powered tools designed to streamline regulatory compliance, match you with investors, and provide data-driven insights.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" className="bg-moh-green hover:bg-moh-darkGreen">
                    Start Using AI Tools
                  </Button>
                  <Button size="lg" variant="outline" className="border-moh-green text-moh-green hover:bg-moh-lightGreen/20">
                    Learn How It Works
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* AI Solutions Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
                Our AI Solutions Portfolio
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our comprehensive suite of AI tools designed specifically for healthcare innovators, investors, and regulators in Saudi Arabia.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiSolutions.map((solution, index) => (
                <AISolutionCard 
                  key={index}
                  title={solution.title}
                  description={solution.description}
                  icon={solution.icon}
                  link={solution.link}
                  delay={solution.delay}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Integration Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-moh-darkGreen">
                  Seamlessly Integrated with Our Platform
                </h2>
                <p className="text-gray-600">
                  Our AI solutions are fully integrated with all other features of the MOH Innovation Platform, providing a cohesive experience.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <h3 className="font-medium text-moh-darkGreen mb-2">Innovation Submission</h3>
                  <p className="text-sm text-gray-500">AI enhancement for your innovation submissions with smart suggestions and improvements.</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <h3 className="font-medium text-moh-darkGreen mb-2">Regulatory Pathways</h3>
                  <p className="text-sm text-gray-500">AI-guided regulatory navigation to identify the most efficient compliance pathway.</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <h3 className="font-medium text-moh-darkGreen mb-2">Investment Matching</h3>
                  <p className="text-sm text-gray-500">Intelligent investor matching based on your innovation's unique characteristics.</p>
                </motion.div>
              </div>
              
              <div className="text-center">
                <Button className="bg-gradient-to-r from-moh-green to-moh-darkGreen" asChild>
                  <Link to="/dashboard">
                    Access All Integrated AI Tools
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AISolutionsPage;
