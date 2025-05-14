
import React from "react";
import EventCard from "./EventCard";

interface UpcomingEventsListProps {
  events: Array<{
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
}

const UpcomingEventsList: React.FC<UpcomingEventsListProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <div>No upcoming events found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default UpcomingEventsList;
