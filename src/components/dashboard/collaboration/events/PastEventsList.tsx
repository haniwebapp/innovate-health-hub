
import React from "react";
import EventCard from "./EventCard";

interface PastEventsListProps {
  events: Array<{
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
}

const PastEventsList: React.FC<PastEventsListProps> = ({ events }) => {
  if (!events || events.length === 0) {
    return <div>No past events found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} isPast={true} />
      ))}
    </div>
  );
};

export default PastEventsList;
