
import React from "react";
import { motion } from "framer-motion";
import { CalendarDays, Users, TrendingUp, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Mock data - in a real app, this would come from an API
const eventsStats = {
  upcoming: 12,
  categories: 5,
  attendance: 87, // percentage
  registrations: 24,
};

export default function EventsDashboard() {
  return (
    <motion.div
      className="relative z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="backdrop-blur-md bg-white/10 border-white/20 shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-moh-green/5 to-moh-gold/5 pointer-events-none" />
        <CardContent className="p-5">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-moh-green" />
            Events Dashboard
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Upcoming Events Stat */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-moh-green/20 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-moh-green" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Upcoming Events</p>
                  <h4 className="text-2xl font-bold">{eventsStats.upcoming}</h4>
                </div>
              </div>
            </motion.div>
            
            {/* Categories Stat */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-moh-gold/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-moh-gold" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Categories</p>
                  <h4 className="text-2xl font-bold">{eventsStats.categories}</h4>
                </div>
              </div>
            </motion.div>
            
            {/* Attendance Rate */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-moh-green/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-moh-green" />
                </div>
                <div>
                  <p className="text-sm opacity-80">Attendance Rate</p>
                  <h4 className="text-2xl font-bold">{eventsStats.attendance}%</h4>
                </div>
              </div>
            </motion.div>
            
            {/* Recent Registrations */}
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-moh-gold/20 flex items-center justify-center">
                  <Users className="h-5 w-5 text-moh-gold" />
                </div>
                <div>
                  <p className="text-sm opacity-80">New Registrations</p>
                  <h4 className="text-2xl font-bold">{eventsStats.registrations}</h4>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Simple Events Chart/Visualization */}
          <motion.div
            className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h4 className="text-sm font-medium mb-3">Events by Category</h4>
            <div className="space-y-2">
              {/* Webinars */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Webinars</span>
                  <span>45%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-moh-green"
                    initial={{ width: 0 }}
                    animate={{ width: "45%" }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </div>
              </div>
              
              {/* Conferences */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Conferences</span>
                  <span>25%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-moh-gold"
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  />
                </div>
              </div>
              
              {/* Workshops */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Workshops</span>
                  <span>20%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-moh-green"
                    initial={{ width: 0 }}
                    animate={{ width: "20%" }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  />
                </div>
              </div>
              
              {/* Other */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Other Events</span>
                  <span>10%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-moh-gold"
                    initial={{ width: 0 }}
                    animate={{ width: "10%" }}
                    transition={{ delay: 1.3, duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
