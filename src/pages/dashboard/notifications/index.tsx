
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Check, Trash2, RefreshCw, Info, AlertCircle } from "lucide-react";
import { fetchUserNotifications, markAllNotificationsAsRead, markNotificationAsRead, Notification } from "@/utils/notificationUtils";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchUserNotifications(20);
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Failed to load notifications. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notification: Notification) => {
    try {
      await markNotificationAsRead(notification.id);
      setNotifications(prev => 
        prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
      );
      toast({
        description: "Notification marked as read",
      });
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark notification as read",
      });
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      toast({
        description: "All notifications marked as read",
      });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to mark all notifications as read",
      });
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "success":
        return <Check className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Bell className="h-4 w-4 text-moh-green" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            View and manage your notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={loadNotifications} disabled={isLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark all as read
          </Button>
        </div>
      </div>

      {error ? (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <p className="text-red-700">{error}</p>
            </div>
          </CardContent>
        </Card>
      ) : isLoading ? (
        <div className="flex justify-center py-12">
          <div className="flex flex-col items-center gap-2">
            <RefreshCw className="h-8 w-8 animate-spin text-moh-green" />
            <p className="text-muted-foreground">Loading notifications...</p>
          </div>
        </div>
      ) : notifications.length === 0 ? (
        <Card>
          <CardContent className="py-12 flex flex-col items-center justify-center">
            <Bell className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
            <h3 className="text-lg font-medium mb-1">No notifications</h3>
            <p className="text-muted-foreground text-center max-w-md">
              You don't have any notifications yet. When you receive notifications, they will appear here.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              You have {notifications.filter(n => !n.read).length} unread notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px]">
              <div className="space-y-4">
                {notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className={`p-4 rounded-lg border ${!notification.read ? 'bg-moh-lightGreen/20 border-moh-green/20' : 'bg-white'}`}>
                      <div className="flex items-start gap-3">
                        <div className={`rounded-full p-2 ${!notification.read ? 'bg-moh-green/10' : 'bg-gray-100'}`}>
                          {getNotificationIcon(notification.notification_type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              {!notification.read && (
                                <Badge variant="outline" className="bg-moh-green text-white border-none text-xs">New</Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.content}</p>
                          <div className="flex justify-end gap-2 mt-1">
                            {!notification.read && (
                              <Button variant="ghost" size="sm" onClick={() => handleMarkAsRead(notification)}>
                                <Check className="h-3.5 w-3.5 mr-1" />
                                Mark as read
                              </Button>
                            )}
                            {notification.action_url && (
                              <Button variant="outline" size="sm" asChild>
                                <a href={notification.action_url}>View Details</a>
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="justify-between border-t px-6 py-4">
            <p className="text-xs text-muted-foreground">
              Showing {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
