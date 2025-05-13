
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export function UpcomingEvents() {
  // Mock data
  const events = [
    {
      id: 1,
      title: "Healthcare Innovation Summit",
      date: "June 15, 2025",
      type: "Conference",
    },
    {
      id: 2,
      title: "AI in Medical Imaging Workshop",
      date: "June 22, 2025",
      type: "Workshop",
    },
    {
      id: 3,
      title: "Regulatory Compliance Webinar",
      date: "June 30, 2025",
      type: "Webinar",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-bold text-moh-darkGreen">Upcoming Events</CardTitle>
          <Calendar className="h-4 w-4 text-moh-green" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {events.map((event, index) => (
            <motion.div 
              key={event.id}
              className="p-3 rounded-lg border border-gray-100 hover:border-moh-green transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <span className="text-xs font-medium bg-moh-lightGreen bg-opacity-50 text-moh-darkGreen px-2 py-0.5 rounded">
                {event.type}
              </span>
              <h4 className="font-medium text-gray-900 mt-1">{event.title}</h4>
              <p className="text-gray-500 text-sm">{event.date}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <a href="/dashboard/events" className="text-moh-green hover:text-moh-darkGreen text-sm font-medium">
            View All Events
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
