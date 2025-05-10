
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, UserCheck } from "lucide-react";
import { UserProfile } from "@/types/admin";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";

interface AdminUserStatsProps {
  users: UserProfile[];
}

export default function AdminUserStats({ users }: AdminUserStatsProps) {
  const isAdminUser = (email: string) => {
    return email.endsWith('@moh.gov.sa');
  };

  // Calculate user statistics
  const activeUsers = useMemo(() => users.filter(u => u.status === 'active').length, [users]);
  const inactiveUsers = useMemo(() => users.filter(u => u.status === 'inactive').length, [users]);
  const adminUsers = useMemo(() => users.filter(u => isAdminUser(u.email)).length, [users]);
  
  // Prepare chart data
  const userTypeData = useMemo(() => {
    const userTypes: Record<string, number> = {};
    
    users.forEach(user => {
      const type = user.userType || 'unknown';
      userTypes[type] = (userTypes[type] || 0) + 1;
    });
    
    return Object.entries(userTypes).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      count: count
    }));
  }, [users]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-4 grid-cols-1 md:grid-cols-2"
    >
      <motion.div variants={itemVariants}>
        <Card className="border-moh-green/10 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
            <CardTitle className="text-xl font-playfair text-moh-darkGreen">User Statistics</CardTitle>
            <CardDescription>Overview of user registration and activity</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div 
                variants={itemVariants}
                className="rounded-lg p-4 flex items-center justify-between border border-moh-green/10 bg-white shadow-sm"
              >
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Total Users</p>
                  <p className="text-2xl font-bold text-moh-darkGreen mt-1">{users.length}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-moh-lightGreen flex items-center justify-center">
                  <UserCheck className="h-6 w-6 text-moh-green" />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="rounded-lg p-4 flex items-center justify-between border border-moh-green/10 bg-white shadow-sm"
              >
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Active Users</p>
                  <p className="text-2xl font-bold text-moh-darkGreen mt-1">{activeUsers}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-500" />
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="rounded-lg p-4 flex items-center justify-between border border-moh-green/10 bg-white shadow-sm"
              >
                <div>
                  <p className="text-muted-foreground text-sm font-medium">Admin Users</p>
                  <p className="text-2xl font-bold text-moh-darkGreen mt-1">{adminUsers}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-moh-gold/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-moh-gold" />
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="border-moh-green/10 shadow-md overflow-hidden bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-moh-lightGreen/30 to-white pb-2">
            <CardTitle className="text-xl font-playfair text-moh-darkGreen">Users by Type</CardTitle>
            <CardDescription>Distribution of users by category</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] mt-4">
            {userTypeData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userTypeData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip 
                    formatter={(value) => [`${value} users`, 'Count']}
                    labelFormatter={(label) => `Type: ${label}`}
                    contentStyle={{ backgroundColor: "white", borderColor: "#00814A20" }}
                  />
                  <Bar dataKey="count" fill="#00814A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No data available
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
