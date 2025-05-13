
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, PlusCircle, Settings } from "lucide-react";

export function DashboardActions() {
  const actions = [
    {
      title: "Create Challenge",
      description: "Create a new innovation challenge",
      icon: <PlusCircle className="h-5 w-5 text-green-500" />,
      link: "/dashboard/create-challenge"
    },
    {
      title: "Submit Innovation",
      description: "Submit your healthcare innovation",
      icon: <FileText className="h-5 w-5 text-blue-500" />,
      link: "/dashboard/submit"
    },
    {
      title: "Find Collaborators",
      description: "Connect with potential team members",
      icon: <Users className="h-5 w-5 text-purple-500" />,
      link: "/dashboard/collaboration"
    },
    {
      title: "Account Settings",
      description: "Update your profile and preferences",
      icon: <Settings className="h-5 w-5 text-gray-500" />,
      link: "/dashboard/settings"
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-bold text-moh-darkGreen mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <motion.a 
            key={index} 
            href={action.link}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="group block"
          >
            <Card className="h-full border-gray-200 group-hover:border-moh-green transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-moh-lightGreen transition-colors duration-300">
                  {action.icon}
                </div>
                <h3 className="font-medium text-gray-900 text-lg">{action.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{action.description}</p>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
