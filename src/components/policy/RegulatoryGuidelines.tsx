
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegulatoryGuidelines() {
  const guidelines = [
    {
      title: "Medical Device Regulation",
      description: "Guidelines for medical device innovations and approval process",
      category: "Device",
      icon: "🔧"
    },
    {
      title: "Digital Health Applications",
      description: "Regulatory framework for health applications and software",
      category: "Digital",
      icon: "📱"
    },
    {
      title: "Data Protection Standards",
      description: "Requirements for health data protection and privacy",
      category: "Data",
      icon: "🔒"
    },
    {
      title: "Clinical Validation Guidelines",
      description: "Process for validating clinical effectiveness of innovations",
      category: "Clinical",
      icon: "📊"
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
            Regulatory Guidelines
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understanding the regulatory landscape is crucial for successful healthcare innovation.
            Our comprehensive guidelines help you navigate the approval process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guidelines.map((guideline, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-gray-200 hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <div>
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-moh-lightGreen text-moh-darkGreen rounded-md mb-2">
                      {guideline.category}
                    </span>
                    <CardTitle className="text-xl font-semibold text-moh-darkGreen">
                      {guideline.title}
                    </CardTitle>
                  </div>
                  <div className="text-3xl">{guideline.icon}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{guideline.description}</p>
                  <a href="#" className="text-moh-green hover:text-moh-darkGreen font-medium inline-flex items-center">
                    View Guidelines
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 bg-white rounded-lg border border-gray-200 p-6"
        >
          <h3 className="text-xl font-bold text-moh-darkGreen mb-3">Need Regulatory Assistance?</h3>
          <p className="text-gray-600 mb-4">
            Our regulatory experts can help guide you through the approval process and ensure your innovation
            meets all necessary standards and requirements.
          </p>
          <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-4 py-2 rounded-md transition-colors duration-300">
            Schedule Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
