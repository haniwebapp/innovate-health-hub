
import React from "react";
import { motion } from "framer-motion";
import { FileUp, CheckCircle, ArrowRight, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InnovationSubmitPreview() {
  // Animation variants
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
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  // Steps in the innovation submission process
  const submissionSteps = [
    {
      title: "Basic Information",
      description: "Enter your innovation details, category, and basic description"
    },
    {
      title: "Detailed Description",
      description: "Provide comprehensive information about your healthcare solution"
    },
    {
      title: "Upload Media",
      description: "Add images, videos, and documentation about your innovation"
    },
    {
      title: "Technical Specifications",
      description: "Share technical details and implementation requirements"
    },
    {
      title: "Regulatory Information",
      description: "Add details about compliance status and certifications"
    }
  ];

  return (
    <div className="bg-white rounded-lg border shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-moh-darkGreen">Submit Your Innovation</h3>
        <Button className="bg-moh-green hover:bg-moh-darkGreen text-white">
          <FileUp size={16} className="mr-2" />
          Start Submission
        </Button>
      </div>

      <motion.div
        className="mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="text-gray-600 mb-4">
          Our streamlined submission process helps you showcase your healthcare innovation to the right stakeholders:
        </p>

        <div className="space-y-3 mb-6">
          {submissionSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-start bg-gray-50 p-3 rounded-md"
            >
              <div className="mr-3 mt-1 bg-moh-lightGreen h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium text-moh-darkGreen">
                {index + 1}
              </div>
              <div>
                <h4 className="font-medium text-moh-darkGreen">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-start mb-4">
            <CheckCircle size={18} className="text-moh-green mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              Your submission will be reviewed by our team before being published on the platform
            </p>
          </div>
          <div className="flex items-start mb-4">
            <CheckCircle size={18} className="text-moh-green mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              AI analysis will match your innovation with potential investors and implementation opportunities
            </p>
          </div>
          <div className="flex items-start">
            <CheckCircle size={18} className="text-moh-green mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              You'll receive regulatory guidance and market analysis based on your submission
            </p>
          </div>
        </div>
      </motion.div>

      <div className="bg-moh-lightGreen/20 rounded-lg p-4 border border-moh-lightGreen/30">
        <div className="flex items-start">
          <Lightbulb size={18} className="text-moh-gold mr-2 mt-1 flex-shrink-0" />
          <div>
            <p className="text-sm text-gray-700 font-medium">
              AI-Enhanced Innovation Platform
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Our platform leverages artificial intelligence to analyze your innovation, provide regulatory guidance, 
              and match you with potential investors and partners in the Saudi healthcare ecosystem.
            </p>
          </div>
        </div>
        <div className="mt-3 text-right">
          <Button variant="outline" size="sm" className="text-moh-green hover:bg-moh-lightGreen/20">
            Learn More
            <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
