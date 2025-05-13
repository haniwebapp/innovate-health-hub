
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, FileText, Users, Star, Calendar } from "lucide-react";

export function RecentActivities() {
  // Mock data
  const activities = [
    {
      id: 1,
      type: "challenge",
      title: "AI for Early Disease Detection",
      action: "Challenge deadline extended",
      time: "2 hours ago",
      icon: <Calendar className="h-4 w-4 text-blue-500" />,
    },
    {
      id: 2,
      type: "submission",
      title: "SmartHealth Monitoring App",
      action: "Your submission was reviewed",
      time: "Yesterday",
      icon: <FileText className="h-4 w-4 text-green-500" />,
    },
    {
      id: 3,
      type: "collaboration",
      title: "Healthcare Analytics Team",
      action: "New member joined your team",
      time: "2 days ago",
      icon: <Users className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 4,
      type: "notification",
      title: "Policy Update",
      action: "New regulatory guidelines published",
      time: "3 days ago",
      icon: <Bell className="h-4 w-4 text-amber-500" />,
    },
    {
      id: 5,
      type: "achievement",
      title: "Innovation Excellence",
      action: "Your project received an award",
      time: "1 week ago",
      icon: <Star className="h-4 w-4 text-yellow-500" />,
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-moh-darkGreen">Recent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div 
              key={activity.id}
              className="flex items-start p-3 rounded-lg hover:bg-gray-50"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                {activity.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <p className="text-gray-600 text-sm">{activity.action}</p>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
              <button className="text-moh-green hover:text-moh-darkGreen text-sm font-medium">
                View
              </button>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100 text-center">
          <a href="/dashboard/activity" className="text-moh-green hover:text-moh-darkGreen text-sm font-medium">
            View All Activities
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
