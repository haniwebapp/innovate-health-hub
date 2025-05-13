
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, CalendarDays, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [location, setLocation] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search for:", { searchTerm, eventType, timeFrame, location });
    // Implement search functionality
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-5 border-moh-gold/20 bg-white shadow-md">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search events..."
              className="pl-9 border-moh-gold/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-full sm:w-[180px] border-moh-gold/20">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-moh-green" />
                  <SelectValue placeholder="Event Type" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="webinar">Webinar</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="panel">Panel</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-full sm:w-[180px] border-moh-gold/20">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-moh-green" />
                  <SelectValue placeholder="Time Frame" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="next-month">Next Month</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full sm:w-[180px] border-moh-gold/20">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-moh-green" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="riyadh">Riyadh</SelectItem>
                <SelectItem value="jeddah">Jeddah</SelectItem>
                <SelectItem value="dammam">Dammam</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectContent>
            </Select>
            
            <Button type="submit" className="bg-moh-green hover:bg-moh-darkGreen text-white">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </form>
      </Card>
    </motion.div>
  );
}
