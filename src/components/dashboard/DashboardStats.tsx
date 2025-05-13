
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartIcon, Users, Award, FileText } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardStats() {
  // Mock data
  const stats = [
    {
      title: "Total Innovations",
      value: "24",
      change: "+12%",
      icon: <FileText className="h-4 w-4 text-moh-green" />,
      trend: "up"
    },
    {
      title: "Active Challenges",
      value: "13",
      change: "+5%",
      icon: <Award className="h-4 w-4 text-moh-gold" />,
      trend: "up"
    },
    {
      title: "Team Collaborations",
      value: "8",
      change: "+3",
      icon: <Users className="h-4 w-4 text-blue-500" />,
      trend: "up"
    },
    {
      title: "Success Rate",
      value: "68%",
      change: "+2.5%",
      icon: <ChartIcon className="h-4 w-4 text-purple-500" />,
      trend: "up"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="border-gray-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className="bg-gray-100 p-1 rounded-md">{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-moh-darkGreen">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center mt-1`}>
                {stat.change}
                <span className="ml-1">{stat.trend === 'up' ? '↑' : '↓'}</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
