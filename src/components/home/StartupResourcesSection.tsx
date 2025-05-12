
import React from 'react';
import { motion } from 'framer-motion';
import { ScrollFadeIn } from '@/components/animations/ScrollFadeIn';
import { Briefcase, LightbulbOn, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const StartupResourcesSection = () => {
  const navigate = useNavigate();

  const resources = [
    {
      title: "Business Planning",
      description: "Templates, guides and expert support for building your healthcare startup business plan",
      icon: <Briefcase className="h-10 w-10 text-moh-gold" />,
      color: "bg-amber-50",
      link: "/knowledge-hub"
    },
    {
      title: "Idea Validation",
      description: "Tools and methodologies to validate your healthcare innovation with real users and experts",
      icon: <LightbulbOn className="h-10 w-10 text-moh-gold" />,
      color: "bg-amber-50",
      link: "/challenges"
    },
    {
      title: "Mentorship Network",
      description: "Connect with experienced healthcare entrepreneurs and industry experts for guidance",
      icon: <Users className="h-10 w-10 text-moh-gold" />,
      color: "bg-amber-50",
      link: "/about"
    },
    {
      title: "Learning Resources",
      description: "Curated articles, case studies and learning materials for healthcare innovators",
      icon: <BookOpen className="h-10 w-10 text-moh-gold" />,
      color: "bg-amber-50",
      link: "/knowledge-hub"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <ScrollFadeIn>
          <div className="text-center mb-16">
            <span className="text-moh-gold font-semibold text-sm uppercase tracking-wider">For Entrepreneurs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Startup Resources
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything healthcare entrepreneurs need to transform innovative ideas into successful ventures aligned with Vision 2030.
            </p>
          </div>
        </ScrollFadeIn>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {resources.map((resource, index) => (
            <motion.div 
              key={index}
              className="relative group cursor-pointer"
              variants={itemVariants}
              onClick={() => navigate(resource.link)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-moh-gold/20 to-moh-gold/10 transform -skew-y-3 rounded-xl group-hover:-skew-y-2 transition-all duration-300"></div>
              
              <div className="relative bg-white border border-gray-200 rounded-lg p-6 shadow-sm group-hover:shadow-md transition-all duration-300">
                <div className={`${resource.color} p-3 rounded-full inline-flex mb-4`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                
                <div className="flex items-center font-medium text-moh-gold group-hover:text-moh-darkGold transition-colors">
                  <span>Learn more</span>
                  <svg className="ml-1 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <Button 
            onClick={() => navigate("/knowledge-hub")} 
            variant="outline" 
            className="border-moh-gold text-moh-gold hover:bg-moh-gold hover:text-white"
          >
            Explore All Startup Resources
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StartupResourcesSection;
