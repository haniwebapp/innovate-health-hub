
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, BookOpen, Video, Download } from "lucide-react";

export default function PolicyResources() {
  const resources = [
    {
      title: "Healthcare Innovation Policy Guide",
      description: "Comprehensive guide to healthcare innovation policies and regulations",
      type: "PDF",
      icon: <FileText className="h-5 w-5 text-moh-green" />,
      size: "2.4 MB"
    },
    {
      title: "Regulatory Compliance Handbook",
      description: "Step-by-step handbook for ensuring regulatory compliance",
      type: "E-Book",
      icon: <BookOpen className="h-5 w-5 text-moh-green" />,
      size: "Virtual"
    },
    {
      title: "Policy Framework Explanation",
      description: "Video explanation of the healthcare innovation policy framework",
      type: "Video",
      icon: <Video className="h-5 w-5 text-moh-green" />,
      size: "15 min"
    },
    {
      title: "Compliance Templates Package",
      description: "Collection of templates for regulatory documentation",
      type: "ZIP",
      icon: <Download className="h-5 w-5 text-moh-green" />,
      size: "5.8 MB"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
            Policy Resources
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Access our comprehensive collection of resources designed to help you understand 
            and navigate healthcare innovation policies and regulations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {resources.map((resource, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-gray-200 hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="bg-moh-lightGreen w-10 h-10 rounded-md flex items-center justify-center mb-3">
                    {resource.icon}
                  </div>
                  <CardTitle className="text-lg font-semibold text-moh-darkGreen">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-600">
                      {resource.type} · {resource.size}
                    </span>
                    <button className="text-moh-green hover:text-moh-darkGreen transition-colors">
                      Download
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-semibold text-moh-darkGreen mb-3">Need More Resources?</h3>
          <p className="text-gray-600 mb-4">
            Explore our complete resource library or request customized policy guidance.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-5 py-2 rounded-md transition-colors duration-300">
              View Resource Library
            </button>
            <button className="border border-moh-green text-moh-green hover:bg-moh-lightGreen px-5 py-2 rounded-md transition-colors duration-300">
              Request Custom Guidance
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
