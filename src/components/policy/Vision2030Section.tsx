
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Vision2030Section() {
  const alignmentAreas = [
    {
      title: "Healthcare Transformation",
      description: "Aligning innovations with the national healthcare transformation goals",
      icon: "🏥",
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: "Digital Health",
      description: "Supporting digital transformation of healthcare services",
      icon: "💻",
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Preventive Care",
      description: "Focusing on preventive approaches to healthcare",
      icon: "🛡️",
      color: "bg-green-50 text-green-600"
    },
    {
      title: "Healthcare Access",
      description: "Improving access to quality healthcare services nationwide",
      icon: "🔑",
      color: "bg-amber-50 text-amber-600"
    }
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-moh-lightGreen rounded-full opacity-20 -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-moh-lightGold rounded-full opacity-20 translate-y-1/3 -translate-x-1/4" />
        
        <div className="relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 relative z-10"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium bg-moh-lightGreen text-moh-darkGreen rounded-md mb-2">
              Vision 2030
            </span>
            <h2 className="text-3xl font-bold text-moh-darkGreen mb-4">
              Vision 2030 Alignment
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Learn how healthcare innovations align with the national Vision 2030 goals and how your 
              projects can contribute to achieving these transformative objectives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-moh-lightGreen to-moh-green p-0.5 rounded-lg">
                <div className="bg-white p-8 rounded-lg h-full">
                  <h3 className="text-2xl font-bold text-moh-darkGreen mb-4">
                    Healthcare Innovation Goals
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Increase healthcare service accessibility by 40%",
                      "Improve preventive care utilization by 65%",
                      "Reduce chronic disease burden by 30%",
                      "Advance digital health adoption to 80%",
                      "Enhance healthcare workforce capacity by 35%"
                    ].map((goal, index) => (
                      <motion.li 
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="flex items-start"
                      >
                        <span className="text-moh-green mr-2">✓</span>
                        <span>{goal}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                {alignmentAreas.map((area, index) => (
                  <Card key={index} className="border-gray-200">
                    <CardHeader className="pb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${area.color.split(' ')[0]}`}>
                        <span className="text-xl">{area.icon}</span>
                      </div>
                      <CardTitle className="text-lg font-semibold text-moh-darkGreen">
                        {area.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 bg-moh-lightGreen bg-opacity-30 p-6 rounded-lg text-center"
          >
            <h3 className="text-xl font-bold text-moh-darkGreen mb-3">Align Your Innovation with Vision 2030</h3>
            <p className="text-gray-600 mb-4 max-w-2xl mx-auto">
              Use our Vision 2030 Alignment Tool to assess how your healthcare innovation aligns with national healthcare goals.
            </p>
            <button className="bg-moh-green hover:bg-moh-darkGreen text-white px-6 py-3 rounded-md transition-colors duration-300">
              Launch Alignment Tool
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
