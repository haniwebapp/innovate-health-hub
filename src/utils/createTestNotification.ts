
import { supabase } from "@/integrations/supabase/client";

export async function createTestNotification() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) throw new Error("User not authenticated");
    
    const { data, error } = await supabase
      .from('notifications')
      .insert({
        user_id: user.id,
        title: "Welcome to the Platform",
        content: "Thank you for joining the Ministry of Health Innovation Platform. This is a test notification to verify our notification system works correctly.",
        notification_type: "info",
        action_url: "/dashboard"
      });

    if (error) throw error;
    console.log("Test notification created successfully");
    return true;
  } catch (error) {
    console.error("Error creating test notification:", error);
    return false;
  }
}
