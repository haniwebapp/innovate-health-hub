
import { useEffect, useState } from "react";
import { UsersIcon, FileText, BellRing, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SystemHealthCard from "./SystemHealthCard";

interface AdminStatCardsProps {
  userCount: number;
  isLoading: boolean;
}

export function AdminStatCards({ userCount, isLoading }: AdminStatCardsProps) {
  const [stats, setStats] = useState({
    totalUsers: userCount || 0,
    activeSubmissions: 0,
    unreadNotifications: 0,
    completedTasks: 0,
  });

  useEffect(() => {
    // Update users when props change
    setStats(prev => ({
      ...prev,
      totalUsers: userCount || 0
    }));

    // Simulate fetching other stats
    const loadStats = async () => {
      // This would be an API call in a real app
      setStats(prev => ({
        ...prev,
        activeSubmissions: 16,
        unreadNotifications: 4,
        completedTasks: 28
      }));
    };

    if (!isLoading) {
      loadStats();
    }
  }, [userCount, isLoading]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-slate-50 border-b">
          <CardTitle className="text-sm font-medium flex items-center">
            <UsersIcon className="h-4 w-4 text-moh-green mr-2" />
            Total Users
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold mb-1">
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse bg-slate-100 rounded"></div>
            ) : (
              stats.totalUsers
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Registered platform users
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-slate-50 border-b">
          <CardTitle className="text-sm font-medium flex items-center">
            <FileText className="h-4 w-4 text-moh-green mr-2" />
            Active Submissions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold mb-1">
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse bg-slate-100 rounded"></div>
            ) : (
              stats.activeSubmissions
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Currently in review
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0 bg-slate-50 border-b">
          <CardTitle className="text-sm font-medium flex items-center">
            <BellRing className="h-4 w-4 text-moh-green mr-2" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-2xl font-bold mb-1">
            {isLoading ? (
              <div className="h-8 w-16 animate-pulse bg-slate-100 rounded"></div>
            ) : (
              stats.unreadNotifications
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Unread system notifications
          </p>
        </CardContent>
      </Card>

      <SystemHealthCard />
    </div>
  );
}
