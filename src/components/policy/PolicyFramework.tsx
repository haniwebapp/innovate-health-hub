
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PolicyFramework() {
  const { language } = useLanguage();
  
  const frameworks = [
    {
      title: "National Health Framework",
      description: "Comprehensive guidelines for healthcare innovation and development",
      icon: "🏛️",
    },
    {
      title: "Digital Health Standards",
      description: "Technical and data standards for digital health solutions",
      icon: "💻",
    },
    {
      title: "Clinical Validation Protocol",
      description: "Step-by-step validation process for clinical innovations",
      icon: "🔬",
    },
    {
      title: "Ethics Guidelines",
      description: "Ethical standards for healthcare innovation development",
      icon: "⚖️",
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
            Policy Framework
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our comprehensive policy framework provides clear guidelines for healthcare innovation, 
            ensuring compliance with national standards while fostering innovation.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {frameworks.map((framework, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-gray-200 hover:border-moh-green transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold text-moh-darkGreen">
                      {framework.title}
                    </CardTitle>
                    <span className="text-3xl">{framework.icon}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{framework.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-10"
        >
          <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md transition-colors duration-300">
            Download Complete Framework
          </button>
        </motion.div>
      </div>
    </section>
  );
}
