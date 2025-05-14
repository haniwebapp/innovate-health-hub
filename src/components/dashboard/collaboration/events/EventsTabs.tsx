
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingEventsList from "./UpcomingEventsList";
import PastEventsList from "./PastEventsList";

interface EventsTabsProps {
  upcomingEvents: Array<{
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    presenter: string;
    presenterTitle?: string;
    duration: string;
    registered?: boolean;
    featured?: boolean;
  }>;
  pastEvents: Array<{
    id: string;
    title: string;
    type: string;
    date: string;
    time: string;
    presenter: string;
    presenterTitle?: string;
    duration: string;
    recording?: string;
    featured?: boolean;
  }>;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const EventsTabs: React.FC<EventsTabsProps> = ({ 
  upcomingEvents, 
  pastEvents, 
  activeTab,
  setActiveTab 
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
        <TabsTrigger value="past">Past Events</TabsTrigger>
      </TabsList>
      
      <TabsContent value="upcoming" className="mt-4">
        <UpcomingEventsList events={upcomingEvents} />
      </TabsContent>
      
      <TabsContent value="past" className="mt-4">
        <PastEventsList events={pastEvents} />
      </TabsContent>
    </Tabs>
  );
};

export default EventsTabs;
