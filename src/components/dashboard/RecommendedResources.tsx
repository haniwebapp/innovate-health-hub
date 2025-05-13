
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Video, BookOpen } from "lucide-react";

export function RecommendedResources() {
  // Mock data
  const resources = [
    {
      id: 1,
      title: "Healthcare Innovation Guide",
      type: "Document",
      icon: <FileText className="h-3 w-3 text-blue-500" />,
    },
    {
      id: 2,
      title: "Regulatory Compliance Tutorial",
      type: "Video",
      icon: <Video className="h-3 w-3 text-red-500" />,
    },
    {
      id: 3,
      title: "Digital Health Handbook",
      type: "E-Book",
      icon: <BookOpen className="h-3 w-3 text-green-500" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold text-moh-darkGreen">Recommended Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {resources.map((resource, index) => (
            <motion.a 
              key={resource.id}
              href="#"
              className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors duration-300"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="rounded-md bg-gray-100 p-1.5 mr-3">
                {resource.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{resource.title}</p>
                <span className="text-xs text-gray-500">{resource.type}</span>
              </div>
            </motion.a>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/dashboard/knowledge" className="text-moh-green hover:text-moh-darkGreen text-sm font-medium">
            Explore Knowledge Hub
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
