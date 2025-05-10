
import { useEffect, useState } from "react";
import { fetchUserNotifications, Notification } from "@/utils/notificationUtils";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface NotificationBadgeProps {
  onClick?: () => void;
  className?: string;
}

export function NotificationBadge({ onClick, className }: NotificationBadgeProps) {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadNotifications = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        setIsLoading(true);
        const notifications = await fetchUserNotifications();
        const unread = notifications.filter(
          (notification: Notification) => !notification.read
        ).length;
        setUnreadCount(unread);
      } catch (err) {
        console.error("Failed to load notifications:", err);
        setError(err instanceof Error ? err : new Error("Failed to load notifications"));
      } finally {
        setIsLoading(false);
      }
    };

    loadNotifications();

    // Refresh notifications every minute
    const interval = setInterval(() => {
      loadNotifications();
    }, 60000);

    return () => clearInterval(interval);
  }, [user]);

  if (!user) {
    return null;
  }

  if (error) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`text-moh-darkGreen hover:bg-moh-lightGreen/50 hover:text-moh-green rounded-full relative transition-colors ${className}`}
        onClick={onClick}
        title="Error loading notifications"
      >
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`text-moh-darkGreen hover:bg-moh-lightGreen/50 hover:text-moh-green rounded-full relative transition-colors ${className}`}
      onClick={onClick}
      asChild
    >
      <Link to="/dashboard/notifications">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-0 right-0 h-4 w-4 bg-moh-gold text-white text-[10px] flex items-center justify-center rounded-full font-medium"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
    </Button>
  );
}
