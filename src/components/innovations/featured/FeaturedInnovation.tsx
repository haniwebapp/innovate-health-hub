
import { Target, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface FeaturedInnovationProps {
  featuredInnovation: {
    title: string;
    description: string;
    impact: string[];
    image: string;
    innovator: string;
    category: string;
  };
}

export default function FeaturedInnovation({ featuredInnovation }: FeaturedInnovationProps) {
  return (
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
  );
}
