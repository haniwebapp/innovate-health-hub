
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  FileText, 
  Calendar, 
  ChevronRight, 
  Settings,
  Shield 
} from "lucide-react";

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Activity Chart */}
        <Card className="lg:col-span-2 overflow-hidden">
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-lg font-semibold flex items-center justify-between">
              <span>Platform Activity</span>
              <Button variant="ghost" size="sm" className="text-xs">
                View all <ChevronRight size={14} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[250px] w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-md">
              <BarChart3 className="h-10 w-10 text-moh-green opacity-30" />
              <p className="text-muted-foreground ml-4">Activity chart will display here</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <Card>
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { icon: Users, text: "View User Analytics", link: "/dashboard/admin/users" },
                { icon: FileText, text: "Manage Content", link: "/dashboard/admin/cms" },
                { icon: BarChart3, text: "View Reports", link: "/dashboard/admin/reports" },
                { icon: Calendar, text: "Scheduled Tasks", link: "#" }
              ].map((item, i) => (
                <Button 
                  key={i} 
                  variant="outline" 
                  className="w-full justify-start text-left h-auto py-3 group" 
                  asChild
                >
                  <Link to={item.link}>
                    <div className="bg-slate-100 p-2 rounded mr-3 group-hover:bg-moh-green/20 transition-colors">
                      <item.icon size={16} className="text-moh-green" />
                    </div>
                    {item.text}
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* System Events and Health */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* System Events */}
        <Card>
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-lg font-semibold">Latest System Events</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {[
                { text: "User John Ahmed registered", time: "2 hours ago", type: "user" },
                { text: "New innovation submission", time: "4 hours ago", type: "submission" },
                { text: "Challenge closed", time: "1 day ago", type: "challenge" },
                { text: "System backup completed", time: "2 days ago", type: "system" }
              ].map((event, i) => (
                <div key={i} className="p-4 flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    event.type === 'user' ? 'bg-blue-100 text-blue-600' :
                    event.type === 'submission' ? 'bg-green-100 text-green-600' :
                    event.type === 'challenge' ? 'bg-purple-100 text-purple-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>
                    {event.type === 'user' && <Users size={14} />}
                    {event.type === 'submission' && <FileText size={14} />}
                    {event.type === 'challenge' && <Layers size={14} />}
                    {event.type === 'system' && <Settings size={14} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.text}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* System Health */}
        <Card>
          <CardHeader className="bg-slate-50 border-b">
            <CardTitle className="text-lg font-semibold">System Health</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[
                { name: "Database", status: "Operational", value: 96 },
                { name: "API Services", status: "Operational", value: 99 },
                { name: "Storage", status: "Operational", value: 92 },
                { name: "Authentication", status: "Operational", value: 100 }
              ].map((service, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{service.name}</span>
                    <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                      {service.status}
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div 
                      className="bg-moh-green h-2 rounded-full" 
                      style={{ width: `${service.value}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {service.value}% uptime
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
