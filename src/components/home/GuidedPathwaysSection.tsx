
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { Lightbulb, Rocket, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const GuidedPathwaysSection = () => {
  const navigate = useNavigate();

  const pathwayCards = [
    {
      title: "Innovation Marketplace",
      description: "Discover and connect with groundbreaking healthcare innovations ready for implementation.",
      icon: <Lightbulb className="w-10 h-10 text-moh-green" />,
      path: "/innovations",
      action: "Explore Innovations"
    },
    {
      title: "Entrepreneur's Journey",
      description: "Step-by-step guidance for healthcare entrepreneurs from ideation to market.",
      icon: <Rocket className="w-10 h-10 text-moh-gold" />,
      path: "/journey",
      action: "Start Your Journey"
    },
    {
      title: "The Complete Journey",
      description: "Navigate the complete innovation pathway from concept to implementation in healthcare.",
      icon: <Navigation className="w-10 h-10 text-moh-darkGreen" />,
      path: "/journey",
      action: "View Full Pathway"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Navigate Your Innovation Path
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're an entrepreneur, healthcare provider, or investor, find your guided pathway through the healthcare innovation ecosystem.
            </p>
          </div>
        </ScrollFadeIn>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {pathwayCards.map((card, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              variants={itemVariants}
            >
              <div className="p-6 flex flex-col h-full">
                <div className="mb-4 p-3 bg-gray-50 rounded-full inline-block">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-moh-green transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-6 flex-grow">
                  {card.description}
                </p>
                <Button 
                  onClick={() => navigate(card.path)} 
                  className="mt-auto"
                  variant="outline"
                >
                  {card.action}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button 
            onClick={() => navigate("/knowledge-hub")} 
            variant="default"
            className="bg-moh-green hover:bg-moh-darkGreen"
          >
            Explore All Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GuidedPathwaysSection;
