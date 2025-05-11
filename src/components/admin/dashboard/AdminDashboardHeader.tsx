
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Settings, Users } from "lucide-react";

export function AdminDashboardHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b mb-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <span className="bg-gradient-to-r from-moh-green to-moh-darkGreen bg-clip-text text-transparent">
            Admin Dashboard
          </span>
          <Badge className="ml-3 bg-moh-green/20 text-moh-darkGreen hover:bg-moh-green/30 px-3">Beta</Badge>
        </h1>
        <p className="text-gray-500 mt-1 max-w-2xl">
          Welcome to the administration panel. Manage platform settings, users, and review performance metrics.
        </p>
      </div>
      <div className="flex gap-3 mt-4 md:mt-0">
        <Button variant="outline" asChild>
          <Link to="/dashboard/admin/settings">
            <Settings size={16} className="mr-2" />
            Settings
          </Link>
        </Button>
        <Button className="bg-moh-green hover:bg-moh-darkGreen" asChild>
          <Link to="/dashboard/admin/users">
            <Users size={16} className="mr-2" />
            Manage Users
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}
