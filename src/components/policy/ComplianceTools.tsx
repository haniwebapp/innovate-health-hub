
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ComplianceTools() {
  const tools = [
    {
      category: "assessment",
      title: "Compliance Self-Assessment",
      description: "Evaluate your innovation against current regulatory standards",
      icon: "📝",
      action: "Start Assessment"
    },
    {
      category: "assessment",
      title: "Gap Analysis Tool",
      description: "Identify compliance gaps in your innovation",
      icon: "🔍",
      action: "Run Analysis"
    },
    {
      category: "validation",
      title: "Documentation Validator",
      description: "Validate your documentation against regulatory requirements",
      icon: "📄",
      action: "Upload Documents"
    },
    {
      category: "validation",
      title: "Standards Checker",
      description: "Check which standards apply to your innovation",
      icon: "✓",
      action: "Check Standards"
    },
    {
      category: "resources",
      title: "Compliance Templates",
      description: "Download templates for compliance documentation",
      icon: "📋",
      action: "Get Templates"
    },
    {
      category: "resources",
      title: "Regulatory Updates",
      description: "Stay informed about regulatory changes",
      icon: "🔔",
      action: "Subscribe"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
            Compliance Tools
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Streamline your regulatory compliance journey with our comprehensive suite of tools 
            designed to help innovators navigate complex requirements.
          </p>
        </motion.div>

        <Tabs defaultValue="assessment" className="w-full">
          <TabsList className="mx-auto flex justify-center gap-2 mb-8">
            <TabsTrigger value="assessment">Assessment Tools</TabsTrigger>
            <TabsTrigger value="validation">Validation Tools</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          {["assessment", "validation", "resources"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tools
                  .filter(tool => tool.category === category)
                  .map((tool, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full border-gray-200 hover:border-moh-green hover:shadow-md transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                          <CardTitle className="text-xl font-semibold text-moh-darkGreen">
                            {tool.title}
                          </CardTitle>
                          <span className="text-3xl">{tool.icon}</span>
                        </CardHeader>
                        <CardContent className="pb-6">
                          <p className="text-gray-600 mb-4">{tool.description}</p>
                          <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-4 py-2 rounded-md transition-colors duration-300">
                            {tool.action}
                          </button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 bg-gray-50 rounded-lg p-6 text-center"
        >
          <h3 className="text-xl font-bold text-moh-darkGreen mb-3">Need Custom Compliance Support?</h3>
          <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
            Our team of regulatory experts can provide personalized guidance for your specific innovation needs.
          </p>
          <button className="bg-moh-darkGreen hover:bg-opacity-90 text-white px-6 py-3 rounded-md transition-colors duration-300">
            Request Consultation
          </button>
        </motion.div>
      </div>
    </section>
  );
}
