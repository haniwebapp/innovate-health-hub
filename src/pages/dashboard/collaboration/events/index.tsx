
import { useState } from "react";
import EventsPageHeader from "@/components/dashboard/collaboration/events/EventsPageHeader";
import EventsTabs from "@/components/dashboard/collaboration/events/EventsTabs";
import { upcomingEvents, pastEvents } from "@/components/dashboard/collaboration/events/mockEventsData";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  return (
    <div className="space-y-6">
      <EventsPageHeader />
      
      <EventsTabs 
        upcomingEvents={upcomingEvents}
        pastEvents={pastEvents}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
