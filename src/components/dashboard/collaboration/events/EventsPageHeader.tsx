
import React from "react";
import BreadcrumbNav from "@/components/navigation/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const EventsPageHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <BreadcrumbNav 
        currentPage="Events" 
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Collaboration", href: "/dashboard/collaboration" },
        ]}
      />
      
      <div className="flex gap-2">
        <Button variant="outline" asChild>
          <Link to="/events">
            Public Events
          </Link>
        </Button>
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          View in Calendar
        </Button>
      </div>
    </div>
  );
};

export default EventsPageHeader;
