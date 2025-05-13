
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Calendar, MapPin, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function EventsFilter() {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md border border-gray-100 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search events..." 
              className="pl-10 border-gray-200 focus:border-moh-green focus:ring-moh-green/10"
            />
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px] border-gray-200 focus:ring-moh-green/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-moh-green" />
                <SelectValue placeholder="Event Type" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Event Type</SelectLabel>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="webinar">Webinars</SelectItem>
                <SelectItem value="workshop">Workshops</SelectItem>
                <SelectItem value="conference">Conferences</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px] border-gray-200 focus:ring-moh-green/10">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-moh-green" />
                <SelectValue placeholder="Time Frame" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Frame</SelectLabel>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="next-month">Next Month</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Select>
            <SelectTrigger className="w-full md:w-[180px] border-gray-200 focus:ring-moh-green/10">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-moh-green" />
                <SelectValue placeholder="Location" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Location</SelectLabel>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
                <SelectItem value="in-person">In-Person</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
                <SelectItem value="riyadh">Riyadh</SelectItem>
                <SelectItem value="jeddah">Jeddah</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          type="submit" 
          className="w-full md:w-auto bg-moh-green hover:bg-moh-darkGreen text-white gap-2"
        >
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </motion.div>
  );
}
