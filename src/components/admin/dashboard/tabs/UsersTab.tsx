
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import AdminUserStats from "@/components/admin/AdminUserStats";
import { UserProfile } from "@/types/admin";

interface UsersTabProps {
  users: UserProfile[];
}

export function UsersTab({ users }: UsersTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader className="bg-slate-50 border-b">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle>User Management</CardTitle>
            <Button asChild>
              <Link to="/dashboard/admin/users">
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Link>
            </Button>
          </div>
          <CardDescription>Overview of platform users and statistics</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <AdminUserStats users={users} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
