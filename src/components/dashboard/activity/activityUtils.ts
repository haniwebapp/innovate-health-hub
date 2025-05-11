
import { formatDistanceToNow } from "date-fns";
import { ActivityData } from "./activityTypes";

// Utility functions for activity-related operations

/**
 * Sorts activities by date (newest first) and pinned status
 */
export function sortActivities(activities: ActivityData[]): ActivityData[] {
  return [...activities].sort((a, b) => {
    // First sort by pinned status
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    // Then sort by timestamp (newest first)
    return b.timestamp.getTime() - a.timestamp.getTime();
  });
}

/**
 * Formats an activity timestamp in a human-readable format
 */
export function formatActivityTime(timestamp: Date): string {
  return formatDistanceToNow(timestamp, { addSuffix: true });
}

/**
 * Groups activities by date
 */
export function groupActivitiesByDate(activities: ActivityData[]): Record<string, ActivityData[]> {
  const grouped: Record<string, ActivityData[]> = {};
  
  activities.forEach(activity => {
    const date = activity.timestamp.toDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(activity);
  });
  
  return grouped;
}

/**
 * Filters activities by type
 */
export function filterActivitiesByType(activities: ActivityData[], type: string): ActivityData[] {
  if (!type) return activities;
  return activities.filter(activity => activity.type === type);
}
